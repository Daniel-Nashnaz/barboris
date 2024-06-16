import { HaircutType } from "./typesHaircuts.enum";

export interface AppointmentDataClient {
  barbershopId: number;
  barberId: number;
  timeStart: Date;
  timeEnd: Date;
  haircutType?: HaircutType[];
  name: string;
  email: string;
  phone: string;
}