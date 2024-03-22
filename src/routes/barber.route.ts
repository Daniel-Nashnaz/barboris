import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const barberRoute = Router()
const prisma = new PrismaClient();

export  {barberRoute}


/*  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules --poll --respawn --exit-child src/index.ts"
  }, */