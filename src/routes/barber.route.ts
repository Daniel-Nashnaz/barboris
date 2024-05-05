import { Router, Request, Response } from 'express';
import { createBarber, getAllbarber, getAllbarbers } from '../services/barber.service';
const barberRoute = Router()


barberRoute.get('/barber', async (req: Request, res: Response) => {
    console.log("init");
    const customers = await getAllbarber();
    res.json(customers);
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

export  {barberRoute}

