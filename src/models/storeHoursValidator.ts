import { DaysOfWeek } from "./daysOfWeek.enum";

/**
 * Interface representing the opening hours for a single period.
 */
export interface OpeningHour {
    start: string;
    end: string;
}

/**
 * Interface representing the opening hours for a single day.
 */
export interface Day {
    /**
     * Array of opening hours periods for the day.
     */
    opening_hours: OpeningHour[];
}

/**
 * Interface representing the store hours for a week.
 */
export interface StoreHours {
    [key: string]: Day;
}

/**
 * Validates if the provided data matches the StoreHours interface.
 *
 * @param data - The data to validate.
 * @returns `true` if the data matches the StoreHours interface, `false` otherwise.
 *
 * @example
 * ```typescript
 * const storeHours = {
 *   "Friday": {
 *     "opening_hours": [
 *       { "start": "08:30", "end": "14:00" }
 *     ]
 *   },
 *   "Monday": {
 *     "opening_hours": [
 *       { "start": "10:00", "end": "14:30" },
 *       { "start": "16:00", "end": "20:00" }
 *     ]
 *   }
 * };
 * 
 * console.log(validateStoreHours(storeHours)); // true
 * ```
 */
export function validateStoreHours(data: any): data is StoreHours {
    const days = Object.values(DaysOfWeek);

    if (typeof data !== "object" || data === null) {
        return false;
    }

    for (const day of days) {
        if (!data.hasOwnProperty(day)) {
            return false;
        }

        const dayData = data[day];

        if (typeof dayData !== "object" || !Array.isArray(dayData.opening_hours)) {
            return false;
        }

        for (const hours of dayData.opening_hours) {
            if (typeof hours.start !== "string" ||
                typeof hours.end !== "string" ||
                !/^\d{2}:\d{2}$/.test(hours.start) ||
                !/^\d{2}:\d{2}$/.test(hours.end) ||
                !isValidTime(hours.start) ||
                !isValidTime(hours.end)
            ) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Checks if a given time string is a valid time in HH:MM format.
 *
 * @param time - The time string to validate.
 * @returns `true` if the time string is valid, `false` otherwise.
 */
function isValidTime(time: string): boolean {
    const [hours, minutes] = time.split(":").map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
}
