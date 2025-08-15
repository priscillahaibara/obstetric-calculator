import { selectGestationalAgeCriteria } from "./modules/selectGestationalAgeCriteria.js";
import { setupDateSelectorByPrefix } from "./modules/dateSelectors.js";
import {
  getDateFromSelectors,
  gestationalAgeFromLMP,
  gestationalAgeFromUSG,
  calculateDueDateByLMP,
  calculateDueDateByUSG,
  formatDate,
} from "./modules/gestationalUtils.js";

// Setup gestational age criteria
selectGestationalAgeCriteria();

// Setup date selectors for each prefix
setupDateSelectorByPrefix("current", true); //fills selector with current date
setupDateSelectorByPrefix("lmp");
setupDateSelectorByPrefix("usg");

function calculateGestationalAge() {
  const selectCriteria = document.querySelector(".select-criteria").value;
  const currentDate = getDateFromSelectors("current");
  const gestationalAgeOutput = document.querySelector(
    ".gestational-age-output"
  );
  const dueDateOutput = document.querySelector(".due-date-output");
  let gestationalAge, dueDate;

  if (!selectCriteria) return;

  if (selectCriteria === "last-menstrual-period") {
    const lmpDate = getDateFromSelectors("lmp");
    gestationalAge = gestationalAgeFromLMP(lmpDate, currentDate);
    dueDate = calculateDueDateByLMP(lmpDate);
  } else if (selectCriteria === "ultrasound") {
    const usgDate = getDateFromSelectors("usg");
    const usgAgeWeeks =
      parseInt(document.querySelector("#usg-weeks")?.value, 10) || 0;
    const usgAgeDays =
      parseInt(document.querySelector("#usg-days")?.value, 10) || 0;
    gestationalAge = gestationalAgeFromUSG(
      usgDate,
      usgAgeWeeks,
      usgAgeDays,
      currentDate
    );
    dueDate = calculateDueDateByUSG(usgDate, usgAgeWeeks, usgAgeDays);
  }

  if (gestationalAgeOutput && gestationalAge) {
    gestationalAgeOutput.innerHTML = `<strong>Gestational Age:</strong> ${gestationalAge.weeks} weeks and ${gestationalAge.days} days`;
  }

  if (dueDateOutput && dueDate) {
    dueDateOutput.innerHTML = `<strong>Estimated Due Date:</strong> ${formatDate(
      dueDate
    )}`;
  }
}

document.querySelector(".calculate-button").addEventListener("click", (e) => {
  e.preventDefault();
  calculateGestationalAge();
});
