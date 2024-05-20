import express, { Request, Response, Router } from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsAvailable,
  getAppointmentsForDate,
} from '../services/appointments.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

appointmentRoute.get('/appointmentsByDate', async (req: Request, res: Response) => {
  try {
    // Check if the date is of type string. If it is, use it; otherwise, use undefined
    const date = typeof req.query.data === 'string' ? req.query.data : undefined;
    const appointments = await getAppointmentsForDate(date);
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

// const appointme : Appointmen[] = [
//   {
//     appointment_time_start: "2024-05-14T18:00:00.000Z",
//     appointment_time_end: "2024-05-14T18:30:00.000Z"

//   }
//   ,
//   {
//     appointment_time_start: "2024-05-15T12:00:00.000Z",
//     appointment_time_end: "2024-05-14T12:30:00.000Z",
//   }
//   ,
//   {
//     appointment_time_start: "2024-05-15T15:00:00.000Z",
//     appointment_time_end: "2024-05-14T15:30:00.000Z",
//   }
// ];

appointmentRoute.get('/availableSlots/:date', async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const appointmentsAvailable = await getAppointmentsAvailable(date);
    res.json(appointmentsAvailable);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
export default appointmentRoute;
