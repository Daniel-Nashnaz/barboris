import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const getOpeningHoursForDay = async (id: number, day: string) => {
    try {
        // Use select method to retrieve only the opening_hours column
        const barbershop = await prisma.barbershops.findUnique({
            where: { id: id }
        });

        if (!barbershop) {
            throw new Error(`Barbershop with ID ${id} not found`);
        }
        // Ensure opening_hours is not null
        const openingHours = barbershop.opening_hours as Prisma.JsonObject;

        // Extract the opening time for the given day of the week
        const openingTime = openingHours[day];
        console.log(openingTime);
        if (!openingTime) {
            return "Closed on this day";
        }//if (openingHours?.opening_hours) //{
        //  const { opening, closing } = openingHours[day];
        //return `${opening} - ${closing}`;
        // }

        // If there are no opening hours for the given day, return null
        // return null;
        return openingTime;
    } catch (error) {
        console.error('Error fetching barbershop opening hours by ID:', error);
        throw error;
    }
    // Check if the opening hours for the given day exist
};

// E
