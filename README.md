> **NOTE TO SELF — Do not change this README until the end of the project. I am actively updating everything I am doing here as I build.**

---

# CoderV — Python Learning Platform

A structured, interactive platform for learning Python through bug-fix labs, code visualisation, data structures, algorithms, system design, a HTML/CSS/JS sandbox, quizzes, and an AI assistant.

---

## Live URLs

| Service  | URL |
|----------|-----|
| Frontend | https://coder-v.vercel.app |
| Backend  | https://coderv.onrender.com |
| Backend source (separate repo) | https://github.com/chauhanavi21/coderv-backend |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| React Router DOM 7 | Client-side routing |
| Vite 7 | Build tool / dev server |
| Tailwind CSS 3.4 | Styling, dark/light mode (`class` strategy) |
| Firebase JS SDK v12 | Authentication (email/password) |
| Supabase JS SDK v2 | Direct DB queries if needed |
| lucide-react | Icon set |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express 4 | REST API server |
| Firebase Admin SDK v13 | Verify Firebase ID tokens on every protected request |
| Supabase JS SDK | Data storage (users, progress, lessons, quizzes) via service role key |
| OpenAI SDK v6 | AI quiz hints + general "Ask AI" assistant (`gpt-4o-mini` by default) |
| Python (`sys.settrace`) | Dynamic code tracer — runs user code step-by-step |

### Hosting
| Service | What runs there |
|---------|----------------|
| Vercel | Frontend (auto-deploys on push to `main`) |
| Render | Backend Express server (auto-deploys from the backend repo) |
| Firebase | Authentication |
| Supabase | PostgreSQL database |
| OpenAI | LLM provider for AI hints and chat |

---

## Architecture

```
Browser (React)
  │
  ├── Firebase Auth SDK
  │     └── signIn / signUp / getIdToken()
  │
  ├── LessonsContext  → GET /api/lessons (registry + all modules eagerly cached)
  │
  ├── WebLab contexts (UI customize + dashboard "hack") — local-only React state
  │
  └── fetch() with  Authorization: Bearer <firebase-id-token>
        │
        ▼
  Express Backend (Render)
        │
        ├── requireAuth middleware
        │     └── firebase-admin.auth().verifyIdToken(token)
        │           populates req.auth = { userId, email, name }
        │
        ├── /api/users/sync       → upsert user row in Supabase
        ├── /api/progress         → read / write / reset user_progress rows
        ├── /api/trace            → run Python tracer subprocess (validateCode mw)
        ├── /api/lessons          → lesson registry + module detail from DB
        ├── /api/examples/:id     → full example (steps, quiz, nodes, edges)
        ├── /api/quizzes          → extra quiz listing + per-quiz questions + attempts
        ├── /api/ai/quiz-hint     → Socratic hint for the current quiz question
        ├── /api/ai/chat          → general "Ask AI" tutor with progress context
        └── /api/health           → status check
              │
              ├── OpenAI (chat completions)
              │
              ▼
        Supabase (PostgreSQL)
              ├── users                  (Firebase UID as PK)
              ├── user_progress          (lesson completion tracking)
              ├── lesson_types           (6 lesson types)
              ├── difficulties           (difficulty levels per lesson)
              ├── examples               (Python code + metadata)
              ├── example_steps          (trace steps for the visualizer)
              ├── quiz_questions         (in-lesson quiz questions)
              ├── quiz_options           (A/B/C/D answer options)
              ├── graph_nodes / edges    (visualizer concept-graph data)
              ├── extra_quizzes          (timed practice quizzes)
              ├── extra_quiz_questions   (questions per extra quiz)
              ├── extra_quiz_options     (options per question)
              └── extra_quiz_attempts    (user quiz results)
```

---

## Repository Structure

```
CoderV/
├── frontend/              # React + Vite app (deployed to Vercel)
│   ├── src/
│   │   ├── contexts/      # AuthContext, ThemeContext, LessonsContext,
│   │   │                  # WebLabUiCustomizeContext, WebLabDashboardHackContext
│   │   ├── components/    # Sidebar, Topbar, ProtectedRoute, StepVisualizer,
│   │   │                  # QuizSection, QuizAiBot, AssistantMessage,
│   │   │                  # GraphPreview, ScrollToTop, SkeletonCard,
│   │   │                  # ErrorBoundary, AppLayout
│   │   ├── pages/         # Login, Signup, Dashboard, LessonsLanding,
│   │   │                  # Lesson, LessonDetail, LessonPractice,
│   │   │                  # BugFixLab, WebCustomizeLab, GraphModule,
│   │   │                  # Playground, Quiz, QuizTake, AiAssistant,
│   │   │                  # Profile, About, Resources, NotFound
│   │   ├── hooks/         # useProgress (localStorage cache + Supabase sync)
│   │   ├── api/           # visualizer.js, lessons.js — raw fetch wrappers
│   │   ├── lib/           # firebase.js, supabase.js, api.js
│   │   ├── utils/         # lessonProgressGates.js, scopeCssToSelector.js
│   │   └── data/          # lessonModules.js (seed source — not used at runtime)
│   └── public/            # static assets + milestone PDFs
│
├── backend/               # Express server (separate GitHub repo, on Render)
│   ├── src/
│   │   ├── config/        # supabase.js, firebase.js (Admin SDK init)
│   │   ├── middleware/    # auth.js (requireAuth), validate.js (validateCode)
│   │   ├── controllers/   # traceController, progressController, userController,
│   │   │                  # lessonController, quizController, aiController
│   │   ├── models/        # progressModel, userModel, lessonModel, quizModel
│   │   ├── routes/        # health, trace, progress, user, lesson, quiz, ai
│   │   ├── services/      # openaiClient.js, pythonTracer.js
│   │   └── app.js         # Express app setup, CORS, route mounting
│   ├── tracer.py          # Python sys.settrace code visualiser
│   ├── server.js          # Entry point
│   ├── seed.js            # One-time: populates lesson data from lessonModules.js
│   ├── seedQuizzes.js     # One-time: populates extra practice quizzes
│   └── .env.example
│
├── supabase/
│   └── schema.sql         # Full DB schema — run once in Supabase SQL Editor
│
└── vercel.json            # Vercel SPA routing config
```

---

## Authentication Flow

1. User signs up / logs in via the custom form on `/signup` or `/login`
2. Firebase issues an **ID token** (JWT, auto-refreshes every hour)
3. Frontend attaches the token to every protected API call: `Authorization: Bearer <token>`
4. Backend verifies the token with Firebase Admin SDK → extracts `uid`
5. After signup/login the frontend calls `POST /api/users/sync` to upsert the user into Supabase so the FK on `user_progress` is always satisfied

---

## Database Tables (Supabase)

| Table | Purpose |
|-------|---------|
| `users` | One row per user — Firebase UID, email, name. Synced on every login/signup |
| `user_progress` | Every completed example: `user_id + lesson_id + difficulty + example_id` |
| `lesson_types` | The 6 lesson modules — title, color, description, summary, available flag |
| `difficulties` | Difficulty levels per lesson type (beginner / easy / medium / hard, etc.) |
| `examples` | Python code, explanation, concept, challenge — one row per example |
| `example_steps` | Trace steps per example — line number, description, `action` JSONB |
| `quiz_questions` | In-lesson quiz questions tied to an example |
| `quiz_options` | A/B/C/D answer choices for each `quiz_question` |
| `graph_nodes` | Nodes for the concept graph shown in the visualizer |
| `graph_edges` | Edges connecting graph nodes |
| `extra_quizzes` | Timed practice quizzes — title, icon, difficulty, time limit (seconds) |
| `extra_quiz_questions` | Questions per extra quiz |
| `extra_quiz_options` | A/B/C/D options per extra quiz question |
| `extra_quiz_attempts` | Every quiz attempt a user takes — score, total, time taken, timestamp |

---

## Lesson Modules

All lesson modules are stored in Supabase (seeded from `lessonModules.js`).
The app currently ships **6 modules**:

| # | Lesson ID | Title | Theme |
|---|-----------|-------|-------|
| 1 | `basics`   | Basics to Know (Bug Fix Lab) | Fix broken Python — indentation, ranges, missing colons, off-by-one bugs |
| 2 | `type-1`   | Python Step Visualizer | Variables, loops, functions, classes — animated execution |
| 3 | `type-2`   | Data Structures Explorer | Lists, stacks, queues, dictionaries |
| 4 | `type-3`   | Algorithm Patterns | Searching, sorting, recursion, two pointers |
| 5 | `type-4`   | System Design Basics | Caching, load balancing, API patterns |
| 6 | `web-lab`  | Customize the Website | Live HTML/CSS sandbox for the real sidebar + a JS "hack" of dashboard scores (local-only, not saved) |

Each numbered lesson type has multiple difficulties and several examples per difficulty.

---

## Environment Variables

### Frontend (`frontend/.env.local` — never commit)
```
VITE_API_URL=https://coderv.onrender.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Backend (`backend/.env` — never commit)
```
PORT=3001
PYTHON_CMD=python
ALLOWED_ORIGINS=https://coder-v.vercel.app,http://localhost:5173

# Firebase Admin
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Supabase
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...

# OpenAI (Quiz AI Bot + Ask AI assistant)
OPENAI_API_KEY=sk-...
# Optional — defaults to gpt-4o-mini
# OPENAI_MODEL=gpt-4o-mini
```

---

## Running Locally

```bash
# Frontend
cd frontend
npm install
npm run dev        # http://localhost:5173

# Backend
cd backend
npm install
npm run dev        # node --watch server.js  (http://localhost:3001 by default)

# One-time database seed (run after schema.sql is applied in Supabase)
node seed.js         # Lesson data (6 lesson types, examples, steps, quizzes, graphs)
node seedQuizzes.js  # Extra practice quizzes
```

---

## Backend API Endpoints

| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| GET    | `/api/health` | No | Service health check (reports python / supabase / firebase config) |
| POST   | `/api/users/sync` | Yes | Upsert Firebase user into Supabase |
| GET    | `/api/progress` | Yes | Get user's completed examples |
| POST   | `/api/progress/complete` | Yes | Mark an example as complete |
| DELETE | `/api/progress/reset` | Yes | Wipe the user's progress |
| POST   | `/api/trace` | No | Run Python code through tracer (validated by `validateCode`) |
| GET    | `/api/lessons` | No | All lesson types (registry) |
| GET    | `/api/lessons/:lessonId` | No | Lesson detail with difficulties + example titles |
| GET    | `/api/examples/:exampleId` | No | Full example (steps, quiz, nodes, edges) |
| GET    | `/api/quizzes` | No | All extra practice quizzes |
| GET    | `/api/quizzes/:quizId` | No | Quiz with all questions and options |
| POST   | `/api/quizzes/:quizId/submit` | Yes | Save quiz attempt result |
| GET    | `/api/quizzes/my-attempts` | Yes | User's past quiz attempts |
| POST   | `/api/ai/quiz-hint` | Yes | Socratic hint for the current quiz question (never reveals the answer) |
| POST   | `/api/ai/chat` | Yes | General "Ask AI" tutor with progress + route context |

---

## Features Built

### Authentication & Users
- [x] User authentication — Firebase email + password, custom UI
- [x] User data sync to Supabase on login and signup (`/api/users/sync`)
- [x] Protected routes — redirect to `/login` if not authenticated
- [x] `AuthContext` with `user`, `loading`, `getToken`, `signOut`

### UI & Theme
- [x] Dark / Light mode toggle — persists to `localStorage`, on all pages
- [x] Consistent design system (`hairline`, `mono`, `bg-elevated`, `text-fg`, …) shared across pages
- [x] Loading skeleton system — `SkeletonCard`, `SkeletonHero`, `SkeletonList`
- [x] Global error boundary — friendly fallback UI for runtime JS errors
- [x] 404 Not Found page with "Go back" button
- [x] Mobile-responsive visualizer — Code / Graph & Vars tab switcher on small screens
- [x] Consistent header tabs across pages
- [x] `ScrollToTop` route helper — resets scroll on every navigation

### Lessons & Learning (fully dynamic from Supabase)
- [x] `LessonsContext` — eagerly fetches all module data on boot, caches for instant progress calculations
- [x] **Lesson 1 — Basics to Know (Bug Fix Lab)** — debug broken Python and run it to verify
- [x] **Lesson 2 — Python Step Visualizer**
- [x] **Lesson 3 — Data Structures Explorer**
- [x] **Lesson 4 — Algorithm Patterns**
- [x] **Lesson 5 — System Design Basics**
- [x] **Lesson 6 — Customize the Website (Web Lab)** — live HTML/CSS edits scoped to the real sidebar via `scopeCssToSelector`, plus a JavaScript "hack" stage that mutates dashboard scores client-side
- [x] Difficulty progression (Beginner → Easy → Medium → Hard) gated by `lessonProgressGates`
- [x] Visualize-first then quiz — quiz unlocks after interacting with the visualizer
- [x] Examples fetched on-demand from `/api/examples/:id` (no hardcoded data at runtime)
- [x] Graph module page (`GraphModule.jsx`) and `GraphPreview` component for tree/graph visualisations

### Progress Tracking
- [x] `useProgress` hook — uses `LessonsContext` for totals (no hardcoded modules)
- [x] `localStorage` fast cache layer — hydrates instantly on page load
- [x] Supabase sync — progress persisted to backend on `markComplete`
- [x] `progressLoading` state — skeleton shown while remote data loads
- [x] Reset progress endpoint (`DELETE /api/progress/reset`)

### Dashboard & Profile
- [x] Dynamic dashboard hero with real progress percentage (conic-gradient ring)
- [x] Quick stats row (completed, remaining, total, percent)
- [x] "Continue Learning" section — only lessons the user has started
- [x] **Profile page** (`/profile`) — avatar/initials, account meta (joined, last sign-in, provider), learning stats, in-progress + completed lessons, sign out
- [x] "No lessons started yet" placeholder card with Browse Lessons CTA

### Python Visualizer (Playground)
- [x] Step-by-step code execution using `sys.settrace` in `tracer.py`
- [x] `locals` snapshot captured at every step
- [x] 3-panel layout — code (highlighted line), variables table, concept graph
- [x] Quick-example buttons
- [x] "Waking backend…" cold-start status for Render free tier
- [x] Server-side input validation via `validateCode` middleware

### Extra Practice Quizzes
- [x] Timed quizzes fully stored in Supabase (seeded via `seedQuizzes.js`)
- [x] Quiz listing page (`/quiz`) — fetches live from DB, shows count/difficulty/time
- [x] Quiz-taking page (`/quiz/:id`) with 3 phases: Ready → Active → Results
- [x] Countdown timer — auto-submits when time runs out, red pulse when ≤ 30s
- [x] Per-question instant feedback — correct (green) / incorrect (red) after each answer
- [x] Score ring on results screen with percentage, grade label, full answer review
- [x] Attempt saved to `extra_quiz_attempts` in Supabase after finish
- [x] "Try Again" resets the quiz; "All Quizzes" returns to listing

### AI Assistant (live)
- [x] **Quiz AI Bot** (`QuizAiBot.jsx`) — opens beside any in-lesson quiz question; gives Socratic hints via `POST /api/ai/quiz-hint` and is hard-prompted **never to reveal the answer letter or text**
- [x] **Ask AI** page (`/ai`) — general programming tutor at `POST /api/ai/chat`
- [x] Sends the user's progress + available app routes to the model so replies can include in-app deep links (e.g. `[Try Algorithm Patterns – Medium](/lessons/type-3/medium)`)
- [x] Strict topic policy — politely refuses off-topic questions and steers back to coding
- [x] Renders model output via `AssistantMessage` (markdown, code blocks, inline action links)

### Backend (MVC)
- [x] Express app with MVC structure — config / middleware / controllers / models / routes / services
- [x] Firebase Admin SDK token verification middleware (`requireAuth`)
- [x] `validateCode` middleware for the tracer endpoint
- [x] `lessonModel` + `lessonController` + `lessonRoutes` — full lesson API
- [x] `quizModel` + `quizController` + `quizRoutes` — full quiz API with attempt saving
- [x] `aiController` + `aiRoutes` + `services/openaiClient.js` — OpenAI-backed quiz hints + chat
- [x] `services/pythonTracer.js` — wraps the Python tracer subprocess
- [x] `seed.js` — one-time migration from `lessonModules.js` → Supabase
- [x] `seedQuizzes.js` — one-time seed for extra practice quizzes

---

## What's Left

### High Priority
- [ ] **More AI-powered review** — surface hints/explanations after a wrong quiz answer in the extra quizzes flow
- [ ] **Graph / Tree Explorer lesson** — flesh out the dedicated `GraphModule` page with full traversal walkthroughs

### Medium Priority
- [ ] **Streak tracking** — daily login streak saved to Supabase, shown on dashboard / profile
- [ ] **Lesson search / filter** — filter by difficulty or topic on the Lessons landing page
- [ ] **Quiz leaderboard** — show top scores per quiz across all users
- [ ] **Backend cold-start fix** — Render free tier sleeps after inactivity; add a keep-alive ping

### Nice to Have
- [ ] **Bookmarks** — save favourite examples to revisit
- [ ] **Share snippet** — share a visualizer state via URL
- [ ] **Export progress** — download progress as PDF or CSV
- [ ] **PWA / mobile app** — installable offline-capable version
