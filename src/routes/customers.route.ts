import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customers.service';
import { CustomerDto } from '../model/customers.dto';

const customersRoute = Router()
const prisma = new PrismaClient();

// get all customers from db 
customersRoute.get('/customers', async (req: Request, res: Response) => {
  const customers = await getAllCustomers();
  res.status(200).json(customers);
});

// get customer by id from db 
customersRoute.get('/customers/:id', async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.id);
    const customer = await getCustomerById(customerId);
    res.json(customer);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching customer', error: (error as Error).message });
}

});

// add customer of db 
customersRoute.post('/customers', async (req: Request, res: Response) => {
  const customerData: CustomerDto = req.body;
  const newCustomer = await createCustomer(customerData);
  res.json(newCustomer);
});

// update customer in db 
customersRoute.put('/customers/:id', async (req: Request, res: Response) => {
  try {
    const customerId: number = parseInt(req.params.id);
    const customerData: CustomerDto = req.body;
    const updatedCustomer = await updateCustomer(customerId, customerData);
    res.json(updatedCustomer);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching customer', error: (error as Error).message });
}
});

// delete customer in db 
customersRoute.delete('/customers/:id', async (req: Request, res: Response) => {
  try {
    console.log("asasas");

  const customerId = parseInt(req.params.id);
  await deleteCustomer(customerId);
  res.sendStatus(204).json(`delete customer ${customerId} successfully`);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching customer', error: (error as Error).message });
}
});

export { customersRoute }