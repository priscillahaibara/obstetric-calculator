/* Returns a Date object based on the day, month, and year selected from dropdowns with a given prefix. */
export function getDateFromSelectors(prefix) {
  const day = Number(document.getElementById(`${prefix}-day`).value);
  const month = Number(document.getElementById(`${prefix}-month`).value);
  const year = Number(document.getElementById(`${prefix}-year`).value);

  return new Date(year, month - 1, day);
}

/*Calculates gestational age based on the last menstrual period (LMP). */
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
  const days = Math.floor(totalDays % 7);
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
  const dueDate = new Date(usgDate);
  // Remaining gestational days = 280 - age at USG, then add days passed since USG
  dueDate.setDate(dueDate.getDate() + 280 + usgAgeWeeks * 7 + usgAgeDays);
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
