import express, { Request, Response, Router } from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsAvailable,
  getAppointmentsForDateAndBarber,
  getAppointmentsByBarberIdAndStartOrEndDate,
  generateTimeSlotsOfDay,
  generateTimeSlotsOfDa,
} from '../services/appointments.service';
import { AppointmentDetails } from '../models/AppointmentDetails.dto';
import { HaircutType } from '../models/typesHaircuts.enum';
const appointmentRoute = Router();


appointmentRoute.get('/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.get('/appointmentsByDateAndBarberId', async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string;
    const barberId = req.query.barberId as string;
    if (!date || !barberId) {
      return res.status(400).json({ error: 'Both date and barberId are required' });
    }
    const appointments = await getAppointmentsForDateAndBarber(parseInt(barberId, 10), date);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.get('/appointmentsByBarberId', async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string;
    const barberId = req.query.barberId as string;
    if (!barberId) {
      return res.status(400).json({ error: 'Both date and barberId are required' });
    }
    const appointments = await getAppointmentsByBarberIdAndStartOrEndDate(parseInt(barberId, 10), new Date("2024-08-01 09:00:00"));
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.get('/appointments/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await getAppointmentById(parseInt(id));
    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.post('/appointment', async (req: Request, res: Response) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await createAppointment(appointmentData);
    res.json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.put('/appointment/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
      const appointmentData = req.body;
      const updatedAppointment = await updateAppointment(id, appointmentData);
      if (!updatedAppointment) {
          return res.status(404).json({ message: `Appointment with ID ${id} not found` });
      }
      return res.status(200).json(updatedAppointment);
  } catch (error: unknown) {
      console.error('Error updating appointment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

appointmentRoute.delete('/appointment/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
      const deletedAppointment = await deleteAppointment(id);
      if (!deletedAppointment) {
          return res.status(404).json({ message: `Appointment with ID ${id} not found` });
      }
      return res.status(200).json(deletedAppointment);
  } catch (error: unknown) {
      console.error('Error deleting Appointment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

appointmentRoute.get('/availableSlots/:date', async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    console.log(date);
    const appointmentsAvailable: string[] = await getAppointmentsAvailable(1, 3, new Date(date));
    res.json(appointmentsAvailable);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const appointments: AppointmentDetails[] = [
  {
    appointment_time_start: new Date('2024-06-09T10:00:00'),
    haircut_type: [HaircutType.Beard],
    customer_name: 'John Doe',
    barber_name: 'Barber A',
    shop_name: 'Shop X'
  },
  {
    appointment_time_start: new Date('2024-06-09T11:30:00'),
    haircut_type: [HaircutType.Beard],
    customer_name: 'Jane Smith',
    barber_name: 'Barber B',
    shop_name: 'Shop Y'
  },
  {
    appointment_time_start: new Date('2024-06-09T20:30:00'),
    haircut_type: [HaircutType.Beard],
    customer_name: 'Alice Johnson',
    barber_name: 'Barber C',
    shop_name: 'Shop Z'
  }
];

appointmentRoute.get('/e', async (req: Request, res: Response) => {
  try {
    const ress = await generateTimeSlotsOfDay(3, new Date(), appointments);

    res.json(ress);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
appointmentRoute.get('/test', async (req: Request, res: Response) => {
  try {
    const appointments = await getAppointmentsByBarberIdAndStartOrEndDate(1, new Date("2022-01-01 09:00:00"),new Date("2024-10-01 12:00:00"));
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});



export default appointmentRoute;
