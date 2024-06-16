import { Router, Request, Response } from 'express';
import { createBarber, findBarberByEmail, getAllbarber, getAllbarberInBarbershopId, getAllbarbers, } from '../services/barber.service';
const barberRoute = Router()

barberRoute.get('/barbers', async (req: Request, res: Response) => {
    try {
        const barbers = await getAllbarbers();
        res.json(barbers);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

barberRoute.get('/barberByEmail/:email', async (req: Request, res: Response) => {
    try {
      const email = String(req.params.email);
      const barber = await findBarberByEmail(email);
      res.json(barber);
    } catch (error: unknown) {
      res.status(500).json({ message: 'Error fetching barber', error: (error as Error).message });
    }
  
  });

barberRoute.get('/getBarbersOfBarbershopId/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const barbers = await getAllbarberInBarbershopId(id);
        res.json(barbers);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});


barberRoute.post('/barber', async (req: Request, res: Response) => {
    try {
        const newbarber = await createBarber(req.body);
        res.json(newbarber);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

export { barberRoute }

