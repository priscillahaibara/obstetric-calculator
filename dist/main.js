import { selectGestationalAgeCriteria } from "./selectGestationalAgeCriteria.js";
import { setupDateSelectorByPrefix } from "./generateDateSelectors.js";
import { calculateGestationalAge } from "./calculateGestationalAge.js";
// === main.js ===
// Entry point for the gestational age calculator.
// Initializes UI components and sets up event listeners.
/* 1) Setup gestational age criteria dropdown
 * Lets the user choose the calculation method:
 * - Last Menstrual Period (LMP)
 * - Ultrasound (USG)
 * The selection controls which input fields are displayed.
 */
selectGestationalAgeCriteria();
/* 2) Setup date selectors for current, LMP, and ultrasound dates
 * - Populates day/month/year dropdowns
 * - Adjusts the number of days based on selected month/year
 * - Optionally pre-fills the current date (if useCurrentDate = true)
 */
setupDateSelectorByPrefix("current", true);
setupDateSelectorByPrefix("lmp");
setupDateSelectorByPrefix("usg");
/* 3) Setup event listener for the calculate button
 * On click:
 * - Clears any previous input errors
 * - Calls the gestational age calculator
 * - Displays gestational age and estimated due date
 */
const calculatorButton = document.querySelector(".calculator__button");
const inputError = document.querySelector(".calculator__input-error");
calculatorButton.addEventListener("click", () => {
    if (inputError) {
        inputError.innerHTML = "";
        inputError.style.display = "none";
    }
    calculateGestationalAge();
});
//# sourceMappingURL=main.js.map