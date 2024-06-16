import {
    createCustomer,
    findCustomerByEmail
} from '../services/customers.service';
import { createAppointment } from '../services/appointments.service';
import { AppointmentDataClient } from '../models/appointmentDateClient.dto';
import { User } from '../models/userDetails.dto';
import { findBarberByEmail, getBarbershopOfbarberId } from './barber.service';
import { UserIds, UserRole } from '../models/userRoles.enum';
/**
 * Creates or updates a customer and creates a new appointment for the customer.
 * If the customer does not exist, it creates a new customer with the provided information.
 * If the customer already exists, it uses the existing customer information.
 * @param appointmentData An object containing appointment data including customer details.
 * @returns An object containing the customer and the newly created appointment.
 * @throws Error if any error occurs during the process.
 */
export const setCustomerAndAppointment = async (appointmentData: AppointmentDataClient) => {
    try {
        let customer = await findCustomerByEmail(appointmentData.email);
        let customerId: number;
        if (!customer) {
            // if user not found, create them
            customer = await createCustomer({
                email: appointmentData.email,
                name: appointmentData.name,
                phone_number: appointmentData.phone
            });
            customerId = customer.id;
        } else {
            customerId = customer.id;
        }
        const newAppointment = await createAppointment({
            appointment_time_start: appointmentData.timeStart,
            appointment_time_end: appointmentData.timeEnd,
            haircut_type: appointmentData.haircutType,
            customer_id: customerId,
            barber_id: appointmentData.barberId,
            shop_id: appointmentData.barbershopId,
        })
        return {
            customer: customer,
            appointment: newAppointment
        };
    } catch (error) {
        throw new Error(`Error : ${error}`);
    }
};

/**
 * Retrieves user role and details based on email, which can belong to a customer or a barber.
 * @param email The email address of the user.
 * @returns A promise resolving to a User object with roles and details, or null if user not found.
 */
export const getUserRoleByEmail = async (email: string): Promise<User | null> => {
    let userData: User | null = null;

    try {
        // Check if the user is a customer
        const customerData = await findCustomerByEmail(email);
        if (customerData !== null) {
            userData = {
                id: {
                    [UserIds.CUSTOMER_ID]: [customerData.id],
                },
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone_number || '',
                roles: [UserRole.CUSTOMER],
            };
        }

        // Check if the user is a barber
        const barberData = await findBarberByEmail(email);
        if (barberData !== null) {
            if (userData === null) {
                userData = {
                    id: {
                        [UserIds.BARBER_ID]: [barberData.id],
                    },
                    name: barberData.name,
                    email: barberData.email,
                    phone: barberData.phone_number || '',
                    roles: [UserRole.BARBER],
                };
            } else {
                userData.id[UserIds.BARBER_ID] = [barberData.id];
                userData.roles.push(UserRole.BARBER);
            }

            // Check if the barber is an admin of any barbershop
            const barbershopAdmin = await getBarbershopOfbarberId(barberData.id);
            if (barbershopAdmin.length !== 0) {
                userData.id[UserIds.BARBERSHOPS_ID] = barbershopAdmin;
                userData.roles.push(UserRole.ADMIN);
            }
        }
    } catch (error) {
        throw new Error(`Error retrieving user role and details: ${error}`);
    }

    return userData;
};

