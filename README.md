> **NOTE TO SELF — Do not change this README until the end of the project. I am actively updating everything I am doing here as I build.**

---

# CoderV — Python Learning Platform

A structured, interactive platform for learning Python through lessons, code visualisation, quizzes, and AI assistance.

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

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| Firebase Admin SDK | Verify Firebase ID tokens on every protected request |
| Supabase JS SDK | Data storage (users, progress, lessons, quizzes) via service role key |
| Python (`sys.settrace`) | Dynamic code tracer — runs user code step-by-step |

### Hosting
| Service | What runs there |
|---------|----------------|
| Vercel | Frontend (auto-deploys on push to `main`) |
| Render | Backend Express server (auto-deploys from the backend repo) |
| Firebase | Authentication |
| Supabase | PostgreSQL database |

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
        ├── /api/progress         → read / write user_progress rows
        ├── /api/trace            → run Python tracer subprocess
        ├── /api/lessons          → lesson registry + module detail from DB
        ├── /api/examples/:id     → full example (steps, quiz, nodes, edges)
        ├── /api/quizzes          → extra quiz listing + per-quiz questions
        └── /api/health           → status check
              │
              ▼
        Supabase (PostgreSQL)
              ├── users                  (Firebase UID as PK)
              ├── user_progress          (lesson completion tracking)
              ├── lesson_types           (4 lesson types)
              ├── difficulties           (16 difficulty levels)
              ├── examples               (80 examples)
              ├── example_steps          (~900 trace steps)
              ├── quiz_questions         (240 lesson quiz questions)
              ├── quiz_options           (960 answer options)
              ├── graph_nodes / edges    (visualizer graph data)
              ├── extra_quizzes          (6 timed practice quizzes)
              ├── extra_quiz_questions   (60 questions)
              ├── extra_quiz_options     (240 options)
              └── extra_quiz_attempts    (user quiz results)
```

---

## Repository Structure

```
final_sem/
├── frontend/              # React + Vite app (deployed to Vercel)
│   ├── src/
│   │   ├── contexts/      # AuthContext (Firebase), ThemeContext, LessonsContext
│   │   ├── components/    # Sidebar, Topbar, ProtectedRoute, StepVisualizer,
│   │   │                  # QuizSection, SkeletonCard, ErrorBoundary, AppLayout
│   │   ├── pages/         # Login, Signup, Dashboard, Lessons, LessonDetail,
│   │   │                  # LessonPractice, Playground, Quiz, QuizTake,
│   │   │                  # About, Resources, AiAssistant, NotFound
│   │   ├── hooks/         # useProgress (localStorage cache + Supabase sync)
│   │   ├── api/           # visualizer.js, lessons.js — raw fetch wrappers
│   │   ├── lib/           # firebase.js, supabase.js, api.js
│   │   └── data/          # lessonModules.js (seed source — not used at runtime)
│   └── .env.example
│
├── backend/               # Express server (separate GitHub repo, on Render)
│   ├── src/
│   │   ├── config/        # supabase.js, firebase.js (Admin SDK init)
│   │   ├── middleware/     # auth.js (requireAuth — Firebase token verify)
│   │   ├── controllers/   # traceController, progressController,
│   │   │                  # userController, lessonController, quizController
│   │   ├── models/        # progressModel, userModel, lessonModel, quizModel
│   │   ├── routes/        # all route files
│   │   └── app.js         # Express app setup, CORS, route mounting
│   ├── tracer.py          # Python sys.settrace code visualiser
│   ├── server.js          # Entry point
│   ├── seed.js            # One-time: populates lesson data from lessonModules.js
│   ├── seedQuizzes.js     # One-time: populates 6 extra practice quizzes
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
3. Frontend attaches the token to every API call: `Authorization: Bearer <token>`
4. Backend verifies the token with Firebase Admin SDK → extracts `uid`
5. After signup/login the frontend calls `POST /api/users/sync` to upsert the user into Supabase so the FK on `user_progress` is always satisfied

---

## Database Tables (Supabase)

| Table | Purpose |
|-------|---------|
| `users` | One row per user — Firebase UID, email, name. Synced on every login/signup |
| `user_progress` | Every completed example: `user_id + lesson_id + difficulty + example_id` |
| `lesson_types` | The 4 lesson types — title, color, description, summary |
| `difficulties` | 4 difficulties per lesson type (beginner / easy / medium / hard) |
| `examples` | 80 examples — Python code, explanation, concept, challenge |
| `example_steps` | ~900 trace steps per example — line number, description, `action` JSONB |
| `quiz_questions` | 3 questions per example = 240 rows — question text + correct answer index |
| `quiz_options` | 4 options per question = 960 rows — the A/B/C/D answer choices |
| `graph_nodes` | Nodes for the concept graph shown in the visualizer |
| `graph_edges` | Edges connecting graph nodes |
| `extra_quizzes` | 6 timed practice quizzes — title, icon, difficulty, time limit (seconds) |
| `extra_quiz_questions` | 10 questions per extra quiz = 60 rows |
| `extra_quiz_options` | 4 options per question = 240 rows |
| `extra_quiz_attempts` | Every quiz attempt a user takes — score, total, time taken, timestamp |

---

## Lesson Modules

All 4 lesson types are stored in Supabase (seeded from `lessonModules.js`).
Each type has **4 difficulties × 5 examples = 20 examples** (80 total).

| # | Lesson Type | Theme |
|---|-------------|-------|
| 1 | Python Step Visualizer | Variables, loops, functions, recursion |
| 2 | Data Structures Explorer | Lists, stacks, queues, dictionaries |
| 3 | Algorithm Patterns | Searching, sorting, recursion, two pointers |
| 4 | System Design Basics | Caching, load balancing, API patterns, advanced patterns |

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
PORT=5000
PYTHON_CMD=python
ALLOWED_ORIGINS=https://coder-v.vercel.app,http://localhost:5173
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
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
node server.js     # http://localhost:5000

# One-time database seed (run after schema.sql is applied in Supabase)
node seed.js         # Lesson data (4 types, 80 examples)
node seedQuizzes.js  # Extra quiz data (6 quizzes, 60 questions)
```

---

## Backend API Endpoints

| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| GET | `/api/health` | No | Service health check |
| POST | `/api/users/sync` | Yes | Upsert Firebase user into Supabase |
| GET | `/api/progress` | Yes | Get user's completed examples |
| POST | `/api/progress/complete` | Yes | Mark an example as complete |
| POST | `/api/trace` | No | Run Python code through tracer |
| GET | `/api/lessons` | No | All lesson types (registry) |
| GET | `/api/lessons/:lessonId` | No | Lesson detail with difficulties + example titles |
| GET | `/api/examples/:exampleId` | No | Full example (steps, quiz, nodes, edges) |
| GET | `/api/quizzes` | No | All extra practice quizzes |
| GET | `/api/quizzes/:quizId` | No | Quiz with all questions and options |
| POST | `/api/quizzes/:quizId/submit` | Yes | Save quiz attempt result |
| GET | `/api/quizzes/my-attempts` | Yes | User's past quiz attempts |

---

## Features Built ✅

### Authentication & Users
- [x] User authentication — Firebase email + password, custom UI
- [x] User data sync to Supabase on login and signup (`/api/users/sync`)
- [x] Protected routes — redirect to `/login` if not authenticated
- [x] `AuthContext` with `user`, `loading`, `getToken`, `signOut`

### UI & Theme
- [x] Dark / Light mode toggle — persists to `localStorage`, on all pages
- [x] Consistent white-card text — all white-background cards force `text-gray-900`
- [x] Loading skeleton system — `SkeletonCard`, `SkeletonHero`, `SkeletonList`
- [x] Global error boundary — friendly fallback UI for runtime JS errors
- [x] 404 Not Found page with "Go back" button
- [x] Mobile-responsive visualizer — Code / Graph & Vars tab switcher on small screens
- [x] Consistent header tabs — "Resources" label unified across all pages

### Lessons & Learning (fully dynamic from Supabase)
- [x] `LessonsContext` — eagerly fetches all module data on boot, caches for instant progress calculations
- [x] **Lesson Type 1 — Python Step Visualizer** (20 examples)
- [x] **Lesson Type 2 — Data Structures Explorer** (20 examples)
- [x] **Lesson Type 3 — Algorithm Patterns** (20 examples)
- [x] **Lesson Type 4 — System Design Basics** (20 examples)
- [x] Difficulty progression (Beginner → Easy → Medium → Hard)
- [x] Visualize-first then quiz — quiz unlocks after interacting with visualizer
- [x] Examples fetched on-demand from `/api/examples/:id` (no more hardcoded data at runtime)

### Progress Tracking
- [x] `useProgress` hook — uses `LessonsContext` for totals (no hardcoded modules)
- [x] `localStorage` fast cache layer — hydrates instantly on page load
- [x] Supabase sync — progress persisted to backend on `markComplete`
- [x] `progressLoading` state — skeleton shown while remote data loads
- [x] Progress calculations wait for module cache before showing stats (fixes false 100%)

### Dashboard
- [x] Dynamic hero with real progress percentage (conic-gradient ring)
- [x] Quick stats row (completed, remaining, total, percent)
- [x] "Continue Learning" section — only lessons the user has started
- [x] "No lessons started yet" placeholder card with Browse Lessons CTA

### Python Visualizer (Playground)
- [x] Step-by-step code execution using `sys.settrace` in `tracer.py`
- [x] `locals` snapshot captured at every step
- [x] 3-panel layout — code (highlighted line), variables table, concept graph
- [x] 4 quick-example buttons
- [x] "Waking backend…" cold-start status for Render free tier

### Extra Practice Quizzes
- [x] 6 timed quizzes fully stored in Supabase (seeded via `seedQuizzes.js`)
- [x] Quiz listing page (`/quiz`) — fetches live from DB, shows count/difficulty/time
- [x] Quiz-taking page (`/quiz/:id`) with 3 phases: Ready → Active → Results
- [x] Countdown timer — auto-submits when time runs out, red pulse when ≤ 30s
- [x] Per-question instant feedback — correct (green) / incorrect (red) after each answer
- [x] Score ring on results screen with percentage, grade label, full answer review
- [x] Attempt saved to `extra_quiz_attempts` in Supabase after finish
- [x] "Try Again" resets the quiz; "All Quizzes" returns to listing

### Backend (MVC)
- [x] Express app with MVC structure — config / middleware / controllers / models / routes
- [x] Firebase Admin SDK token verification middleware (`requireAuth`)
- [x] `lessonModel` + `lessonController` + `lessonRoutes` — full lesson API
- [x] `quizModel` + `quizController` + `quizRoutes` — full quiz API with attempt saving
- [x] `seed.js` — one-time migration from `lessonModules.js` → Supabase
- [x] `seedQuizzes.js` — one-time seed for 6 extra practice quizzes

---

## What's Left 🔲

### High Priority
- [ ] **AI Assistant** — currently scaffolded (`AiAssistant.jsx`), needs real LLM API integration (OpenAI / Gemini)
- [ ] **Graph / Tree Explorer lesson (Type 5)** — visualise tree traversals and graph algorithms

### Medium Priority
- [ ] **User profile page** — show name, email, joined date, overall stats
- [ ] **Streak tracking** — daily login streak saved to Supabase, shown on dashboard
- [ ] **Lesson search / filter** — filter by difficulty or topic on the Lessons landing page
- [ ] **Quiz leaderboard** — show top scores per quiz across all users
- [ ] **Backend cold-start fix** — Render free tier sleeps after inactivity; keep-alive ping

### Nice to Have
- [ ] **Bookmarks** — save favourite examples to revisit
- [ ] **Share snippet** — share a visualizer state via URL
- [ ] **Export progress** — download progress as PDF or CSV
- [ ] **PWA / mobile app** — installable offline-capable version
