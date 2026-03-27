> **NOTE TO SELF — Do not change this README until the end of the project. I am actively updating everything I am doing here as I build.**

---

# CoderV — Python Learning Platform

A structured, interactive platform for learning Python through lessons, code visualisation, quizzes, and AI assistance.

---

## Live URLs

| Service  | URL |
|----------|-----|
| Frontend | https://coder-v.vercel.app |
| Backend  | https://coderv-backend.onrender.com |
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
| Supabase JS SDK | Data storage (users, progress) via service role key |
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
  └── fetch() with  Authorization: Bearer <firebase-id-token>
        │
        ▼
  Express Backend (Render)
        │
        ├── requireAuth middleware
        │     └── firebase-admin.auth().verifyIdToken(token)
        │           populates req.auth = { userId, email, name }
        │
        ├── /api/users/sync   → upsert user row in Supabase
        ├── /api/progress     → read / write user_progress rows
        ├── /api/trace        → run Python tracer subprocess
        └── /api/health       → status check
              │
              ▼
        Supabase (PostgreSQL)
              ├── users          (id = Firebase UID)
              └── user_progress  (FK → users.id)
```

---

## Repository Structure

```
final_sem/
├── frontend/              # React + Vite app (deployed to Vercel)
│   ├── src/
│   │   ├── contexts/      # AuthContext (Firebase), ThemeContext
│   │   ├── components/    # Sidebar, Topbar, ProtectedRoute, StepVisualizer,
│   │   │                  # QuizSection, SkeletonCard, ErrorBoundary, …
│   │   ├── pages/         # Login, Signup, Dashboard, Lessons, LessonDetail,
│   │   │                  # LessonPractice, Playground, About, Resources, …
│   │   ├── hooks/         # useProgress (localStorage cache + Supabase sync)
│   │   ├── lib/           # firebase.js config, api.js fetch wrapper
│   │   └── data/          # lessonModules.js — all 4 lesson types, 80 examples
│   └── .env.example       # Documents required VITE_* vars
│
├── backend/               # Express server (separate GitHub repo, on Render)
│   ├── src/
│   │   ├── config/        # supabase.js, firebase.js (Admin SDK init)
│   │   ├── middleware/     # auth.js (requireAuth — Firebase token verify)
│   │   ├── controllers/   # traceController, progressController, userController
│   │   ├── models/        # progressModel, userModel (Supabase queries)
│   │   ├── routes/        # traceRoutes, progressRoutes, userRoutes, healthRoutes
│   │   └── app.js         # Express app setup, CORS, route mounting
│   ├── tracer.py          # Python sys.settrace code visualiser (captures locals)
│   ├── server.js          # Entry point (loads .env, starts server)
│   └── .env.example       # Documents required backend env vars
│
├── supabase/
│   └── schema.sql         # CREATE TABLE statements for users + user_progress
│
└── vercel.json            # Vercel routing config for SPA
```

---

## Authentication Flow

1. User signs up / logs in via the custom form on `/signup` or `/login`
2. Firebase issues an **ID token** (JWT, auto-refreshes every hour)
3. Frontend attaches the token to every API call: `Authorization: Bearer <token>`
4. Backend verifies the token with Firebase Admin SDK → extracts `uid`
5. After signup/login the frontend calls `POST /api/users/sync` to upsert the user into Supabase so the FK on `user_progress` is always satisfied

---

## Database Schema (Supabase)

```sql
-- Users (synced from Firebase on login/signup)
users (
  id          TEXT PRIMARY KEY,   -- Firebase UID
  email       TEXT,
  first_name  TEXT,
  last_name   TEXT,
  image_url   TEXT,
  created_at  TIMESTAMPTZ,
  updated_at  TIMESTAMPTZ
)

-- Learning progress
user_progress (
  id           UUID PRIMARY KEY,
  user_id      TEXT REFERENCES users(id) ON DELETE CASCADE,
  lesson_id    TEXT,
  difficulty   TEXT,
  example_id   TEXT,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id, difficulty, example_id)
)
```

---

## Lesson Modules

All lesson content lives in `frontend/src/data/lessonModules.js`. There are currently **4 lesson types**, each with **4 difficulties × 5 examples = 20 examples** (80 examples total). Every example includes Python code, step-by-step trace, quiz questions, and a concept explanation.

| # | Lesson Type | Difficulties | Theme |
|---|-------------|-------------|-------|
| 1 | Python Step Visualizer | Beginner → Hard | Variables, loops, functions, recursion |
| 2 | Data Structures Explorer | Beginner → Hard | Lists, stacks, queues, dictionaries |
| 3 | Algorithm Patterns | Beginner → Hard | Searching, sorting, recursion, two pointers |
| 4 | System Design Basics | Beginner → Hard | Caching, load balancing, API patterns, advanced patterns |

Progress for all lesson types is tracked in Supabase under `user_progress` using the flexible `lesson_id` + `difficulty` + `example_id` composite key.

---

## Environment Variables

### Frontend (`frontend/.env.local` — never commit)
```
VITE_API_URL=https://coderv-backend.onrender.com
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
```

---

## Features Built ✅

### Authentication & Users
- [x] User authentication — Firebase email + password, custom UI
- [x] User data sync to Supabase on login and signup (`/api/users/sync`)
- [x] Protected routes — redirect to `/login` if not authenticated
- [x] `AuthContext` with `user`, `loading`, `getToken`, `signOut`

### UI & Theme
- [x] Dark / Light mode toggle — persists to `localStorage`, available on all pages including login/signup
- [x] Consistent white-card text visibility — all white-background cards force `text-gray-900` regardless of theme
- [x] Loading skeleton system — `SkeletonCard`, `SkeletonHero`, `SkeletonList` shimmer placeholders
- [x] Global error boundary — catches runtime JS errors and shows a friendly fallback UI
- [x] 404 Not Found page — improved copy and "Go back" button
- [x] Mobile-responsive visualizer — tab switcher (Code / Graph & Vars) on small screens

### Lessons & Learning
- [x] Lesson registry with 4 lesson types, all marked `available: true`
- [x] **Lesson Type 1 — Python Step Visualizer** (20 examples: variables, loops, functions, recursion)
- [x] **Lesson Type 2 — Data Structures Explorer** (20 examples: lists, stacks, queues, dictionaries)
- [x] **Lesson Type 3 — Algorithm Patterns** (20 examples: searching, sorting, recursion, two pointers)
- [x] **Lesson Type 4 — System Design Basics** (20 examples: caching, traffic, API patterns, advanced patterns)
- [x] Difficulty progression within each lesson (Beginner → Easy → Medium → Hard)
- [x] Visualize-first then quiz logic — quiz only appears after first visualizer interaction

### Progress Tracking
- [x] `useProgress` hook — `markComplete`, `isComplete`, `getLessonProgress`, `getTotalProgress`
- [x] `localStorage` as fast cache layer — hydrates instantly on page load
- [x] Supabase sync — progress persisted to backend on `markComplete`
- [x] `progressLoading` state — skeleton shown while remote data loads
- [x] `ensureUser` guard in backend progress controller — auto-upserts user before any write

### Dashboard
- [x] Dynamic hero with real progress percentage (conic-gradient ring)
- [x] Quick stats row (completed lessons, total examples, etc.)
- [x] "Continue Learning" section — only shows lessons the user has started
- [x] "No lessons started yet" placeholder card with Browse Lessons CTA if nothing started

### Python Visualizer (Playground)
- [x] Step-by-step code execution using `sys.settrace` in `tracer.py`
- [x] `locals` snapshot captured at every step
- [x] 3-panel layout — code (highlighted line), variables table, concept graph
- [x] 4 quick-example buttons
- [x] "Waking backend…" cold-start status for Render free tier

### Backend (MVC)
- [x] Express app with MVC structure — config / middleware / controllers / models / routes
- [x] Firebase Admin SDK token verification middleware (`requireAuth`)
- [x] `POST /api/users/sync` — upsert Firebase user into Supabase
- [x] `GET/POST /api/progress` — read and write user progress
- [x] `POST /api/trace` — run Python tracer subprocess
- [x] `GET /api/health` — service health check

---

## What's Left 🔲

### High Priority
- [ ] **AI Assistant** — currently scaffolded (`AiAssistant.jsx`), needs real LLM API integration (e.g. OpenAI / Gemini)
- [ ] **Dynamic quiz questions** — quiz data is currently hardcoded in `lessonModules.js`; a future API + database table would allow adding/editing questions without a redeploy
- [ ] **Graph / Tree Explorer lesson (Type 5)** — visualise tree traversals and graph algorithms with animated node graphs

### Medium Priority
- [ ] **User profile page** — show name, email, joined date, overall stats
- [ ] **Streak tracking** — daily login streak saved to Supabase, shown on dashboard
- [ ] **Lesson search / filter** — filter by difficulty or topic on the Lessons landing page
- [ ] **Backend cold-start fix** — Render free tier sleeps after inactivity; consider upgrading or adding a keep-alive ping

### Nice to Have
- [ ] **Leaderboard** — compare progress with other users
- [ ] **Bookmarks** — save favourite examples to revisit
- [ ] **Share snippet** — share a visualizer state via URL
- [ ] **Export progress** — download progress as PDF or CSV
- [ ] **PWA / mobile app** — installable offline-capable version
