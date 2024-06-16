import { Router, Request, Response } from 'express';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomerByEmail,
} from '../services/customers.service';
import { CustomerDto } from '../models/customers.dto';

const customersRoute = Router()

customersRoute.get('/customers', async (req: Request, res: Response) => {
  const customers = await getAllCustomers();
  res.status(200).json(customers);
});

customersRoute.get('/customerById/:id', async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.id);
    const customer = await getCustomerById(customerId);
    res.json(customer);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching customer', error: (error as Error).message });
  }

});

customersRoute.get('/customerByEmail/:email', async (req: Request, res: Response) => {
  try {
    const email = String(req.params.email);
    const customer = await findCustomerByEmail(email);
    res.json(customer);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching customer', error: (error as Error).message });
  }

});

customersRoute.post('/customers', async (req: Request, res: Response) => {
  const customerData: CustomerDto = req.body;
  const newCustomer = await createCustomer(customerData);
  res.json(newCustomer);
});

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

customersRoute.delete('/customers/:id', async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.id);
    await deleteCustomer(customerId);
    res.sendStatus(204).json(`delete customer ${customerId} successfully`);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching customer', error: (error as Error).message });
  }
});

export { customersRoute }