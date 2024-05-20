import express, { Request, Response, Router } from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
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

const appointme : Appointmen[] = [
  {
    appointment_time_start: "2024-05-14T18:00:00.000Z",
    appointment_time_end: "2024-05-14T18:30:00.000Z"

  }
  ,
  {
    appointment_time_start: "2024-05-15T12:00:00.000Z",
    appointment_time_end: "2024-05-14T12:30:00.000Z",
  }
  ,
  {
    appointment_time_start: "2024-05-15T15:00:00.000Z",
    appointment_time_end: "2024-05-14T15:30:00.000Z",
  }
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
interface Appointmen {
  appointment_time_start: string;
  appointment_time_end: string;
}
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


const generateTimeSlots = async (startTime: Date, endTime: Date, appointments: Appointmen[]): Promise<string[]> => {
  const timeSlots: string[] = [];
  const timeIncrement: number = 30; 
  let currentTime: Date = new Date(startTime);
  const endDateTime: Date = new Date(endTime);

  const getHourAndMinute = (date: Date): string => {
      const isoString: string = date.toISOString();
      return isoString.slice(11, 16); 
  };

  const appointmentStartTimes: Set<string> = new Set(appointments.map(appointment => getHourAndMinute(new Date(appointment.appointment_time_start))));

  while (currentTime <= endDateTime) {
      const timeString: string = getHourAndMinute(currentTime);

      if (!appointmentStartTimes.has(timeString)) {
          timeSlots.push(timeString);
      }

      currentTime = new Date(currentTime.getTime() + timeIncrement * 60 * 1000); 
  }

  return timeSlots;
};



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
    //const appointments = await getAppointmentsOnDateTime(date); // Fetch appointments for the day
   // console.log(appointme);
    const timeSlots = await generateTimeSlots(new Date(startTime), new Date(endTime), appointme);
    res.json(timeSlots);

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
export default appointmentRoute;
