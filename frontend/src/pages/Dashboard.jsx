import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Check } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { SkeletonHero, SkeletonList } from '../components/SkeletonCard';
import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { useLessonsContext } from '../contexts/LessonsContext';
import { useWebLabDashboardHackOptional } from '../contexts/WebLabDashboardHackContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { registry, registryLoading } = useLessonsContext();
  const { getTotalProgress, getLessonProgress, progressLoading } = useProgress();
  const dashboardHack = useWebLabDashboardHackOptional();

  const firstName = user?.displayName?.split(' ')?.[0] || user?.email?.split('@')?.[0] || 'there';
  const totalRaw = getTotalProgress();
  const total = useMemo(
    () => (dashboardHack ? dashboardHack.mergeTotalProgress(totalRaw) : totalRaw),
    [dashboardHack, totalRaw]
  );

  const lessonCards = registry.map((lesson) => ({
    ...lesson,
    progress: lesson.available ? getLessonProgress(lesson.id) : null,
  }));

  const activeLesson =
    lessonCards.find((l) => l.available && l.progress?.completed > 0 && l.progress?.completed < l.progress?.total) ||
    lessonCards.find((l) => l.available);
  const activeLessonProgress = activeLesson?.progress ?? null;

  if (progressLoading || registryLoading) {
    return (
      <AppLayout sidebarId="dashboardSidebar">
        <SkeletonHero className="mb-2" />
        <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mt-8 mb-4" />
        <SkeletonList count={3} />
      </AppLayout>
    );
  }

  return (
    <AppLayout sidebarId="dashboardSidebar">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">Overview</p>
          <h1 className="mt-1 text-[22px] font-semibold tracking-tightish text-fg">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-[13px] text-fg-muted">
            {total.completed === 0
              ? 'Start your first lesson to begin tracking progress.'
              : total.completed === total.total
              ? 'You have completed every example.'
              : `${total.completed} of ${total.total} examples completed.`}
          </p>
        </div>
        {activeLesson && activeLessonProgress && (
          <Link
            to={`/lessons/${activeLesson.id}`}
            className="group inline-flex items-center gap-2 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3 h-8 text-[13px] font-medium hover:opacity-90 transition-opacity"
          >
            {activeLessonProgress.completed > 0 ? 'Continue' : 'Start'} {activeLesson.title}
            <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Progress strip */}
      <div className="hairline rounded-md bg-elevated overflow-hidden mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-zinc-200 dark:divide-zinc-800">
          {[
            { label: 'Completed', value: total.completed },
            { label: 'Remaining', value: total.total - total.completed },
            { label: 'Total',     value: total.total },
            { label: 'Progress',  value: `${total.percent}%` },
          ].map((s) => (
            <div key={s.label} className="px-4 py-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">{s.label}</p>
              <p className="mt-1 text-[20px] font-semibold tracking-tightish text-fg mono">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="hairline-t h-px bg-bg">
          <div
            className="h-px bg-emerald-500 transition-all duration-500"
            style={{ width: `${total.percent}%` }}
          />
        </div>
      </div>

      {/* My Lessons */}
      {(() => {
        const startedLessons = lessonCards.filter((l) => l.available && l.progress?.completed > 0);

        if (startedLessons.length === 0) {
          return (
            <>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">My Lessons</p>
                <div className="flex-1 hairline-b" />
              </div>
              <div className="hairline rounded-md p-10 text-center bg-elevated">
                <BookOpen size={20} strokeWidth={1.5} className="mx-auto mb-3 text-fg-subtle" />
                <p className="text-[13px] font-medium text-fg mb-1">No lessons started</p>
                <p className="text-[12px] text-fg-muted mb-5">
                  Pick a topic from the lessons page to begin.
                </p>
                <Link
                  to="/lessons"
                  className="inline-flex items-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3 h-8 text-[13px] font-medium hover:opacity-90 transition"
                >
                  Browse lessons <ArrowRight size={13} strokeWidth={2} />
                </Link>
              </div>
            </>
          );
        }

        return (
          <>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">Continue Learning</p>
              <div className="flex-1 hairline-b" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {startedLessons.map((lesson) => {
                const p = lesson.progress;
                const completed = p.completed === p.total && p.total > 0;
                return (
                  <article
                    key={lesson.id}
                    className="hairline rounded-md p-4 bg-elevated flex flex-col gap-3 hover:border-app-strong transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-md grid place-items-center text-[11px] font-semibold mono bg-zinc-100 dark:bg-zinc-900 text-fg shrink-0">
                        {String(lesson.number+1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-medium text-fg truncate">{lesson.title}</h3>
                        <p className="text-[11px] text-fg-subtle mono mt-0.5">
                          {completed ? 'all done' : `${p.completed} / ${p.total} examples`}
                        </p>
                      </div>
                      {completed && (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-medium mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          <Check size={11} strokeWidth={2.5} /> done
                        </span>
                      )}
                    </div>

                    <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-px">
                      <div
                        className={`h-px transition-all duration-500 ${completed ? 'bg-emerald-500' : 'bg-fg'}`}
                        style={{ width: `${p.percent}%` }}
                      />
                    </div>

                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="group inline-flex items-center justify-between text-[12px] font-medium text-fg-muted hover:text-fg transition-colors"
                    >
                      <span>{completed ? 'Review' : 'Continue'}</span>
                      <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
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
