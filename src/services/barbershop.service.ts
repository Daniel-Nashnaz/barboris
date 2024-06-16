import { PrismaClient, barbershops } from '@prisma/client';
import { BarbershopDetails } from '../models/BarbershopDetails.dto';
import { DaysOfWeek } from '../models/daysOfWeek.enum';
import { Day, StoreHours, validateStoreHours } from '../models/storeHoursValidator';
const prisma = new PrismaClient();


/**
 * Retrieves the opening hours for a specific day of the week for a barbershop.
 * @param {number} id - The ID of the barbershop.
 * @param {DaysOfWeek} day - The day of the week for which to retrieve the opening hours.
 * @returns {Promise<Day | null>} The opening hours for the specified day, or null if the barbershop is closed on that day.
 * @throws {Error} If the barbershop with the specified ID is not found, or if there is an error fetching the data.
 */
export const getOpeningHoursForDay = async (id: number, day: DaysOfWeek): Promise<Day | null> => {
    try {
        const barbershop = await getBarbershopById(id);

        if (!barbershop) {
            throw new Error(`Barbershop with ID ${id} not found`);
        }

        const storeHours = barbershop.opening_hours as StoreHours;

        // Validate store hours
        const isValidStoreHours = validateStoreHours(storeHours);
        if (!isValidStoreHours) {
            throw new Error('Invalid store hours data');
        }

        const openingHoursForDay = storeHours[day];
        if (!openingHoursForDay) {
            return null;
        }

        const openingHours = openingHoursForDay.opening_hours;
        if (!Array.isArray(openingHours) || openingHours.length === 0) {
            return null;
        }

        return openingHoursForDay;
    } catch (error) {
        console.error('Error fetching barbershop opening hours by ID:', error);
        throw error;
    }
};

/**
 * Retrieves all barbershops associated with a specific barber ID.
 * @param barberId The ID of the barber for which to fetch associated barbershops.
 * @returns A promise resolving to an array of BarbershopDetails objects.
 * @throws Error if there's an issue fetching barbershops from the database.
 */
export const getAllbarbershopOfBarberId = async (barberId: number): Promise<BarbershopDetails[]> => {
    try {
        const barbershops = await prisma.barbershops.findMany({
            where: {
                barbervsbarbershops: {
                    some: {
                        barber_id: barberId,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                city: true,
                manager_id: true,
                opening_hours: true,
                address: true,
                phone_number: true,
            },
        });
        return barbershops;
    } catch (error) {
        throw new Error(`Error fetching barbershops: ${error}`);
    }
};

export const getAllBarbershops = async (): Promise<BarbershopDetails[]> => {
    const barbershops = await prisma.barbershops.findMany();
    return barbershops.map(mapBarbershopDetails);
};

export const getBarbershopById = async (id: number): Promise<BarbershopDetails | null> => {
    return await prisma.barbershops.findUnique({
        where: { id },
    });
};

export const createBarbershop = async (data: BarbershopDetails): Promise<barbershops> => {
    const isValidStoreHours = validateStoreHours(data.opening_hours);
    if (!isValidStoreHours) {
        throw new Error(`Barbershop hours do not match the format!`);
    }
    return await prisma.barbershops.create({
        data,
    });
};

export const updateBarbershop = async (id: number, data: BarbershopDetails): Promise<BarbershopDetails> => {
    const barbershop = await prisma.barbershops.update({
        where: { id },
        data,
    });
    return mapBarbershopDetails(barbershop);
};

export const deleteBarbershop = async (id: number): Promise<BarbershopDetails> => {
    const barbershop = await prisma.barbershops.delete({
        where: { id },
    });
    return mapBarbershopDetails(barbershop);
};

const mapBarbershopDetails = (barbershops: barbershops): BarbershopDetails => {
    return {
        id: barbershops.id,
        name: barbershops.name,
        address: barbershops.address,
        city: barbershops.city,
        phone_number: barbershops.phone_number,
        opening_hours: barbershops.opening_hours,
        manager_id: barbershops.manager_id
    }

};
