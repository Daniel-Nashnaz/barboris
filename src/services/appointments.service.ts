import { PrismaClient, appointments } from '@prisma/client';
import { AppointmentDto } from '../model/appointment.dto';
import { AppointmentDetails } from '../model/AppointmentDetails.dto';

const prisma = new PrismaClient();

export const getAllAppointments = async (): Promise<appointments[]> => {
    try {
        const appointmentList = await prisma.appointments.findMany();
        return appointmentList;
    } catch (error) {
        throw new Error(`Error fetching appointments: ${error}`);
    }
};

export const getAppointmentsForDate = async (dateString: string = new Date().toISOString()): Promise<AppointmentDetails[]> => {
    const today = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    try {
        const appointments = await prisma.appointments.findMany({
            where: {
                appointment_time_start: {
                    gte: today,
                    lt: tomorrow,
                },
            },
            select: {
                appointment_time_start: true,
                typesHaircuts: true,
                customers: { select: { name: true } },
                barbers: { select: { name: true } },
                barbershops: { select: { name: true } },
            },
        });

        const formattedAppointments: AppointmentDetails[] = appointments.map((appointment) => ({
            appointment_time_start: appointment.appointment_time_start,
            typesHaircuts: appointment.typesHaircuts,
            customer_name: appointment.customers?.name || 'Unknown',
            barber_name: appointment.barbers?.name || 'Unknown',
            shop_name: appointment.barbershops?.name || 'Unknown',
        }));

        return formattedAppointments;
    } catch (error) {
        throw new Error(`Error fetching appointments for the specified date: ${error}`);
    }
};

export const getAppointmentById = async (id: number): Promise<appointments | null> => {
    try {
        const appointment = await prisma.appointments.findUnique({ where: { id } });
        return appointment;
    } catch (error) {
        throw new Error(`Error fetching appointment by ID: ${error}`);
    }
};

export const createAppointment = async (appointment: AppointmentDto): Promise<appointments> => {
    try {
        const newAppointment = await prisma.appointments.create({ data: appointment });
        return newAppointment;
    } catch (error) {
        throw new Error(`Error creating appointment: ${error}`);
    }
};

export const updateAppointment = async (id: number, newData: appointments): Promise<appointments | null> => {
    try {
        const updatedAppointment = await prisma.appointments.update({
            where: { id },
            data: newData,
        });
        return updatedAppointment;
    } catch (error) {
        throw new Error(`Error updating appointment: ${error}`);
    }
};

export const deleteAppointment = async (id: number): Promise<appointments | null> => {
    try {
        const deletedAppointment = await prisma.appointments.delete({ where: { id } });
        return deletedAppointment;
    } catch (error) {
        throw new Error(`Error deleting appointment: ${error}`);
    }
};


