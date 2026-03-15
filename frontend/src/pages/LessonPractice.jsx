import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import StepVisualizer from '../components/StepVisualizer';
import QuizSection from '../components/QuizSection';
import { lessonsRegistry, getLessonModule } from '../data/lessonModules';
import { useProgress } from '../hooks/useProgress';

export default function LessonPractice() {
  const { lessonId, difficulty } = useParams();
  const lesson = lessonsRegistry.find((l) => l.id === lessonId);
  const module = getLessonModule(lessonId);
  const difficultyData = module?.difficulties?.[difficulty];

  const [activeExampleId, setActiveExampleId] = useState(
    difficultyData?.examples?.[0]?.id ?? ''
  );
  const { markComplete, isComplete } = useProgress();

  useEffect(() => {
    if (difficultyData?.examples?.[0]) {
      setActiveExampleId(difficultyData.examples[0].id);
    }
  }, [difficulty]);

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

  return (
    <AppLayout tabs={tabs} sidebarId="lessonPracticeSidebar">
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-sm">
        <Link
          to="/lessons"
          className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Lessons
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          to={`/lessons/${lessonId}`}
          className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          {module.title}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-slate-700">
          {difficultyData.label}
        </span>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
        {/* Example sidebar */}
        <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">{difficultyData.label}</h2>
            <span className="text-xs font-bold text-muted">
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
                      ? 'border-primary bg-indigo-50 shadow-sm'
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">
                      Example {index + 1}
                    </p>
                    {done && (
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center text-[10px] font-bold leading-none">
                        &#10003;
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-bold text-slate-900">
                    {example.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content area -- clean, focused on solving */}
        <div className="grid gap-6">
          {/* Example info */}
          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-extrabold">{activeExample.title}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {activeExample.nodes.length} node
                {activeExample.nodes.length !== 1 ? 's' : ''} /{' '}
                {activeExample.edges.length} edge
                {activeExample.edges.length !== 1 ? 's' : ''}
              </span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted">
              {activeExample.explanation}
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  What you learn
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {activeExample.concept}
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                  Think about this
                </p>
                <p className="mt-2 text-sm leading-relaxed text-amber-900">
                  {activeExample.challenge}
                </p>
              </div>
            </div>

            {isComplete(lessonId, difficulty, activeExample.id) && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-2.5 text-sm font-bold text-emerald-700">
                <span>&#10003;</span> Completed
              </div>
            )}
          </article>

          {/* Step visualizer */}
          {activeExample.steps && activeExample.steps.length > 0 && (
            <StepVisualizer key={activeExample.id} example={activeExample} />
          )}

          {/* Quiz — must pass to complete */}
          {activeExample.quiz && activeExample.quiz.length > 0 && (
            <QuizSection
              key={`quiz-${activeExample.id}`}
              quiz={activeExample.quiz}
              alreadyComplete={isComplete(lessonId, difficulty, activeExample.id)}
              onAllCorrect={() =>
                markComplete(lessonId, difficulty, activeExample.id)
              }
            />
          )}
        </div>
      </section>
    </AppLayout>
  );
}
