"use strict";

export function selectGestationalAgeCriteria() {
  const selectCriteria = document.querySelector(".select-criteria");
  const currentDateField = document.querySelector(".current-date-field");
  const lmpField = document.querySelector(".lmp-field");
  const ultrasoundField = document.querySelector(".ultrasound-field");
  const calculateButton = document.querySelector(".calculate-button");
  const result = document.querySelector(".result");

  selectCriteria.addEventListener("change", () => {
    const criteria = selectCriteria.value;

    if (criteria === "") {
      currentDateField.style.display = "none";
      lmpField.style.display = "none";
      ultrasoundField.style.display = "none";
      calculateButton.style.display = "none";
      result.style.display = "none";
    } else if (criteria === "last-menstrual-period") {
      currentDateField.style.display = "block";
      lmpField.style.display = "block";
      ultrasoundField.style.display = "none";
      calculateButton.style.display = "block";
      result.style.display = "block";
    } else if (criteria === "ultrasound") {
      currentDateField.style.display = "block";
      lmpField.style.display = "none";
      ultrasoundField.style.display = "block";
      calculateButton.style.display = "block";
      result.style.display = "block";
    }
  });
}
