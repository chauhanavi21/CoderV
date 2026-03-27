import { Link, useParams, Navigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { SkeletonHero, SkeletonList } from '../components/SkeletonCard';
import { lessonsRegistry, getLessonModule } from '../data/lessonModules';
import { useProgress } from '../hooks/useProgress';

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
  const lesson = lessonsRegistry.find((l) => l.id === lessonId);
  const module = getLessonModule(lessonId);
  const { getLessonProgress, getDifficultyProgress, progressLoading } = useProgress();

  if (!lesson || !lesson.available || !module) {
    return <Navigate to="/lessons" replace />;
  }
  const progress = getLessonProgress(lesson.id);
  const totalExamples = module.difficultyOrder.reduce(
    (count, dId) => count + module.difficulties[dId].examples.length,
    0
  );

  const tabs = [
    { to: '/lessons', label: 'All Lessons' },
    { to: `/lessons/${lesson.id}`, label: `Lesson ${lesson.number}` },
  ];

  if (progressLoading) {
    return (
      <AppLayout tabs={tabs} sidebarId="lessonDetailSidebar">
        <SkeletonHero className="mb-2" />
        <div className="h-6 w-40 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mt-8 mb-4" />
        <SkeletonList count={2} className="md:grid-cols-2 xl:grid-cols-2" />
      </AppLayout>
    );
  }

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
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${lesson.color}`}
            >
              Lesson {lesson.number}
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
              <dd className="text-2xl font-extrabold text-indigo-950">
                {totalExamples}
              </dd>
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
          Each level contains five examples. Complete them all to master this
          lesson.
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {module.difficultyOrder.map((diffId) => {
            const diff = module.difficulties[diffId];
            const dp = getDifficultyProgress(lesson.id, diffId);
            const tone = difficultyTone[diffId] || difficultyTone.beginner;

            return (
              <Link
                key={diffId}
                to={`/lessons/${lesson.id}/${diffId}`}
                className={`border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-hover ${tone.card}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-lg">{diff.label}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${tone.badge}`}
                  >
                    {diff.examples.length} examples
                  </span>
                </div>
                <p className="text-sm leading-relaxed opacity-80 flex-1">
                  {diff.description}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 bg-white/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${tone.bar}`}
                      style={{ width: `${dp.percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">
                    {dp.completed}/{dp.total}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </AppLayout>
  );
}
