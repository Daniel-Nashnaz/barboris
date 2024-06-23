import { Request, Response, Router } from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsAvailable,
  getAllAppointmentsOfUser,
  getAllAppointmentsOfBarber,
  getAllAppointmentsOfBarbershop,
  getAppointmentsByBarberIdAndBarbershopIdAndDateRange,
} from '../services/appointments.service';
const appointmentRoute = Router();


appointmentRoute.get('/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.get('/appointmentsByDateRangeAndBarberIdAndBarbershopId', async (req: Request, res: Response) => {
  try {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const barberId = req.query.barberId as string;
    const barbershopId = req.query.barbershopId as string;
    console.log(startDate);
    console.log(endDate);
    console.log(barberId);
    console.log(barbershopId);
    if (!startDate || !endDate || !barberId || !barbershopId) {
      return res.status(400).json({ error: 'startDate endtDate and barberId and barbershopId are required' });
    }
    const appointments = await getAppointmentsByBarberIdAndBarbershopIdAndDateRange(parseInt(barberId, 10), parseInt(barbershopId, 10), new Date(startDate), new Date(endDate));
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.get('/appointmentsByBarberId', async (req: Request, res: Response) => {
  try {
    const barberId = req.query.barberId as string;
    if (!barberId) {
      return res.status(400).json({ error: 'BarberId are required' });
    }
    const appointments = await getAllAppointmentsOfBarber(parseInt(barberId, 10));
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.get('/appointmentsByBarbershopId', async (req: Request, res: Response) => {
  try {
    const barbershopId = req.query.barbershopId as string;
    if (!barbershopId) {
      return res.status(400).json({ error: 'BarbershopId are required' });
    }
    const appointments = await getAllAppointmentsOfBarbershop(parseInt(barbershopId, 10));
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

appointmentRoute.get('/appointmentsByUserId', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: 'UserId are required' });
    }
    const appointments = await getAllAppointmentsOfUser(parseInt(userId, 10));
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

appointmentRoute.get('/availableSlots', async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string;
    const barberId = req.query.barberId as string;
    const barbershopId = req.query.barbershopId as string;

    if (!date || !barberId || !barbershopId) {
      return res.status(400).json({ error: 'Both date and barberId and barbershopId are required' });
    }
    const appointmentsAvailable: string[] = await getAppointmentsAvailable(Number(barberId), Number(barbershopId), new Date(date));
    res.json(appointmentsAvailable);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


export default appointmentRoute;
