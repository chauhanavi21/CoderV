import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen grid place-items-center py-7 bg-slate-50 dark:bg-slate-950">
      <div className="text-center max-w-md px-6">
        <div className="w-[90px] h-[90px] rounded-3xl gradient-primary inline-grid place-items-center font-black text-5xl text-white shadow-card mb-8">
          ?
        </div>
        <h1 className="text-6xl font-black text-primary mb-4">404</h1>
        <p className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Page not found
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist, was removed, or the URL is wrong.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl px-5 py-3 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            ← Go back
          </button>
          <Link
            to="/dashboard"
            className="inline-block gradient-primary text-white rounded-xl px-6 py-3 text-sm font-bold shadow-btn hover:-translate-y-0.5 active:translate-y-0 transition-transform"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
