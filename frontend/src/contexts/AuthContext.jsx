import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut as fbSignOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

const API_BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLessons, setOpenLessons] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setOpenLessons(false);
      setSessionReady(true);
      return;
    }

    setSessionReady(false);
    let cancelled = false;

    (async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${API_BASE}/api/users/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!cancelled) setOpenLessons(!!data.openLessons);
      } catch {
        if (!cancelled) setOpenLessons(false);
      } finally {
        if (!cancelled) setSessionReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  /** Returns a fresh Firebase ID token (auto-refreshes if expired). */
  const getToken = () => user?.getIdToken() ?? Promise.resolve(null);

  /** Signs out and clears state. */
  const signOut = () => fbSignOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, loading, getToken, signOut, openLessons, sessionReady }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
