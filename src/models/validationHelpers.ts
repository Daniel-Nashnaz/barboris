/**
 * Checks if a value is null or undefined.
 * @param value The value to check.
 * @returns True if the value is null or undefined, otherwise false.
 */
export const isNullOrUndefined = (value: any): boolean => {
    return value === null || value === undefined;
}
