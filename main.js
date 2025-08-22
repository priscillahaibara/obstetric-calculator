import { selectGestationalAgeCriteria } from "./js/selectGestationalAgeCriteria.js";
import { setupDateSelectorByPrefix } from "./js/dateSelectors.js";

// === main.js ===
// Main entry point: initializes the calculator UI and interactive components.

// 1) Setup gestational age criteria dropdown
// Shows/hides fields depending on the selected criteria (LMP or ultrasound)
selectGestationalAgeCriteria();

// 2) Setup date selectors for current, LMP, and ultrasound dates
// Populates month/day/year selects and updates days when month/year changes
// Optionally sets the current date if `useCurrentDate` is true
setupDateSelectorByPrefix("current", true);
setupDateSelectorByPrefix("lmp");
setupDateSelectorByPrefix("usg");

const calculatorButton = document.querySelector(".calculator__button");

function getDateFromSelectors(prefix) {
  const day = Number(document.getElementById(`${prefix}-day`).value);
  const month = Number(document.getElementById(`${prefix}-month`).value);
  const year = Number(document.getElementById(`${prefix}-year`).value);

  return new Date(year, month - 1, day);
}

function gestationalAgeFromLMP(lmpDate, currentDate) {
  const diffMs = currentDate - lmpDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  return { weeks, days };
}

function gestationalAgeFromUsg(usgDate, usgAgeWeeks, usgAgeDays, currentDate) {
  const diffMs = currentDate - usgDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalDays = usgAgeWeeks * 7 + usgAgeDays + diffDays;
  const weeks = Math.floor(totalDays / 7);
  const days = Math.floor(totalDays % 7);
  return { weeks, days };
}

function dueDateByLMP(lmpDate) {
  const dueDate = new Date(lmpDate);
  dueDate.setDate(dueDate.getDate() + 280);
  return dueDate;
}

function dueDateByUSG(usgDate, usgAgeWeeks, usgAgeDays) {
  const dueDate = new Date(usgDate);
  dueDate.setDate(dueDate.getDate() + 280 + usgAgeWeeks * 7 + usgAgeDays)
  return dueDate;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function calculateGestationalAge() {
  /* Select elements */
  const selectCriteria = document.querySelector(
    ".calculator__select--criteria"
  ).value;
  const gestationalAgeOutput = document.querySelector(
    ".calculator__output--gestational-age"
  );
  const dueDateOutput = document.querySelector(".calculator__output--due-date");

  /* Get Data */
  const currentDate = getDateFromSelectors("current");
  const lmpDate = getDateFromSelectors("lmp");
  const usgDate = getDateFromSelectors("usg");
  const usgAgeWeeks = Number(document.getElementById("usg-weeks").value);
  const usgAgeDays = Number(document.getElementById("usg-days").value);

  /* Variables */
  let gestationalAge, dueDate;

  if (!selectCriteria) return;

  if (selectCriteria === "last-menstrual-period") {
    gestationalAge = gestationalAgeFromLMP(lmpDate, currentDate);
    dueDate = dueDateByLMP(lmpDate);
  } else if (selectCriteria === "ultrasound") {
    gestationalAge = gestationalAgeFromUsg(
      usgDate,
      usgAgeWeeks,
      usgAgeDays,
      currentDate
    );
    dueDate = dueDateByUSG(usgDate, usgAgeWeeks, usgAgeDays);
  }

  if (gestationalAge && dueDate) {
    const dayText = gestationalAge.days > 1 ? "days" : "day";

    gestationalAgeOutput.innerHTML = `<strong> Gestational Age:</strong> ${gestationalAge.weeks} weeks ${gestationalAge.days} ${dayText}`;
    dueDateOutput.innerHTML = `<strong> Estimated Due Date:</strong> ${formatDate(dueDate)}`;
  }
}

calculatorButton.addEventListener("click", () => calculateGestationalAge());
