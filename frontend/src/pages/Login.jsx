import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Sun, Moon, ArrowRight, Check } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useTheme } from '../contexts/ThemeContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

function firebaseError(code) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':   return 'Incorrect email or password.';
    case 'auth/invalid-email':    return 'Please enter a valid email address.';
    case 'auth/too-many-requests':return 'Too many attempts. Please try again later.';
    case 'auth/user-disabled':    return 'This account has been disabled.';
    default:                      return 'Something went wrong. Please try again.';
  }
}

const FEATURES = [
  '6 Learning tracks',
  'Daily quiz mode',
  'Progress insights',
  'AI tutor support',
];

export default function Login() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const token = await user.getIdToken();
      fetch(`${API_BASE}/api/users/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      }).catch(() => {});

      navigate('/dashboard');
    } catch (err) {
      setError(firebaseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) { setError('Enter your email above first.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Could not send reset email.');
      }
      setResetSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-app text-fg px-4 py-10">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="hairline fixed top-4 right-4 z-50 w-9 h-9 rounded-md grid place-items-center bg-elevated text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      >
        {isDark ? <Sun size={14} strokeWidth={1.75} /> : <Moon size={14} strokeWidth={1.75} />}
      </button>

      <section className="w-[min(900px,96%)] hairline rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-elevated">
        <aside className="p-8 max-md:p-6 flex flex-col justify-center md:hairline-r max-md:hairline-b bg-app">
          <div className="inline-flex items-center gap-2 font-semibold tracking-tightish text-fg">
            <div className="w-6 h-6 rounded-sm bg-zinc-900 dark:bg-zinc-100 grid place-items-center text-[11px] font-bold text-zinc-100 dark:text-zinc-900 mono">
              C
            </div>
            CoderV
          </div>

          <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mt-8 mb-2">
            /login
          </p>
          <h1 className="text-2xl font-semibold leading-tight tracking-tightish text-fg mb-2.5">
            Learn smarter,<br />code better.
          </h1>
          <p className="text-[13px] text-fg-muted leading-relaxed mb-6">
            Focused learning with structured lessons, practice quizzes, and AI-powered support.
          </p>

          <ul className="grid gap-1.5">
            {FEATURES.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[12.5px] text-fg-muted">
                <Check size={12} strokeWidth={2.5} className="text-emerald-500 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </aside>

        <div className="p-8 max-md:p-6 flex items-center justify-center">
          <div className="w-full max-w-[320px]">
            <h2 className="text-xl font-semibold tracking-tightish text-fg mb-1">
              Sign in
            </h2>
            <p className="text-[12.5px] text-fg-muted mb-6">
              Welcome back. Enter your details to continue.
            </p>

            {resetSent && (
              <div className="hairline mb-4 px-3 py-2.5 rounded-md bg-emerald-500/5 border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-[12px]">
                Password reset email sent — check your inbox.
              </div>
            )}
            {error && (
              <div className="hairline mb-4 px-3 py-2.5 rounded-md bg-red-500/5 border-red-500/30 text-red-500 text-[12px]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-[10px] mono uppercase tracking-wider text-fg-subtle mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="hairline w-full bg-app rounded-md px-3 h-9 text-[13px] text-fg placeholder:text-fg-subtle outline-none focus:border-app-strong transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] mono uppercase tracking-wider text-fg-subtle mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  required
                  className="hairline w-full bg-app rounded-md px-3 h-9 text-[13px] text-fg placeholder:text-fg-subtle outline-none focus:border-app-strong transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 text-[13px] font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in…' : (<>Sign in <ArrowRight size={12} strokeWidth={2.5} /></>)}
              </button>
            </form>

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="mt-3 text-[11.5px] mono text-fg-subtle hover:text-fg transition-colors"
            >
              Forgot password?
            </button>

            <p className="mt-6 text-[12px] text-fg-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-fg font-medium underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2 hover:decoration-fg">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
