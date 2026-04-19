import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Check, Play, ChevronRight } from 'lucide-react';
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
        <div className="hairline rounded-md bg-elevated p-10 animate-pulse" />
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
        {/* Bug list */}
        <aside className="hairline rounded-md bg-elevated p-3">
          <div className="flex items-center justify-between gap-3 px-1 pb-2 mb-2 hairline-b">
            <h2 className="text-[13px] font-semibold text-fg">{difficultyData.label}</h2>
            <span className="text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle">
              {difficultyData.examples.length} bugs
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
                  title={unlocked ? undefined : 'Fix the previous bug first.'}
                  onClick={() => unlocked && setActiveExampleId(ex.id)}
                  className={`flex items-start gap-2.5 rounded-md p-2 text-left transition-colors ${
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

        {/* Main */}
        <div className="grid gap-4">
          {!activeExample ? (
            <div className="hairline rounded-md p-10 text-center text-fg-muted border-dashed">
              Pick a bug from the list to start.
            </div>
          ) : (
            <>
              {/* Header */}
              <article className="hairline rounded-md bg-elevated p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle">
                      Fix the bug
                    </p>
                    <h2 className="mt-1 text-[18px] font-semibold tracking-tightish text-fg">
                      {activeExample.title}
                    </h2>
                  </div>
                  {completed && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      <Check size={12} strokeWidth={2.5} /> Fixed
                    </span>
                  )}
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
                  <div className="hairline rounded-md p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono">
                      Your goal
                    </p>
                    <p className="mt-2 text-[13px] text-fg-muted leading-relaxed whitespace-pre-line">
                      {activeExample.challenge}
                    </p>
                  </div>
                </div>
              </article>

              {/* Editor */}
              <article className="hairline rounded-md bg-elevated overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-3 py-2 hairline-b flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] mono text-fg-subtle">main.py</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] mono text-fg-subtle hidden sm:block">⌘↵ to run</span>
                    <button
                      type="button"
                      onClick={() => setShowHint((v) => !v)}
                      className="text-[11px] mono font-medium text-fg-subtle hover:text-fg transition-colors"
                    >
                      {showHint ? 'hide hint' : 'hint'}
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCode}
                      className="text-[11px] mono font-medium text-fg-subtle hover:text-red-500 transition-colors"
                    >
                      reset
                    </button>
                    <button
                      type="button"
                      onClick={handleApplySolution}
                      className="text-[11px] mono font-medium text-fg-subtle hover:text-fg transition-colors"
                    >
                      solution
                    </button>
                    <button
                      type="button"
                      onClick={handleRun}
                      disabled={running || !code.trim()}
                      className="inline-flex items-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-2.5 h-7 text-[12px] font-medium disabled:opacity-40 hover:opacity-90 transition"
                    >
                      <Play size={11} strokeWidth={2.5} fill="currentColor" />
                      {running ? 'Running' : 'Run'}
                    </button>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950 relative">
                  <textarea
                    ref={editorRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleEditorKeyDown}
                    className="w-full min-h-52 bg-transparent text-fg mono text-[13px] p-4 resize-y border-none outline-none leading-6"
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>

                {showHint && exampleHint && (
                  <div className="hairline-t bg-amber-500/5 px-4 py-2.5 text-[12px] text-amber-700 dark:text-amber-300">
                    <span className="font-semibold mono uppercase tracking-wider text-[10px]">hint </span>
                    {exampleHint}
                  </div>
                )}

                {showSolution && (
                  <div className="hairline-t bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2.5 text-[12px] text-fg-muted">
                    Solution loaded into the editor — press Run to verify.
                  </div>
                )}
              </article>

              {/* Output */}
              <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="hairline rounded-md bg-elevated p-4">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono">
                    Expected output
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap rounded bg-zinc-50 dark:bg-zinc-950 hairline p-3 mono text-[12px] text-fg min-h-[64px]">
                    {expectedOutput || '—'}
                  </pre>
                </div>
                <div
                  className={`hairline rounded-md p-4 transition-colors ${
                    matched
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : errorText
                      ? 'border-red-500/40 bg-red-500/5'
                      : 'bg-elevated'
                  }`}
                >
                  <p className={`text-[10px] font-medium uppercase tracking-wider mono ${
                    matched ? 'text-emerald-600 dark:text-emerald-400'
                    : errorText ? 'text-red-600 dark:text-red-400'
                    : 'text-fg-subtle'
                  }`}>
                    Your output
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap rounded bg-zinc-50 dark:bg-zinc-950 hairline p-3 mono text-[12px] text-fg min-h-[64px]">
                    {errorText
                      ? errorText
                      : outputText !== null
                      ? outputText || '(no output)'
                      : 'Press Run to see your output.'}
                  </pre>
                  {matched && (
                    <p className="mt-2 text-[12px] font-medium text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1.5">
                      <Check size={12} strokeWidth={2.5} /> Bug fixed — example marked complete.
                    </p>
                  )}
                  {!matched && outputText !== null && !errorText && (
                    <p className="mt-2 text-[12px] text-amber-600 dark:text-amber-400">
                      Output doesn't match yet. Compare line by line.
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
