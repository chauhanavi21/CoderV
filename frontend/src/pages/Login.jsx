import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/react';

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  };

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
            Learn smarter, code better
          </h1>
          <p className="mb-7 opacity-90 leading-relaxed">
            Focused learning experience with structured lessons, practice quizzes, and AI-powered support.
            Your dashboard shows exactly what to do next.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['6 Learning tracks', 'Daily quiz mode', 'Progress insights', 'Ask AI support'].map((text) => (
              <div key={text} className="bg-white/[0.18] border border-white/[0.28] rounded-xl px-3.5 py-3 text-sm">
                {text}
              </div>
            ))}
          </div>
        </aside>

        {/* Form side */}
        <section className="p-10 max-md:p-7">
          <h2 className="text-2xl font-bold mb-1.5 dark:text-slate-100">Login</h2>
          <p className="text-muted dark:text-slate-400 text-sm mb-5">Welcome back. Continue your study streak.</p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid gap-2.5">
              <label htmlFor="login-email" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl px-3.5 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div className="grid gap-2.5">
              <label htmlFor="login-password" className="text-sm text-gray-700 dark:text-slate-300 font-semibold">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl px-3.5 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isLoaded}
              className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-sm text-muted dark:text-slate-400">
            New user?{' '}
            <Link to="/signup" className="text-primary dark:text-indigo-400 font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </section>
      </section>
    </main>
  );
}
