import {
    createCustomer,
    findCustomerByEmail
} from '../services/customers.service';
import {
    createAppointment
} from '../services/appointments.service';
import { AppointmentDataClient } from '../model/appointmentDateClient.dto';
const BARBER_ID: number = 3;
const SHOP_ID: number = 1;
export const setCustomerAndAppointment = async (appointmentData: AppointmentDataClient) => {
    try {
        let customer = await findCustomerByEmail(appointmentData.email);
        let customerId: number;
        if (!customer) {
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
            typesHaircuts: appointmentData.haircutType,
            customer_id: customerId,
            barber_id: BARBER_ID,
            shop_id: SHOP_ID
        })
        return {
            customer: customer,
            appointment: newAppointment
        };
    } catch (error) {
        throw new Error(`Error : ${error}`);
    }
};

