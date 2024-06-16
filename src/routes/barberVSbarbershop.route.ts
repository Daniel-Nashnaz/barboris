
import { Request, Response, Router } from 'express';
import { BarberVsBarbershopsService } from '../services/barberVSbarbershop.service';

const barberBarbershopsService = new BarberVsBarbershopsService();
const barberBarbershops = Router();

barberBarbershops.post('/add', async (req: Request, res: Response) => {
    const { barberId, barbershopId } = req.body;
    try {
        await barberBarbershopsService.addBarberToBarbershop(Number(barberId), Number(barbershopId));
        res.status(201).json({ message: 'Barber added to barbershop successfully' });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Error adding barberToBarbershops', error: (error as Error).message });
    }
});

barberBarbershops.delete('/remove/:barberId/:barbershopId', async (req: Request, res: Response) => {
    const { barberId, barbershopId } = req.params;
    try {
        await barberBarbershopsService.removeBarberFromBarbershop(Number(barberId), Number(barbershopId));
        res.status(200).json({ message: 'Barber removed from barbershop successfully' });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Error deleting barberofBarbershops', error: (error as Error).message });
    }
});

export { barberBarbershops }
