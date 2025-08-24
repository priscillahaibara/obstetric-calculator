type validationResult = {
  valid: boolean;
  error?: string;
}

type GestationalAge = {
  weeks: number,
  days: number
}

/* Constants */
const MAX_WEEKS = 42; 
const MAX_DAYS = 6; 
const GESTATIONAL_PERIOD = 280;

/* Returns a Date object based on the day, month, and year selected from dropdowns with a given prefix. */
export function getDateFromSelectors(prefix: string): Date {
  const dayEl = document.getElementById(`${prefix}-day`) as HTMLSelectElement;
  const monthEl = document.getElementById(`${prefix}-month`) as HTMLSelectElement;
  const yearEl = document.getElementById(`${prefix}-year`) as HTMLSelectElement;

  const day = Number(dayEl.value);
  const month = Number(monthEl.value);
  const year = Number(yearEl.value);

  return new Date(year, month - 1, day);
}

/* Calculates gestational age based on the last menstrual period (LMP). */
export function gestationalAgeFromLMP(lmpDate: Date, currentDate: Date): GestationalAge {
  // Difference in milliseconds
  const diffMs = currentDate.getTime() - lmpDate.getTime();
  // Convert milliseconds to total days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // Calculate weeks and remaining days
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  return { weeks, days };
}

/* Calculates gestational age based on an ultrasound date and reported gestational age at that time. */
export function gestationalAgeFromUsg(
  usgDate: Date,
  usgAgeWeeks: number,
  usgAgeDays: number,
  currentDate: Date
): GestationalAge {
  // Days passed since the ultrasound
  const diffMs = currentDate.getTime() - usgDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // Total gestational days = USG age in days + days since ultrasound
  const totalDays = usgAgeWeeks * 7 + usgAgeDays + diffDays;
  // Convert total days to weeks and remaining days
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return { weeks, days };
}

/* Calculates the estimated due date (EDD) based on the last menstrual period (LMP). */
export function calculateDueDateByLMP(lmpDate: Date): Date {
  const dueDate = new Date(lmpDate);
  // Standard gestational period = 40 weeks = 280 days
  dueDate.setDate(dueDate.getDate() + 280);
  return dueDate;
}

/* Calculates the estimated due date (EDD) based on an ultrasound date and gestational age. */
export function calculateDueDateByUsg(usgDate: Date, usgAgeWeeks: number, usgAgeDays: number): Date {
  const gestationalDays = usgAgeWeeks * 7 + usgAgeDays;
  // Remaining gestational days = 280 - age at USG
  const remainingDays = GESTATIONAL_PERIOD - gestationalDays;
  const dueDate = new Date(usgDate);
  // Add remaining days to the ultrasound date
  dueDate.setDate(dueDate.getDate() + remainingDays);
  return dueDate;
}

/* Formats a Date object into a string in MM/DD/YYYY format. */
export function formatDate(date: Date): string {
  // Pad day and month to always have two digits
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

/* Validates ultrasound input values.
 * Ensures weeks and days are within realistic ranges:
 * - Weeks: 0–42
 * - Days: 0–6
 */
export function validateUsgInput(usgAgeWeeks: number, usgAgeDays: number): validationResult {

  // Days must be between 0 and 6
  if (usgAgeDays < 0 || usgAgeDays > MAX_DAYS) {
    return { valid: false, error: `Invalid input. Days must be between 0 and ${MAX_DAYS}.`}
  }

  // Weeks cannot be negative
  if (usgAgeWeeks < 0) {
    return { valid: false, error: 'Invalid input. Weeks cannot be negative.'}
  }

  // Maximum gestational age: 42 weeks
  if (usgAgeWeeks > MAX_WEEKS) {
    return { valid: false, error: `Invalid input. Weeks cannot exceed ${MAX_WEEKS}.`}
  }

  // If all checks pass, it is valid
  return { valid: true }
}