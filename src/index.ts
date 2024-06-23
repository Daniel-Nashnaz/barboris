import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { customersRoute } from "./routes/customers.route"
import { barberRoute } from './routes/barber.route';
import appointmentRoute from './routes/appointments.route';
import ActionsRoute from './routes/actions.route';
import { barbershopRoute } from './routes/barbershop.route';
import { barberBarbershops } from './routes/barberVSbarbershop.route';
const app: Express = express();
const PORT = process.env.PORT || 3000;
const IP = process.env.IP || "localhost"

const corsOptions = {
  origin: 'http://127.0.0.1:5501', // או אתר הדפדפן שלך
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

dotenv.config();
app.use(express.json());
app.use('/barbershop', barbershopRoute);
app.use('/customer', customersRoute)
app.use('/barber', barberRoute)
app.use(appointmentRoute)
app.use(ActionsRoute)
app.use('/barberVsBarbershops', barberBarbershops)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my barboris server!');
});
// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://${IP}:${PORT}`);
});