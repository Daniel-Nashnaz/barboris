// customers.service.ts
import { PrismaClient, customers } from '@prisma/client';
import { CustomerDto } from '../models/customers.dto';
import { isNullOrUndefined } from '../models/validationHelpers';

const prisma = new PrismaClient();

export const getAllCustomers = async () => {
  return prisma.customers.findMany();
};

export const getCustomerById = async (customerId: number) => {
  try {
    const user = await prisma.customers.findUnique({
      where: { id: customerId },
    });
    if (isNullOrUndefined(user)) {
      throw new Error(`Customer ${customerId} not found`);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Finds a customer by their email address.
 * @param email The email address of the customer to find.
 * @returns A Promise that resolves with the found customer or null if not found.
 * @throws Error if an error occurs while finding the customer.
 */
export const findCustomerByEmail = async (email: string): Promise<customers | null> => {
  try {
    const customer = await prisma.customers.findUnique({
      where: {
        email: email,
      },
    });
    return customer;
  } catch (error) {
    throw new Error(`Error finding customer by email: ${error}`);
  }
};

export const createCustomer = async (customerData: CustomerDto) => {
  return prisma.customers.create({
    data: customerData,
  });
};

export const updateCustomer = async (customerId: number, customerData: CustomerDto) => {
  try {
    const existingCustomer = await prisma.customers.findUnique({
      where: { id: customerId },
    });

    if (!existingCustomer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const updatedCustomerData = {
      ...customerData,
      updated_at: new Date()
    };

    const updatedCustomer = await prisma.customers.update({
      where: { id: customerId },
      data: updatedCustomerData,
    });

    return updatedCustomer;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomer = async (customerId: number) => {
  try {
    const deletedCustomer = await prisma.customers.delete({
      where: { id: customerId },
    });
    console.log(deletedCustomer);

    if (isNullOrUndefined(deletedCustomer)) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    return deletedCustomer;
  } catch (error) {
    throw error;
  }
};
