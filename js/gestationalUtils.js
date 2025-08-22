export function getDateFromSelectors(prefix) {
  const day = Number(document.getElementById(`${prefix}-day`).value);
  const month = Number(document.getElementById(`${prefix}-month`).value);
  const year = Number(document.getElementById(`${prefix}-year`).value);

  return new Date(year, month - 1, day);
}

export function gestationalAgeFromLMP(lmpDate, currentDate) {
  const diffMs = currentDate - lmpDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  return { weeks, days };
}

export function gestationalAgeFromUsg(usgDate, usgAgeWeeks, usgAgeDays, currentDate) {
  const diffMs = currentDate - usgDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalDays = usgAgeWeeks * 7 + usgAgeDays + diffDays;
  const weeks = Math.floor(totalDays / 7);
  const days = Math.floor(totalDays % 7);
  return { weeks, days };
}

export function calculateDueDateByLMP(lmpDate) {
  const dueDate = new Date(lmpDate);
  dueDate.setDate(dueDate.getDate() + 280);
  return dueDate;
}

export function calculateDueDateByUsg(usgDate, usgAgeWeeks, usgAgeDays) {
  const dueDate = new Date(usgDate);
  dueDate.setDate(dueDate.getDate() + 280 + usgAgeWeeks * 7 + usgAgeDays)
  return dueDate;
}

export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}