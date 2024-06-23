import { BarbershopDetails } from "./BarbershopDetails.dto";
import { BarberDto } from "./barbers.dto";
import { CustomerDto } from "./customers.dto";
import { HaircutType } from "./typesHaircuts.enum";

export interface DetailedAppointmentInfo {
    appointment_time_start: any;
    appointment_time_end: any;
    haircut_type?: HaircutType[];
    customer?: CustomerDto | null;
    barber?: BarberDto | null;
    shop?: BarbershopDetails | null;
}

