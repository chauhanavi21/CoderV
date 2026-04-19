import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Navigate, useLocation, useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { useLessonsContext } from '../contexts/LessonsContext';
import { useProgress } from '../hooks/useProgress';
import { useWebLabUiCustomize } from '../contexts/WebLabUiCustomizeContext';
import { useWebLabDashboardHack, WEB_LAB_JS_MSG } from '../contexts/WebLabDashboardHackContext';

const WEB_LAB_LESSON_ID = 'web-lab';

const EXAMPLE_IDS = { html: 'web-lab-html', css: 'web-lab-css', js: 'web-lab-js' };

const STAGE_TABS = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'js', label: 'JS' },
];

function escapeClosingScriptSnippet(s) {
  return s.replace(/<\/script>/gi, '<\\/script>');
}

function buildJsSrcDoc(userJs) {
  const safe = escapeClosingScriptSnippet(userJs);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /></head><body style="margin:0;font:13px/1.5 ui-monospace,monospace;background:#020617;color:#94a3b8;padding:12px">
  <p style="margin:0 0 8px">Sandbox. After you start a run on the parent page, call:</p>
  <ul style="margin:0;padding-left:18px">
    <li><code>setCompleted(n)</code> — set completed count (0 … total)</li>
    <li><code>adjustCompleted(d)</code> — add <code>d</code> to the current number</li>
  </ul>
  <script>
    function setCompleted(n) {
      window.parent.postMessage({ source: '${WEB_LAB_JS_MSG}', type: 'set', completed: n }, '*');
    }
    function adjustCompleted(d) {
      window.parent.postMessage({ source: '${WEB_LAB_JS_MSG}', type: 'delta', delta: d }, '*');
    }
    try {
      ${safe}
    } catch (e) {
      window.parent.postMessage({ source: '${WEB_LAB_JS_MSG}', type: 'error', message: String(e && e.message || e) }, '*');
    }
  </script>
</body></html>`;
}

const defaultJs = `// Start a run from the parent page, then try:
setCompleted(40);
adjustCompleted(5);
`;

export default function WebCustomizeLab() {
  const { pathname } = useLocation();
  const { lessonId = WEB_LAB_LESSON_ID, difficulty: track } = useParams();
  const { registry } = useLessonsContext();
  const { markComplete, isComplete, getTotalProgress } = useProgress();
  const hack = useWebLabDashboardHack();
  const {
    sidebarHtmlSource,
    setSidebarHtmlSource,
    sidebarCssSource,
    setSidebarCssSource,
    learningNavLabel,
    signOutLabel,
    parseHints,
    resetSidebarLabels,
    resetSidebarCss,
    clearSidebarCustomizations,
  } = useWebLabUiCustomize();

  const lesson = registry.find((l) => l.id === lessonId);
  const stage = track === 'css' ? 'css' : track === 'js' ? 'js' : 'html';
  const exampleId = EXAMPLE_IDS[stage];
  const stageDone = isComplete(lessonId, stage, exampleId);
  const htmlDone = isComplete(lessonId, 'html', EXAMPLE_IDS.html);
  const cssDone = isComplete(lessonId, 'css', EXAMPLE_IDS.css);

  const [jsCode, setJsCode] = useState(defaultJs);
  const [jsError, setJsError] = useState(null);
  const [runVersion, setRunVersion] = useState(0);
  const iframeRef = useRef(null);
  const underLessonPathRef = useRef(null);
  const prevStageRef = useRef(null);

  // Loads the starter HTML+CSS into the editor (and into the live sidebar),
  // used when the learner enters or switches stages within the lab.
  const resetLabSidebar = useCallback(() => {
    resetSidebarLabels();
    resetSidebarCss();
  }, [resetSidebarLabels, resetSidebarCss]);

  useEffect(() => {
    const under = pathname.startsWith(`/lessons/${lessonId}`);
    const prev = underLessonPathRef.current;
    underLessonPathRef.current = under;
    // Leaving the lab: wipe customizations so the rest of the app shows
    // the plain default sidebar (no purple Learning, no demo styling).
    if (prev === true && under === false) clearSidebarCustomizations();
    if (prev === false && under === true) resetLabSidebar();
    if (prev === null && under === true) resetLabSidebar();
  }, [pathname, lessonId, resetLabSidebar, clearSidebarCustomizations]);

  useEffect(() => {
    if (prevStageRef.current !== null && prevStageRef.current !== stage) {
      resetLabSidebar();
    }
    prevStageRef.current = stage;
  }, [stage, resetLabSidebar]);

  // Belt-and-suspenders: if this page unmounts for any reason (route change,
  // logout, etc.), wipe the customizations so the sidebar snaps back.
  useEffect(() => {
    return () => {
      clearSidebarCustomizations();
    };
  }, [clearSidebarCustomizations]);

  const jsSrcDoc = useMemo(() => buildJsSrcDoc(jsCode), [jsCode]);

  useEffect(() => {
    if (stage !== 'js') return undefined;
    const onMessage = (event) => {
      if (iframeRef.current?.contentWindow && event.source !== iframeRef.current.contentWindow) return;
      const data = event.data;
      if (!data || data.source !== WEB_LAB_JS_MSG) return;
      if (data.type === 'error') {
        setJsError(data.message || 'Runtime error');
        return;
      }
      hack.dispatchFromSandbox(data);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [stage, hack, runVersion]);

  if (track !== 'html' && track !== 'css' && track !== 'js') {
    return <Navigate to={`/lessons/${lessonId}/html`} replace />;
  }

  if (stage === 'css' && !htmlDone) {
    return <Navigate to={`/lessons/${lessonId}/html`} replace />;
  }
  if (stage === 'js' && !htmlDone) {
    return <Navigate to={`/lessons/${lessonId}/html`} replace />;
  }
  if (stage === 'js' && !cssDone) {
    return <Navigate to={`/lessons/${lessonId}/css`} replace />;
  }

  const topTabs = [
    { to: `/lessons/${lessonId}`, label: lesson ? `Lesson ${lesson.number}` : lessonId },
    {
      to: `/lessons/${lessonId}/${stage}`,
      label: stage === 'js' ? 'Dashboard JS' : stage === 'css' ? 'Sidebar CSS' : 'Sidebar HTML',
    },
  ];

  return (
    <AppLayout sidebarId="lessonPracticeSidebar" tabs={topTabs}>
      <div className="mb-2 flex flex-wrap gap-2">
        {STAGE_TABS.map((t) => {
          const unlocked =
            t.key === 'html' || (t.key === 'css' && htmlDone) || (t.key === 'js' && htmlDone && cssDone);
          const baseTab =
            'rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors';
          if (unlocked) {
            return (
              <NavLink
                key={t.key}
                to={`/lessons/${lessonId}/${t.key}`}
                className={({ isActive }) =>
                  `${baseTab} ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`
                }
              >
                {t.label}
              </NavLink>
            );
          }
          const lockHint =
            t.key === 'css'
              ? 'Mark the HTML stage complete to unlock CSS.'
              : 'Mark the CSS stage complete to unlock JS.';
          return (
            <span
              key={t.key}
              title={lockHint}
              className={`${baseTab} cursor-not-allowed border border-dashed border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-600 dark:bg-slate-900/40 dark:text-slate-500`}
            >
              {t.label}
            </span>
          );
        })}
      </div>
      {(!htmlDone || !cssDone) && (
        <p className="mb-4 max-w-2xl text-xs text-muted dark:text-slate-500">
          Stages unlock in order. Use <strong className="text-slate-600 dark:text-slate-400">Mark stage complete</strong>{' '}
          on each step before the next tab becomes available.
        </p>
      )}

      {stage === 'html' && (
        <>
          <div className="mb-6 border-b border-gray-200 pb-6 dark:border-slate-700">
            <h1 className="text-2xl font-extrabold dark:text-slate-100">Edit HTML, change the real sidebar</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted dark:text-slate-400">
              You work in a code editor with a short HTML fragment. The app parses your tags and copies the{' '}
              <strong>text</strong> into the real sidebar on every page — not a fake preview. Keep{' '}
              <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">href=&quot;/lessons&quot;</code>{' '}
              and{' '}
              <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">data-coderv=&quot;signout&quot;</code>{' '}
              so CoderV knows which pieces to wire up. Your HTML and CSS are not saved: switching stages, marking complete,
              or leaving this lesson restores the default sidebar.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                HTML fragment
                <textarea
                  value={sidebarHtmlSource}
                  onChange={(e) => setSidebarHtmlSource(e.target.value)}
                  spellCheck={false}
                  className="mt-1.5 min-h-[220px] w-full resize-y rounded-xl border border-gray-200 bg-slate-950 p-3 font-mono text-sm leading-relaxed text-emerald-100 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 text-sm text-indigo-950 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-100">
              <p className="font-bold text-indigo-900 dark:text-indigo-200">What the sidebar is using right now</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-indigo-900/90 dark:text-indigo-100/90">
                <li>
                  Learning link text: <q className="font-semibold">{learningNavLabel}</q>
                </li>
                <li>
                  Sign out label: <q className="font-semibold">{signOutLabel}</q>
                </li>
              </ul>
            </div>

            {parseHints.length > 0 && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
                <p className="font-bold">Hints</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  {parseHints.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={resetSidebarLabels}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Reset HTML to starter template
              </button>
            </div>
          </div>
        </>
      )}

      {stage === 'css' && (
        <>
          <div className="mb-6 border-b border-gray-200 pb-6 dark:border-slate-700">
            <h1 className="text-2xl font-extrabold dark:text-slate-100">Edit CSS, style the real sidebar</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted dark:text-slate-400">
              Write normal CSS in the editor. CoderV automatically wraps every rule so it only affects the{' '}
              <strong>left sidebar</strong> — the same bar you see everywhere. Use the hooks{' '}
              <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">[data-coderv-sidebar-learning]</code>,{' '}
              <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">[data-coderv-sidebar-signout]</code>, or{' '}
              <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">[data-coderv-sidebar-shell]</code>{' '}
              for the whole column. There is no iframe preview — look at the real app while you edit. Like HTML, these
              styles are not kept when you change stage, mark complete, or navigate away.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Stylesheet
                <textarea
                  value={sidebarCssSource}
                  onChange={(e) => setSidebarCssSource(e.target.value)}
                  spellCheck={false}
                  className="mt-1.5 min-h-[260px] w-full resize-y rounded-xl border border-gray-200 bg-slate-950 p-3 font-mono text-sm leading-relaxed text-sky-100 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-800"
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="rounded-xl border border-sky-100 bg-sky-50/90 px-4 py-3 text-sm text-sky-950 dark:border-sky-900/40 dark:bg-sky-950/35 dark:text-sky-100">
              <p className="font-bold text-sky-900 dark:text-sky-200">Try changing</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  <code className="rounded bg-white/80 px-1 font-mono text-xs dark:bg-slate-900/60">color</code>,{' '}
                  <code className="rounded bg-white/80 px-1 font-mono text-xs dark:bg-slate-900/60">font-weight</code>,{' '}
                  <code className="rounded bg-white/80 px-1 font-mono text-xs dark:bg-slate-900/60">font-family</code> on
                  the learning link or sign-out row (use <code className="font-mono text-xs">!important</code> on{' '}
                  <code className="font-mono text-xs">color</code> if Tailwind utility classes win)
                </li>
                <li>
                  <code className="rounded bg-white/80 px-1 font-mono text-xs dark:bg-slate-900/60">background</code> or{' '}
                  <code className="rounded bg-white/80 px-1 font-mono text-xs dark:bg-slate-900/60">border-radius</code> on{' '}
                  <code className="font-mono text-xs">[data-coderv-sidebar-shell]</code>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={resetSidebarCss}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Reset CSS to starter template
              </button>
            </div>
          </div>
        </>
      )}

      {stage === 'js' && (
        <>
          <div className="mb-6 border-b border-gray-200 pb-6 dark:border-slate-700">
            <h1 className="text-2xl font-extrabold dark:text-slate-100">JavaScript → real dashboard numbers</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted dark:text-slate-400">
              You already changed the sidebar in HTML/CSS (including the sign-out row). Here, code runs in a sandbox,
              but <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">setCompleted</code> and{' '}
              <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">adjustCompleted</code> talk to
              the real Home page totals while a run is active. Nothing is written to the database; when the run ends,
              numbers snap back to your saved progress. Open{' '}
              <Link to="/dashboard" className="font-semibold text-indigo-600 underline dark:text-indigo-400">
                Home
              </Link>{' '}
              in another tab to watch the ring and stat cards update live.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const t = getTotalProgress();
                  hack.startMission(t.completed, t.total);
                  setJsError(null);
                  setRunVersion((v) => v + 1);
                }}
                disabled={hack.active}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400 dark:disabled:bg-slate-600"
              >
                {hack.active ? 'Run active (open Home to see it)' : 'Start run'}
              </button>
              <button
                type="button"
                onClick={() => {
                  hack.endMission();
                  setJsError(null);
                  setRunVersion((v) => v + 1);
                }}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Stop run
              </button>
            </div>

            {jsError && (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-100">
                {jsError}
              </p>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Script (sandboxed)
                <textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  spellCheck={false}
                  className="mt-1.5 min-h-[200px] w-full resize-y rounded-xl border border-gray-200 bg-slate-950 p-3 font-mono text-sm leading-relaxed text-emerald-100 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700">
              <iframe
                ref={iframeRef}
                key={runVersion}
                title="JS sandbox"
                sandbox="allow-scripts"
                className="h-[200px] w-full bg-slate-950"
                srcDoc={jsSrcDoc}
              />
            </div>
          </div>
        </>
      )}

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted dark:text-slate-400">
            Mark this stage complete when you are done. It updates your progress on All Lessons.
          </p>
          {stageDone ? (
            <span className="shrink-0 text-sm font-bold text-emerald-600 dark:text-emerald-400">Stage complete ✓</span>
          ) : (
            <button
              type="button"
              onClick={() => {
                markComplete(lessonId, stage, exampleId);
                clearSidebarCustomizations();
              }}
              className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Mark stage complete
            </button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
