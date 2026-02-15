# Recommended React Folder Structure (Pure CSS)

This document outlines a scalable and organized folder structure for your React application, specifically tailored for using **pure CSS** with a centralized `styles` directory.

## Overview

The structure separates logic (JavaScript/React) from styling (CSS) while maintaining a clear hierarchy. This approach keeps your components clean and your styles organized and maintainable.

## The Structure

```
src/
├── assets/            # Static assets like images, fonts, icons
│   ├── images/
│   └── icons/
├── components/        # Reusable global components (Buttons, Inputs, etc.)
│   ├── Button/
│   │   └── index.jsx  # Component logic
│   └── Navbar/
│       └── index.jsx
├── context/           # React Context definitions (Global state)
├── hooks/             # Custom React hooks
├── pages/             # Page components (routed views)
│   ├── Home/
│   │   └── index.jsx
│   └── About/
│       └── index.jsx
├── services/          # API services and data fetching logic
├── styles/            # ALL CSS files live here
│   ├── base/          # Base styles (Reset, Typography, Variables)
│   │   ├── _reset.css
│   │   ├── _typography.css
│   │   └── _variables.css
│   ├── components/    # Styles for specific components
│   │   ├── _button.css
│   │   └── _navbar.css
│   ├── layout/        # Layout-specific styles (Grid, key containers)
│   │   └── _header.css
│   ├── pages/         # Page-specific styles
│   │   └── _home.css
│   └── main.css       # Main entry point (imports all other CSS files)
├── utils/             # Helper functions and constants
├── App.jsx            # Main App component
└── main.jsx           # Entry point
```

## Detailed Breakdown

### 1. `src/styles/`
This is the heart of your styling architecture. Since you are using pure CSS, organization is key to avoiding a messy global namespace.

*   **`main.css`**: This is the single file you import in your `src/main.jsx` or `src/App.jsx`. It should consist primarily of imports.
    ```css
    /* src/styles/main.css */
    @import './base/_reset.css';
    @import './base/_variables.css';
    @import './layout/_header.css';
    @import './components/_button.css';
    /* ... other imports */
    ```
*   **`base/`**: Contains boilerplate styles.
    *   `_reset.css`: CSS normalization/reset.
    *   `_variables.css`: CSS Custom Properties (Variables) for colors, fonts, etc.
        ```css
        :root {
            --primary-color: #007bff;
            --font-stack: 'Helvetica', sans-serif;
        }
        ```
*   **`components/`**: Mirrors your `src/components` directory. If you have a `Button` component, you have a `_button.css` file here.
*   **`pages/`**: Styles specific to a single page view.

### 2. `src/components/`
Contains your reusable UI elements.
*   **Structure**: Group by component name.
    *   `Component/index.jsx`: The component code.
*   **Why `index.jsx`?**: It allows you to import like `import Button from './components/Button'` instead of `./components/Button/Button`.

### 3. `src/pages/`
Contains components that represent full pages (routes).
*   These components manage the layout of the page and pass data down to smaller components.

### 4. `src/utils/` & `src/hooks/`
*   **utils/**: Pure JavaScript functions (formatted dates, math helpers) that don't use React hooks.
*   **hooks/**: Custom React hooks (e.g., `useWindowSize`, `useFetch`).

## Implementation Tips

1.  **BEM Naming Convention**: Since all CSS is global, use a naming convention like **BEM** (Block Element Modifier) to prevent style conflicts.
    *   `.button` (Block)
    *   `.button--primary` (Modifier)
    *   `.button__icon` (Element)

2.  **Import Order**: In your `main.css`, import `base` styles first, then `layout`, then `components`, and finally `pages` or utilities. This ensures the correct cascade priority.

3.  **Global Variables**: Make extensive use of CSS variables in `src/styles/base/_variables.css`. This makes theming and consistency much easier.
