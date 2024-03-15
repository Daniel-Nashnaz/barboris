import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import { customersRoute } from "./routes/customers.route"
const app: Express = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(customersRoute)
// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});