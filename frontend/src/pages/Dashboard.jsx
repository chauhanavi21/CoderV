import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { SkeletonHero, SkeletonList } from '../components/SkeletonCard';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { useLessonsContext } from '../contexts/LessonsContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { registry, registryLoading } = useLessonsContext();
  const { getTotalProgress, getLessonProgress, progressLoading } = useProgress();

  const firstName = user?.displayName?.split(' ')?.[0] || user?.email?.split('@')?.[0] || 'there';
  const total = getTotalProgress();

  // Build per-lesson progress for the cards
  const lessonCards = registry.map((lesson) => ({
    ...lesson,
    progress: lesson.available ? getLessonProgress(lesson.id) : null,
  }));

  // Hero CTA: first in-progress lesson, else first available
  const activeLesson =
    lessonCards.find((l) => l.available && l.progress?.completed > 0 && l.progress?.completed < l.progress?.total) ||
    lessonCards.find((l) => l.available);
  const activeLessonProgress = activeLesson?.progress ?? null;

  if (progressLoading || registryLoading) {
    return (
      <AppLayout sidebarId="dashboardSidebar">
        <SkeletonHero className="mb-2" />
        <div className="h-6 w-40 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mt-8 mb-4" />
        <SkeletonList count={3} />
      </AppLayout>
    );
  }

  return (
    <AppLayout sidebarId="dashboardSidebar">
      {/* Hero card */}
      <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-7 shadow-card grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center mb-2">
        <div>
          <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold mb-2.5 dark:text-slate-100">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-muted dark:text-slate-400 text-base leading-relaxed mb-4">
            {total.completed === 0
              ? 'Start your first lesson and begin the journey.'
              : total.completed === total.total
              ? 'Amazing — you\'ve completed every example! Keep practising.'
              : `You've completed ${total.completed} of ${total.total} examples. Keep going!`}
          </p>

          {activeLesson && activeLessonProgress && (
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to={`/lessons/${activeLesson.id}`}
                className="bg-indigo-50 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:shadow-md transition-all"
              >
                {activeLessonProgress.completed > 0 ? 'Continue' : 'Start'} {activeLesson.title}
              </Link>
              {activeLessonProgress.completed > 0 && (
                <span className="text-sm text-muted dark:text-slate-400">
                  {activeLessonProgress.completed}/{activeLessonProgress.total} examples done
                </span>
              )}
            </div>
          )}
        </div>

        {/* Progress ring */}
        <div className="grid place-items-center lg:place-items-center max-lg:place-items-start">
          <div
            className="w-[170px] aspect-square rounded-full grid place-items-center relative shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
            style={{
              background: `conic-gradient(#10b981 ${total.percent * 3.6}deg, #e2e8f0 0deg)`,
            }}
          >
            <div className="absolute w-[128px] h-[128px] rounded-full bg-white dark:bg-slate-800" />
            <span className="relative z-10 text-center font-extrabold text-emerald-900 dark:text-emerald-300 text-sm leading-snug">
              Overall<br />Progress<br />{total.completed} / {total.total}
            </span>
          </div>
        </div>
      </article>

      {/* Quick stats row */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Completed', value: total.completed, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Remaining', value: total.total - total.completed, color: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Total', value: total.total, color: 'text-slate-700 dark:text-slate-300' },
          { label: 'Percent', value: `${total.percent}%`, color: 'text-amber-600 dark:text-amber-400' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 shadow-sm"
          >
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted dark:text-slate-400 font-semibold mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* My Lessons — only lessons the user has touched */}
      {(() => {
        const startedLessons = lessonCards.filter((l) => l.available && l.progress?.completed > 0);

        if (startedLessons.length === 0) {
          return (
            <>
              <h2 className="mt-8 mb-4 text-xl font-bold dark:text-slate-100">My Lessons</h2>
              <div className="rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 p-10 text-center">
                <p className="text-2xl mb-3">📚</p>
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">No lessons started yet</p>
                <p className="text-sm text-muted dark:text-slate-400 mb-5">
                  Head to the Lessons page to pick your first topic and start learning.
                </p>
                <Link
                  to="/lessons"
                  className="inline-block bg-indigo-600 text-white rounded-xl px-6 py-3 text-sm font-bold hover:bg-indigo-500 shadow-sm transition-colors"
                >
                  Browse Lessons →
                </Link>
              </div>
            </>
          );
        }

        return (
          <>
            <h2 className="mt-8 mb-4 text-xl font-bold dark:text-slate-100">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {startedLessons.map((lesson) => {
                const p = lesson.progress;
                const completed = p.completed === p.total && p.total > 0;
                return (
                  <article
                    key={lesson.id}
                    className="border border-gray-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-800 shadow-sm flex flex-col gap-3 hover:-translate-y-1 hover:shadow-hover transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-xl grid place-items-center text-sm font-extrabold text-white shrink-0 ${lesson.color}`}>
                        {lesson.number}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm dark:text-slate-100 truncate">{lesson.title}</h3>
                        <p className="text-xs text-muted dark:text-slate-400">
                          {completed ? 'All done ✓' : `${p.completed} / ${p.total} examples`}
                        </p>
                      </div>
                      {completed && (
                        <span className="ml-auto shrink-0 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                          Done
                        </span>
                      )}
                    </div>

                    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${completed ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        style={{ width: `${p.percent}%` }}
                      />
                    </div>

                    <Link
                      to={`/lessons/${lesson.id}`}
                      className={`w-full text-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                        completed
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm'
                      }`}
                    >
                      {completed ? `Review ${lesson.title}` : `Continue ${lesson.title}`}
                    </Link>
                  </article>
                );
              })}
            </div>
          </>
        );
      })()}
    </AppLayout>
  );
}
