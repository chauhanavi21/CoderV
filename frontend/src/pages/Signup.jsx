import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '@clerk/react';

export default function Signup() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const navigate = useNavigate();

  const [step, setStep] = useState('form'); // 'form' | 'verify'
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match.');
    }
    setError('');
    setLoading(true);
    try {
      await signUp.create({
        firstName: form.firstName,
        lastName: form.lastName,
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setStep('verify');
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl px-3.5 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10';

  return (
    <main className="min-h-screen grid place-items-center py-7">
      <section className="w-[min(900px,96%)] grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-card">
        {/* Visual side */}
        <aside className="gradient-auth text-white p-10 max-md:p-7">
          <div className="inline-flex items-center gap-2.5 font-extrabold tracking-tight">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-white/25 grid place-items-center font-black">C</div>
            CoderV
          </div>
          <h1 className="mt-5 mb-2.5 text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight font-extrabold">
            Start your coding journey
          </h1>
          <p className="mb-7 opacity-90 leading-relaxed">
            Master programming with structured lessons, practice challenges, and a clear learning path
            designed to keep you consistent and motivated.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['Topic-wise progress', 'Quiz + puzzle practice', 'Revision reminders', 'Adaptive flow'].map((text) => (
              <div key={text} className="bg-white/[0.18] border border-white/[0.28] rounded-xl px-3.5 py-3 text-sm">
                {text}
              </div>
            ))}
          </div>
        </aside>

        {/* Form side */}
        <section className="p-10 max-md:p-7">
          {step === 'form' ? (
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
                  <input id="signup-password" type="password" placeholder="Create password (min 8 chars)" required minLength={8} value={form.password} onChange={update('password')} className={inputClass} />
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
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <p className="mt-4 text-sm text-muted dark:text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary dark:text-indigo-400 font-bold hover:underline">Login</Link>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-1.5 dark:text-slate-100">Verify your email</h2>
              <p className="text-muted dark:text-slate-400 text-sm mb-5">
                We sent a 6-digit code to <strong>{form.email}</strong>. Enter it below.
              </p>

              {error && (
                <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerify} className="space-y-3.5">
                <div className="grid gap-2.5">
                  <label htmlFor="verify-code" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Verification code</label>
                  <input
                    id="verify-code"
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={inputClass + ' text-center text-xl tracking-widest font-bold'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !isLoaded}
                  className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>

              <button
                type="button"
                onClick={() => { setStep('form'); setError(''); }}
                className="mt-4 text-sm text-muted dark:text-slate-400 hover:text-primary dark:hover:text-indigo-400 cursor-pointer"
              >
                Back to sign up
              </button>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
