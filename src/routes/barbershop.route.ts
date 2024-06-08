import { Router, Request, Response } from 'express';
import { createBarbershop, deleteBarbershop, getAllBarbershops, getBarbershopById, getOpeningHoursForDay, updateBarbershop } from '../services/barbershop.service';
import { DaysOfWeek } from '../models/daysOfWeek.enum';
const barbershopRoute = Router()

// Get all barbershops
barbershopRoute.get('/barbershops', async (req: Request, res: Response) => {
    try {
        const barbershops = await getAllBarbershops();
        res.json(barbershops);
    } catch (error: unknown) {
        console.error('Error fetching all barbershops:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific barbershop by ID
barbershopRoute.get('/barbershop/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const barbershop = await getBarbershopById(id);
        if (!barbershop) {
            return res.status(404).json({ message: `Barbershop with ID ${id} not found` });
        }
        return res.status(200).json(barbershop);
    } catch (error: unknown) {
        console.error('Error fetching barbershop by ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new barbershop
barbershopRoute.post('/barbershop', async (req: Request, res: Response) => {
    try {
        const barbershopData = req.body;
        const createdBarbershop = await createBarbershop(barbershopData);
        return res.status(201).json(createdBarbershop);
    } catch (error: unknown) {
        console.error('Error creating barbershop:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing barbershop
barbershopRoute.put('/barbershop/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const barbershopData = req.body;
        const updatedBarbershop = await updateBarbershop(id, barbershopData);
        if (!updatedBarbershop) {
            return res.status(404).json({ message: `Barbershop with ID ${id} not found` });
        }
        return res.status(200).json(updatedBarbershop);
    } catch (error: unknown) {
        console.error('Error updating barbershop:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a barbershop by ID
barbershopRoute.delete('/barbershop/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const deletedBarbershop = await deleteBarbershop(id);
        if (!deletedBarbershop) {
            return res.status(404).json({ message: `Barbershop with ID ${id} not found` });
        }
        return res.status(200).json(deletedBarbershop);
    } catch (error: unknown) {
        console.error('Error deleting barbershop:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get opening hours for a specific day of the week for a barbershop
barbershopRoute.get('/barbershops/:id/opening-hours/:day', async (req: Request, res: Response) => {
    const { id, day } = req.params;
    try {
        const openingHours = await getOpeningHoursForDay(Number(id), day as DaysOfWeek);
        if (!openingHours) {
            return res.status(404).json({ message: `Opening hours not found for barbershop with ID ${id} on ${day}` });
        }
        return res.status(200).json(openingHours);
    } catch (error: unknown) {
        console.error('Error fetching barbershop opening hours by ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


export { barbershopRoute }