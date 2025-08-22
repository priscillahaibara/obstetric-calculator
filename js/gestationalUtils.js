/**
 * Returns a Date object based on the day, month, and year
 * selected from dropdowns with a given prefix.
 *
 * @param {string} prefix - The prefix of the select elements ('current', 'lmp', 'usg').
 * @returns {Date} - The constructed Date object.
 */
export function getDateFromSelectors(prefix) {
  const day = Number(document.getElementById(`${prefix}-day`).value);
  const month = Number(document.getElementById(`${prefix}-month`).value);
  const year = Number(document.getElementById(`${prefix}-year`).value);

  // Months in JS Date are zero-indexed (0 = January)
  return new Date(year, month - 1, day);
}

/**
 * Calculates gestational age based on the last menstrual period (LMP).
 *
 * @param {Date} lmpDate - Date of the last menstrual period.
 * @param {Date} currentDate - Current date to calculate age from.
 * @returns {{weeks: number, days: number}} - Gestational age in weeks and days.
 */
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

/**
 * Calculates gestational age based on an ultrasound date and reported gestational age at that time.
 *
 * @param {Date} usgDate - Date of the ultrasound.
 * @param {number} usgAgeWeeks - Gestational age in weeks at the time of ultrasound.
 * @param {number} usgAgeDays - Additional gestational days at the time of ultrasound.
 * @param {Date} currentDate - Current date to calculate age from.
 * @returns {{weeks: number, days: number}} - Gestational age in weeks and days.
 */
export function gestationalAgeFromUsg(usgDate, usgAgeWeeks, usgAgeDays, currentDate) {
  // Days passed since the ultrasound
  const diffMs = currentDate - usgDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Total gestational days = USG age in days + days since ultrasound
  const totalDays = usgAgeWeeks * 7 + usgAgeDays + diffDays;

  // Convert total days to weeks and remaining days
  const weeks = Math.floor(totalDays / 7);
  const days = Math.floor(totalDays % 7);

  return { weeks, days };
}

/**
 * Calculates the estimated due date (EDD) based on the last menstrual period (LMP).
 *
 * @param {Date} lmpDate - Date of the last menstrual period.
 * @returns {Date} - Estimated due date (LMP + 280 days).
 */
export function calculateDueDateByLMP(lmpDate) {
  const dueDate = new Date(lmpDate);

  // Standard gestational period = 40 weeks = 280 days
  dueDate.setDate(dueDate.getDate() + 280);

  return dueDate;
}

/**
 * Calculates the estimated due date (EDD) based on an ultrasound date and gestational age.
 *
 * @param {Date} usgDate - Date of the ultrasound.
 * @param {number} usgAgeWeeks - Gestational age in weeks at the time of ultrasound.
 * @param {number} usgAgeDays - Additional gestational days at the time of ultrasound.
 * @returns {Date} - Estimated due date.
 */
export function calculateDueDateByUSG(usgDate, usgAgeWeeks, usgAgeDays) {
  const dueDate = new Date(usgDate);

  // Remaining gestational days = 280 - age at USG, then add days passed since USG
  dueDate.setDate(dueDate.getDate() + 280 + usgAgeWeeks * 7 + usgAgeDays);

  return dueDate;
}

/**
 * Formats a Date object into a string in MM/DD/YYYY format.
 *
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted date string.
 */
export function formatDate(date) {
  // Pad day and month to always have two digits
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
