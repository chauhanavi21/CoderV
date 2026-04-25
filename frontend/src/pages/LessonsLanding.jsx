import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { SkeletonHero, SkeletonList } from '../components/SkeletonCard';
import { useLessonsContext } from '../contexts/LessonsContext';
import { useProgress } from '../hooks/useProgress';

const tabs = [
  { to: '/lessons', label: 'All Lessons' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function LessonsLanding() {
  const { registry, registryLoading } = useLessonsContext();
  const { getLessonProgress, getTotalProgress, progressLoading } = useProgress();
  const total = getTotalProgress();

  const isLoading = registryLoading || progressLoading;

  if (isLoading) {
    return (
      <AppLayout tabs={tabs} sidebarId="lessonsSidebar">
        <SkeletonHero className="mb-2" />
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mt-8 mb-4" />
        <SkeletonList count={2} className="md:grid-cols-2 xl:grid-cols-2" />
      </AppLayout>
    );
  }

  return (
    <AppLayout tabs={tabs} sidebarId="lessonsSidebar">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">Curriculum</p>
          <h1 className="mt-1 text-[22px] font-semibold tracking-tightish text-fg">Your Learning Path</h1>
          <p className="mt-1 text-[13px] text-fg-muted">
            Work through each lesson at your own pace.
          </p>
        </div>
        <div className="hairline rounded-md px-4 py-2.5 bg-elevated">
          <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono">Total Progress</p>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-[18px] font-semibold mono text-fg">{total.completed}<span className="text-fg-subtle"> / {total.total}</span></p>
            <span className="text-[11px] mono text-fg-muted">({total.percent}%)</span>
          </div>
          <div className="mt-2 w-32 h-px bg-zinc-200 dark:bg-zinc-800">
            <div className="h-px bg-fg transition-all duration-500" style={{ width: `${total.percent}%` }} />
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">All Lessons</p>
        <div className="flex-1 hairline-b" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {registry.map((lesson) => {
          const progress = getLessonProgress(lesson.id);
          const isLocked = !lesson.available;
          return (
            <article
              key={lesson.id}
              className={`hairline rounded-md p-5 bg-elevated flex flex-col gap-3 transition-colors ${
                isLocked ? 'opacity-50' : 'hover:border-app-strong'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-7 h-7 rounded-md grid place-items-center font-semibold text-[11px] mono bg-zinc-100 dark:bg-zinc-900 text-fg shrink-0">
                    {String(lesson.number+1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[14px] font-medium text-fg truncate">{lesson.title}</h3>
                </div>
                {isLocked ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle">
                    <Lock size={10} strokeWidth={2} /> locked
                  </span>
                ) : (
                  <span className="text-[11px] font-medium mono text-fg-subtle">
                    {progress.completed}/{progress.total}
                  </span>
                )}
              </div>

              <p className="text-[13px] text-fg-muted leading-relaxed">{lesson.description}</p>

              {!isLocked && (
                <>
                  <div className="w-full h-px bg-zinc-100 dark:bg-zinc-900">
                    <div
                      className="h-px bg-fg transition-all duration-500"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="group inline-flex items-center justify-between text-[12px] font-medium text-fg-muted hover:text-fg transition-colors"
                  >
                    <span>{progress.completed > 0 ? 'Continue' : 'Start'} Lesson {lesson.number}</span>
                    <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </>
              )}

              {isLocked && (
                <div className="text-[11px] font-medium mono uppercase tracking-wider text-fg-subtle">
                  Coming soon
                </div>
              )}
            </article>
          );
        })}
      </div>
    </AppLayout>
  );
}
