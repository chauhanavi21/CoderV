import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import StepVisualizer from '../components/StepVisualizer';
import QuizSection from '../components/QuizSection';
import QuizAiBot from '../components/QuizAiBot';
import { SkeletonCard } from '../components/SkeletonCard';
import { useLessonsContext, useLessonDetail } from '../contexts/LessonsContext';
import { fetchExample } from '../api/lessons';
import { useProgress } from '../hooks/useProgress';
import WebCustomizeLab from './WebCustomizeLab';
import BugFixLab from './BugFixLab';
import {
  getSuggestedExampleId,
  isDifficultyAccessible,
  isExampleUnlocked,
} from '../utils/lessonProgressGates';

export default function LessonPractice() {
  const { lessonId, difficulty } = useParams();
  const { registry } = useLessonsContext();
  const { module, loading: moduleLoading } = useLessonDetail(lessonId);
  const lesson = registry.find((l) => l.id === lessonId);

  const difficultyData = module?.difficulties?.[difficulty];

  const [activeExampleId, setActiveExampleId] = useState(null);
  const [activeExample, setActiveExample] = useState(null);
  const [exampleLoading, setExampleLoading] = useState(false);
  const [hasStartedVisualizer, setHasStartedVisualizer] = useState(false);
  const [challengeAccepted, setChallengeAccepted] = useState(false);

  const { markComplete, isComplete, progressLoading } = useProgress();

  useEffect(() => {
    if (progressLoading || !difficultyData?.examples?.length) return;

    setActiveExampleId((prev) => {
      const examples = difficultyData.examples;
      const fallback =
        getSuggestedExampleId(examples, lessonId, difficulty, isComplete) ?? examples[0].id;

      if (!prev) return fallback;

      const idx = examples.findIndex((e) => e.id === prev);
      if (idx < 0) return fallback;
      if (!isExampleUnlocked(examples, idx, lessonId, difficulty, isComplete)) return fallback;
      return prev;
    });
  }, [difficultyData, lessonId, difficulty, isComplete, progressLoading]);

  // Fetch full example whenever active example ID changes
  useEffect(() => {
    if (!activeExampleId) return;
    setExampleLoading(true);
    setActiveExample(null);
    setHasStartedVisualizer(false);
    setChallengeAccepted(false);
    fetchExample(activeExampleId)
      .then(setActiveExample)
      .catch(() => setActiveExample(null))
      .finally(() => setExampleLoading(false));
  }, [activeExampleId]);

  // Reset gate on difficulty change
  useEffect(() => {
    setHasStartedVisualizer(false);
    setChallengeAccepted(false);
  }, [difficulty]);

  const tabs = [
    { to: `/lessons/${lessonId}`, label: lesson ? `Lesson ${lesson.number}` : lessonId },
    { to: `/lessons/${lessonId}/${difficulty}`, label: difficultyData?.label ?? difficulty },
  ];

  if (lessonId === 'basics') {
    if (moduleLoading || progressLoading) {
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
    return <BugFixLab />;
  }

  if (lessonId === 'web-lab') {
    if (difficulty !== 'html' && difficulty !== 'css' && difficulty !== 'js') {
      return <Navigate to="/lessons/web-lab/html" replace />;
    }
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
    return <WebCustomizeLab />;
  }

  if (moduleLoading || progressLoading) {
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

  if (!module || !difficultyData) {
    return <Navigate to="/lessons" replace />;
  }

  if (!isDifficultyAccessible(module, lessonId, difficulty, isComplete)) {
    return <Navigate to={`/lessons/${lessonId}`} replace />;
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
            {difficultyData.examples.map((ex, index) => {
              const isSelected = ex.id === activeExampleId;
              const done = isComplete(lessonId, difficulty, ex.id);
              const unlocked = isExampleUnlocked(
                difficultyData.examples,
                index,
                lessonId,
                difficulty,
                isComplete
              );
              return (
                <button
                  key={ex.id}
                  type="button"
                  disabled={!unlocked}
                  title={
                    unlocked
                      ? undefined
                      : 'Complete the previous example with at least 80% on the quiz to unlock.'
                  }
                  onClick={() => unlocked && setActiveExampleId(ex.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    !unlocked
                      ? 'border-gray-200 dark:border-slate-700 opacity-50 cursor-not-allowed'
                      : isSelected
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
                  <h3 className="mt-1 font-bold text-slate-900 dark:text-slate-100">{ex.title}</h3>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <div className="grid gap-6">
          {exampleLoading || !activeExample ? (
            <>
              <SkeletonCard />
              <SkeletonCard className="h-72" />
            </>
          ) : (
            <>
              {/* Example info */}
              <article className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h2 className="text-2xl font-extrabold dark:text-slate-100">
                    {activeExample.title}
                  </h2>
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
              {activeExample.steps?.length > 0 && (
                <StepVisualizer
                  key={activeExample.id}
                  example={activeExample}
                  onFirstInteraction={() => setHasStartedVisualizer(true)}
                />
              )}

              {/* Quiz */}
              {activeExample.quiz?.length > 0 && (
                hasStartedVisualizer || isComplete(lessonId, difficulty, activeExample.id) ? (
                  challengeAccepted ? (
                    <div className="animate-fade-in grid gap-6">
                      <QuizSection
                        key={`quiz-${activeExample.id}`}
                        quiz={activeExample.quiz}
                        alreadyComplete={isComplete(lessonId, difficulty, activeExample.id)}
                        onPass={() => markComplete(lessonId, difficulty, activeExample.id)}
                      />
                      <QuizAiBot
                        key={`bot-${activeExample.id}`}
                        quiz={activeExample.quiz}
                        exampleTitle={activeExample.title}
                        exampleConcept={activeExample.concept}
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center shadow-sm">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Ready when you are.
                      </p>
                      <p className="mt-2 text-sm text-muted dark:text-slate-400">
                        Open the quiz only if you want a quick check on this example.
                      </p>
                      <button
                        type="button"
                        onClick={() => setChallengeAccepted(true)}
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:ring-offset-slate-900"
                      >
                        Challenge me
                      </button>
                    </div>
                  )
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 p-8 text-center">
                    <p className="text-sm text-muted dark:text-slate-400">
                      Step through the visualizer above to unlock the quiz.
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-indigo-500">
                      <span>Press</span>
                      <kbd className="rounded bg-slate-100 dark:bg-slate-700 px-2 py-0.5 font-mono text-slate-600 dark:text-slate-300">
                        Step →
                      </kbd>
                      <span>or</span>
                      <kbd className="rounded bg-slate-100 dark:bg-slate-700 px-2 py-0.5 font-mono text-slate-600 dark:text-slate-300">
                        ▶ Run All
                      </kbd>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
