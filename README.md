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
│   │   ├── components/    # Sidebar, Topbar, ProtectedRoute, …
│   │   ├── pages/         # Login, Signup, Dashboard, Lessons, Playground, …
│   │   ├── hooks/         # useProgress (syncs with backend)
│   │   ├── lib/           # firebase.js config, api.js fetch wrapper
│   │   └── data/          # Lesson modules / registry
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
│   ├── tracer.py          # Python sys.settrace code visualiser
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

## Features Built So Far

- [x] User authentication (Firebase — email + password, custom UI)
- [x] User data sync to Supabase on login/signup
- [x] Protected routes (redirect to /login if not authenticated)
- [x] Dark / Light mode toggle (persists to localStorage)
- [x] Python code visualiser (step-by-step using `sys.settrace`)
- [x] Lesson system with difficulties and examples
- [x] User progress tracking (localStorage + Supabase sync)
- [x] Dashboard with progress ring
- [x] Sidebar navigation with user avatar
- [ ] Quiz system (in progress)
- [ ] AI assistant (in progress)
- [ ] More lesson types (in progress)
