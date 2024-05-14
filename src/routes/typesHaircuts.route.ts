// import { Router, Request, Response } from 'express';
// import {
//   getAllTypesHaircuts,
//   findTypesHaircutsByAppointmentId,
//   createTypeHaircut,
//   updateTypeHaircut,
//   deleteTypeHaircut,
// } from '../services/typesHaircuts.service';
// import { typesHaircutsDto } from '../model/typesHaircuts.dto';

// const typesHaircutsRoute = Router();

// // Get all types of haircuts
// typesHaircutsRoute.get('/types-haircuts', async (req: Request, res: Response) => {
//   try {
//     const typesHaircuts = await getAllTypesHaircuts();
//     res.status(200).json(typesHaircuts);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching types of haircuts', error: (error as Error).message });
//   }
// });

// // Get types of haircuts by appointment ID
// typesHaircutsRoute.get('/typesHaircutsByAppointmentId/:id', async (req: Request, res: Response) => {
//   try {
//     const appointmentId = parseInt(req.params.id);
//     const typesHaircuts = await findTypesHaircutsByAppointmentId(appointmentId);
//     res.status(200).json(typesHaircuts);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching types of haircuts by appointment ID', error: (error as Error).message });
//   }
// });

// // Create a new type of haircut
// typesHaircutsRoute.post('/types-haircuts', async (req: Request, res: Response) => {
//   try {
//     const typesHaircutData: typesHaircutsDto = req.body;
//     const newTypeHaircut = await createTypeHaircut(typesHaircutData);
//     res.status(201).json(newTypeHaircut);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating type of haircut', error: (error as Error).message });
//   }
// });

// // Update a type of haircut
// typesHaircutsRoute.put('/types-haircuts/:id', async (req: Request, res: Response) => {
//   try {
//     const typesHaircutId: number = parseInt(req.params.id);
//     const typesHaircutData: typesHaircutsDto = req.body;
//     const updatedTypeHaircut = await updateTypeHaircut(typesHaircutId, typesHaircutData);
//     res.status(200).json(updatedTypeHaircut);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating type of haircut', error: (error as Error).message });
//   }
// });

// // Delete a type of haircut
// typesHaircutsRoute.delete('/types-haircuts/:id', async (req: Request, res: Response) => {
//   try {
//     const typesHaircutId: number = parseInt(req.params.id);
//     await deleteTypeHaircut(typesHaircutId);
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting type of haircut', error: (error as Error).message });
//   }
// });

// export { typesHaircutsRoute };
