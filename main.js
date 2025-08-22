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

function calculateGestationalAge() {
  /* Select elements */
  const selectCriteria = document.querySelector(
    ".calculator__select--criteria"
  ).value;
  const gestationalAgeOutput = document.querySelector(
    ".calculator__output--gestational-age"
  );
  const dueDateOutput = document.querySelector(".calculator__output--due-date");

  /* Get dates */
  const currentDate = getDateFromSelectors("current");
  const lmpDate = getDateFromSelectors("lmp");
  const usgDate = getDateFromSelectors("usg");

  /* Variables */
  let gestationalAge, dueDate;

  if (!selectCriteria) return;

  if (selectCriteria === "last-menstrual-period") {
    gestationalAge = gestationalAgeFromLMP(lmpDate, currentDate);
  }

  if (gestationalAge) {
    gestationalAgeOutput.innerHTML = `<strong> Gestational Age:</strong> ${gestationalAge.weeks} weeks ${gestationalAge.days} days`;
  }
}

calculatorButton.addEventListener("click", () => {
  calculateGestationalAge();
});
