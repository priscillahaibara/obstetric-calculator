// === 1) Constants ===
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// === 2) Generate month and year <select> elements ===
function generateMonthYearSelectors({monthSelect, yearSelect}) {
  // Populate month options
  monthSelect.innerHTML = '';
  
  MONTHS.map((month, i) => {
    const option = document.createElement('option');
    option.textContent = month;
    option.value = i + 1;
    monthSelect.appendChild(option);
  })
}

// === 3) Get the number of days in a given month and year ===

// === 4) Populate day <select> based on selected month and year ===

// === 5) Main setup function for a date selector group ===
export function setupDateSelectorByPrefix(prefix) {
  const monthSelect = document.getElementById(`${prefix}-month`);
  const yearSelect = document.getElementById(`${prefix}-year`);
  const daySelect = document.getElementById(`${prefix}-day`);

  generateMonthYearSelectors({monthSelect, yearSelect});
}
