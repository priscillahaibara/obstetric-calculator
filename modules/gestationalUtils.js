// modules/gestationalUtils.js

/** Helper para obter Date a partir de campos de input */
export function getDateFromSelectors(prefix) {
  const day = parseInt(document.querySelector(`#${prefix}-day`).value, 10);
  const month = parseInt(document.querySelector(`#${prefix}-month`).value, 10);
  const year = parseInt(document.querySelector(`#${prefix}-year`).value, 10);
  return new Date(year, month - 1, day);
}

/** Calcula idade gestacional a partir da DUM */
export function gestationalAgeFromLMP(lmpDate, currentDate) {
  const diffMs = currentDate - lmpDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  return { weeks, days };
}

/** Calcula idade gestacional a partir de USG + data atual */
export function gestationalAgeFromUSG(usgDate, usgAgeWeeks, usgAgeDays, currentDate) {
  const diffMs = currentDate - usgDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalDays = usgAgeWeeks * 7 + usgAgeDays + diffDays;
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return { weeks, days };
}

/** Calcula DPP a partir da DUM */
export function calculateDueDateByLMP(lmpDate) {
  const dueDate = new Date(lmpDate);
  dueDate.setDate(dueDate.getDate() + 280);
  return dueDate;
}

/** Calcula DPP a partir do USG */
export function calculateDueDateByUSG(usgDate, usgAgeWeeks, usgAgeDays) {
  const gestationalDays = usgAgeWeeks * 7 + usgAgeDays;
  const remainingDays = 280 - gestationalDays;
  const dueDate = new Date(usgDate);
  dueDate.setDate(dueDate.getDate() + remainingDays);
  return dueDate;
}

/** Formata Date como MM/DD/YYYY */
export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
