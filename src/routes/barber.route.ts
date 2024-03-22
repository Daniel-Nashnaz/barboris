import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const barberRoute = Router()
const prisma = new PrismaClient();

export  {barberRoute}

