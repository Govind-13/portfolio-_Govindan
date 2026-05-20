# AI Agent Instructions

## Repo overview
- This is a split project:
  - Frontend: root folder, React + Vite + Tailwind.
  - Backend: `server/`, Node.js + Express + MongoDB.
- The frontend is a one-page portfolio with a scroll-driven cinematic background and no external animation library.
- The backend exposes auth, projects, and contact APIs with JWT auth and MongoDB; setup docs live in `server/README.md` and `BACKEND_SETUP.md`.

## How to run
- Frontend:
  - `npm install`
  - `npm run dev`
  - `npm run build`
  - `npm run preview`
- Backend:
  - `cd server && npm install`
  - `cd server && npm run dev`
- Full stack:
  - `npm run dev:full`

## Key files and conventions
- `src/App.jsx` contains most page content and section data.
- `src/data.js` contains the five cinematic background image URLs.
- `src/components/CinematicBackground.jsx`, `src/components/Reveal.jsx`, and `src/hooks/useScrollProgress.js` implement the page animation and reveal logic.
- `tailwind.config.js` is the canonical design token source for the Obsidian Gallery theme.
- `src/index.css` holds base styling and custom utility classes used across the page.
- `public/profile-headshot.png` is the main static asset for the page.

## Backend structure
- `server/index.js` starts the Express app.
- `server/routes/` defines API endpoints.
- `server/controllers/` contains request handling logic.
- `server/middleware/auth.js` enforces JWT-protected routes.
- Environment variables are required in `server/.env` and documented in `server/README.md` / `BACKEND_SETUP.md`.

## Development guidance
- This repo does not currently include a test runner, linter, or formatter. Avoid adding those unless there is a clear project need.
- Keep the frontend performance and scroll animation behavior intact when editing the page.
- Prefer small, content-focused updates in `src/App.jsx` and `src/data.js` over broad structural refactors.
- When changing backend API behavior, preserve the existing routes and JSON contract unless the change is intentional and documented.
- Use links to existing docs instead of duplicating setup details:
  - `README.md`
  - `server/README.md`
  - `BACKEND_SETUP.md`

## When editing this repo
- If you are fixing or adding frontend content, verify the page still renders as a one-page landing page with a fixed cinematic background.
- If you are updating backend logic, verify the API endpoints still match the documented contract and that the server starts cleanly.
- If you add new tooling or frameworks, explain why it is necessary and keep the project lightweight.

## Local workspace skill package
- This workspace contains `react-node-digital-services-website.skill` at the repository root.
- Use that skill only for requests to build new React + Node.js digital services websites, agency/portfolio apps, or admin dashboard full-stack projects.
- Do not use it to modify this existing portfolio site unless the task explicitly asks for a new React/Node website or migration guidance.
