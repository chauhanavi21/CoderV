import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut as fbSignOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  /** Returns a fresh Firebase ID token (auto-refreshes if expired). */
  const getToken = () => user?.getIdToken() ?? Promise.resolve(null);

  /** Signs out and clears state. */
  const signOut = () => fbSignOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, getToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
