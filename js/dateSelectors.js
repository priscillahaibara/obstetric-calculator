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

  // Populate year options (from current year down to 2010)
  const currentYear = new Date().getFullYear();
  yearSelect.innerHTML = "";

  for (let i = currentYear; i >= 2010; i--) {
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    yearSelect.appendChild(option);
  }
}

// === 3) Populate day <select> based on selected month and year ===
function generateDaysSelector({ daySelect, monthSelect, yearSelect }) {
  const month = Number(monthSelect.value, 10);
  const year = Number(yearSelect.value, 10);
  const daysInMonth = new Date(year, month, 0).getDate();
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

// === 4) Main setup function for a date selector group ===
export function setupDateSelectorByPrefix(prefix, useCurrentDate = false) {
  const monthSelect = document.getElementById(`${prefix}-month`);
  const yearSelect = document.getElementById(`${prefix}-year`);
  const daySelect = document.getElementById(`${prefix}-day`);

  // Populate month and year options
  generateMonthYearSelectors({ monthSelect, yearSelect });

  generateDaysSelector({ daySelect, monthSelect, yearSelect });

  //Updates the number of days based on the selected month and year
  monthSelect.addEventListener("change", () => {
    generateDaysSelector({ monthSelect, yearSelect, daySelect });
  });

  yearSelect.addEventListener("change", () => {
    generateDaysSelector({ monthSelect, yearSelect, daySelect });
  });

  //If useCurrentDate = true, set date to today's date
  if (useCurrentDate) {
    const today = new Date();
    yearSelect.value = today.getFullYear();
    monthSelect.value = today.getMonth() + 1;
    daySelect.value = today.getDate();
  }
}
