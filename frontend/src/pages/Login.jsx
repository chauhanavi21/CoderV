import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend integration later
  };

  return (
    <main className="min-h-screen grid place-items-center py-7">
      <section className="w-[min(900px,96%)] grid grid-cols-1 md:grid-cols-2 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-card">
        {/* Visual side */}
        <aside className="gradient-auth text-white p-10 max-md:p-7">
          <div className="inline-flex items-center gap-2.5 font-extrabold tracking-tight">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-white/25 grid place-items-center font-black">
              C
            </div>
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
              <div
                key={text}
                className="bg-white/[0.18] border border-white/[0.28] rounded-xl px-3.5 py-3 text-sm"
              >
                {text}
              </div>
            ))}
          </div>
        </aside>

        {/* Form side */}
        <section className="p-10 max-md:p-7">
          <h2 className="text-2xl font-bold mb-1.5">Login</h2>
          <p className="text-muted text-sm mb-5">Welcome back. Continue your study streak.</p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid gap-2.5">
              <label htmlFor="login-email" className="text-sm text-gray-700 font-semibold">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div className="grid gap-2.5">
              <label htmlFor="login-password" className="text-sm text-gray-700 font-semibold">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <button
              type="submit"
              className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-muted">
            New user?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </section>
      </section>
    </main>
  );
}
