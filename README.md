# GR_STUDIO — Cinematic Scroll Portfolio

A scroll-driven cinematic landing page for **Govindan R**, built in React + Vite + Tailwind.
The animation language is adapted from the Aura demo reference: a fixed cinematic background that
cross-fades between five shots as you scroll, with a floating glass pill nav, fade-up content reveals,
and a top progress bar.

Live preview: `npm run dev` → http://localhost:5173/

---

## 1. What this project is

A one-page personal portfolio for Govindan R — graphic designer & content administrator at
Promath Technology Pvt Ltd (T. Nagar, Chennai) — covering motion design, e-learning content
production, Python automation, and AI-augmented workflows.

The page tells a five-beat story:

| # | Section ID | Label    | Headline                                  |
| - | ---------- | -------- | ----------------------------------------- |
| 1 | `home`     | Overview | "Motion-led design for digital learning." |
| 2 | `process`  | Process  | "A studio of one. Built for delivery."    |
| 3 | `work`     | Work     | "Three lanes I ship in."                  |
| 4 | `stack`    | Stack    | "The working stack."                      |
| 5 | `contact`  | Contact  | "Have a brief? Let's build it."           |

---

## 2. Tech stack

- **React 18** (JSX, no TypeScript)
- **Vite 5** (dev server + production build)
- **Tailwind 3** with the Obsidian Gallery design tokens already baked into `tailwind.config.js`
- **Material Symbols Outlined** icon font (loaded from Google Fonts)
- **Google Fonts**: Syne (display), Hanken Grotesk (body), JetBrains Mono (labels)
- **No** external animation library — animation is built on native `IntersectionObserver`,
  scroll listeners, and CSS transitions.

---

## 3. How to run it

### Development (Local)

```bash
# Frontend only
npm install
npm run dev            # local dev server with HMR at http://localhost:5173/

# Backend only (requires MongoDB)
cd server
npm install
npm run dev            # starts at http://localhost:5000

# Full stack (both running together)
npm run dev:full       # concurrently runs frontend + backend
```

### Production Build

```bash
npm run build          # production build into dist/
npm run preview        # preview the production build
```

### Backend Testing
```bash
# Health check
curl http://localhost:5000/api/health
# → {"message":"Server is running"}
```

There is **no test runner, linter, or formatter** configured — keep it that way unless you have a real
reason to add one.

---

## 4. Backend Setup

This project includes a **separate Node.js + Express backend** for admin authentication, project management, and contact form handling.

### Backend Tech Stack
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — Database
- **JWT** — Authentication for admin panel
- **CORS** — Cross-origin resource sharing for frontend

### Backend Structure
```
server/
├── index.js                    # Express app entry point
├── package.json                # Backend dependencies
├── .env.example                # Environment variables template
├── Procfile                    # Railway deployment config
├── railway.json                # Railway build settings
├── DEPLOYMENT.md               # Deployment guide
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   ├── authController.js       # Login/register logic
│   ├── projectController.js    # Project CRUD
│   └── contactController.js    # Contact form handling
├── middleware/
│   └── auth.js                 # JWT verification
├── models/
│   ├── User.js                 # Admin user schema
│   ├── Project.js              # Project schema
│   └── Contact.js              # Contact message schema
└── routes/
    ├── auth.js                 # /api/auth endpoints
    ├── projects.js             # /api/projects endpoints
    └── contact.js              # /api/contact endpoints
```

### Backend Environment Variables
Create `server/.env` (copy from `server/.env.example`):
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Authentication
JWT_SECRET=your_secure_random_key_here

# Server
PORT=5000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173

# Optional: Email configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

## 5. Project layout (Frontend)

```
portfolio-_Govindan/
├── index.html                       # Loads Google Fonts + Material Symbols, mounts <App />
├── package.json                     # Frontend dev/build scripts
├── .env.example                     # Frontend env vars template
├── .gitignore                       # Excludes node_modules, .env, dist
├── tailwind.config.js               # Obsidian Gallery design tokens (canonical)
├── postcss.config.js
├── vite.config.js
├── public/
│   └── profile-headshot.png         # Static asset served from /
├── src/
│   ├── main.jsx                     # ReactDOM mount point
│   ├── App.jsx                      # The entire landing page (all sections inline)
│   ├── data.js                      # Cinematic image URLs (backgrounds)
│   ├── index.css                    # Base styles, glass-border, neon-glow, scroll-line
│   ├── admin/
│   │   ├── AdminLogin.jsx           # Admin login page (/admin/login)
│   │   ├── AdminDashboard.jsx       # Protected dashboard (/admin/dashboard)
│   │   ├── ProjectsManager.jsx      # CRUD projects
│   │   └── ContactManager.jsx       # View & manage contact messages
│   ├── components/
│   │   ├── CinematicBackground.jsx  # Fixed cross-fading background layer
│   │   ├── PillNav.jsx              # Floating glass pill nav (top, fixed)
│   │   ├── ProtectedRoute.jsx       # Requires JWT token for admin routes
│   │   ├── Reveal.jsx               # Fade-up wrapper (IntersectionObserver)
│   │   ├── Icon.jsx                 # Material Symbols Outlined wrapper
│   │   └── ExampleComponents.jsx    # Example card components
│   ├── hooks/
│   │   ├── useScrollProgress.js     # rAF-throttled 0..1 scroll progress
│   │   ├── useInView.js             # Generic intersection-observer hook
│   │   └── useAuth.js               # Admin authentication state
│   ├── lib/
│   │   └── api.js                   # Axios instance with JWT interceptor
│   └── services/
│       └── api.js                   # API call utilities
├── server/                          # Backend (see Backend Structure above)
└── dist/                            # Production build output (generated)
```

---

## 6. How the animation works

### 5.1 Cinematic cross-fade background

`CinematicBackground.jsx` is a `position: fixed` layer behind the content. It renders all five
cinematic images stacked, each with its opacity driven by the global scroll progress.

```js
// in useScrollProgress.js
const frac = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
// → progress ∈ [0, 1]
```

```js
// in CinematicBackground.jsx
const pos = progress * (shots.length - 1);          // 0..4 across five shots
const opacity = Math.max(0, 1 - Math.abs(pos - i)); // per-layer opacity
```

That formula means: at `progress = 0.5`, layer index 2 is fully visible. At `progress = 0.625`,
layers 2 and 3 each sit at 0.5 opacity → a smooth blend with no hard cuts.

Each layer also gets a slight `scale()` shift based on its distance from the active position,
which adds a subtle "camera dolly" feel.

Two overlay divs sit on top of the images:
- a vertical gradient (`bg-gradient-to-b from-background/30 ... to-background/95`) for legibility
- a radial vignette (`radial-gradient(ellipse...)`) to focus the eye in the centre

### 5.2 Scroll-spying pill nav

`PillNav.jsx` is a fixed glass pill at the top centre. The active tab is determined by an
`IntersectionObserver` in `App.jsx`:

```js
new IntersectionObserver(
  ([entry]) => entry.isIntersecting && setActiveId(s.id),
  { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
);
```

The `-45% / -45%` margins mean a section is only marked "active" when it dominates the middle 10%
of the viewport — so the highlight changes exactly when the user feels they've crossed into the
next section.

The active tab swaps to a white-filled pill with a cyan glow shadow (`shadow-[0_0_18px_rgba(0,218,248,0.35)]`).

### 5.3 Fade-up reveals

`Reveal.jsx` wraps any child and uses the `useInView` hook to add `opacity-100 translate-y-0` once
the element enters view, with `cubic-bezier(0.16, 1, 0.3, 1)` easing and a staggered `delay` per
sibling (`120ms`, `240ms`, `360ms`, ...).

The reveal fires **once** (`once: true`) — scrolling back up keeps elements in their settled state
rather than re-animating.

### 5.4 Top scroll progress bar

A 2px cyan bar fixed at `top: 0` whose `width` style is bound to the same `progress` value:

```jsx
<div className="fixed top-0 left-0 h-[2px] scroll-line z-[60]"
     style={{ width: `${progress * 100}%` }} />
```

### 5.5 Smooth scrolling

`html { scroll-behavior: smooth }` is set in `index.css`. The pill-nav buttons call
`element.scrollIntoView({ behavior: 'smooth', block: 'start' })` to jump between sections.

---

## 6. Customising content

All copy lives in **`src/App.jsx`** at the top of the file as plain JS constants:

| Constant        | What it controls                                                    |
| --------------- | ------------------------------------------------------------------- |
| `sections`      | Section IDs, nav labels, eyebrows, and the background image per section. |
| `processCards`  | The 4 "Process" section cards (icon + title + body).                |
| `workCards`     | The 3 "Work" section cards (icon + tag + title + body).             |
| `stackCards`    | The 4 stack/capability badges in the Stack section.                 |

The rest — hero headline, contact details, footer — is hardcoded in JSX inside `App.jsx`. Search
for `mailto:` or `tel:` to find the contact CTAs.

The cinematic background imagery is referenced via `src/data.js`. Change those URLs (or replace
them with local imports) to swap the five shots.

---

## 7. Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub** (already done)
   ```bash
   git add .
   git commit -m "Update deployment config"
   git push
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repo: `Govind-13/portfolio-_Govindan`
   - Vercel auto-detects Vite + React
   - **Build Command**: `npm run build` ✅ (auto-filled)
   - **Output Directory**: `dist` ✅ (auto-filled)
   - Click "Deploy"

3. **Add Environment Variables** (if using backend)
   - In Vercel Dashboard → Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend.railway.app/api`
   - Redeploy

4. **Get your frontend URL**
   - e.g., `https://portfolio-govindan.vercel.app`

### Backend Deployment (Railway)

**Important:** The backend is now deployable separately from the frontend.

1. **Prepare MongoDB** (free tier available)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Copy your connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`
   - Create database: `portfolio`
   - Create collection: `users`, `projects`, `contacts`

2. **Deploy on Railway**
   - Go to https://railway.app/dashboard
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `Govind-13/portfolio-_Govindan`
   - Railway auto-detects the backend in `/server` (uses Nixpacks)
   - Click "Deploy"

3. **Configure Environment Variables on Railway**
   - In Railway Dashboard, go to "Variables" tab
   - Add each from `server/.env.example`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=generate_a_strong_random_string_here_at_least_32_chars
   NODE_ENV=production
   PORT=leave_blank_or_5000 (Railway auto-assigns)
   FRONTEND_URL=https://portfolio-govindan.vercel.app
   EMAIL_USER=your_email@gmail.com (optional)
   EMAIL_PASSWORD=your_app_password (optional)
   ```
   - Save variables and redeploy

4. **Get your backend URL**
   - e.g., `https://portfolio-backend.up.railway.app`

5. **Test the API**
   ```bash
   curl https://portfolio-backend.up.railway.app/api/health
   # → {"message":"Server is running"}
   ```

6. **Connect Frontend to Backend**
   - In Vercel, update env var:
     ```
     VITE_API_URL=https://portfolio-backend.up.railway.app/api
     ```
   - Redeploy frontend

### Admin Dashboard
After backend is live:
- **Login**: `https://portfolio-govindan.vercel.app/admin/login`
- **Dashboard**: `https://portfolio-govindan.vercel.app/admin/dashboard` (protected)
- Default admin can be created via backend (see `server/DEPLOYMENT.md`)

---

## 8. Real portfolio content (current)

This is what the page actually says today, sourced from Govindan R's résumé:

### Hero
- **Eyebrow**: Govindan R · Motion · Content · AI
- **Headline**: Motion-led design for digital learning.
- **Body**: graphic designer + content administrator based in Chennai, working with ed-tech and
  training teams since 2022.

### Process (4 cards)
1. **Concept & Storyboard** — Photoshop references, structure, frame plans.
2. **Motion Build** — Adobe Animate (vector/cell) + After Effects (compositing, kinetic type).
3. **Audio & Edit** — Audacity + Sound Forge for VO cleanup and sound design.
4. **Automate & Deliver** — Python scripts for batch processing; final cuts published to Edmingle LMS.

### Work (3 lanes)
1. **E-Learning Modules** — course videos, intros, micro-lessons.
2. **Brand & Identity** — Photoshop-led social, decks, brand collateral.
3. **AI + Automation** — ChatGPT for drafts, n8n for workflows, Python for content-ops.

### Stack
- **Adobe** — Animate, After Effects, Photoshop
- **Audacity** — Audio editing & sound design
- **Python** — Content + workflow automation
- **n8n + AI** — ChatGPT, Google Labs, automation

Plus three credential panels:
- **Current Role** — Graphic Designer & Content Administrator · Promath Technology Pvt Ltd ·
  T. Nagar, Chennai · June 2022 – Present
- **Education** — B.Tech (Information Technology) · Roever Engineering College · Anna University ·
  2014 · CGPA 6.92
- **Code & Languages** — HTML · CSS · JavaScript · PHP · SQL · Tamil (Native) · English (Proficient)

### Contact
- **Email** — govindan.ramu93@gmail.com
- **Phone** — +91 96268 27280
- **LinkedIn** — Govindan Ramu
- **Location** — Velur, Tamil Nadu

---

## 9. Design system (Obsidian Gallery)

The Tailwind theme in `tailwind.config.js` is the canonical implementation of the Obsidian Gallery
design tokens shared with the static HTML mockups one directory up.

| Token                | Hex / value | Used for                                   |
| -------------------- | ----------- | ------------------------------------------ |
| `background`         | `#131315`   | Page background                            |
| `surface-container-lowest` | `#0e0e10` | Deepest surface (footer)                  |
| `surface`            | `#131315`   | Default surface                            |
| `secondary-container`| `#7000ff`   | Neon violet accent (CTAs)                  |
| `tertiary`           | `#00daf8`   | Electric cyan accent (focus, hover, glow)  |
| `on-surface`         | `#e4e2e4`   | Body text                                  |
| `on-surface-variant` | `#c7c6ca`   | Muted text                                 |

Custom utility classes in `src/index.css`:
- `.glass-border` — 1px gradient border via padding-box / border-box clipping
- `.neon-glow` — cyan box-shadow at 30% opacity (for hover/active states)
- `.scroll-line` — cyan + glow used by the top progress bar

Fonts:
- **Syne** 700/800 → headlines (`font-display-lg`, `font-display-lg-mobile`, `font-headline-md`)
- **Hanken Grotesk** 400/600 → body (`font-body-lg`, `font-body-md`)
- **JetBrains Mono** 500 → labels, chips, nav text (`font-label-mono`)

---

## 10. Build process summary (how this was made)

1. **Reference analysis** — Extracted 16 evenly spaced frames from the Aura screen-recording
   reference (`Screen Recording 2026-05-08 142948.mp4`) using `imageio` to map the animation flow:
   five sections, fixed cinematic background, sticky pill nav, fade-up content reveals.

2. **Design adaptation** — Kept the existing Obsidian Gallery palette and typography from the
   `stitch_3d_design_showcase` mockups. Reused the existing cinematic image URLs in `src/data.js`
   for the cross-fading background layers.

3. **Build (no new deps)**:
   - `useScrollProgress` hook — rAF-throttled 0..1 scroll fraction.
   - `useInView` hook — generic `IntersectionObserver` wrapper.
   - `CinematicBackground` — five stacked `<img>` layers, opacity = `max(0, 1 - |progress·4 − i|)`.
   - `PillNav` — fixed floating glass nav with scroll-spy active state.
   - `Reveal` — fade-up wrapper with staggered `transitionDelay`.
   - `App.jsx` — five `min-h-screen` sections wired up with refs and an `IntersectionObserver`
     that tracks the active section.

4. **Verification** — Used the Vite dev server + browser preview to confirm:
   - Background cross-fade: at `progress = 0.5` → `[0, 0, 1, 0, 0]`;
     at `progress = 0.625` → `[0, 0, 0.5, 0.5, 0]`. ✅
   - Active nav highlight tracks the section in the middle of the viewport. ✅
   - All five sections render with their intended cards. ✅
   - No console errors after a clean reload. ✅

5. **Personalisation** — Replaced placeholder copy with Govindan R's actual résumé details:
   work history, education, contact, and the real tool stack (Adobe Animate, After Effects,
   Photoshop, Audacity, Python, n8n).

---

## 11. License

Portfolio content © 2026 Govindan R. The animation scaffold is fine to reuse for personal portfolio
work — credit appreciated.
