import { getDateFromSelectors, gestationalAgeFromLMP, gestationalAgeFromUsg, calculateDueDateByLMP, calculateDueDateByUsg, formatDate } from "./gestationalUtils.js";

export function calculateGestationalAge() {
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
    dueDate = calculateDueDateByLMP(lmpDate);
  } else if (selectCriteria === "ultrasound") {
    gestationalAge = gestationalAgeFromUsg(
      usgDate,
      usgAgeWeeks,
      usgAgeDays,
      currentDate
    );
    dueDate = calculateDueDateByUsg(usgDate, usgAgeWeeks, usgAgeDays);
  }

  if (gestationalAge && dueDate) {
    const dayText = gestationalAge.days > 1 ? "days" : "day";
    const weekText = gestationalAge.weeks > 1 ? 'weeks' : 'week';

    gestationalAgeOutput.innerHTML = `<strong> Gestational Age:</strong> ${gestationalAge.weeks} ${weekText} ${gestationalAge.days} ${dayText}`;
    dueDateOutput.innerHTML = `<strong> Estimated Due Date:</strong> ${formatDate(dueDate)}`;
  }
}