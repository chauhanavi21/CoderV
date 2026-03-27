import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLessonsContext } from '../contexts/LessonsContext';

const STORAGE_KEY = 'coderv-progress';
const API_BASE = import.meta.env.VITE_API_URL || 'https://coderv-backend.onrender.com';

// ── Local storage helpers ────────────────────────────────────────────────────
function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLocal(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Convert flat Supabase rows → nested progress object ──────────────────────
function rowsToProgress(rows = []) {
  return rows.reduce((acc, row) => {
    if (!acc[row.lesson_id]) acc[row.lesson_id] = {};
    if (!acc[row.lesson_id][row.difficulty]) acc[row.lesson_id][row.difficulty] = [];
    if (!acc[row.lesson_id][row.difficulty].includes(row.example_id)) {
      acc[row.lesson_id][row.difficulty].push(row.example_id);
    }
    return acc;
  }, {});
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useProgress() {
  const [progress, setProgress] = useState(loadLocal);
  const [progressLoading, setProgressLoading] = useState(true);
  const { user, loading, getToken } = useAuth();
  const { registry, modulesCache } = useLessonsContext();

  // Hydrate from backend when the user is signed in
  useEffect(() => {
    if (loading) return;
    if (!user) { setProgressLoading(false); return; }

    async function syncFromBackend() {
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE}/api/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const { progress: rows } = await res.json();
        const remote = rowsToProgress(rows);
        setProgress(remote);
        saveLocal(remote);
      } catch {
        // Backend unavailable — local state remains as-is
      } finally {
        setProgressLoading(false);
      }
    }

    syncFromBackend();
  }, [loading, user, getToken]);

  const markComplete = useCallback(
    async (lessonId, difficulty, exampleId) => {
      setProgress((prev) => {
        const next = structuredClone(prev);
        if (!next[lessonId]) next[lessonId] = {};
        if (!next[lessonId][difficulty]) next[lessonId][difficulty] = [];
        if (!next[lessonId][difficulty].includes(exampleId)) {
          next[lessonId][difficulty] = [...next[lessonId][difficulty], exampleId];
        }
        saveLocal(next);
        return next;
      });

      if (user) {
        try {
          const token = await getToken();
          await fetch(`${API_BASE}/api/progress/complete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ lessonId, difficulty, exampleId }),
          });
        } catch {
          // Silent — local already updated
        }
      }
    },
    [user, getToken]
  );

  const isComplete = useCallback(
    (lessonId, difficulty, exampleId) =>
      progress[lessonId]?.[difficulty]?.includes(exampleId) ?? false,
    [progress]
  );

  /**
   * Returns { completed, total, percent } for a difficulty.
   * Uses cached module data if available, otherwise falls back to counting
   * only the IDs that are recorded in progress (safe undercount).
   */
  const getDifficultyProgress = useCallback(
    (lessonId, difficultyId) => {
      const mod = modulesCache.current?.[lessonId];
      const examples = mod?.difficulties?.[difficultyId]?.examples || [];
      const total = examples.length;
      const completed =
        total > 0
          ? examples.filter((ex) => progress[lessonId]?.[difficultyId]?.includes(ex.id)).length
          : (progress[lessonId]?.[difficultyId]?.length ?? 0);
      const safeTotal = total || completed;
      return {
        completed,
        total: safeTotal,
        percent: safeTotal > 0 ? Math.round((completed / safeTotal) * 100) : 0,
      };
    },
    [progress, modulesCache]
  );

  const getLessonProgress = useCallback(
    (lessonId) => {
      const mod = modulesCache.current?.[lessonId];
      if (!mod) {
        // Module not cached yet — sum up what we know from progress object
        let completed = 0;
        let total = 0;
        const lessonProgress = progress[lessonId] || {};
        for (const ids of Object.values(lessonProgress)) completed += ids.length;
        // We can't know total without module data; use completed as minimum
        total = completed;
        return { completed, total, percent: completed > 0 ? 100 : 0 };
      }
      let total = 0;
      let completed = 0;
      for (const diffId of mod.difficultyOrder) {
        const dp = getDifficultyProgress(lessonId, diffId);
        total += dp.total;
        completed += dp.completed;
      }
      return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
    },
    [getDifficultyProgress, progress, modulesCache]
  );

  const getTotalProgress = useCallback(() => {
    let total = 0;
    let completed = 0;
    for (const lesson of registry) {
      if (!lesson.available) continue;
      const lp = getLessonProgress(lesson.id);
      total += lp.total;
      completed += lp.completed;
    }
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
  }, [registry, getLessonProgress]);

  return {
    markComplete,
    isComplete,
    getDifficultyProgress,
    getLessonProgress,
    getTotalProgress,
    progressLoading,
  };
}
