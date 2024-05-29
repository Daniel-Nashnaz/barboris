export interface AppointmentDto {
    appointment_time_start: Date;
    appointment_time_end: Date;
    customer_id?: number | null;
    barber_id?: number | null;
    shop_id?: number | null;
    typesHaircuts: number
}
