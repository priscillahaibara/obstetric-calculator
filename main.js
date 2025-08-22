import { selectGestationalAgeCriteria } from "./js/selectGestationalAgeCriteria.js";
import { setupDateSelectorByPrefix } from "./js/dateSelectors.js";
import { calculateGestationalAge } from "./js/calculateGestationalAge.js";

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

calculatorButton.addEventListener("click", () => calculateGestationalAge());
