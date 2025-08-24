/* Returns a Date object based on the day, month, and year selected from dropdowns with a given prefix. */
export function getDateFromSelectors(prefix) {
  const day = Number(document.getElementById(`${prefix}-day`).value);
  const month = Number(document.getElementById(`${prefix}-month`).value);
  const year = Number(document.getElementById(`${prefix}-year`).value);

  return new Date(year, month - 1, day);
}

/* Calculates gestational age based on the last menstrual period (LMP). */
export function gestationalAgeFromLMP(lmpDate, currentDate) {
  // Difference in milliseconds
  const diffMs = currentDate - lmpDate;
  // Convert milliseconds to total days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // Calculate weeks and remaining days
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  return { weeks, days };
}

/* Calculates gestational age based on an ultrasound date and reported gestational age at that time. */
export function gestationalAgeFromUsg(
  usgDate,
  usgAgeWeeks,
  usgAgeDays,
  currentDate
) {
  // Days passed since the ultrasound
  const diffMs = currentDate - usgDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // Total gestational days = USG age in days + days since ultrasound
  const totalDays = usgAgeWeeks * 7 + usgAgeDays + diffDays;
  // Convert total days to weeks and remaining days
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return { weeks, days };
}

/* Calculates the estimated due date (EDD) based on the last menstrual period (LMP). */
export function calculateDueDateByLMP(lmpDate) {
  const dueDate = new Date(lmpDate);
  // Standard gestational period = 40 weeks = 280 days
  dueDate.setDate(dueDate.getDate() + 280);
  return dueDate;
}

/* Calculates the estimated due date (EDD) based on an ultrasound date and gestational age. */
export function calculateDueDateByUsg(usgDate, usgAgeWeeks, usgAgeDays) {
  const gestationalDays = usgAgeWeeks * 7 + usgAgeDays;
  // Remaining gestational days = 280 - age at USG
  const remainingDays = 280 - gestationalDays;
  const dueDate = new Date(usgDate);
  // Add remaining days to the ultrasound date
  dueDate.setDate(dueDate.getDate() + remainingDays);
  return dueDate;
}

/* Formats a Date object into a string in MM/DD/YYYY format. */
export function formatDate(date) {
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
export function validateUsgInput(usgAgeWeeks, usgAgeDays) {

  // If any value is not a number, return invalid
  if (isNaN(usgAgeWeeks) || isNaN(usgAgeDays) || !usgAgeWeeks || !usgAgeDays) {
    return { valid: false, error: 'Invalid input. Weeks or days missing.'}
  }

  // Days must be between 0 and 6
  if (usgAgeDays < 0 || usgAgeDays > 6) {
    return { valid: false, error: 'Invalid input. Days must be between 0 and 6.'}
  }

  // Weeks cannot be negative
  if (usgAgeWeeks < 0) {
    return { valid: false, error: 'Invalid input. Weeks cannot be negative.'}
  }

  // Maximum gestational age: 42 weeks
  if (usgAgeWeeks >42) {
    return { valid: false, error: 'Invalid input. Gestational age exceeds typical range.'}
  }

  // If all checks pass, it is valid
  return { valid: true }
}