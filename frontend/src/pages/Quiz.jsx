import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { SkeletonList } from '../components/SkeletonCard';

const BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

const difficultyTone = {
  easy: 'text-emerald-500',
  medium: 'text-amber-500',
  hard: 'text-red-500',
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  return `${m}m`;
}

const tabs = [
  { to: '/quiz', label: 'Extra Quiz' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE}/api/quizzes`)
      .then((r) => r.json())
      .then((d) => setQuizzes(d.quizzes || []))
      .catch(() => setError('Could not load quizzes. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout tabs={tabs} sidebarId="quizSidebar">
      <header className="hairline-b pb-5 mb-6">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-1.5">
          /quiz
        </p>
        <h1 className="text-2xl font-semibold tracking-tightish text-fg">
          Extra Practice Quizzes
        </h1>
        <p className="text-[13px] text-fg-muted mt-1.5 max-w-xl">
          Timed multiple-choice quizzes across topics. Each shows your score on submission.
        </p>
        <p className="text-[11px] mono text-fg-subtle mt-3">
          {loading ? '…' : quizzes.length} quiz{quizzes.length === 1 ? '' : 'zes'} available
        </p>
      </header>

      {loading && (
        <SkeletonList count={3} className="md:grid-cols-2 xl:grid-cols-3" />
      )}

      {error && (
        <div className="hairline rounded-md bg-red-500/5 border-red-500/30 p-4 text-[13px] text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {quizzes.map((q) => (
            <Link
              key={q.id}
              to={`/quiz/${q.id}`}
              className="group hairline rounded-md bg-elevated p-4 flex flex-col gap-2 hover:border-app-strong transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-[14px] text-fg leading-snug">
                  {q.title}
                </h3>
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="text-fg-subtle group-hover:text-fg group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5"
                />
              </div>
              <p className="text-[12.5px] text-fg-muted leading-relaxed flex-1">
                {q.description}
              </p>
              <div className="hairline-t mt-2 pt-2.5 flex items-center gap-3 text-[11px] mono">
                <span className="inline-flex items-center gap-1 text-fg-subtle">
                  <Clock size={11} strokeWidth={1.75} />
                  {formatTime(q.time_limit)}
                </span>
                <span className={`uppercase tracking-wider font-medium ${difficultyTone[q.difficulty] || 'text-fg-subtle'}`}>
                  {q.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
