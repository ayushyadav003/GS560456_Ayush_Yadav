# GS560456 - Data Viewer App

## Overview
This project is a **React-based Data Viewer Application** built using **TypeScript** and **AG-Grid**, featuring data visualization and management capabilities. It includes pages for **Store, SKU, Planning, and Charts**, enabling users to interact with structured data efficiently. 

## Technologies Used
- **React.js (with TypeScript)** - For building UI components
- **AG-Grid** - For advanced data table functionalities
- **Redux (optional)** - For state management
- **Recharts** - For chart visualization
- **SCSS** - For styling and maintainability
- **Formik & Yup** - For form validation (if applicable)
- **Vite** - As a fast build tool

---

## Getting Started
### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.0.0)
- **npm** or **yarn**

### Installation Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/ayushyadav003/GS560456_Ayush_Yadav.git
   cd GS560456_Ayush_Yadav
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. **Run the application:**
   ```sh
   npm run dev
   ```
   This will start the development server. The app will be accessible at `http://localhost:5173/` (default Vite port).

---

## Application Structure
```
GS560456_Ayush_Yadav/
│-- src/
│   ├── components/    # Reusable components
│   ├── pages/         # Main pages (Store, SKU, Planning, Chart)
│   ├── store/         # Redux store (if applicable)
│   ├── utils/         # Helper functions
│   ├── styles/        # Global SCSS styles
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Entry point
│-- public/            # Static assets
│-- package.json       # Dependencies & scripts
│-- vite.config.ts     # Vite configuration
```

---

## Pages & Functionalities

### 1. **Store Page** (`/store`)
- Displays a table with store data.
- Uses **AG-Grid** for sorting, filtering, and pagination.
- Supports row selection and bulk actions.

### 2. **SKU Page** (`/sku`)
- Manages SKU-related data.
- Allows dynamic filtering and data manipulation.
- Uses **Redux** for state management (if implemented).

### 3. **Planning Page** (`/planning`)
- Handles sales and inventory planning.
- Includes form validation using **Formik & Yup**.
- Implements dynamic data processing.

### 4. **Chart Page** (`/chart`)
- Visualizes **GM Dollars** and **GM %** with a **Composed Chart**.
- Uses **Recharts** for Bar and Line chart combination.
- Displays **Tooltip, Legends, X/Y Axes formatting**.

---

## Key Approaches

### 🔹 **State Management**
- Uses **React State** for local UI states.
- Optionally integrates **Redux** for global state.

### 🔹 **Performance Optimization**
- Implements **lazy loading** for better performance.
- Uses **memoization** (React.memo, useMemo, useCallback).
- Optimized API calls using **debouncing & throttling**.

### 🔹 **Responsive UI & Styling**
- Styled using **SCSS** with modular approach.
- Implemented **mobile-friendly grid layouts**.

### 🔹 **Error Handling & Validations**
- **Formik & Yup** for form validation.
- Graceful error handling with **try/catch & toast notifications**.

---

## Deployment
To build and deploy:
```sh
npm run build
```
This generates optimized static files inside the `dist/` folder.

For deployment on **Vercel**, run:
```sh
vercel --prod
```

**Ayush Yadav**  
[GitHub](https://github.com/ayushyadav003)  
[LinkedIn](https://www.linkedin.com/in/ayushyadav003/)  
