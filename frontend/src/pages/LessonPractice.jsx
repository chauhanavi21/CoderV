import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Check, Play, ChevronRight } from 'lucide-react';
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
          <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
            <SkeletonCard className="h-64" />
            <div className="grid gap-4">
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
          <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
            <SkeletonCard className="h-64" />
            <div className="grid gap-4">
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
        <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
          <SkeletonCard className="h-64" />
          <div className="grid gap-4">
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
      <div className="mb-5 flex items-center gap-1.5 text-[12px] mono">
        <Link to="/lessons" className="font-medium text-fg-muted hover:text-fg transition-colors">
          lessons
        </Link>
        <ChevronRight size={11} className="text-fg-subtle" />
        <Link
          to={`/lessons/${lessonId}`}
          className="font-medium text-fg-muted hover:text-fg transition-colors"
        >
          {module.title.toLowerCase().replace(/\s+/g, '-')}
        </Link>
        <ChevronRight size={11} className="text-fg-subtle" />
        <span className="font-medium text-fg">{difficultyData.label.toLowerCase()}</span>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
        {/* Example sidebar */}
        <aside className="hairline rounded-md bg-elevated p-3">
          <div className="flex items-center justify-between gap-3 px-1 pb-2 mb-2 hairline-b">
            <h2 className="text-[13px] font-semibold text-fg">{difficultyData.label}</h2>
            <span className="text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle">
              {difficultyData.examples.length} ex
            </span>
          </div>

          <div className="grid gap-px">
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
                      : 'Complete the previous example with at least 80% to unlock.'
                  }
                  onClick={() => unlocked && setActiveExampleId(ex.id)}
                  className={`group flex items-start gap-2.5 rounded-md p-2 text-left transition-colors ${
                    !unlocked
                      ? 'opacity-40 cursor-not-allowed'
                      : isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-900'
                      : 'hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60'
                  }`}
                >
                  <span className={`mt-0.5 w-4 h-4 rounded grid place-items-center text-[9px] font-semibold mono shrink-0 ${
                    done
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-zinc-200/60 dark:bg-zinc-800 text-fg-subtle'
                  }`}>
                    {done ? <Check size={9} strokeWidth={3} /> : String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-fg leading-snug truncate">{ex.title}</p>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <div className="grid gap-4">
          {exampleLoading || !activeExample ? (
            <>
              <SkeletonCard />
              <SkeletonCard className="h-72" />
            </>
          ) : (
            <>
              <article className="hairline rounded-md bg-elevated p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h2 className="text-[18px] font-semibold tracking-tightish text-fg">
                    {activeExample.title}
                  </h2>
                  <span className="text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle">
                    {activeExample.nodes.length} node
                    {activeExample.nodes.length !== 1 ? 's' : ''} · {activeExample.edges.length} edge
                    {activeExample.edges.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <p className="mt-3 text-[13px] text-fg-muted leading-relaxed">
                  {activeExample.explanation}
                </p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="hairline rounded-md p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono">
                      What you learn
                    </p>
                    <p className="mt-2 text-[13px] text-fg-muted leading-relaxed">
                      {activeExample.concept}
                    </p>
                  </div>
                  <div className="hairline rounded-md p-3 border-amber-500/30">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400 mono">
                      Think about this
                    </p>
                    <p className="mt-2 text-[13px] text-fg-muted leading-relaxed">
                      {activeExample.challenge}
                    </p>
                  </div>
                </div>

                {isComplete(lessonId, difficulty, activeExample.id) && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Check size={12} strokeWidth={2.5} /> Completed
                  </div>
                )}
              </article>

              {activeExample.steps?.length > 0 && (
                <StepVisualizer
                  key={activeExample.id}
                  example={activeExample}
                  onFirstInteraction={() => setHasStartedVisualizer(true)}
                />
              )}

              {activeExample.quiz?.length > 0 && (
                hasStartedVisualizer || isComplete(lessonId, difficulty, activeExample.id) ? (
                  challengeAccepted ? (
                    <div className="animate-fade-in grid gap-4">
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
                    <div className="hairline rounded-md bg-elevated p-6 text-center">
                      <p className="text-[13px] font-medium text-fg">Ready when you are.</p>
                      <p className="mt-1 text-[12px] text-fg-muted">
                        Open the quiz only if you want a quick check on this example.
                      </p>
                      <button
                        type="button"
                        onClick={() => setChallengeAccepted(true)}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3 h-8 text-[13px] font-medium hover:opacity-90 transition"
                      >
                        Challenge me
                      </button>
                    </div>
                  )
                ) : (
                  <div className="hairline rounded-md p-6 text-center border-dashed">
                    <p className="text-[13px] text-fg-muted">
                      Step through the visualizer to unlock the quiz.
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-fg-subtle">
                      <span>Press</span>
                      <kbd className="hairline rounded px-1.5 py-0.5 mono text-fg">Step</kbd>
                      <span>or</span>
                      <kbd className="hairline rounded px-1.5 py-0.5 mono text-fg inline-flex items-center gap-1">
                        <Play size={9} strokeWidth={2} /> Run
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
