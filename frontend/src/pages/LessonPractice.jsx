import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import StepVisualizer from '../components/StepVisualizer';
import QuizSection from '../components/QuizSection';
import { SkeletonCard } from '../components/SkeletonCard';
import { lessonsRegistry, getLessonModule } from '../data/lessonModules';
import { useProgress } from '../hooks/useProgress';

export default function LessonPractice() {
  const { lessonId, difficulty } = useParams();
  const lesson = lessonsRegistry.find((l) => l.id === lessonId);
  const module = getLessonModule(lessonId);
  const difficultyData = module?.difficulties?.[difficulty];

  const [activeExampleId,       setActiveExampleId]       = useState(
    difficultyData?.examples?.[0]?.id ?? ''
  );
  const [hasStartedVisualizer, setHasStartedVisualizer] = useState(false);
  const { markComplete, isComplete, progressLoading } = useProgress();

  useEffect(() => {
    if (difficultyData?.examples?.[0]) {
      setActiveExampleId(difficultyData.examples[0].id);
    }
  }, [difficulty]);

  // Reset quiz gate whenever the active example changes
  useEffect(() => {
    setHasStartedVisualizer(false);
  }, [activeExampleId]);

  if (!lesson || !module || !difficultyData) {
    return <Navigate to="/lessons" replace />;
  }

  const activeExample =
    difficultyData.examples.find((e) => e.id === activeExampleId) ??
    difficultyData.examples[0];

  const tabs = [
    { to: `/lessons/${lessonId}`, label: `Lesson ${lesson.number}` },
    { to: `/lessons/${lessonId}/${difficulty}`, label: difficultyData.label },
  ];

  if (progressLoading) {
    return (
      <AppLayout tabs={tabs} sidebarId="lessonPracticeSidebar">
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
          <SkeletonCard className="h-64" />
          <div className="grid gap-6">
            <SkeletonCard />
            <SkeletonCard className="h-56" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout tabs={tabs} sidebarId="lessonPracticeSidebar">
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-sm">
        <Link
          to="/lessons"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
        >
          Lessons
        </Link>
        <span className="text-gray-300 dark:text-slate-600">/</span>
        <Link
          to={`/lessons/${lessonId}`}
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
        >
          {module.title}
        </Link>
        <span className="text-gray-300 dark:text-slate-600">/</span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {difficultyData.label}
        </span>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
        {/* Example sidebar */}
        <aside className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold dark:text-slate-100">{difficultyData.label}</h2>
            <span className="text-xs font-bold text-muted dark:text-slate-400">
              {difficultyData.examples.length} examples
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {difficultyData.examples.map((example, index) => {
              const isSelected = example.id === activeExample.id;
              const done = isComplete(lessonId, difficulty, example.id);
              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => setActiveExampleId(example.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-primary dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm'
                      : 'border-gray-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted dark:text-slate-400">
                      Example {index + 1}
                    </p>
                    {done && (
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 grid place-items-center text-[10px] font-bold leading-none">
                        &#10003;
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-bold text-slate-900 dark:text-slate-100">
                    {example.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content area */}
        <div className="grid gap-6">
          {/* Example info */}
          <article className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-extrabold dark:text-slate-100">{activeExample.title}</h2>
              <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                {activeExample.nodes.length} node
                {activeExample.nodes.length !== 1 ? 's' : ''} /{' '}
                {activeExample.edges.length} edge
                {activeExample.edges.length !== 1 ? 's' : ''}
              </span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted dark:text-slate-400">
              {activeExample.explanation}
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  What you learn
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {activeExample.concept}
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                  Think about this
                </p>
                <p className="mt-2 text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                  {activeExample.challenge}
                </p>
              </div>
            </div>

            {isComplete(lessonId, difficulty, activeExample.id) && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 px-5 py-2.5 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                <span>&#10003;</span> Completed
              </div>
            )}
          </article>

          {/* Step visualizer */}
          {activeExample.steps && activeExample.steps.length > 0 && (
            <StepVisualizer
              key={activeExample.id}
              example={activeExample}
              onFirstInteraction={() => setHasStartedVisualizer(true)}
            />
          )}

          {/* Quiz — only shown after user interacts with the visualizer (or if already complete) */}
          {activeExample.quiz && activeExample.quiz.length > 0 && (
            hasStartedVisualizer || isComplete(lessonId, difficulty, activeExample.id)
              ? (
                <div className="animate-fade-in">
                  <QuizSection
                    key={`quiz-${activeExample.id}`}
                    quiz={activeExample.quiz}
                    alreadyComplete={isComplete(lessonId, difficulty, activeExample.id)}
                    onAllCorrect={() => markComplete(lessonId, difficulty, activeExample.id)}
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 p-8 text-center">
                  <p className="text-sm text-muted dark:text-slate-400">
                    Step through the visualizer above to unlock the quiz.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-indigo-500">
                    <span>Press</span>
                    <kbd className="rounded bg-slate-100 dark:bg-slate-700 px-2 py-0.5 font-mono text-slate-600 dark:text-slate-300">Step →</kbd>
                    <span>or</span>
                    <kbd className="rounded bg-slate-100 dark:bg-slate-700 px-2 py-0.5 font-mono text-slate-600 dark:text-slate-300">▶ Run All</kbd>
                  </div>
                </div>
              )
          )}
        </div>
      </section>
    </AppLayout>
  );
}
