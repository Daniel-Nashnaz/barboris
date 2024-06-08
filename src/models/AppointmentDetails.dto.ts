import { DateTime } from "luxon";

export interface AppointmentDetails {
    appointment_time_start: any;
    typesHaircuts: number;
    customer_name?: string;
    barber_name?: string;
    shop_name?: string;
}
