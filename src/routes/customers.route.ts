import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const customersRoute = Router()
const prisma = new PrismaClient();

 //res.status(201).json(task);


// customers.controller.ts
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customers.service';
import { CustomerDto } from '../model/customers.dto';


customersRoute.get('/customers', async (req: Request, res: Response) => {
  const customers = await getAllCustomers();
  res.json(customers);
});

customersRoute.get('/customers/:id', async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.id);
  const customer = await getCustomerById(customerId);
  res.json(customer);
});

customersRoute.post('/customers', async (req: Request, res: Response) => {
  const customerData: CustomerDto = req.body;
  
  console.log(customerData);
  const newCustomer = await createCustomer(customerData);
  res.json(newCustomer);
});

customersRoute.put('/customers/:id', async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.id);
  const customerData: CustomerDto = req.body;
  const updatedCustomer = await updateCustomer(customerId, customerData);
  res.json(updatedCustomer);
});

customersRoute.delete('/customers/:id', async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.id);
  await deleteCustomer(customerId);
  res.sendStatus(204);
});


export  {customersRoute}


/*  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules --poll --respawn --exit-child src/index.ts"
  }, */