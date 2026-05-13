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

```bash
cd gr-studio-landing
npm install            # only the first time
npm run dev            # local dev server with HMR at http://localhost:5173/
npm run build          # production build into dist/
npm run preview        # preview the production build
```

There is **no test runner, linter, or formatter** configured — keep it that way unless you have a real
reason to add one.

---

## 4. Project layout

```
gr-studio-landing/
├── index.html                       # Loads Google Fonts + Material Symbols, mounts <App />
├── package.json                     # Dev/build scripts and deps
├── tailwind.config.js               # Obsidian Gallery design tokens (canonical)
├── postcss.config.js
├── vite.config.js
├── public/
│   └── profile-headshot.png         # Static asset served from /
└── src/
    ├── main.jsx                     # ReactDOM mount point
    ├── App.jsx                      # The entire page (all sections inline)
    ├── data.js                      # Cinematic image URLs (used as backgrounds)
    ├── index.css                    # Base styles, glass-border, neon-glow, scroll-line
    ├── components/
    │   ├── CinematicBackground.jsx  # The cross-fading bg layer
    │   ├── PillNav.jsx              # Floating glass pill nav (top, fixed)
    │   ├── Reveal.jsx               # Fade-up wrapper driven by IntersectionObserver
    │   └── Icon.jsx                 # Material Symbols Outlined wrapper
    └── hooks/
        ├── useScrollProgress.js     # rAF-throttled 0..1 scroll progress
        └── useInView.js             # Generic intersection-observer hook
```

---

## 5. How the animation works

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

## 6. How to customise content

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

## 7. Real portfolio content (current)

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

## 8. Design system (Obsidian Gallery)

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

## 9. Build process summary (how this was made)

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

## 10. License

Portfolio content © 2026 Govindan R. The animation scaffold is fine to reuse for personal portfolio
work — credit appreciated.
