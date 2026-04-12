/* eslint-disable react-refresh/only-export-components -- provider + hooks + constants */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const WEB_LAB_JS_MSG = 'coderv-web-lab-js';

const RUN_MS = 3 * 60 * 1000;

const WebLabDashboardHackContext = createContext(null);

/**
 * Temporary (3 min) overlay for dashboard totals — not written to progress API or DB.
 */
export function WebLabDashboardHackProvider({ children }) {
  const [active, setActive] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);
  const [snapshotTotal, setSnapshotTotal] = useState(0);
  const [displayCompleted, setDisplayCompleted] = useState(0);

  const endMission = useCallback(() => {
    setActive(false);
    setExpiresAt(null);
    setSnapshotTotal(0);
    setDisplayCompleted(0);
  }, []);

  const startMission = useCallback((completed, total) => {
    const tot = Math.max(0, Math.floor(Number(total)) || 0);
    const c = Math.min(Math.max(0, Math.floor(Number(completed)) || 0), tot || Number.MAX_SAFE_INTEGER);
    setSnapshotTotal(tot);
    setDisplayCompleted(c);
    setActive(true);
    setExpiresAt(Date.now() + RUN_MS);
  }, []);

  const applyAbsolute = useCallback(
    (n) => {
      if (!active) return;
      if (expiresAt != null && Date.now() > expiresAt) {
        endMission();
        return;
      }
      const tot = snapshotTotal;
      if (tot <= 0) return;
      const v = Math.min(Math.max(0, Math.round(Number(n) || 0)), tot);
      setDisplayCompleted(v);
    },
    [active, expiresAt, snapshotTotal, endMission]
  );

  const applyDelta = useCallback(
    (d) => {
      if (!active) return;
      if (expiresAt != null && Date.now() > expiresAt) {
        endMission();
        return;
      }
      const tot = snapshotTotal;
      if (tot <= 0) return;
      const delta = Math.round(Number(d) || 0);
      setDisplayCompleted((c) => Math.min(Math.max(0, c + delta), tot));
    },
    [active, expiresAt, snapshotTotal, endMission]
  );

  const dispatchFromSandbox = useCallback(
    (data) => {
      if (!data || data.source !== WEB_LAB_JS_MSG) return;
      if (!active) return;
      if (expiresAt != null && Date.now() > expiresAt) {
        endMission();
        return;
      }
      if (data.type === 'set' && data.completed != null) {
        applyAbsolute(data.completed);
      }
      if (data.type === 'delta' && data.delta != null) {
        applyDelta(data.delta);
      }
    },
    [active, expiresAt, endMission, applyAbsolute, applyDelta]
  );

  useEffect(() => {
    if (!active || !expiresAt) return undefined;
    const id = window.setInterval(() => {
      if (Date.now() >= expiresAt) {
        endMission();
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [active, expiresAt, endMission]);

  const mergeTotalProgress = useCallback(
    (real) => {
      if (!active || !expiresAt || Date.now() > expiresAt) return real;
      const tot = snapshotTotal > 0 ? snapshotTotal : real.total;
      const c = Math.min(Math.max(0, displayCompleted), tot);
      return {
        completed: c,
        total: tot,
        percent: tot > 0 ? Math.round((c / tot) * 100) : 0,
      };
    },
    [active, expiresAt, snapshotTotal, displayCompleted]
  );

  const value = useMemo(
    () => ({
      active,
      startMission,
      endMission,
      dispatchFromSandbox,
      mergeTotalProgress,
    }),
    [active, startMission, endMission, dispatchFromSandbox, mergeTotalProgress]
  );

  return <WebLabDashboardHackContext.Provider value={value}>{children}</WebLabDashboardHackContext.Provider>;
}

export function useWebLabDashboardHack() {
  const ctx = useContext(WebLabDashboardHackContext);
  if (!ctx) throw new Error('useWebLabDashboardHack must be used inside WebLabDashboardHackProvider');
  return ctx;
}

export function useWebLabDashboardHackOptional() {
  return useContext(WebLabDashboardHackContext);
}
