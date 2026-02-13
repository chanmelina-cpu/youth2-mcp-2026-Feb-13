# YouthOK Application Blueprint

## 1. Overview

YouthOK is a modern, mobile-responsive web application designed to provide accessible and personalized mental wellness and coaching services to young people. The platform connects users with expert coaches, offers an initial AI-powered assessment, and provides resources for mental and emotional wellbeing.

## 2. Design and Styling

### **Aesthetics & Feel**

The design is clean, vibrant, and optimistic, aiming to create a welcoming and non-intimidating user experience. It uses a purple-based color palette, modern typography, and subtle animations to feel both professional and approachable.

### **Key Design Elements**

*   **Color Palette**:
    *   **Primary:** `oklch(59.39% 0.15 285.58)` (Vibrant Purple)
    *   **Secondary:** `oklch(70.98% 0.18 254.51)` (Complementary Blue-ish Purple)
    *   **Background:** `oklch(98% 0.005 285.58)` (Very light purple)
    *   **Text:** `oklch(20% 0 0)` (Dark, readable grey)
*   **Typography**:
    *   **Font:** 'Poppins', sans-serif (imported from Google Fonts).
    *   **Hierarchy:** Clear hierarchy is established with varying font weights and sizes for headers, sub-headers, and body text.
*   **Layout**:
    *   Uses modern CSS layout techniques like Flexbox for responsive alignment.
    *   A consistent container width (`1200px` max) and padding create a balanced and organized feel.
*   **Visual Effects**:
    *   **Shadows:** Utilizes a custom multi-layered shadow system (`--shadow-elevation-low`, `--shadow-elevation-medium`) to create a sense of depth and lift interactive elements.
    *   **Noise Texture:** A subtle SVG noise texture is applied to the background to add a tactile, premium feel.
    *   **Hover Effects:** Interactive elements have smooth transitions for color, transform, and shadow.

## 3. Implemented Features

### **Core Structure & Pages**

*   **`index.html`**: The main landing page.
*   **Authentication**:
    *   `login.html`: User login page.
    *   `signup.html`: User registration page.
    *   `auth.css`: A unified stylesheet for consistent login/signup styling.
*   **`coaches.html`**: A dedicated page to browse coach profiles.
*   **User-Specific Pages**:
    *   `dashboard.html`: The main hub for users after they log in.
    *   `messages.html`: A feature for users to communicate.
    *   `profile.html`: A user profile page.
    *   `self-assessment.html`: A tool for users to assess themselves.
    *   `results.html`: A page to display the results of the self-assessment.
*   **`404.html`**: A custom, consistently styled "Page Not Found" page.

### **Styling and JavaScript**

*   **`style.css`**: A central stylesheet using modern CSS features like CSS Variables and `oklch` colors.
*   **JavaScript Modules**:
    *   The entire application has been refactored to use modern ES Modules (`import`/`export`).
    *   `main.js`: Handles global functionality, including navigation and the mood tracker.
    *   `auth.js`: Manages login functionality with user feedback and error handling.
    *   `signup.js`: Manages the signup process with form validation and user feedback.

### **Key Components & Interactivity**

*   **Accessible Navigation**: A fully accessible hamburger menu has been implemented for mobile devices, ensuring keyboard and screen reader compatibility.
*   **Mood Tracker (`index.html`)**: An interactive Web Component (`mood-tracker`) allowing users to select their current mood.
*   **AI Chat Assessment (`index.html`)**: An interactive chat interface for an initial assessment.
*   **Improved User Feedback**: Authentication forms now provide clear feedback to the user, such as disabled buttons during submission and clear error messages.
*   **Invite Scheduling**: Users can now schedule invites through a dedicated page (`schedule.html`), accessible from the assessment results page.

## 4. Current Change Request: Application-wide Refactoring

### **User Request**

The user requested a full-stack refactoring of the web application to improve accessibility, usability, code quality, and user experience.

### **Execution Plan**

1.  **[Completed]** **HTML Refactoring**:
    *   Reviewed and updated all HTML files to use semantic HTML5 tags (`<header>`, `<footer>`, `<main>`, `<nav>`, `<section>`).
    *   Ensured all images have descriptive `alt` attributes.
    *   Added `aria-` attributes to improve accessibility for screen readers.
    *   Corrected heading hierarchy (`<h1>` to `<h6>`).
    *   Ensured all form elements have associated labels.

2.  **[Completed]** **CSS and Styling Refactoring**:
    *   Created `auth.css` to unify the styling of login and signup pages.
    *   Reviewed the CSS to ensure good color contrast and a responsive design.
    *   Added focus styles for interactive elements to improve keyboard navigation.

3.  **[Completed]** **JavaScript Refactoring**:
    *   Converted the entire JavaScript codebase to use modern ES Modules.
    *   Created `signup.js` to separate signup logic from login logic.
    *   Improved user feedback and error handling in `auth.js` and `signup.js` by disabling buttons on submission and displaying clear error messages.
    *   Refactored `main.js` to handle the new accessible navigation menu and improve interactivity.

4.  **[Completed]** **Accessibility and Navigation**:
    *   Implemented a consistent and accessible navigation header and footer across all pages.
    *   Created a fully accessible hamburger menu for mobile navigation.
    *   Improved the structure and accessibility of `404.html`, `login.html`, and `signup.html`.

5.  **[Completed]** **Blueprint Update**:
    *   Updated this `blueprint.md` file to document the application's current state, including the new design, features, and the details of this refactoring effort.

## 5. Current Change Request: Invite Scheduling Feature

### **User Request**

Add an option on the `results.html` page to create an invite scheduling.

### **Execution Plan**

1.  **[Completed]** Added a button to `results.html` linking to `schedule.html`.
2.  **[Completed]** Created `schedule.html` with a form for invite scheduling (recipient email, date, time, topic).
3.  **[Completed]** Created `schedule.js` to handle form submission and data collection (placeholder for Firebase integration).
4.  **[Completed]** Ensured `schedule.html` and `schedule.js` are correctly linked.
5.  **[Completed]** Updated `blueprint.md` (this step).
