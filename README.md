# 🩺 Obstetric Calculator

A web-based tool for estimating **gestational age** and **due date (EDD)** using either the **last menstrual period (LMP)** or **ultrasound data**. Designed to assist healthcare professionals and medical students in obstetric decision-making.

## 🚀 Features

- Gestational age calculation from **LMP** or **Ultrasound**
- Due date estimation (EDD)
- Friendly and clean UI
- Works entirely on the browser (no backend)
- Built with **vanilla JavaScript**, **HTML**, and **CSS**

## 🛠️ Technologies

- JavaScript (ES Modules)
- HTML5 & CSS3
- Responsive layout (initial implementation)

## 🔧 Planned Refactor

This project will be refactored to include:

- ✅ **TypeScript** support for better type safety
- ✅ Improved **responsiveness** across all screen sizes
- ✅ Adaptation and full compatibility with **Safari on iOS**
- ✅ Minor accessibility enhancements (semantic elements, ARIA labels)

## 📱 Live Demo

I plan to deploy the final version on Netlify once the refactor is complete.

## 🧩 Structure

Modular structure:
- `main.js` – logic control
- `modules/gestationalUtils.js` – core date and calculation functions
- `modules/dateSelectors.js` – UI helpers
- `modules/selectGestationalAgeCriteria.js` – dynamic form behavior

## 🧾 Original Version

You can still view the original version in the [legacy](https://github.com/priscillahaibara/obstetric-calculator/tree/legacy) branch.  

## 📦 Installation (for development)

```bash
git clone https://github.com/priscillahaibara/obstetric-calculator.git
cd obstetric-calculator
# Then open index.html in your browser or use Live Server (VS Code)
