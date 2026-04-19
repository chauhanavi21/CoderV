import { lessonsRegistry, basicsToKnowModule } from '../data/lessonModules.js';

const BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// Lessons whose data is served entirely from the bundled frontend module
// (no Supabase round-trip). Useful for client-only labs like the bug-fix lab.
const LOCAL_LESSON_MODULES = {
  basics: basicsToKnowModule,
};

function buildExampleLookup(module) {
  const lookup = {};
  for (const diffKey of module.difficultyOrder) {
    for (const ex of module.difficulties[diffKey]?.examples || []) {
      lookup[ex.id] = ex;
    }
  }
  return lookup;
}

const LOCAL_EXAMPLE_LOOKUP = Object.values(LOCAL_LESSON_MODULES).reduce((acc, mod) => {
  Object.assign(acc, buildExampleLookup(mod));
  return acc;
}, {});

const LOCAL_REGISTRY_ENTRIES = lessonsRegistry.filter((l) => LOCAL_LESSON_MODULES[l.id]);

/** GET /api/lessons → { lessons: [...] } */
export async function fetchLessonsRegistry() {
  let remote = [];
  try {
    const data = await get('/api/lessons');
    remote = data.lessons || [];
  } catch {
    // Fall back to the bundled registry if the backend is unreachable
    return [...lessonsRegistry];
  }

  // Merge in any local-only lessons (e.g. the bug-fix lab) that the backend
  // hasn't been seeded with yet, so the new card always appears.
  const remoteIds = new Set(remote.map((l) => l.id));
  const merged = [...remote];
  for (const local of LOCAL_REGISTRY_ENTRIES) {
    if (!remoteIds.has(local.id)) merged.push(local);
  }
  merged.sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
  return merged;
}

/** GET /api/lessons/:id → { lesson: { ...module shape } } */
export async function fetchLessonDetail(lessonId) {
  if (LOCAL_LESSON_MODULES[lessonId]) {
    return LOCAL_LESSON_MODULES[lessonId];
  }
  const data = await get(`/api/lessons/${lessonId}`);
  return data.lesson;
}

/** GET /api/examples/:id → { example: { ...full example } } */
export async function fetchExample(exampleId) {
  if (LOCAL_EXAMPLE_LOOKUP[exampleId]) {
    return LOCAL_EXAMPLE_LOOKUP[exampleId];
  }
  const data = await get(`/api/examples/${exampleId}`);
  return data.example;
}
