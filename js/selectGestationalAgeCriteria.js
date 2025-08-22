export function selectGestationalAgeCriteria() {
  // Select the main criteria dropdown and relevant sections of the form
  const selectCriteria = document.querySelector(
    ".calculator__select--criteria"
  );
  const currentDateField = document.querySelector(
    ".calculator__fieldset--current-date"
  );
  const lmpField = document.querySelector(".calculator__fieldset--lmp");
  const ultrasoundField = document.querySelector(
    ".calculator__fieldset--ultrasound"
  );
  const calculatorButton = document.querySelector(".calculator__button");
  const resultField = document.querySelector(".calculator__fieldset--result");

  // Listen for changes on the criteria dropdown
  selectCriteria.addEventListener("change", () => {
    const criteria = selectCriteria.value;

    // If no criteria is selected, hide all optional fields and buttons
    if (criteria === "") {
      currentDateField.style.display = "none";
      lmpField.style.display = "none";
      ultrasoundField.style.display = "none";
      calculatorButton.style.display = "none";
      resultField.style.display = "none";
    }
    // If "Last Menstrual Period" is selected, show LMP and current date fields, hide ultrasound
    else if (criteria === "last-menstrual-period") {
      currentDateField.style.display = "block";
      lmpField.style.display = "block";
      ultrasoundField.style.display = "none";
      calculatorButton.style.display = "block";
      resultField.style.display = "block";
    }
    // If "Ultrasound" is selected, show ultrasound and current date fields, hide LMP
    else if (criteria === "ultrasound") {
      currentDateField.style.display = "block";
      lmpField.style.display = "none";
      ultrasoundField.style.display = "block";
      calculatorButton.style.display = "block";
      resultField.style.display = "block";
    }
  });
}
