import { PrismaClient, barbers } from '@prisma/client';

const prisma = new PrismaClient();

export class BarberVsBarbershopsService {
    async addBarberToBarbershop(barberId: number, barbershopId: number): Promise<void> {
        try {
            await prisma.barbervsbarbershops.create({
                data: {
                    barber_id: barberId,
                    barbershop_id: barbershopId,
                },
            });
        } catch (error) {
            console.log(error);
            throw new Error(`Failed to add barber to barbershop: ${error}`);
        }
    }

    async removeBarberFromBarbershop(barberId: number, barbershopId: number): Promise<void> {
        try {
            await prisma.barbervsbarbershops.delete({
                where: {
                    barber_id_barbershop_id: {
                        barber_id: barberId,
                        barbershop_id: barbershopId,
                    },
                },
            });
        } catch (error) {
            throw new Error(`Failed to remove barber from barbershop: ${error}`);
        }
    }

}
