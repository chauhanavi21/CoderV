import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend integration later
  };

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10';

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
            Start your coding journey
          </h1>
          <p className="mb-7 opacity-90 leading-relaxed">
            Master programming with structured lessons, practice challenges, and a clear learning path
            designed to keep you consistent and motivated.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['Topic-wise progress', 'Quiz + puzzle practice', 'Revision reminders', 'Adaptive flow'].map(
              (text) => (
                <div
                  key={text}
                  className="bg-white/[0.18] border border-white/[0.28] rounded-xl px-3.5 py-3 text-sm"
                >
                  {text}
                </div>
              ),
            )}
          </div>
        </aside>

        {/* Form side */}
        <section className="p-10 max-md:p-7">
          <h2 className="text-2xl font-bold mb-1.5">Sign up</h2>
          <p className="text-muted text-sm mb-5">Create account to enter the study platform.</p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="grid gap-2.5">
                <label htmlFor="signup-first" className="text-sm text-gray-700 font-semibold">First name</label>
                <input
                  id="signup-first"
                  type="text"
                  placeholder="First name"
                  required
                  value={form.firstName}
                  onChange={update('firstName')}
                  className={inputClass}
                />
              </div>
              <div className="grid gap-2.5">
                <label htmlFor="signup-last" className="text-sm text-gray-700 font-semibold">Last name</label>
                <input
                  id="signup-last"
                  type="text"
                  placeholder="Last name"
                  required
                  value={form.lastName}
                  onChange={update('lastName')}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-2.5">
              <label htmlFor="signup-email" className="text-sm text-gray-700 font-semibold">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={update('email')}
                className={inputClass}
              />
            </div>

            <div className="grid gap-2.5">
              <label htmlFor="signup-password" className="text-sm text-gray-700 font-semibold">Password</label>
              <input
                id="signup-password"
                type="password"
                placeholder="Create password"
                required
                value={form.password}
                onChange={update('password')}
                className={inputClass}
              />
            </div>

            <div className="grid gap-2.5">
              <label htmlFor="signup-confirm" className="text-sm text-gray-700 font-semibold">Confirm password</label>
              <input
                id="signup-confirm"
                type="password"
                placeholder="Confirm password"
                required
                value={form.confirmPassword}
                onChange={update('confirmPassword')}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-sm text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Login
            </Link>
          </p>
        </section>
      </section>
    </main>
  );
}
