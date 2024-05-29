import { Router, Request, Response } from 'express';
import { createBarber, getAllbarber, getAllbarbers } from '../services/barber.service';
const barberRoute = Router()
import { PrismaClient, appointments } from '@prisma/client';

const prisma = new PrismaClient();

barberRoute.get('/barber', async (req: Request, res: Response) => {
    console.log("init");
    // const customers = await getAllbarber();
    // res.json(customers);
    
    //gat all appointment of barber...
      try {
          const barber = await prisma.barbers.findFirst({
              where: {
                  name: "Dan"
              }
          });
          console.log(barber)
          if (barber) {
              const barberAppointments = await prisma.appointments.findMany({
                  where: {
                      barber_id: barber.id
                  }
              });
  
              res.send(barberAppointments);
          } else {
              throw new Error('ספר לא נמצא.');
          }
      } catch (error) {
          throw new Error(`אירעה שגיאה במהלך קריאת המידע: ${error}`);
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

export  {barberRoute}

