// customers.service.ts
import { PrismaClient } from '@prisma/client';
import { CustomerDto } from '../model/customers.dto';
import { isNullOrUndefined } from 'util';

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

export const createCustomer = async (customerData: CustomerDto) => {
  return prisma.customers.create({
    data: customerData,
  });
};

export const updateCustomer = async (customerId: number, customerData: CustomerDto) => {
 /* const updatedCustomerData = {
    ...customerData,
    updated_at: new Date()
  };
  return prisma.customers.update({
    where: { id: customerId },
    data: updatedCustomerData,
  });
*/

  try {
    const existingCustomer = await prisma.customers.findUnique({
      where: { id: customerId },
    });

    if (!existingCustomer) {
      // Handle the case where the customer is not found in the database
      // For example, you could choose to create a new customer entry
      // Or log a message and return null
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
      // Handle the case where the customer is not found in the database
      // For example, you could choose to create a new customer entry
      // Or log a message and return null
      console.log("asasas");
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    return deletedCustomer;
  } catch (error) {
    throw error;
  }
};
