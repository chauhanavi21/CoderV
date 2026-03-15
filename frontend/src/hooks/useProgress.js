import { useState, useCallback } from 'react';
import { lessonsRegistry, getLessonModule } from '../data/lessonModules';

const STORAGE_KEY = 'coderv-progress';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [progress, setProgress] = useState(load);

  const markComplete = useCallback((lessonId, difficulty, exampleId) => {
    setProgress((prev) => {
      const next = structuredClone(prev);
      if (!next[lessonId]) next[lessonId] = {};
      if (!next[lessonId][difficulty]) next[lessonId][difficulty] = [];
      if (!next[lessonId][difficulty].includes(exampleId)) {
        next[lessonId][difficulty] = [...next[lessonId][difficulty], exampleId];
      }
      save(next);
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (lessonId, difficulty, exampleId) =>
      progress[lessonId]?.[difficulty]?.includes(exampleId) ?? false,
    [progress]
  );

  const getDifficultyProgress = useCallback(
    (lessonId, difficultyId) => {
      const mod = getLessonModule(lessonId);
      if (!mod) return { completed: 0, total: 0, percent: 0 };
      const examples = mod.difficulties[difficultyId]?.examples || [];
      const total = examples.length;
      const completed = examples.filter(
        (ex) => progress[lessonId]?.[difficultyId]?.includes(ex.id)
      ).length;
      return {
        completed,
        total,
        percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },
    [progress]
  );

  const getLessonProgress = useCallback(
    (lessonId) => {
      const mod = getLessonModule(lessonId);
      if (!mod) return { completed: 0, total: 0, percent: 0 };
      let total = 0;
      let completed = 0;
      for (const diffId of mod.difficultyOrder) {
        const dp = getDifficultyProgress(lessonId, diffId);
        total += dp.total;
        completed += dp.completed;
      }
      return {
        completed,
        total,
        percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },
    [getDifficultyProgress]
  );

  const getTotalProgress = useCallback(() => {
    let total = 0;
    let completed = 0;
    for (const lesson of lessonsRegistry) {
      if (!lesson.available) continue;
      const lp = getLessonProgress(lesson.id);
      total += lp.total;
      completed += lp.completed;
    }
    return {
      completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [getLessonProgress]);

  return {
    markComplete,
    isComplete,
    getDifficultyProgress,
    getLessonProgress,
    getTotalProgress,
  };
}
