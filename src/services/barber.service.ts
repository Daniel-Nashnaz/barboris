import { PrismaClient, barbers } from '@prisma/client';
import { BarberDto } from '../models/barbers.dto';
import { BarbershopDetails } from '../models/BarbershopDetails.dto';


const prisma = new PrismaClient();

export const getAllbarber = async () => {
  try {
    const barbers = await prisma.barbers.findMany();
    return barbers;
  } catch (error) {
    throw new Error(`Error fetching barbers: ${error}`);
  }
};

export const getAllbarbers = async (): Promise<BarberDto[]> => {
  try {
    const barbers = await prisma.barbers.findMany();
    const barbersDto: BarberDto[] = barbers.map((barber) => ({
      id: barber.id,
      email: barber.email,
      name: barber.name,
      phone_number: barber.phone_number
    }));
    return barbersDto;
  } catch (error) {
    throw new Error(`Error fetching barbers: ${error}`);
  }
};

export const createBarber = async (barberData: BarberDto) => {
  // try {
  //   const newData =  prisma.barbers.create({
  //     data: barberData,
  //   });
  //   return newData;
  // } catch (error) {
  //   throw new Error(`Error fetching barbers: ${error}`);
  // }
  // if (!barberData.name) {
  //   throw new Error("Book name is required");
  // }

  try {
    const newBook = await prisma.barbers.create({
      data: barberData,
    });
    return newBook;
  } catch (error) {
    throw error; // Re-throw any other Prisma errors
  }
};

/**
 * Finds a barber by their email address.
 * @param email The email address of the barber to find.
 * @returns A Promise that resolves with the found barber or null if not found.
 * @throws Error if an error occurs while finding the barber.
 */
export const findBarberByEmail = async (email: string): Promise<barbers | null> => {
  try {
    const barber = await prisma.barbers.findUnique({
      where: {
        email: email,
      },
    });
    return barber;
  } catch (error) {
    throw new Error(`Error finding barber by email: ${error}`);
  }
};



export const getAllbarberInBarbershopId = async (barbershopId: number): Promise<BarberDto[]> => {
  try {
    const barbers = await prisma.barbers.findMany({
      where: {
        barbervsbarbershops: {
          some: {
            barbershop_id: barbershopId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
      },
    });
    return barbers;
  } catch (error) {
    throw new Error(`Error fetching barbers: ${error}`);
  }
};


export const getBarbershopOfbarberId = async (barberId: number): Promise<number[]> => {
  try {
    const barbershops = await prisma.barbershops.findMany({
      where: {
        manager_id: barberId,
      },
      select: {
        id: true,
      },
    });
    const barbershopIds = barbershops.map(barbershop => barbershop.id);
    return barbershopIds;
  } catch (error) {
    throw new Error(`Error fetching barbers: ${error}`);
  }
};


