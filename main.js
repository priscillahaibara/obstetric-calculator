import { selectGestationalAgeCriteria } from "./js/selectGestationalAgeCriteria.js";
import { setupDateSelectorByPrefix } from "./js/dateSelectors.js";
import { calculateGestationalAge } from "./js/calculateGestationalAge.js";

// === main.js ===
// Entry point for the gestational age calculator application.
// This file initializes the UI components and hooks up event listeners.

/* 1) Setup gestational age criteria dropdown
 * This dropdown allows the user to choose the calculation method:
 * - "Last Menstrual Period" (LMP)
 * - "Ultrasound" (USG)
 * The selection determines which input fields are shown/hidden.
 */
selectGestationalAgeCriteria();

/* 2) Setup date selectors for current, LMP, and ultrasound dates
 * - Populates day/month/year dropdowns
 * - Updates the number of days dynamically based on selected month/year
 * - Optionally sets the current date for convenience (useCurrentDate = true)
 */
setupDateSelectorByPrefix("current", true); // Sets up current date selectors
setupDateSelectorByPrefix("lmp");           // Sets up LMP date selectors
setupDateSelectorByPrefix("usg");           // Sets up USG date selectors


/* 3) Setup event listener for the calculate button
 * When the user clicks the "Calculate" button, the gestational age
 * and estimated due date are calculated and displayed.
 */
const calculatorButton = document.querySelector(".calculator__button");

calculatorButton.addEventListener("click", () => calculateGestationalAge());
