import { HaircutType } from "./typesHaircuts.enum";

export interface AppointmentDto {
    appointment_time_start: Date;
    appointment_time_end: Date;
    customer_id?: number;
    barber_id?: number;
    shop_id?: number;
    haircut_type?: HaircutType[]
}
