/**
 * Helper functions for working with date strings in ISO format.
 */

/**
 * Given a date string (yyyy-mm-dd), return the corresponding month string
 * (yyyy-mm). Returns the first seven characters.
 */
export function getMonth(date: string): string {
  return date.slice(0, 7);
}

/**
 * Check whether a date string belongs to a particular month (yyyy-mm).
 */
export function isSameMonth(date: string, month: string): boolean {
  return getMonth(date) === month;
}