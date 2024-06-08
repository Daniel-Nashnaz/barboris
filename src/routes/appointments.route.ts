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
import { DaysOfWeek } from '../models/daysOfWeek.enum';
import { AppointmentDetails } from '../models/AppointmentDetails.dto';
const appointmentRoute = Router();

// Appointments Routes
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
    //const fromDate = new Date("2024-06-01");
    //  const toDate = new Date("2024-08-07");
    //    const customRangeAppointments = await getAppointmentsByBarberI(1, fromDate, toDate);

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

appointmentRoute.post('/appointments', async (req: Request, res: Response) => {
  const appointmentData = req.body;
  try {
    const newAppointment = await createAppointment(appointmentData);
    res.json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
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
    typesHaircuts: 2,
    customer_name: 'John Doe',
    barber_name: 'Barber A',
    shop_name: 'Shop X'
  },
  {
    appointment_time_start: new Date('2024-06-09T11:30:00'),
    typesHaircuts: 1,
    customer_name: 'Jane Smith',
    barber_name: 'Barber B',
    shop_name: 'Shop Y'
  },
  {
    appointment_time_start: new Date('2024-06-09T13:00:00'),
    typesHaircuts: 3,
    customer_name: 'Alice Johnson',
    barber_name: 'Barber C',
    shop_name: 'Shop Z'
  }
];

appointmentRoute.get('/e', async (req: Request, res: Response) => {
  try {
    const ress = await generateTimeSlotsOfDay(3, new Date('August 18, 2024 23:15:30'), appointments);

    res.json(ress);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});



export default appointmentRoute;
