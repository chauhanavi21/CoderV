import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { useLessonsContext, useLessonDetail } from '../contexts/LessonsContext';
import { useProgress } from '../hooks/useProgress';
import { traceCode } from '../api/visualizer';
import { basicsBugFixes } from '../data/lessonModules';
import {
  getSuggestedExampleId,
  isDifficultyAccessible,
  isExampleUnlocked,
} from '../utils/lessonProgressGates';

const difficultyTone = {
  easy: { badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  medium: { badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  hard: { badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
};

function extractStdout(steps = []) {
  return steps
    .filter((s) => s.action?.type === 'output')
    .map((s) => s.action.val)
    .join('\n');
}

function findFirstError(steps = []) {
  const err = steps.find((s) => s.action?.type === 'error');
  return err ? err.action.val : null;
}

function normalize(text) {
  return (text ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

export default function BugFixLab() {
  const { lessonId, difficulty } = useParams();
  const { registry } = useLessonsContext();
  const { module, loading: moduleLoading } = useLessonDetail(lessonId);
  const lesson = registry.find((l) => l.id === lessonId);

  const difficultyData = module?.difficulties?.[difficulty];

  const { markComplete, isComplete, progressLoading } = useProgress();

  const [activeExampleId, setActiveExampleId] = useState(null);
  const [code, setCode] = useState('');
  const [running, setRunning] = useState(false);
  const [outputText, setOutputText] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [matched, setMatched] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const editorRef = useRef(null);

  // Pick the first unlocked / suggested example whenever data is ready
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

  const activeExample = useMemo(
    () => difficultyData?.examples?.find((e) => e.id === activeExampleId) || null,
    [difficultyData, activeExampleId]
  );

  // Reset editor + result state when the active example changes
  useEffect(() => {
    if (!activeExample) return;
    setCode(activeExample.code);
    setOutputText(null);
    setErrorText(null);
    setMatched(false);
    setShowHint(false);
    setShowSolution(false);
  }, [activeExample]);

  const tabs = [
    { to: `/lessons/${lessonId}`, label: lesson ? `Lesson ${lesson.number}` : 'Lesson' },
    { to: `/lessons/${lessonId}/${difficulty}`, label: difficultyData?.label ?? difficulty },
  ];

  if (moduleLoading || progressLoading) {
    return (
      <AppLayout tabs={tabs} sidebarId="bugFixLabSidebar">
        <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-10 animate-pulse" />
      </AppLayout>
    );
  }

  if (!module || !difficultyData) {
    return <Navigate to="/lessons" replace />;
  }

  if (!isDifficultyAccessible(module, lessonId, difficulty, isComplete)) {
    return <Navigate to={`/lessons/${lessonId}`} replace />;
  }

  const meta = activeExample ? basicsBugFixes[activeExample.id] : null;
  const expectedOutput = meta?.expectedOutput ?? '';
  const fixedCode = meta?.fixedCode ?? '';
  const exampleHint = meta?.hint ?? '';
  const completed = activeExample
    ? isComplete(lessonId, difficulty, activeExample.id)
    : false;

  const handleEditorKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const s = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.substring(0, s) + '    ' + code.substring(end);
      setCode(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 4;
      });
    }
  };

  async function handleRun() {
    if (!activeExample || running) return;
    setRunning(true);
    setOutputText(null);
    setErrorText(null);
    setMatched(false);
    try {
      const data = await traceCode(code);
      const stderr = findFirstError(data.steps);
      const stdout = extractStdout(data.steps);
      setOutputText(stdout);
      setErrorText(stderr);
      const ok = !stderr && normalize(stdout) === normalize(expectedOutput);
      setMatched(ok);
      if (ok && !completed) {
        markComplete(lessonId, difficulty, activeExample.id);
      }
    } catch (err) {
      setErrorText(err.message || 'Run failed.');
    } finally {
      setRunning(false);
    }
  }

  function handleResetCode() {
    if (!activeExample) return;
    setCode(activeExample.code);
    setOutputText(null);
    setErrorText(null);
    setMatched(false);
    setShowSolution(false);
  }

  function handleApplySolution() {
    if (!fixedCode) return;
    setCode(fixedCode);
    setShowSolution(true);
  }

  return (
    <AppLayout tabs={tabs} sidebarId="bugFixLabSidebar">
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
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${difficultyTone[difficulty]?.badge ?? 'bg-slate-100 text-slate-700'}`}
            >
              {difficultyData.examples.length} bugs
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
                      : 'Fix the previous bug first to unlock this one.'
                  }
                  onClick={() => unlocked && setActiveExampleId(ex.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    !unlocked
                      ? 'border-gray-200 dark:border-slate-700 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'border-fuchsia-400 dark:border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/20 shadow-sm'
                      : 'border-gray-200 dark:border-slate-700 hover:border-fuchsia-200 dark:hover:border-fuchsia-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted dark:text-slate-400">
                      Bug {index + 1}
                    </p>
                    {done && (
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 grid place-items-center text-[10px] font-bold leading-none">
                        &#10003;
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-bold text-slate-900 dark:text-slate-100">
                    {ex.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <div className="grid gap-6">
          {!activeExample ? (
            <div className="rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 p-10 text-center text-muted dark:text-slate-400">
              Pick a bug from the list to start.
            </div>
          ) : (
            <>
              {/* Example header */}
              <article className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-fuchsia-600 dark:text-fuchsia-400">
                      Fix the bug
                    </p>
                    <h2 className="mt-1 text-2xl font-extrabold dark:text-slate-100">
                      {activeExample.title}
                    </h2>
                  </div>
                  {completed && (
                    <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 px-4 py-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      <span>&#10003;</span> Fixed
                    </span>
                  )}
                </div>

                <p className="mt-4 text-base leading-relaxed text-muted dark:text-slate-300">
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
                  <div className="rounded-xl border border-fuchsia-200 dark:border-fuchsia-800/50 bg-fuchsia-50 dark:bg-fuchsia-900/20 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-fuchsia-700 dark:text-fuchsia-400">
                      Your goal
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-fuchsia-900 dark:text-fuchsia-200 whitespace-pre-line">
                      {activeExample.challenge}
                    </p>
                  </div>
                </div>
              </article>

              {/* Editor + actions */}
              <article className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 dark:border-slate-700 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <span className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                    </span>
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 ml-1">
                      Python 3 — fix the bug
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
                      Ctrl+Enter to run
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowHint((v) => !v)}
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-fuchsia-500 transition-colors cursor-pointer"
                    >
                      {showHint ? 'Hide hint' : 'Hint'}
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCode}
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={handleApplySolution}
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
                    >
                      Show solution
                    </button>
                    <button
                      type="button"
                      onClick={handleRun}
                      disabled={running || !code.trim()}
                      className="rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-40 px-4 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      {running ? 'Running…' : 'Run my fix ▶'}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 relative">
                  <textarea
                    ref={editorRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleEditorKeyDown}
                    className="w-full min-h-52 bg-transparent text-slate-200 font-mono text-sm p-4 resize-y border-none outline-none leading-6"
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>

                {showHint && exampleHint && (
                  <div className="border-t border-gray-100 dark:border-slate-700 bg-amber-50 dark:bg-amber-900/20 px-5 py-3 text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-bold">Hint: </span>
                    {exampleHint}
                  </div>
                )}

                {showSolution && (
                  <div className="border-t border-gray-100 dark:border-slate-700 bg-indigo-50 dark:bg-indigo-900/20 px-5 py-3 text-xs text-indigo-700 dark:text-indigo-300">
                    Solution loaded into the editor — press Run my fix to verify it.
                  </div>
                )}
              </article>

              {/* Output panels */}
              <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Expected output
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 p-3 font-mono text-sm text-slate-800 dark:text-slate-200 min-h-[64px]">
                    {expectedOutput || '—'}
                  </pre>
                </div>
                <div
                  className={`rounded-2xl border p-5 shadow-sm transition-colors ${
                    matched
                      ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20'
                      : errorText
                      ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wide ${
                      matched
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : errorText
                        ? 'text-red-700 dark:text-red-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Your output
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 p-3 font-mono text-sm text-slate-800 dark:text-slate-200 min-h-[64px]">
                    {errorText
                      ? errorText
                      : outputText !== null
                      ? outputText || '(no output)'
                      : 'Press Run my fix to see your output here.'}
                  </pre>
                  {matched && (
                    <p className="mt-3 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      &#10003; Bug fixed — example marked complete.
                    </p>
                  )}
                  {!matched && outputText !== null && !errorText && (
                    <p className="mt-3 text-sm font-semibold text-amber-700 dark:text-amber-300">
                      Output doesn't match yet. Compare line-by-line with the expected output.
                    </p>
                  )}
                </div>
              </article>
            </>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
