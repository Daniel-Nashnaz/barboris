import { Router, Request, Response } from 'express';
import { createBarber, getAllbarber, getAllbarbers } from '../services/barber.service';
const barbershopRoute = Router()
import { PrismaClient, appointments } from '@prisma/client';
import { getOpeningHoursForDay } from '../services/barbershop.service';

const prisma = new PrismaClient();

barbershopRoute.get('/barbershop', async (req: Request, res: Response) => {
console.log("sdsdsdsd");
    try {
        const newBarbershop = await prisma.barbershops.create({
            data: {
                name: "baruchShop",
                address: "",
                city: "Hispin",
                phone_number: "0524587639",
                opening_hours: {
                    "Sunday": {
                        "opening": "8:00",
                        "closing": "17:00"
                    },
                    "Monday": {
                        "opening": "8:00",
                        "closing": "17:00"
                    },
                    "Tuesday": {
                        "opening": "8:00",
                        "closing": "13:00"
                    },
                    "Wednesday": {
                        "opening": "8:00",
                        "closing": "17:00"
                    },
                    "Thursday": {
                        "opening": "8:00",
                        "closing": "17:00"
                    },
                    "Friday": {
                        "opening": "8:00",
                        "closing": "13:00"
                    },
                    "Saturday": {
                        "opening": "closed",
                        "closing": "closed"
                    }
                }
            }
        });
        console.log('נוצרה מספרה חדשה:', newBarbershop);

        res.json(newBarbershop);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


barbershopRoute.get('/barbersh', async (req: Request, res: Response) => {
    try {
       const name = await getOpeningHoursForDay(1,"Sunday");
      res.json(name);
    } catch (error: unknown) {
      res.status(500).json({ message: 'Error fetching customer', error: (error as Error).message });
  }
  
  });

export { barbershopRoute }