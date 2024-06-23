import { PrismaClient, appointments } from '@prisma/client';
import { AppointmentDetails } from '../models/AppointmentDetails.dto';
import { AppointmentDto } from '../models/appointment.dto';
import { DateTime } from 'luxon';
import { DaysOfWeek } from '../models/daysOfWeek.enum';
import { DetailedAppointmentInfo } from '../models/DetailedAppointmentInfo.dto';

const prisma = new PrismaClient();

export const getAllAppointments = async (): Promise<appointments[]> => {
    try {
        const appointmentList = await prisma.appointments.findMany();
        return appointmentList;
    } catch (error) {
        throw new Error(`Error fetching appointments: ${error}`);
    }
};

export const getAllAppointmentsOfUser = async (userId: number): Promise<DetailedAppointmentInfo[]> => {
    try {
        const appointments = await prisma.appointments.findMany({
            where: {
                customer_id: {
                    equals: userId,
                },
            },
            select: {
                appointment_time_start: true,
                appointment_time_end: true,
                haircut_type: true,
                barbers: true,
                barbershops: true,
            },
        });

        const formattedAppointments: DetailedAppointmentInfo[] = appointments.map((appointment) => ({
            appointment_time_start: getIsraelTime(appointment.appointment_time_start).toISO(),
            appointment_time_end: getIsraelTime(appointment.appointment_time_end).toISO(),
            typesHaircuts: appointment.haircut_type,
            barber: appointment.barbers,
            shop: appointment.barbershops,
        }));

        return formattedAppointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error(`Error fetching appointments: ${error}`);
    }
};

export const getAllAppointmentsOfBarber = async (barberId: number): Promise<DetailedAppointmentInfo[]> => {
    try {
        const appointments = await prisma.appointments.findMany({
            where: {
                barber_id: {
                    equals: barberId,
                },
            },
            select: {
                appointment_time_start: true,
                appointment_time_end: true,
                haircut_type: true,
                customers: true,
                barbershops: true,
            },
        });

        const formattedAppointments: DetailedAppointmentInfo[] = appointments.map((appointment) => ({
            appointment_time_start: getIsraelTime(appointment.appointment_time_start).toISO(),
            appointment_time_end: getIsraelTime(appointment.appointment_time_end).toISO(),
            typesHaircuts: appointment.haircut_type,
            customer: appointment.customers,
            shop: appointment.barbershops,
        }));

        return formattedAppointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error(`Error fetching appointments: ${error}`);
    }
};

export const getAllAppointmentsOfBarbershop = async (barbershopId: number): Promise<DetailedAppointmentInfo[]> => {
    try {
        const appointments = await prisma.appointments.findMany({
            where: {
                barbershops: {
                    id: barbershopId,
                },
            },
            select: {
                appointment_time_start: true,
                appointment_time_end: true,
                haircut_type: true,
                customers: true,
                barbers: true,
            },
        });

        const formattedAppointments: DetailedAppointmentInfo[] = appointments.map((appointment) => ({
            appointment_time_start: getIsraelTime(appointment.appointment_time_start).toISO(),
            appointment_time_end: getIsraelTime(appointment.appointment_time_end).toISO(),
            typesHaircuts: appointment.haircut_type,
            customer: appointment.customers,
            barber: appointment.barbers,
        }));

        return formattedAppointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error(`Error fetching appointments: ${error}`);
    }
};
export const getAllAppointmentsOfUsers = async (barberId: number): Promise<DetailedAppointmentInfo[]> => {
    try {
        const appointments = await prisma.appointments.findMany({
            where: {
                barber_id: {
                    equals: barberId,
                },
            },
            select: {
                appointment_time_start: true,
                appointment_time_end: true,
                haircut_type: true,
                customers: {
                    select: {
                        name: true,
                        phone_number: true,
                        email: true,
                    }
                }
            },
        });

        const formattedAppointments: DetailedAppointmentInfo[] = appointments.map((appointment) => {
            return {
                appointment_time_start: getIsraelTime(appointment.appointment_time_start).toISO(),
                appointment_time_end: getIsraelTime(appointment.appointment_time_end).toISO(),
                typesHaircuts: appointment.haircut_type,
                customer: appointment.customers
            };
        });

        return formattedAppointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error(`Error fetching appointments: ${error}`);
    }
};

export const getAppointmentsForDateAndBarber = async (barberId: number, dateString: string = new Date().toLocaleString()): Promise<AppointmentDetails[]> => {
    console.log(dateString);
    const today = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    try {
        const appointments = await prisma.appointments.findMany({
            where: {
                AND: [{
                    appointment_time_start: {
                        gte: today,
                        lt: tomorrow,
                    },
                }, {
                    barber_id: {
                        equals: barberId,
                    },
                },]
            },
            select: {
                appointment_time_start: true,
                haircut_type: true,
                customers: { select: { name: true } },
                barbers: { select: { name: true } },
                barbershops: { select: { name: true } },
            },
        });

        const formattedAppointments: AppointmentDetails[] = appointments.map((appointment) => ({
            appointment_time_start: getIsraelTime(appointment.appointment_time_start).toISO(),
            typesHaircuts: appointment.haircut_type,
            customer_name: appointment.customers?.name,
            barber_name: appointment.barbers?.name,
            shop_name: appointment.barbershops?.name,
        }));

        return formattedAppointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error(`Error fetching appointments: ${error}`);
    }
};

/**
 * Retrieves appointments for a specific barber within a specified date range or for a specific date.
 * If neither startDate nor endDate is provided, it defaults to today's appointments.
 * If only startDate is provided, it searches for appointments on that specific date.
 * If both startDate and endDate are provided, it searches for appointments within that date range.
 * 
 * @param {number} barberId - The ID of the barber.
 * @param {number} barbershopId - The ID of the barbershop.
 * @param {Date} [startDate=new Date()] - The start date of the date range. Defaults to today.
 * @param {Date} [endDate] - The end date of the date range. If not provided, defaults to the end of startDate.
 * @returns {Promise<DetailedAppointmentInfo[]>} A Promise that resolves to an array of DetailedAppointmentInfo.
 * 
 * @typedef {Object} DetailedAppointmentInfo
 * @property {string} appointment_time_start - The start time of the appointment in ISO format.
 * @property {string} appointment_time_end - The end time of the appointment in ISO format (currently same as appointment_time_start).
 * @property {string} typesHaircuts - The type of haircut for the appointment.
 * @property {Object} customers - An object containing customer details.
 * @property {number} customers.id - The ID of the customer.
 * @property {string} customers.name - The name of the customer.
 * @property {string} customers.email - The email address of the customer.
 * @property {string} customers.phone_number - The phone number of the customer.
 *
 * @throws {Error} Throws an error if there is an issue fetching appointments.
 */
export const getAppointmentsByBarberIdAndBarbershopIdAndDateRange = async (barberId: number, barbershopId: number, startDate: Date = new Date(), endDate?: Date): Promise<DetailedAppointmentInfo[]> => {
    try {
        let startDateMidnight = new Date(startDate);
        startDateMidnight.setHours(0, 0, 0, 0);
        let endDateMidnight;
        if (endDate) {
            endDateMidnight = new Date(endDate);
            endDateMidnight.setHours(23, 59, 59, 999);
        } else {
            endDateMidnight = new Date(startDateMidnight);
            endDateMidnight.setHours(23, 59, 59, 999);
        }

        const appointments = await prisma.appointments.findMany({
            where: {
                AND: [
                    {
                        appointment_time_start: {
                            gte: startDateMidnight,
                            lte: endDateMidnight,
                        },
                    },
                    {
                        barber_id: {
                            equals: barberId,
                        },
                        shop_id: {
                            equals: barbershopId,
                        }
                    },
                ],
            },
            select: {
                appointment_time_start: true,
                appointment_time_end: true,
                haircut_type: true,
                customers: {
                    select: {
                        name: true,
                        email: true,
                        phone_number: true,
                    }
                }
            },
        });

        const formattedAppointments: DetailedAppointmentInfo[] = appointments.map((appointment) => ({
            appointment_time_start: getIsraelTime(appointment.appointment_time_start).toISO(),
            appointment_time_end: getIsraelTime(appointment.appointment_time_end).toISO(),
            typesHaircuts: appointment.haircut_type,
            customers: appointment.customers,
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

export const getAppointmentsAvailable = async (barberId: number, barbarshopId: number, dateTime: Date): Promise<string[]> => {
    const appointments: AppointmentDetails[] = await getAppointmentsByBarberIdAndBarbershopIdAndDateRange(barberId, barbarshopId, dateTime);
    const timeSlots: string[] = await generateTimeSlotsOfDay(barbarshopId, dateTime, appointments);
    return timeSlots;

};

export const createAppointment = async (appointment: AppointmentDto): Promise<appointments> => {
    try {
        const newAppointment = await prisma.appointments.create({ data: appointment });
        return newAppointment;
    } catch (error) {
        console.log(error);
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

/**
 * Generates time slots for a given day based on the opening hours of a barbershop,
 * existing appointments, and a specified time increment.
 * @param {number} barbershopId - The unique identifier of the barbershop for which time slots are being generated.
 * @param {Date} dateOfSolt - The date for which time slots are being generated.
 * @param {AppointmentDetails[]} appointments - An array of existing appointments on the specified day.
 * @param {number} [timeIncrement=30] - The time interval (in minutes) between each time slot. Default is set to 30 minutes.
 * @returns {Promise<string[]>} - A promise that resolves to an array of available time slots.
 */
export const generateTimeSlotsOfDay = async (barbershopId: number, dateOfSolt: Date, appointments: AppointmentDetails[], timeIncrement: number = 30): Promise<string[]> => {
    try {
        const nowTimeIsrael = DateTime.local().setZone('Asia/Jerusalem');
        const shop = await prisma.barbershops.findUnique({
            where: {
                id: barbershopId,
            },
            select: {
                opening_hours: true
            }
        });

        if (!shop || shop.opening_hours === null) {
            return [];
        }
        // Determine the day of the week from the provided date
        const dayOfWeek = DateTime.fromJSDate(dateOfSolt).toFormat('EEEE') as DaysOfWeek;
        const openingHours = shop.opening_hours as Record<string, any>;
        console.log(dayOfWeek);
        if (!openingHours.hasOwnProperty(dayOfWeek)) {
            return [];
        }

        const dayData = openingHours[dayOfWeek];
        if (!Array.isArray(dayData.opening_hours)) {
            return [];
        }

        const slots = dayData.opening_hours;
        const timeSlots: string[] = [];
        const appointmentStartTimes: Set<string> = new Set(appointments.map(appointment => getHourAndMinuteInIsraelTime(new Date(appointment.appointment_time_start))));

        slots.forEach((slot: { start: string, end: string }) => {
            const startTime = getIsraelTime(new Date(`1970-01-01T${slot.start}`));
            const endTime = getIsraelTime(new Date(`1970-01-01T${slot.end}`));

            if (startTime && endTime) {
                let currentTime = startTime;
                while (currentTime <= endTime) {
                    const timeString: string = currentTime.toFormat('HH:mm');

                    // Check if the current date matches the date of the time slot
                    if (areDatesEqual(nowTimeIsrael, getIsraelTime(dateOfSolt))) {
                        // Ignore time slots before the current time
                        if (nowTimeIsrael.hour > currentTime.hour || (nowTimeIsrael.hour === currentTime.hour && nowTimeIsrael.minute > currentTime.minute)) {
                            currentTime = currentTime.plus({ minutes: timeIncrement });
                            continue;
                        }
                    }
                    // If the time slot is available (not in existing appointments), add it to the list
                    if (!appointmentStartTimes.has(timeString)) {
                        timeSlots.push(timeString);
                    }
                    currentTime = currentTime.plus({ minutes: timeIncrement });
                }
            }
        });

        return timeSlots;
    } catch (error) {
        throw new Error('Error generating time slots: ' + error);
    }
}

/**
 * Formats an array of appointments with detailed opening hours.
 * 
 * @param appointments - The array of appointments to format.
 * @returns An array of `DetailedAppointmentInfo` objects.
 */
const formatAppointmentsOfUserWithOpeningHours = (appointments: any[]): DetailedAppointmentInfo[] => {
    return appointments.map((appointment) => {
        const dayOfWeek = DateTime.fromJSDate(appointment.appointment_time_start).toFormat('EEEE') as DaysOfWeek;
        const openingHours = appointment.barbershops?.opening_hours as Record<string, any>;

        const dayData = openingHours[dayOfWeek];

        return {
            appointment_time_start: getIsraelTime(appointment.appointment_time_start).toISO(),
            appointment_time_end: getIsraelTime(appointment.appointment_time_end).toISO(),
            typesHaircuts: appointment.haircut_type,
            barber: appointment.barbers,
            opening_hours: dayData
        };
    });
};

/**
 * Formats an array of appointments with detailed opening hours.
 * 
 * @param appointments - The array of appointments to format.
 * @returns An array of `AppointmentDetailsWithOpeningHours` objects.
 */
const formatAppointmentsOfBarberWithOpeningHours = (appointments: any[]): DetailedAppointmentInfo[] => {
    return appointments.map((appointment) => {
        const dayOfWeek = DateTime.fromJSDate(appointment.appointment_time_start).toFormat('EEEE') as DaysOfWeek;
        const openingHours = appointment.barbershops?.opening_hours as Record<string, any>;

        const dayData = openingHours[dayOfWeek];

        return {
            appointment_time_start: getIsraelTime(appointment.appointment_time_start).toISO(),
            appointment_time_end: getIsraelTime(appointment.appointment_time_end).toISO(),
            typesHaircuts: appointment.haircut_type,
            customer: appointment.customers,
            opening_hours: dayData
        };
    });
};

const getHourAndMinute = (date: Date): string => {
    const isoString: string = date.toISOString();
    return isoString.slice(11, 16);
};


const getHourAndMinuteInIsraelTime = (date: Date) => {
    const dt = DateTime.fromJSDate(date);
    // Set the time zone to Israel Standard Time (UTC+2 or UTC+3 depending on daylight saving time)
    const israelDt = dt.setZone('Asia/Jerusalem');
    return israelDt.toFormat('HH:mm');
};

const getIsraelTime = (date: Date): DateTime => {
    const dt = DateTime.fromJSDate(date);
    // Set the time zone to Israel Standard Time (UTC+2 or UTC+3 depending on daylight saving time)
    const israelDt = dt.setZone('Asia/Jerusalem');
    return israelDt;
};

const areDatesEqual = (dt1: DateTime, dt2: DateTime): boolean => {
    return dt1.hasSame(dt2, 'day');
};


