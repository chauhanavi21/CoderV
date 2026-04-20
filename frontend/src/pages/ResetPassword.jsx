import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';
import { Sun, Moon, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useTheme } from '../contexts/ThemeContext';

function friendlyError(code) {
  switch (code) {
    case 'auth/expired-action-code':
      return 'This reset link has expired. Please request a new one.';
    case 'auth/invalid-action-code':
      return 'This reset link is invalid or has already been used.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'We could not find an account for this link.';
    case 'auth/weak-password':
      return 'Please choose a stronger password (at least 8 characters).';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export default function ResetPassword() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const oobCode = params.get('oobCode');

  const [status, setStatus] = useState('verifying'); // verifying | ready | done | invalid
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!oobCode) {
      setStatus('invalid');
      setError('This reset link is missing a verification code.');
      return;
    }
    (async () => {
      try {
        const addr = await verifyPasswordResetCode(auth, oobCode);
        setEmail(addr);
        setStatus('ready');
      } catch (err) {
        setStatus('invalid');
        setError(friendlyError(err.code));
      }
    })();
  }, [oobCode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus('done');
    } catch (err) {
      setError(friendlyError(err.code));
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

      <section className="w-[min(440px,96%)] hairline rounded-md overflow-hidden bg-elevated">
        <div className="p-8 max-md:p-6">
          <div className="inline-flex items-center gap-2 font-semibold tracking-tightish text-fg mb-8">
            <div className="w-6 h-6 rounded-sm bg-zinc-900 dark:bg-zinc-100 grid place-items-center text-[11px] font-bold text-zinc-100 dark:text-zinc-900 mono">
              C
            </div>
            CoderV
          </div>

          <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-2">
            /reset-password
          </p>
          <h1 className="text-xl font-semibold tracking-tightish text-fg mb-1">
            Choose a new password
          </h1>
          <p className="text-[12.5px] text-fg-muted mb-6">
            {status === 'ready' && email && <>For <span className="text-fg">{email}</span></>}
            {status === 'verifying' && 'Verifying your reset link…'}
            {status === 'invalid' && 'We could not verify your reset link.'}
            {status === 'done' && 'Your password has been updated.'}
          </p>

          {error && status !== 'done' && (
            <div className="hairline mb-4 px-3 py-2.5 rounded-md bg-red-500/5 border-red-500/30 text-red-500 text-[12px] flex items-start gap-2">
              <AlertCircle size={13} strokeWidth={2} className="mt-[1px] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {status === 'ready' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-[10px] mono uppercase tracking-wider text-fg-subtle mb-1.5">
                  New password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  required
                  autoFocus
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
                  placeholder="Re-enter password"
                  required
                  className="hairline w-full bg-app rounded-md px-3 h-9 text-[13px] text-fg placeholder:text-fg-subtle outline-none focus:border-app-strong transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 text-[13px] font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating…' : (<>Update password <ArrowRight size={12} strokeWidth={2.5} /></>)}
              </button>
            </form>
          )}

          {status === 'done' && (
            <div className="flex flex-col gap-4">
              <div className="hairline px-3 py-2.5 rounded-md bg-emerald-500/5 border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-[12px] flex items-start gap-2">
                <Check size={13} strokeWidth={2.5} className="mt-[1px] shrink-0" />
                <span>Password updated. You can now sign in with your new password.</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 text-[13px] font-medium hover:opacity-90 transition"
              >
                Back to sign in <ArrowRight size={12} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {status === 'invalid' && (
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 text-[13px] font-medium hover:opacity-90 transition"
            >
              Back to sign in <ArrowRight size={12} strokeWidth={2.5} />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
