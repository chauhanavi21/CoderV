import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { SkeletonHero, SkeletonList } from '../components/SkeletonCard';
import { useLessonsContext, useLessonDetail } from '../contexts/LessonsContext';
import { useProgress } from '../hooks/useProgress';
import { isDifficultyAccessible } from '../utils/lessonProgressGates';

const difficultyTone = {
  beginner: 'text-sky-500',
  easy:     'text-emerald-500',
  medium:   'text-amber-500',
  hard:     'text-rose-500',
};

const difficultyBar = {
  beginner: 'bg-sky-500',
  easy:     'bg-emerald-500',
  medium:   'bg-amber-500',
  hard:     'bg-rose-500',
};

export default function LessonDetail() {
  const { lessonId } = useParams();
  const { registry } = useLessonsContext();
  const { module, loading: moduleLoading, error: moduleError } = useLessonDetail(lessonId);
  const { getLessonProgress, getDifficultyProgress, progressLoading, isComplete } = useProgress();

  const lesson = registry.find((l) => l.id === lessonId);

  const tabs = [
    { to: '/lessons', label: 'All Lessons' },
    { to: `/lessons/${lessonId}`, label: lesson ? `Lesson ${lesson.number}` : lessonId },
  ];

  if (moduleLoading || progressLoading) {
    return (
      <AppLayout tabs={tabs} sidebarId="lessonDetailSidebar">
        <SkeletonHero className="mb-2" />
        <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mt-8 mb-4" />
        <SkeletonList count={2} className="md:grid-cols-2 xl:grid-cols-2" />
      </AppLayout>
    );
  }

  if (moduleError || !module || (lesson && !lesson.available)) {
    return <Navigate to="/lessons" replace />;
  }

  const progress = getLessonProgress(lessonId);
  const totalExamples = module.difficultyOrder.reduce(
    (count, dId) => count + (module.difficulties[dId]?.examples?.length ?? 0),
    0
  );

  return (
    <AppLayout tabs={tabs} sidebarId="lessonDetailSidebar">
      {/* Breadcrumb */}
      <div className="mb-5">
        <Link
          to="/lessons"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted hover:text-fg transition-colors"
        >
          <ArrowLeft size={12} strokeWidth={2} /> All lessons
        </Link>
      </div>

      {/* Header */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_280px] gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-medium mono uppercase tracking-wider text-fg-subtle">
              Lesson {String(lesson?.number).padStart(2, '0')}
            </span>
            <span className="text-fg-subtle">·</span>
            <span className="text-[11px] font-medium mono uppercase tracking-wider text-fg-subtle">
              {module.lessonType.name}
            </span>
          </div>
          <h1 className="text-[28px] font-semibold tracking-tightish text-fg leading-tight">
            {module.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] text-fg-muted leading-relaxed">
            {module.summary}
          </p>
        </div>

        <div className="hairline rounded-md bg-elevated p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono mb-3">Overview</p>
          <dl className="grid grid-cols-3 gap-3">
            {[
              { l: 'Progress',    v: `${progress.completed}/${progress.total}` },
              { l: 'Levels',      v: module.difficultyOrder.length },
              { l: 'Examples',    v: totalExamples },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono">{s.l}</dt>
                <dd className="text-[18px] font-semibold mono text-fg mt-0.5">{s.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 w-full bg-zinc-100 dark:bg-zinc-900 h-px">
            <div className="h-px bg-fg transition-all duration-500" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>
      </div>

      {/* Difficulty cards */}
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">Choose a difficulty</p>
        <div className="flex-1 hairline-b" />
      </div>

      <p className="text-[13px] text-fg-muted mb-4 max-w-2xl">
        {lessonId === 'web-lab'
          ? 'Complete HTML, then CSS, then JS. HTML/CSS edit the real sidebar and reset when you change stage; JS runs an in-memory hack of dashboard scores (not saved). Mark each stage when done.'
          : 'Each level contains five examples. Complete them all to master this lesson.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {module.difficultyOrder.map((diffId) => {
          const diff = module.difficulties[diffId];
          const dp = getDifficultyProgress(lessonId, diffId);
          const tone = difficultyTone[diffId] || difficultyTone.beginner;
          const bar = difficultyBar[diffId] || difficultyBar.beginner;
          const accessible = isDifficultyAccessible(module, lessonId, diffId, isComplete);

          const cardInner = (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${bar}`} />
                  <h3 className="text-[14px] font-medium text-fg">{diff.label}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {!accessible && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle">
                      <Lock size={10} strokeWidth={2} /> locked
                    </span>
                  )}
                  <span className={`text-[10px] font-medium mono uppercase tracking-wider ${tone}`}>
                    {diff.examples.length} ex
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-fg-muted leading-relaxed flex-1">{diff.description}</p>

              {!accessible && (
                <p className="text-[11px] text-fg-subtle">
                  {lessonId === 'web-lab'
                    ? 'Mark the previous stage complete in the lab to unlock.'
                    : 'Score 80%+ on every example in the previous difficulty to unlock.'}
                </p>
              )}

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-900">
                  <div className={`h-px transition-all duration-500 ${bar}`} style={{ width: `${dp.percent}%` }} />
                </div>
                <span className="text-[11px] font-medium mono text-fg-subtle whitespace-nowrap">
                  {dp.completed}/{dp.total}
                </span>
              </div>
            </>
          );

          if (accessible) {
            return (
              <Link
                key={diffId}
                to={`/lessons/${lessonId}/${diffId}`}
                className="hairline rounded-md p-5 bg-elevated flex flex-col gap-3 hover:border-app-strong transition-colors"
              >
                {cardInner}
              </Link>
            );
          }

          return (
            <div
              key={diffId}
              className="hairline rounded-md p-5 bg-elevated flex flex-col gap-3 cursor-not-allowed opacity-60"
            >
              {cardInner}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
