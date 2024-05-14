// import { PrismaClient, typesHaircuts } from '@prisma/client';
// import { typesHaircutsDto } from '../model/typesHaircuts.dto';
// import { isNullOrUndefined } from 'util';

// const prisma = new PrismaClient();

// export const getAllTypesHaircuts = async (): Promise<typesHaircuts[]> => {
//   try {
//     const typesHaircutsList = await prisma.typesHaircuts.findMany();
//     return typesHaircutsList;
//   } catch (error) {
//     throw new Error(`Error fetching types of haircuts: ${error}`);
//   }
// };

// export const findTypesHaircutsByAppointmentId = async (appointmentId: number): Promise<typesHaircuts[]> => {
//   try {
//     const typesHaircutsList = await prisma.typesHaircuts.findMany({
//       where: {
//         appointment_id: appointmentId
//       }
//     });
//     return typesHaircutsList;
//   } catch (error) {
//     throw new Error(`Error fetching types of haircuts by appointment ID: ${error}`);
//   }
// };

// export const createTypeHaircut = async (typesHaircuts: typesHaircutsDto): Promise<typesHaircuts> => {
//   try {
    
//     console.log(typesHaircuts);
//     const newTypeHaircut = await prisma.typesHaircuts.create({
//       data: typesHaircuts,
//     });
//     return newTypeHaircut;
//   } catch (error) {
//     throw new Error(`Error creating type of haircut: ${error}`);
//   }
// };

// export const updateTypeHaircut = async (typesHaircutsId: number, newData: typesHaircutsDto): Promise<typesHaircuts | null> => {
//   try {
//     const updatedTypeHaircut = await prisma.typesHaircuts.update({
//       where: {
//         id: typesHaircutsId
//       },
//       data: newData
//     });
//     return updatedTypeHaircut;
//   } catch (error) {
//     throw new Error(`Error updating type of haircut: ${error}`);
//   }
// };

// export const deleteTypeHaircut = async (typesHaircutsId: number): Promise<typesHaircuts | null> => {
//   try {
//     const deletedTypeHaircut = await prisma.typesHaircuts.delete({
//       where: {
//         id: typesHaircutsId
//       }
//     });
//     if (!deletedTypeHaircut) {
//       throw new Error(`typesHaircuts with ID ${typesHaircutsId} not found`);
//     }
//     return deletedTypeHaircut;
//   } catch (error) {
//     throw error;
//   }
// };
