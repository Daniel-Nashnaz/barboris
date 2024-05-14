import express, { Request, Response, Router } from 'express';
import { setCustomerAndAppointment } from '../services/actions.service';
import { AppointmentDataClient } from '../model/appointmentDateClient.dto';

const ActionsRoute = Router();

ActionsRoute.post('/addAppointment', async (req: Request, res: Response) => {
    const appointmentData: AppointmentDataClient = req.body;
    try {
        const newAppointment = await setCustomerAndAppointment(appointmentData);
        res.json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default ActionsRoute;
