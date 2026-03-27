const BASE = import.meta.env.VITE_API_URL || 'https://coderv-backend.onrender.com';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

/** GET /api/lessons → { lessons: [...] } */
export async function fetchLessonsRegistry() {
  const data = await get('/api/lessons');
  return data.lessons;
}

/** GET /api/lessons/:id → { lesson: { ...module shape } } */
export async function fetchLessonDetail(lessonId) {
  const data = await get(`/api/lessons/${lessonId}`);
  return data.lesson;
}

/** GET /api/examples/:id → { example: { ...full example } } */
export async function fetchExample(exampleId) {
  const data = await get(`/api/examples/${exampleId}`);
  return data.example;
}
