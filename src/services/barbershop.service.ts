import { Prisma, PrismaClient, barbershops } from '@prisma/client';
import { BarbershopDetails } from '../models/BarbershopDetails.dto';
import { DaysOfWeek } from '../models/daysOfWeek.enum';
const prisma = new PrismaClient();


export const getOpeningHoursForDay = async (id: number, day: DaysOfWeek): Promise<any> => {
    try {
        const barbershop = await getBarbershopById(id);

        if (!barbershop) {
            throw new Error(`Barbershop with ID ${id} not found`);
        }
        const openingHours = barbershop.opening_hours as Prisma.JsonObject;

        // Extract the opening time for the given day of the week
        return openingHours[day] || "Closed on this day";
    } catch (error) {
        console.error('Error fetching barbershop opening hours by ID:', error);
        throw error;
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
        name: barbershops.name,
        address: barbershops.address,
        city: barbershops.city,
        phone_number: barbershops.phone_number,
        opening_hours: barbershops.opening_hours,
        manager_id: barbershops.manager_id
    }

};
