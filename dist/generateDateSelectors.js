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
function generateMonthYearSelectors({ monthSelect, yearSelect, }) {
    // Populate month options
    monthSelect.innerHTML = "";
    MONTHS.forEach((month, i) => {
        const option = document.createElement("option");
        option.textContent = month;
        option.value = String(i + 1);
        monthSelect.appendChild(option);
    });
    // Populate year options (from current year down to 2010)
    const currentYear = new Date().getFullYear();
    yearSelect.innerHTML = "";
    for (let i = currentYear; i >= 2010; i--) {
        const option = document.createElement("option");
        option.textContent = String(i);
        option.value = String(i);
        yearSelect.appendChild(option);
    }
}
// === 3) Populate day <select> based on selected month and year ===
function generateDaysSelector({ daySelect, monthSelect, yearSelect, }) {
    const month = Number(monthSelect.value);
    const year = Number(yearSelect.value);
    const daysInMonth = new Date(year, month, 0).getDate();
    const previousDay = Number(daySelect.value) || 1;
    // Generate day options
    daySelect.innerHTML = "";
    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement("option");
        option.textContent = String(i);
        option.value = String(i);
        daySelect.appendChild(option);
    }
    // Preserve previously selected day if possible
    daySelect.value = String(previousDay <= daysInMonth ? previousDay : daysInMonth);
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
    monthSelect.addEventListener("change", () => generateDaysSelector({ daySelect, monthSelect, yearSelect }));
    yearSelect.addEventListener("change", () => generateDaysSelector({ daySelect, monthSelect, yearSelect }));
    //If useCurrentDate = true, set date to today's date
    if (useCurrentDate) {
        const today = new Date();
        yearSelect.value = String(today.getFullYear());
        monthSelect.value = String(today.getMonth() + 1);
        daySelect.value = String(today.getDate());
    }
}
