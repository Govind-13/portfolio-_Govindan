[README.md](https://github.com/user-attachments/files/24139146/README.md)
# Spatial Lunar - Portfolio Project

This project is a React-based portfolio application built with Vite. It features a modern, responsive design with various sections including About, specific Projects, Services, and more.

### ✨ Key Features
-   **Custom Cursor**: A unique, interactive cursor component.
-   **Scroll Animations**: Elements animate into view as you scroll using the `IntersectionObserver` API.
-   **Responsive Layout**: Fully optimized for different screen sizes.

## 🚀 Local Host Access

Once the server is running, you can access the project locally at:

**[http://localhost:5173](http://localhost:5173)**

> Note: The port `5173` is the default for Vite. If that port is busy, check the terminal output for the correct URL.

## 🛠️ Installation & Setup

Follow these steps to get the project up and running on your local machine:

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

Here is an overview of the key files and directories in the project:

### Root Directory
-   `package.json`: Lists project dependencies and scripts.
-   `vite.config.js`: Configuration file for Vite.
-   `index.html`: The main entry HTML file.

### Source Code (`src/`)
-   `main.jsx`: The JavaScript entry point that mounts the React app.
-   `App.jsx`: The main application component that orchestrates the layout.
-   `index.css`: Global styles for the application.
-   `App.css`: Styles specific to the App component.

### Components (`src/components/`)
The application is modularized into the following components:

-   **Header.jsx**: Navigation bar and header section.
-   **Hero.jsx**: The initial landing section/banner.
-   **About.jsx**: Section containing information about the profile/entity.
-   **Services.jsx**: Details the services offered.
-   **Methodology.jsx**: Explains the work process or approach.
-   **Projects.jsx**: Showcase of previous work or portfolio items.
-   **Skills.jsx**: Visual representation of technical skills.
-   **Contact.jsx**: Contact form or details.
-   **Footer.jsx**: Page footer.
-   **Cursor.jsx**: A custom cursor component for enhanced UI/UX.

## 💻 Technologies Used

-   **React**: UI Library (`v19.x`)
-   **Vite**: Build tool and development server (`v6.x`)
-   **React Icons**: Icon library (`v5.x`)
-   **CSS**: Custom styling (Vanilla CSS)

## 📝 Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the app for production.
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run preview`: Locally previews the production build.
