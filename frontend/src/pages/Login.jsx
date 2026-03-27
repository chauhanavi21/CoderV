import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn, useAuth } from '@clerk/react';

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('login'); // 'login' | 'forgot' | 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect already-signed-in users straight to dashboard
  useEffect(() => {
    if (isSignedIn) navigate('/dashboard', { replace: true });
  }, [isSignedIn, navigate]);

  // ── Sign in ────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard', { replace: true });
      } else if (result.status === 'needs_second_factor') {
        setError('Two-factor authentication required. Please sign in through the Clerk portal.');
      } else {
        setError('Sign in incomplete. Please try again.');
      }
    } catch (err) {
      const clerkErr = err.errors?.[0];
      if (clerkErr?.code === 'form_password_incorrect') {
        setError('Incorrect password. Try again or use Forgot Password.');
      } else if (clerkErr?.code === 'form_identifier_not_found') {
        setError('No account found with this email. Please sign up first.');
      } else if (clerkErr?.code === 'too_many_requests') {
        setError('Too many attempts. Please wait a moment and try again.');
      } else {
        setError(clerkErr?.longMessage || clerkErr?.message || 'Sign in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Forgot password — step 1: send reset code ─────────────────────────────
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    if (!email.trim()) {
      setError('Enter your email address above, then click Forgot Password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setStep('reset');
      setInfo(`A password reset code was sent to ${email}.`);
    } catch (err) {
      const clerkErr = err.errors?.[0];
      if (clerkErr?.code === 'form_identifier_not_found') {
        setError('No account found with this email.');
      } else {
        setError(clerkErr?.longMessage || clerkErr?.message || 'Failed to send reset code.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Forgot password — step 2: verify code + set new password ──────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: resetCode,
        password: newPassword,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      const clerkErr = err.errors?.[0];
      if (clerkErr?.code === 'form_code_incorrect') {
        setError('Incorrect or expired reset code. Please request a new one.');
      } else if (clerkErr?.code === 'form_password_pwned') {
        setError('This password has been found in a data breach. Please choose a different one.');
      } else {
        setError(clerkErr?.longMessage || clerkErr?.message || 'Password reset failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl px-3.5 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10';

  const visualSide = (
    <aside className="gradient-auth text-white p-10 max-md:p-7">
      <div className="inline-flex items-center gap-2.5 font-extrabold tracking-tight">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-white/25 grid place-items-center font-black">C</div>
        CoderV
      </div>
      <h1 className="mt-5 mb-2.5 text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight font-extrabold">
        Learn smarter, code better
      </h1>
      <p className="mb-7 opacity-90 leading-relaxed">
        Focused learning with structured lessons, practice quizzes, and AI-powered support.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {['6 Learning tracks', 'Daily quiz mode', 'Progress insights', 'Ask AI support'].map((t) => (
          <div key={t} className="bg-white/[0.18] border border-white/[0.28] rounded-xl px-3.5 py-3 text-sm">{t}</div>
        ))}
      </div>
    </aside>
  );

  return (
    <main className="min-h-screen grid place-items-center py-7">
      <section className="w-[min(900px,96%)] grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-card">
        {visualSide}

        <section className="p-10 max-md:p-7">
          {/* ── LOGIN ── */}
          {step === 'login' && (
            <>
              <h2 className="text-2xl font-bold mb-1.5 dark:text-slate-100">Login</h2>
              <p className="text-muted dark:text-slate-400 text-sm mb-5">Welcome back. Continue your study streak.</p>

              {error && (
                <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5">
                <div className="grid gap-2.5">
                  <label htmlFor="login-email" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Email</label>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-2.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-password" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Password</label>
                    <button
                      type="button"
                      onClick={() => { setStep('forgot'); setError(''); setInfo(''); }}
                      className="text-xs text-indigo-500 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !isLoaded}
                  className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {!isLoaded ? 'Loading…' : loading ? 'Signing in…' : 'Login'}
                </button>
              </form>

              <p className="mt-4 text-sm text-muted dark:text-slate-400">
                New user?{' '}
                <Link to="/signup" className="text-primary dark:text-indigo-400 font-bold hover:underline">Sign up</Link>
              </p>
            </>
          )}

          {/* ── FORGOT PASSWORD ── */}
          {step === 'forgot' && (
            <>
              <h2 className="text-2xl font-bold mb-1.5 dark:text-slate-100">Reset password</h2>
              <p className="text-muted dark:text-slate-400 text-sm mb-5">
                Enter your email and we&apos;ll send a reset code.
              </p>

              {error && (
                <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-3.5">
                <div className="grid gap-2.5">
                  <label htmlFor="forgot-email" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Email</label>
                  <input
                    id="forgot-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !isLoaded}
                  className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send Reset Code'}
                </button>
              </form>

              <button
                type="button"
                onClick={() => { setStep('login'); setError(''); }}
                className="mt-4 text-sm text-muted dark:text-slate-400 hover:text-primary dark:hover:text-indigo-400 cursor-pointer"
              >
                Back to login
              </button>
            </>
          )}

          {/* ── RESET PASSWORD ── */}
          {step === 'reset' && (
            <>
              <h2 className="text-2xl font-bold mb-1.5 dark:text-slate-100">Set new password</h2>
              {info && (
                <div className="mb-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 px-4 py-3 text-sm text-indigo-700 dark:text-indigo-300">
                  {info}
                </div>
              )}
              {error && (
                <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-3.5">
                <div className="grid gap-2.5">
                  <label htmlFor="reset-code" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Reset code</label>
                  <input
                    id="reset-code"
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    required
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className={inputClass + ' text-center text-xl tracking-widest font-bold'}
                  />
                </div>
                <div className="grid gap-2.5">
                  <label htmlFor="new-password" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">New password</label>
                  <input
                    id="new-password"
                    type="password"
                    placeholder="Min 8 characters"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !isLoaded}
                  className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resetting…' : 'Reset Password & Sign In'}
                </button>
              </form>

              <button
                type="button"
                onClick={() => { setStep('forgot'); setError(''); setInfo(''); setResetCode(''); }}
                className="mt-4 text-sm text-muted dark:text-slate-400 hover:text-primary dark:hover:text-indigo-400 cursor-pointer"
              >
                Resend code
              </button>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
