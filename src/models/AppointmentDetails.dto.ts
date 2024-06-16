import { DateTime } from "luxon";
import { HaircutType } from "./typesHaircuts.enum";

export interface AppointmentDetails {
    appointment_time_start: any;
    haircut_type?: HaircutType[];
    customer_name?: string;
    barber_name?: string;
    shop_name?: string;
}
