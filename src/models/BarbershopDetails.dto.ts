import { Prisma } from '@prisma/client';



export interface BarbershopDetails {
    id: number;
    name: string;
    address: string;
    city: string;
    phone_number?: string | null;
    opening_hours: Prisma.InputJsonValue | Prisma.JsonValue | Prisma.JsonNullValueInput | any;
    manager_id?: number | null;
}
