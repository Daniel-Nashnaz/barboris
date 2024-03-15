// customers.service.ts
import { PrismaClient } from '@prisma/client';
import { CustomerDto } from '../model/customers.dto';

const prisma = new PrismaClient();

export const getAllCustomers = async () => {
  return prisma.customers.findMany();
};

export const getCustomerById = async (customerId: number) => {
  return prisma.customers.findUnique({
    where: { id: customerId },
  });
};

export const createCustomer = async (customerData: CustomerDto) => {
  return prisma.customers.create({
    data: customerData,
  });
};

export const updateCustomer = async (customerId: number, customerData: CustomerDto) => {
  return prisma.customers.update({
    where: { id: customerId },
    data: customerData,
  });
};

export const deleteCustomer = async (customerId: number) => {
  return prisma.customers.delete({
    where: { id: customerId },
  });
};
