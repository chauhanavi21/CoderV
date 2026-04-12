import { Link, useParams, Navigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { SkeletonHero, SkeletonList } from '../components/SkeletonCard';
import { useLessonsContext, useLessonDetail } from '../contexts/LessonsContext';
import { useProgress } from '../hooks/useProgress';
import { isDifficultyAccessible } from '../utils/lessonProgressGates';

const difficultyTone = {
  beginner: {
    card: 'bg-sky-50 border-sky-200 text-sky-900',
    badge: 'bg-sky-100 text-sky-800',
    bar: 'bg-sky-500',
  },
  easy: {
    card: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    badge: 'bg-emerald-100 text-emerald-800',
    bar: 'bg-emerald-500',
  },
  medium: {
    card: 'bg-amber-50 border-amber-200 text-amber-900',
    badge: 'bg-amber-100 text-amber-800',
    bar: 'bg-amber-500',
  },
  hard: {
    card: 'bg-rose-50 border-rose-200 text-rose-900',
    badge: 'bg-rose-100 text-rose-800',
    bar: 'bg-rose-500',
  },
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
        <div className="h-6 w-40 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mt-8 mb-4" />
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
      <div className="mb-6">
        <Link
          to="/lessons"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          &larr; All Lessons
        </Link>
      </div>

      {/* Hero */}
      <article className="bg-white border border-gray-200 rounded-2xl p-7 shadow-card grid grid-cols-1 xl:grid-cols-[1.4fr_260px] gap-6 items-start text-gray-900">
        <div>
          <div className="mb-3 flex items-center gap-2 flex-wrap">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${lesson?.color ?? 'bg-indigo-600'}`}
            >
              Lesson {lesson?.number}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              {module.lessonType.name}
            </span>
          </div>
          <h1 className="text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold leading-tight text-gray-900">
            {module.title}
          </h1>
          <p className="mt-3 max-w-3xl text-muted text-base leading-relaxed">
            {module.summary}
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <p className="text-sm font-bold text-indigo-900">Lesson overview</p>
          <dl className="mt-4 grid gap-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Progress
              </dt>
              <dd className="text-2xl font-extrabold text-indigo-950">
                {progress.completed} / {progress.total}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Difficulties
              </dt>
              <dd className="text-2xl font-extrabold text-indigo-950">
                {module.difficultyOrder.length}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Total examples
              </dt>
              <dd className="text-2xl font-extrabold text-indigo-950">{totalExamples}</dd>
            </div>
          </dl>
          <div className="mt-4 w-full bg-indigo-100 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      </article>

      {/* Difficulty cards */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">Choose a difficulty</h2>
        <p className="text-sm text-muted mt-1">
          {lessonId === 'web-lab'
            ? 'Complete HTML, then CSS, then JS: HTML/CSS edit the real sidebar and reset when you change stage, mark complete, or leave the lesson; JS runs a temporary in-memory “hack” of dashboard scores (not saved). Mark each stage when done.'
            : 'Each level contains five examples. Complete them all to master this lesson.'}
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {module.difficultyOrder.map((diffId) => {
            const diff = module.difficulties[diffId];
            const dp = getDifficultyProgress(lessonId, diffId);
            const tone = difficultyTone[diffId] || difficultyTone.beginner;
            const accessible = isDifficultyAccessible(module, lessonId, diffId, isComplete);

            const cardInner = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-lg">{diff.label}</h3>
                  <div className="flex items-center gap-2">
                    {!accessible && (
                      <span className="rounded-full bg-slate-200 dark:bg-slate-600 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                        Locked
                      </span>
                    )}
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone.badge}`}>
                      {diff.examples.length} examples
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed opacity-80 flex-1">{diff.description}</p>
                {!accessible && (
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {lessonId === 'web-lab'
                      ? 'Open the previous stage in the lab and use Mark stage complete before this step unlocks.'
                      : 'Complete every example in the previous difficulty with at least 80% on each quiz.'}
                  </p>
                )}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 bg-white/50 dark:bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${tone.bar}`}
                      style={{ width: `${dp.percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">
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
                  className={`border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-hover dark:border-slate-700 ${tone.card}`}
                >
                  {cardInner}
                </Link>
              );
            }

            return (
              <div
                key={diffId}
                className={`border rounded-2xl p-6 flex flex-col gap-4 cursor-not-allowed opacity-70 dark:border-slate-700 ${tone.card}`}
              >
                {cardInner}
              </div>
            );
          })}
        </div>
      </section>
    </AppLayout>
  );
}
