import { selectGestationalAgeCriteria } from "./js/selectGestationalAgeCriteria.js";
import { setupDateSelectorByPrefix } from "./js/dateSelectors.js";

// Setup gestational age criteria
selectGestationalAgeCriteria();

// Setup date selectors for each prefix
setupDateSelectorByPrefix('current');