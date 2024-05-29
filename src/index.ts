import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { customersRoute } from "./routes/customers.route"
import { barberRoute } from './routes/barber.route';
import appointmentRoute from './routes/appointments.route';
import ActionsRoute from './routes/actions.route';
import { barbershopRoute } from './routes/barbershop.route';
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

dotenv.config();
app.use(express.json());
app.use(barbershopRoute);
app.use(customersRoute)
app.use(barberRoute)
app.use(appointmentRoute)
app.use(ActionsRoute)
// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});