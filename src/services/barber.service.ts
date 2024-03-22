import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const getAllbarbers = async () => {
  return prisma.barbers.findMany();
};
