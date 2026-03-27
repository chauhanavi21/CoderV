import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchLessonsRegistry, fetchLessonDetail } from '../api/lessons';

const LessonsContext = createContext(null);

/**
 * Provides lesson registry + on-demand module detail (cached).
 *
 * registry        — flat list of lesson types (same shape as old lessonsRegistry)
 * getModuleData   — async fn(lessonId) → cached module detail
 * modulesCache    — map of already-fetched modules (for sync reads in useProgress)
 * registryLoading — true while initial registry fetch is in flight
 */
export function LessonsProvider({ children }) {
  const [registry, setRegistry] = useState([]);
  const [registryLoading, setRegistryLoading] = useState(true);
  const [registryError, setRegistryError] = useState(null);

  // Cache of lessonId → module detail (populated lazily)
  const modulesCache = useRef({});
  // Track in-flight fetches to avoid duplicates
  const inFlight = useRef({});

  useEffect(() => {
    fetchLessonsRegistry()
      .then((lessons) => setRegistry(lessons))
      .catch((err) => setRegistryError(err.message))
      .finally(() => setRegistryLoading(false));
  }, []);

  const getModuleData = useCallback(async (lessonId) => {
    if (modulesCache.current[lessonId]) return modulesCache.current[lessonId];

    // Deduplicate concurrent requests for the same lessonId
    if (!inFlight.current[lessonId]) {
      inFlight.current[lessonId] = fetchLessonDetail(lessonId).then((mod) => {
        modulesCache.current[lessonId] = mod;
        delete inFlight.current[lessonId];
        return mod;
      });
    }
    return inFlight.current[lessonId];
  }, []);

  return (
    <LessonsContext.Provider
      value={{ registry, registryLoading, registryError, getModuleData, modulesCache }}
    >
      {children}
    </LessonsContext.Provider>
  );
}

export function useLessonsContext() {
  const ctx = useContext(LessonsContext);
  if (!ctx) throw new Error('useLessonsContext must be used inside LessonsProvider');
  return ctx;
}

/** Hook: fetches and returns a single lesson module with loading/error state */
export function useLessonDetail(lessonId) {
  const { getModuleData } = useLessonsContext();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lessonId) return;
    setLoading(true);
    setError(null);
    getModuleData(lessonId)
      .then(setModule)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lessonId, getModuleData]);

  return { module, loading, error };
}
