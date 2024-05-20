import { PrismaClient, appointments } from '@prisma/client';
import { AppointmentDetails } from '../model/AppointmentDetails.dto';
import { AppointmentDto } from '../model/appointment.dto';

const prisma = new PrismaClient();
const startTime:Date = new Date("2024-05-20T08:00:00Z");
const endTime:Date = new Date("2024-05-20T17:00:00Z");

export const getAllAppointments = async (): Promise<appointments[]> => {
    try {
        const appointmentList = await prisma.appointments.findMany();
        return appointmentList;
    } catch (error) {
        throw new Error(`Error fetching appointments: ${error}`);
    }
};

export const getAppointmentsForDate = async (dateString: string  = new Date().toLocaleString()): Promise<AppointmentDetails[]> => {
    console.log(dateString);
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
        console.error("Error fetching appointments:", error);
        throw new Error(`Error fetching appointments: ${error}`);
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

export const getAppointmentsAvailable = async(dateTime: string) => {
    const appointments: AppointmentDetails[] = await getAppointmentsForDate(dateTime);
    const timeSlots: string[] = await generateTimeSlots(startTime,endTime, appointments);
    return timeSlots;
    
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

/*
const getAppointmentsOnDateTime = async (dateTime: string | Date): Promise<Appointment[]> => {

    try {
        const date = new Date(dateTime);
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000); // Next day

        const appointments = await prisma.appointments.findMany({
            where: {
                AND: [
                    {
                        appointment_time_start: {
                            gte: startOfDay,
                        },
                    },
                    {
                        appointment_time_start: {
                            lt: endOfDay,
                        },
                    },
                ],
            },
            select: {
                appointment_time_start: true,
                appointment_time_end: true,
            },
        });
        return appointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};
*/

const generateTimeSlots = async (startTime: Date, endTime: Date, appointments: AppointmentDetails[], timeIncrement: number | undefined = 30): Promise<string[]> => {
    const timeSlots: string[] = [];
    let currentTime: Date = new Date(startTime);
    const endDateTime: Date = new Date(endTime);

    const appointmentStartTimes: Set<string> = new Set(appointments.map(appointment => getHourAndMinute(new Date(appointment.appointment_time_start))));

    while (currentTime <= endDateTime) {
        const timeString: string = getHourAndMinute(currentTime);

        if (!appointmentStartTimes.has(timeString)) {
            timeSlots.push(timeString);
        }

        currentTime = new Date(currentTime.getTime() + timeIncrement * 60 * 1000);
    }

    return timeSlots;
};

const getHourAndMinute = (date: Date): string => {
    const isoString: string = date.toISOString();
    return isoString.slice(11, 16);
};
