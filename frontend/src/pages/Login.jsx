import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useTheme } from '../contexts/ThemeContext';

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

export default function Login() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [resetSent,  setResetSent]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      setError(firebaseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  /* ── theme-aware class sets ── */
  const panelBg   = isDark ? 'bg-white'   : 'bg-[#1e1b4b]';
  const heading   = isDark ? 'text-gray-900'   : 'text-white';
  const sub       = isDark ? 'text-gray-500'   : 'text-indigo-300';
  const label     = isDark ? 'text-gray-700'   : 'text-indigo-200';
  const inputCls  = isDark
    ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500/10'
    : 'bg-[#3730a3] border-indigo-600 text-white placeholder-indigo-300 focus:border-indigo-400 focus:ring-indigo-400/10';
  const forgotBtn = isDark ? 'text-indigo-600 hover:text-indigo-700' : 'text-indigo-300 hover:text-indigo-200';
  const linkCls   = isDark ? 'text-indigo-600 font-semibold' : 'text-indigo-300 font-semibold';
  const signInLbl = isDark ? 'text-gray-500' : 'text-indigo-300';

  return (
    <main className="min-h-screen grid place-items-center py-7 px-4">

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center
                   bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600
                   backdrop-blur-sm hover:scale-110 transition-transform shadow-md"
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        )}
      </button>

      <section className="w-[min(900px,96%)] grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

        {/* ── Brand side ── */}
        <aside className="gradient-auth text-white p-10 max-md:p-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2.5 font-extrabold tracking-tight">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-white/25 grid place-items-center font-black">C</div>
            CoderV
          </div>
          <h1 className="mt-5 mb-2.5 text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight font-extrabold">
            Learn smarter,<br />code better
          </h1>
          <p className="mb-7 opacity-90 leading-relaxed text-sm">
            Focused learning with structured lessons, practice quizzes, and AI-powered support.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['6 Learning tracks', 'Daily quiz mode', 'Progress insights', 'Ask AI support'].map((t) => (
              <div key={t} className="bg-white/[0.18] border border-white/[0.28] rounded-xl px-3.5 py-3 text-xs font-medium">{t}</div>
            ))}
          </div>
        </aside>

        {/* ── Form side ── */}
        <div className={`flex items-center justify-center py-10 px-8 transition-colors ${panelBg}`}>
          <div className="w-full max-w-[300px]">

            <h2 className={`text-2xl font-bold mb-1 ${heading}`}>Sign in to CoderV</h2>
            <p className={`text-sm mb-6 ${sub}`}>Welcome back! Please sign in to continue.</p>

            {/* Alerts */}
            {resetSent && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                Password reset email sent — check your inbox.
              </div>
            )}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${label}`}>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-4 transition ${inputCls}`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${label}`}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  required
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-4 transition ${inputCls}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-md hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in…' : 'Sign in →'}
              </button>
            </form>

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className={`mt-3 text-xs font-medium transition ${forgotBtn}`}
            >
              Forgot password?
            </button>

            <p className={`mt-5 text-xs ${signInLbl}`}>
              Don't have an account?{' '}
              <Link to="/signup" className={linkCls}>Sign up</Link>
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}
