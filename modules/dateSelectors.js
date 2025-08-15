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
function generateMonthYearSelectors({ monthSelect, yearSelect }) {
  // Populate month options
  monthSelect.innerHTML = "";

  MONTHS.map((month, i) => {
    const option = document.createElement("option");
    option.textContent = month;
    option.value = i + 1;
    monthSelect.appendChild(option);
  });

  // Populate year options (from current year down to 2001)
  const currentYear = new Date().getFullYear();
  yearSelect.innerHTML = "";

  for (let i = currentYear; i > 2000; i--) {
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    yearSelect.appendChild(option);
  }
}

// === 3) Get the number of days in a given month and year ===
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// === 4) Populate day <select> based on selected month and year ===
function updateDays({ monthSelect, yearSelect, daySelect }) {
  const month = Number(monthSelect.value, 10);
  const year = Number(yearSelect.value, 10);
  const daysInMonth = getDaysInMonth(year, month);
  const previousDay = Number(daySelect.value, 10) || 1;

  // Generate day options
  daySelect.innerHTML = "";
  for (let i = 1; i <= daysInMonth; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    daySelect.appendChild(option);
  }

  // Preserve previously selected day if possible
  daySelect.value = previousDay <= daysInMonth ? previousDay : daysInMonth;
}

// === 5) Main setup function for a date selector group ===
export function setupDateSelectorByPrefix(prefix, useCurrentDate = false) {
  const monthSelect = document.querySelector(`#${prefix}-month`);
  const yearSelect = document.querySelector(`#${prefix}-year`);
  const daySelect = document.querySelector(`#${prefix}-day`);

  // Populate month and year options
  generateMonthYearSelectors({ monthSelect, yearSelect });

  // Populate day options based on initial month and year
  updateDays({ monthSelect, yearSelect, daySelect });

  //Updates the number of days based on the selected month and year
  monthSelect.addEventListener("change", () => {
    updateDays({ monthSelect, yearSelect, daySelect });
  });

  yearSelect.addEventListener("change", () => {
    updateDays({ monthSelect, yearSelect, daySelect });
  });

  //If useCurrentDate = true, set date to today's date
  if (useCurrentDate) {
    const today = new Date();
    yearSelect.value = today.getFullYear();
    monthSelect.value = today.getMonth() + 1;
    daySelect.value = today.getDate();
  }
}
