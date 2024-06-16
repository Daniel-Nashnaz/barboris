import express, { Request, Response, Router } from 'express';
import {  getUserRoleByEmail, setCustomerAndAppointment } from '../services/actions.service';
import { AppointmentDataClient } from '../models/appointmentDateClient.dto';

const ActionsRoute = Router();

ActionsRoute.post('/addAppointment', async (req: Request, res: Response) => {
    try {
        const appointmentData: AppointmentDataClient = req.body;
        console.log(appointmentData);
        const newAppointment = await setCustomerAndAppointment(appointmentData);
        res.json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

ActionsRoute.get('/getUserRole/:email', async (req: Request, res: Response) => {
    try {
        const email = String(req.params.email);
        console.log(email);
        const userRoleDate = await getUserRoleByEmail(email);
        res.json(userRoleDate);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default ActionsRoute;
