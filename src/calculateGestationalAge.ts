import {
  getDateFromSelectors,
  gestationalAgeFromLMP,
  gestationalAgeFromUsg,
  calculateDueDateByLMP,
  calculateDueDateByUsg,
  formatDate,
} from "./gestationalUtils.js";
import { validateUsgInput } from "./gestationalUtils.js";

/**
 * Calculates and displays the gestational age and estimated due date
 * based on either the last menstrual period (LMP) or ultrasound data.
 *
 * The function reads input values from the DOM, determines which
 * calculation method to use, computes gestational age and due date,
 * and updates the output elements in the UI.
 *
 */

export function calculateGestationalAge() {
  /* Select DOM elements */
  const selectCriteria = document.querySelector(
    ".calculator__select--criteria"
  ).value;
  const gestationalAgeOutput = document.querySelector(
    ".calculator__output--gestational-age"
  );
  const dueDateOutput = document.querySelector(".calculator__output--due-date");
  const inputError = document.querySelector('.calculator__input-error')

  /* Get input data from the DOM */
  const currentDate = getDateFromSelectors("current");
  const lmpDate = getDateFromSelectors("lmp");
  const usgDate = getDateFromSelectors("usg");
  const usgAgeWeeks = Number(document.getElementById("usg-weeks").value, 10);
  const usgAgeDays = Number(document.getElementById("usg-days").value, 10);

  /* Variables to store results */
  let gestationalAge, dueDate;

  /* Exit early if no criteria selected */
  if (!selectCriteria) return;

  /* Calculate based on selected criteria */
  if (selectCriteria === "last-menstrual-period") {
    gestationalAge = gestationalAgeFromLMP(lmpDate, currentDate);
    dueDate = calculateDueDateByLMP(lmpDate);
  } else if (selectCriteria === "ultrasound") {
    const validation = validateUsgInput(usgAgeWeeks, usgAgeDays);

    if (!validation.valid) {
      inputError.style.display = 'block';
      inputError.innerHTML = `<strong>Error:</strong> ${validation.error}`
      dueDateOutput.innerHTML = '';
      return;
    } 

    gestationalAge = gestationalAgeFromUsg(
      usgDate,
      usgAgeWeeks,
      usgAgeDays,
      currentDate
    );
    
    dueDate = calculateDueDateByUsg(usgDate, usgAgeWeeks, usgAgeDays);
  }

  /* Display results in the DOM */
  if (gestationalAge && dueDate) {
    const dayText = gestationalAge.days > 1 ? "days" : "day";
    const weekText = gestationalAge.weeks > 1 ? "weeks" : "week";

    gestationalAgeOutput.innerHTML = `<strong> Gestational Age:</strong> ${gestationalAge.weeks} ${weekText} ${gestationalAge.days} ${dayText}`;
    dueDateOutput.innerHTML = `<strong> Estimated Due Date:</strong> ${formatDate(
      dueDate
    )}`;
  }
}
