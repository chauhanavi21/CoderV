import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { Sun, Moon, ArrowRight, Check } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useTheme } from '../contexts/ThemeContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

function firebaseError(code) {
  switch (code) {
    case 'auth/email-already-in-use': return 'An account with this email already exists.';
    case 'auth/invalid-email':        return 'Please enter a valid email address.';
    case 'auth/weak-password':        return 'Password must be at least 8 characters.';
    case 'auth/too-many-requests':    return 'Too many attempts. Please try again later.';
    default:                          return 'Something went wrong. Please try again.';
  }
}

const FEATURES = [
  'Topic-wise progress',
  'Quiz + puzzle practice',
  'Revision reminders',
  'Adaptive flow',
];

export default function Signup() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.'); return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.'); return;
    }

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, {
        displayName: `${firstName.trim()} ${lastName.trim()}`.trim(),
      });

      sendEmailVerification(user).catch(() => {});

      const token = await user.getIdToken();
      await fetch(`${API_BASE}/api/users/sync`, {
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
            /signup
          </p>
          <h1 className="text-2xl font-semibold leading-tight tracking-tightish text-fg mb-2.5">
            Start your coding<br />journey.
          </h1>
          <p className="text-[13px] text-fg-muted leading-relaxed mb-6">
            Master programming with structured lessons, practice challenges, and a clear learning path.
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
              Create account
            </h2>
            <p className="text-[12.5px] text-fg-muted mb-6">
              Welcome. Fill in the details to get started.
            </p>

            {error && (
              <div className="hairline mb-4 px-3 py-2.5 rounded-md bg-red-500/5 border-red-500/30 text-red-500 text-[12px]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] mono uppercase tracking-wider text-fg-subtle mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First"
                    required
                    className="hairline w-full bg-app rounded-md px-3 h-9 text-[13px] text-fg placeholder:text-fg-subtle outline-none focus:border-app-strong transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] mono uppercase tracking-wider text-fg-subtle mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last"
                    required
                    className="hairline w-full bg-app rounded-md px-3 h-9 text-[13px] text-fg placeholder:text-fg-subtle outline-none focus:border-app-strong transition-colors"
                  />
                </div>
              </div>

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

              <div>
                <label className="block text-[10px] mono uppercase tracking-wider text-fg-subtle mb-1.5">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm"
                  required
                  className="hairline w-full bg-app rounded-md px-3 h-9 text-[13px] text-fg placeholder:text-fg-subtle outline-none focus:border-app-strong transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 text-[13px] font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating…' : (<>Create account <ArrowRight size={12} strokeWidth={2.5} /></>)}
              </button>
            </form>

            <p className="mt-6 text-[12px] text-fg-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-fg font-medium underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2 hover:decoration-fg">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
