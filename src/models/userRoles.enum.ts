export enum UserRole {
    CUSTOMER = "Customer",
    BARBER = "Barber",
    ADMIN = "Admin",
    MASTER = "Master",
}
export enum UserIds {
    CUSTOMER_ID = "CustomerId",
    BARBER_ID = "BarberId",
    BARBERSHOPS_ID = "BarbershopIdThatAdmin",
}

// Example usage:
const userRole: UserRole = UserRole.BARBER;
//console.log(userRole); // Output: Barber