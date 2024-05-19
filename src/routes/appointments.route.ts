import express, { Request, Response, Router } from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsForDate,
} from '../services/appointments.service';
import moment from "moment";
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
appointmentRoute.get('/appointments/test', async (req: Request, res: Response) => {
  try {
    console.log("asas");
    const appointments = await getAppointmentsForDate(req.body.date);
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

const appointme = [
  {
    id: 6,
    appointment_time_start: "2024-05-14T16:00:00.000Z",
    appointment_time_end: "2024-05-14T16:30:00.000Z",
    customer_id: 2,
    barber_id: 1,
    shop_id: 1,
    created_at: "2024-05-14T17:20:08.433Z",
    updated_at: null,
    typesHaircuts: 2
  }, {
    id: 6,
    appointment_time_start: "2024-05-15T17:00:00.000Z",
    appointment_time_end: "2024-05-14T17:30:00.000Z",
    customer_id: 2,
    barber_id: 1,
    shop_id: 1,
    created_at: "2024-05-19T17:20:08.433Z",
    updated_at: null,
    typesHaircuts: 2
  },
  // פגישות נוספות כאן...
];


/*
function generateTimeSlots(startTime:any, endTime: any  ) {
  const timeSlots = [];
  let currentTime = new Date(startTime);

  // Convert start and end time strings to Date objects
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Loop until current time is less than end time
  while (currentTime < endDate) {
      // Add current time to time slots if it's not within any appointment
      const isWithinAppointment = appointments.some(appointmen => {
          const appointmentStart = new Date(appointmen.appointment_time_start);
          const appointmentEnd = new Date(appointmen.appointment_time_end);
          return currentTime >= appointmentStart && currentTime < appointmentEnd;
      }) 
      if (!isWithinAppointment) {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        timeSlots.push(timeString);
    }

      // Move to the next time slot (30 minutes later)
      currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
  }

  return timeSlots;
}

async function getAppointmentsOnDateTime(dateTime:any) {
    try {
        const date = new Date(dateTime);
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000); // Next day

        const appointments = await prisma.appointments.findMany({
            where: {
                AND: [
                    {
                        appointment_time_start: {
                            gte: startOfDay,
                        },
                    },
                    {
                        appointment_time_start: {
                            lt: endOfDay,
                        },
                    },
                ],
            },
            select: {
              appointment_time_start: true,
          },
        });
        return appointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
}
*/

interface Appointment {
  appointment_time_start: Date;
  appointment_time_end: Date;
}
/*
const generateTimeSlots = async (startTime: string, endTime: string, appointments: Appointment[]): Promise<string[]> => {
  const timeSlots = [];
  let currentTime = new Date(startTime);
  // Convert start and end time strings to Date objects
  const endDate = new Date(endTime);
  // Loop until current time is less than end time
  while (currentTime < endDate) {
    // Add current time to time slots if it's not within any appointment
    const isWithinAppointment = appointments.some(appointment => {
      const appointmentStart = new Date(appointment.appointment_time_start);
      const appointmentEnd = new Date(appointment.appointment_time_end);
      return currentTime >= appointmentStart && currentTime < appointmentEnd;
    })
    if (!isWithinAppointment) {
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      timeSlots.push(timeString);
    }

    // Move to the next time slot (30 minutes later)
    currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
  }

  return timeSlots;
}
*/
const generateTimeSlots = async (startTime: string, endTime: string, appointments: Appointment[]): Promise<string[]> => {
  const timeSlots = [];
  let currentTime = new Date(startTime);
  const endDate = new Date(endTime);

  // Sort appointments by start time
  appointments.sort((a, b) => new Date(a.appointment_time_start).getTime() - new Date(b.appointment_time_start).getTime());

  for (const appointment of appointments) {
    const appointmentEnd = new Date(appointment.appointment_time_end);
    // Move to the next available time slot after the appointment
    currentTime = new Date(appointmentEnd.getTime() + 30 * 60 * 1000);
  }

  // Generate available time slots
  while (currentTime < endDate) {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    timeSlots.push(timeString);

    // Move to the next time slot (30 minutes later)
    currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
  }

  return timeSlots;
}

const getAppointmentsOnDateTime = async (dateTime: string): Promise<Appointment[]> => {

  try {
    const date = new Date(dateTime);
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000); // Next day

    const appointments = await prisma.appointments.findMany({
      where: {
        AND: [
          {
            appointment_time_start: {
              gte: startOfDay,
            },
          },
          {
            appointment_time_start: {
              lt: endOfDay,
            },
          },
        ],
      },
      select: {
        appointment_time_start: true,
        appointment_time_end: true,
      },
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}




appointmentRoute.get('/availableSlots/:date', async (req: Request, res: Response) => {
  try {
     const { date } = req.params;
    //const appointments = await getAppointmentsOnDateTime(date);

    //const availableSlots = getAvailableSlots(date);
    //res.json(appointments);

    // Example usage:
    const startTime = "2024-05-20T08:00:00Z"; // Example start time
    const endTime = "2024-05-20T17:00:00Z"; // Example end time
    const appointments = await getAppointmentsOnDateTime(date); // Fetch appointments for the day
    const timeSlots = await generateTimeSlots(startTime, endTime, appointments);
    console.log(appointments);
    res.json(timeSlots);

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
export default appointmentRoute;
