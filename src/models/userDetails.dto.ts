import { UserIds, UserRole } from "./userRoles.enum";

/**
 * Represents a user with associated information.
 */
export interface User {
    /**
     * An object containing the user's ID for different roles.
     * Keys represent different user roles, and values represent the user's ID for that role.
     */
    id: Partial<{
        [key in UserIds]: number[];
    }>;
    name: string;
    email: string;
    phone: string | null;
    roles: UserRole[];
}
