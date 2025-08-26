# 🩺 Obstetric Calculator

A web-based tool for estimating **gestational age** and **due date (EDD)** using either the **last menstrual period (LMP)** or **ultrasound data**. Designed to assist healthcare professionals and medical students in obstetric decision-making.

## 🚀 Features

- Calculate gestational age from **LMP** or **Ultrasound**
- Estimate due date (EDD)
- Modular and **TypeScript-based** code for safety and maintainability
- Friendly, clean, and fully **responsive UI**
- **Improved accessibility**: semantic elements, ARIA labels
- Compatible with **all major browsers**, including **Safari on iOS**
- Input validation for ultrasound age (weeks and days)

## 🛠️ Technologies

- JavaScript 
- HTML5 & CSS3
- Typescript

## 🔧 Features Added in Refactor

- ✅ **TypeScript** support for better type safety
- ✅ Improved **responsiveness** across all screen sizes
- ✅ Adaptation and full compatibility with **Safari on iOS**
- ✅ Minor accessibility enhancements (semantic elements, ARIA labels)
- ✅ Safari/iOS compatibility
- ✅ Input validation for ultrasound age

## 📱 Live Demo

You can access the live version of the Obstetric Calculator here: [https://obstetric-calculator.netlify.app/](https://obstetric-calculator.netlify.app/)

<img src="https://github.com/user-attachments/assets/ce6d482a-df0b-4219-8f4b-17b1013199e1" alt="obstetric-calculator" width="400"/>

## 🧩 Structure

Modular structure:
- `src/main.ts` – Initializes the app, sets up event listeners, and connects UI with calculation logic
- `src/calculateGestationalAge.ts` – Calculates gestational age and due date based on LMP or Ultrasound, updates the UI with results
- `src/gestationalUtils.ts` – Core utility functions for gestational age and due date calculations, date formatting, and input validation
- `src/generateDateSelectors.ts` – Generates and manages day/month/year dropdowns for date input fields
- `src/selectGestationalAgeCriteria.ts` – Handles selection of calculation criteria and shows/hides relevant input fields dynamically

## 🧾 Original Version

You can still view the original version in the [legacy](https://github.com/priscillahaibara/obstetric-calculator/tree/legacy) branch.  

## 📱 Usage

1. Select calculation criteria:
   - Last Menstrual Period (LMP)
   - Ultrasound (USG)
2. Enter the required dates using the day/month/year dropdowns.
3. For Ultrasound, enter gestational age at the time of USG.
4. Click "Calculate" to view gestational age and estimated due date.

## 📦 Installation (for development)

```bash
git clone https://github.com/priscillahaibara/obstetric-calculator.git
cd obstetric-calculator
# Then open index.html in your browser or use Live Server (VS Code)

