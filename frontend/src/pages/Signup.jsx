import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp, useAuth } from '@clerk/react';

export default function Signup() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('form'); // 'form' | 'verify'
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Redirect already-signed-in users straight to dashboard
  useEffect(() => {
    if (isSignedIn) navigate('/dashboard', { replace: true });
  }, [isSignedIn, navigate]);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  // ── Step 1: Create account ─────────────────────────────────────────────────
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await signUp.create({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        emailAddress: form.email.trim(),
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setStep('verify');
      setInfo(`Verification code sent to ${form.email}.`);
    } catch (err) {
      const clerkErr = err.errors?.[0];
      if (clerkErr?.code === 'form_identifier_exists') {
        setError('An account with this email already exists. Try logging in instead.');
      } else if (clerkErr?.code === 'form_password_pwned') {
        setError('This password was found in a data breach. Please choose a stronger one.');
      } else if (clerkErr?.code === 'form_password_too_short') {
        setError('Password is too short. Please use at least 8 characters.');
      } else {
        setError(clerkErr?.longMessage || clerkErr?.message || 'Sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Verify email ───────────────────────────────────────────────────
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard', { replace: true });
      } else {
        setError('Verification incomplete. Please try again.');
      }
    } catch (err) {
      const clerkErr = err.errors?.[0];
      if (clerkErr?.code === 'form_code_incorrect') {
        setError('Incorrect or expired code. Request a new one below.');
      } else if (clerkErr?.code === 'verification_expired') {
        setError('This code has expired. Click "Resend code" to get a new one.');
      } else {
        setError(clerkErr?.longMessage || clerkErr?.message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Resend verification email ──────────────────────────────────────────────
  const handleResend = async () => {
    if (!isLoaded || resending) return;
    setError('');
    setResending(true);
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setInfo(`New code sent to ${form.email}.`);
      setCode('');
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Failed to resend code.');
    } finally {
      setResending(false);
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
        Start your coding journey
      </h1>
      <p className="mb-7 opacity-90 leading-relaxed">
        Master programming with structured lessons, practice challenges, and a clear learning path.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {['Topic-wise progress', 'Quiz + puzzle practice', 'Revision reminders', 'Adaptive flow'].map((t) => (
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
          {/* ── SIGN UP FORM ── */}
          {step === 'form' && (
            <>
              <h2 className="text-2xl font-bold mb-1.5 dark:text-slate-100">Sign up</h2>
              <p className="text-muted dark:text-slate-400 text-sm mb-5">Create account to enter the study platform.</p>

              {error && (
                <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="grid gap-2.5">
                    <label htmlFor="signup-first" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">First name</label>
                    <input id="signup-first" type="text" placeholder="First name" required value={form.firstName} onChange={update('firstName')} className={inputClass} />
                  </div>
                  <div className="grid gap-2.5">
                    <label htmlFor="signup-last" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Last name</label>
                    <input id="signup-last" type="text" placeholder="Last name" required value={form.lastName} onChange={update('lastName')} className={inputClass} />
                  </div>
                </div>

                <div className="grid gap-2.5">
                  <label htmlFor="signup-email" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Email</label>
                  <input id="signup-email" type="email" placeholder="you@example.com" required value={form.email} onChange={update('email')} className={inputClass} />
                </div>

                <div className="grid gap-2.5">
                  <label htmlFor="signup-password" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Password</label>
                  <input id="signup-password" type="password" placeholder="Min 8 characters" required minLength={8} value={form.password} onChange={update('password')} className={inputClass} />
                </div>

                <div className="grid gap-2.5">
                  <label htmlFor="signup-confirm" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Confirm password</label>
                  <input id="signup-confirm" type="password" placeholder="Confirm password" required value={form.confirmPassword} onChange={update('confirmPassword')} className={inputClass} />
                </div>

                <button
                  type="submit"
                  disabled={loading || !isLoaded}
                  className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {!isLoaded ? 'Loading…' : loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>

              <p className="mt-4 text-sm text-muted dark:text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary dark:text-indigo-400 font-bold hover:underline">Login</Link>
              </p>
            </>
          )}

          {/* ── EMAIL VERIFICATION ── */}
          {step === 'verify' && (
            <>
              <h2 className="text-2xl font-bold mb-1.5 dark:text-slate-100">Verify your email</h2>

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

              <form onSubmit={handleVerify} className="space-y-3.5">
                <div className="grid gap-2.5">
                  <label htmlFor="verify-code" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">
                    6-digit verification code
                  </label>
                  <input
                    id="verify-code"
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    className={inputClass + ' text-center text-xl tracking-widest font-bold'}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !isLoaded || code.length < 6}
                  className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying…' : 'Verify & Continue'}
                </button>
              </form>

              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="text-sm text-indigo-500 dark:text-indigo-400 hover:underline cursor-pointer disabled:opacity-50"
                >
                  {resending ? 'Sending…' : 'Resend code'}
                </button>
                <span className="text-gray-300 dark:text-slate-600">|</span>
                <button
                  type="button"
                  onClick={() => { setStep('form'); setError(''); setInfo(''); setCode(''); }}
                  className="text-sm text-muted dark:text-slate-400 hover:text-primary dark:hover:text-indigo-400 cursor-pointer"
                >
                  Change email
                </button>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
