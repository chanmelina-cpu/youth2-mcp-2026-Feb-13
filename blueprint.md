
# YouthOK Application Blueprint

## 1. Overview

YouthOK is a modern, mobile-responsive web application designed to provide accessible and personalized mental wellness and coaching services to young people in Singapore. The platform connects users with a diverse team of expert coaches, offers an initial AI-powered assessment, and provides resources for mental and emotional wellbeing.

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
    *   **Hover Effects:** Interactive elements like navigation links and cards have smooth transitions for color, transform, and shadow.

## 3. Implemented Features

### **Core Structure**

*   **`index.html`**: The main landing page.
*   **`coaches.html`**: A dedicated page to browse coach profiles.
*   **`style.css`**: A central stylesheet for all pages, using modern CSS features like CSS Variables and `oklch` colors.
*   **`coaches.css`**: An additional stylesheet specifically for the layout and styling of the coaches page.
*   **`main.js`**: For interactive functionality (e.g., the mood tracker).

### **Component Breakdown**

*   **Header & Navigation**:
    *   A fixed header provides persistent navigation.
    *   The logo is prominently displayed.
    *   Navigation links have a distinctive hover effect with an underline animation.
*   **Hero Section (`index.html`)**:
    *   A full-width section with a gradient background.
    *   Features a clear, bold headline and an introductory paragraph.
*   **Mood Tracker (`index.html`)**:
    *   An interactive Web Component (`mood-tracker`) allowing users to select their current mood.
    *   The component uses Shadow DOM for encapsulation.
    *   Moods are represented by colorful, clickable circles with hover effects.
*   **Services/Features Section (`index.html`)**:
    *   A card-based layout to showcase the different services offered.
    *   Cards lift and gain a more pronounced shadow on hover.
*   **Coaches Page (`coaches.html`)**:
    *   Displays profiles of all available coaches, categorized by specialty.
    *   Includes categories for "Wellness," "Career," "Academic," and "Social Work and Community Development".
    *   Each coach is presented in a card with a professional, high-quality image, their name, and a detailed biography. All placeholder images have been replaced.
*   **Footer**:
    *   A simple, clean footer with copyright information.

### **Interactivity**

*   **AI Chat Assessment (`index.html`)**: An interactive chat interface is set up to guide the user through an initial assessment, though the full logic is not yet implemented.

## 4. Current Change Request: Add New Coaches and Update All Coach Images

### **User Request**

The user requested to add four new coaches to the platform and to ensure their images were correctly displayed on the `coaches.html` page.

### **Execution Plan**

1.  **[Completed]** **Add New Coach Content**: 
    *   Added a new "Social Work and Community Development" category in `coaches.html`.
    *   Inserted the HTML structure for the four new coaches, including their names and biographies.
2.  **[Completed]** **Update New Coach Images**:
    *   Set the `src` attribute for the new coaches to point to their respective image files (`jason-lim.jpg`, `mei-chen.jpg`, `daniel-wong.jpg`, `priya-tan.jpg`) located in the `img/` directory.
3.  **[Completed - Proactive Enhancement]** **Update Placeholder Images**:
    *   Replaced all placeholder images for the existing "Wellness," "Career," and "Academic" coaches with high-quality, professional images from an external source (Pexels) to create a more complete and visually appealing page.
4.  **[Completed]** **Update Blueprint**: 
    *   Updated this `blueprint.md` file to accurately reflect the current state of the `coaches.html` page, documenting the addition of new coaches and the replacement of all placeholder images.
