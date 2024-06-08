import { Router, Request, Response } from 'express';
import { createBarber, getAllbarber, getAllbarbers } from '../services/barber.service';
const barberRoute = Router()
import { PrismaClient, appointments } from '@prisma/client';

const prisma = new PrismaClient();

barberRoute.get('/barbers', async (req: Request, res: Response) => {
    try {
        const customers = await getAllbarber();
        res.json(customers);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

barberRoute.post('/barber', async (req: Request, res: Response) => {
    try {
        const newCustomer = await createBarber(req.body);
        res.json(newCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

export { barberRoute }

