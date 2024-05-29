import { PrismaClient } from '@prisma/client';
import { BarberDto } from '../models/barbers.dto';


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
    
    // Map the database results to instances of BarberDto
    const barbersDto: BarberDto[] = barbers.map((barber) => ({
      email: barber.email,
      name: barber.name,
      shop_id: barber.shop_id
    }));
    return barbersDto;

  } catch (error) {
    throw new Error(`Error fetching barbers: ${error}`);
  }
};

export const createBarber = async (barberData: BarberDto)=> {
 /* try {
    const newData =  prisma.barbers.create({
      data: barberData,
    });
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("sdsds");
    console.log(error);
    throw new Error(`Error fetching barbers: ${error}`);
  }*/
  if (!barberData.name) {
    throw new Error("Book name is required");
  }

  try {
    const newBook = await prisma.barbers.create({
      data: barberData,
    });
    return newBook;
  } catch (error) {
    throw error; // Re-throw any other Prisma errors
  }
};

export const createBarberAndShop = async (barberData: BarberDto)=> {
  return prisma.barbers.create({
    data: barberData,
  });
};
