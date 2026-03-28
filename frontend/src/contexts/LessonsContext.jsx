import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchLessonsRegistry, fetchLessonDetail } from '../api/lessons';

const LessonsContext = createContext(null);

/**
 * Provides lesson registry + eagerly-cached module details.
 *
 * registry        — flat list of lesson types
 * getModuleData   — async fn(lessonId) → cached module detail
 * modulesCache    — ref map of cached modules (sync readable by useProgress)
 * registryLoading — true until registry AND all module details are loaded
 */
export function LessonsProvider({ children }) {
  const [registry, setRegistry] = useState([]);
  const [registryLoading, setRegistryLoading] = useState(true);
  const [registryError, setRegistryError] = useState(null);

  // Cache of lessonId → module detail
  const modulesCache = useRef({});
  const inFlight = useRef({});

  useEffect(() => {
    async function init() {
      // 1. Fetch registry
      const lessons = await fetchLessonsRegistry();
      setRegistry(lessons);

      // 2. Eagerly fetch ALL available module details in parallel so that
      //    useProgress has correct totals the moment the app renders.
      const available = lessons.filter((l) => l.available);
      const mods = await Promise.all(available.map((l) => fetchLessonDetail(l.id)));
      available.forEach((l, i) => {
        modulesCache.current[l.id] = mods[i];
      });
    }

    init()
      .catch((err) => setRegistryError(err.message))
      .finally(() => setRegistryLoading(false));
  }, []);

  const getModuleData = useCallback(async (lessonId) => {
    if (modulesCache.current[lessonId]) return modulesCache.current[lessonId];

    // Deduplicate concurrent requests
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
