import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { SkeletonList } from '../components/SkeletonCard';

const BASE = import.meta.env.VITE_API_URL || 'https://coderv-backend.onrender.com';

const difficultyStyles = {
  easy:   { badge: 'bg-emerald-100 text-emerald-800', bar: 'bg-emerald-500' },
  medium: { badge: 'bg-amber-100 text-amber-800',     bar: 'bg-amber-500'   },
  hard:   { badge: 'bg-red-100 text-red-800',         bar: 'bg-red-500'     },
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  return `${m} min`;
}

const tabs = [
  { to: '/quiz',      label: 'Extra Quiz' },
  { to: '/resources', label: 'Resources'  },
  { to: '/about',     label: 'About'      },
];

export default function Quiz() {
  const [quizzes, setQuizzes]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);

  useEffect(() => {
    fetch(`${BASE}/api/quizzes`)
      .then((r) => r.json())
      .then((d) => setQuizzes(d.quizzes || []))
      .catch(() => setError('Could not load quizzes. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout tabs={tabs} sidebarId="quizSidebar">
      {/* Hero */}
      <article className="bg-white border border-gray-200 rounded-2xl p-7 shadow-card grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center mb-2 text-gray-900">
        <div>
          <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold mb-2.5">
            Extra Practice Quizzes
          </h1>
          <p className="text-muted text-base leading-relaxed">
            Challenge yourself with timed quizzes across different topics. Each quiz has a countdown timer and shows your score at the end.
          </p>
        </div>
        <div className="grid place-items-center lg:place-items-center max-lg:place-items-start">
          <div className="w-[170px] h-[170px] rounded-full gradient-quiz-badge grid place-items-center shadow-[0_12px_30px_rgba(99,102,241,0.25)]">
            <div className="bg-white w-[130px] h-[130px] rounded-full flex flex-col items-center justify-center">
              <span className="text-[2.5rem] font-extrabold text-primary leading-none">
                {loading ? '…' : quizzes.length}
              </span>
              <span className="text-xs text-muted font-semibold text-center leading-snug">
                Quizzes<br />Available
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* Quiz grid */}
      <h2 className="mt-8 mb-4 text-xl font-bold dark:text-slate-100">Available Quizzes</h2>

      {loading && (
        <SkeletonList count={3} className="md:grid-cols-2 xl:grid-cols-3" />
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {quizzes.map((q) => {
            const style = difficultyStyles[q.difficulty] || difficultyStyles.easy;
            return (
              <article
                key={q.id}
                className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col gap-3 hover:-translate-y-1 hover:shadow-hover transition-all duration-200 text-gray-900"
              >
                <div className="text-[2.5rem] mb-1">{q.icon}</div>
                <h3 className="font-bold text-base">{q.title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{q.description}</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-1">
                  <span className="text-xs text-muted font-semibold">⏱ {formatTime(q.time_limit)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${style.badge}`}>
                    {q.difficulty}
                  </span>
                </div>
                <Link
                  to={`/quiz/${q.id}`}
                  className="w-full text-center gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                >
                  Start Quiz
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}
