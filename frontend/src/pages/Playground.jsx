import { useState, useEffect, useRef } from 'react';
import AppLayout from '../components/AppLayout';
import StepVisualizer from '../components/StepVisualizer';
import { traceCode, checkBackendHealth } from '../api/visualizer';

const DEFAULT_CODE = `# Write any Python code and click Visualize!
x = 10
y = 20
z = x + y
print(z)

name = "CoderV"
greeting = "Hello, " + name
print(greeting)
`;

const EXAMPLES = [
  {
    label: 'Variables',
    code: `a = 5\nb = 3\nc = a + b\nprint(c)`,
  },
  {
    label: 'Loop',
    code: `total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)`,
  },
  {
    label: 'Function',
    code: `def square(n):\n    return n * n\n\nresult = square(4)\nprint(result)`,
  },
  {
    label: 'List',
    code: `nums = [1, 2, 3, 4, 5]\ndoubled = [x * 2 for x in nums]\nprint(doubled)`,
  },
];

/* ─── backend status states ─────────────────────────────────────────────── */
// null = checking | 'online' | 'waking' | 'offline'

export default function Playground() {
  const [code,          setCode]          = useState(DEFAULT_CODE);
  const [result,        setResult]        = useState(null);
  const [error,         setError]         = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const wakeTimerRef = useRef(null);

  /* ── health check on mount ── */
  useEffect(() => {
    checkBackendHealth().then(ok => setBackendStatus(ok ? 'online' : 'offline'));
  }, []);

  /* ── keyboard shortcut ── */
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleVisualize();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const el  = e.target;
      const s   = el.selectionStart;
      const end = el.selectionEnd;
      const nv  = code.substring(0, s) + '    ' + code.substring(end);
      setCode(nv);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 4; });
    }
  };

  const handleVisualize = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    // If backend was offline, assume it might be waking up (Render cold start)
    if (backendStatus === 'offline') {
      setBackendStatus('waking');
      wakeTimerRef.current = setTimeout(() => {
        setBackendStatus(prev => prev === 'waking' ? 'offline' : prev);
      }, 35_000);
    }

    try {
      const data = await traceCode(code);
      setResult(data);
      setBackendStatus('online');
      clearTimeout(wakeTimerRef.current);
    } catch (err) {
      setError(err.message);
      if (backendStatus === 'waking') setBackendStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = {
    null:     { cls: 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-400', label: 'Checking…' },
    online:   { cls: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', label: '● Backend online' },
    waking:   { cls: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300', label: '⟳ Waking backend…' },
    offline:  { cls: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400', label: '✕ Backend offline' },
  }[backendStatus] ?? { cls: '', label: '' };

  return (
    <AppLayout sidebarId="playgroundSidebar">

      {/* ── Header ── */}
      <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold dark:text-slate-100">Python Playground</h1>
          <p className="mt-1 text-muted dark:text-slate-400 text-sm">
            Write Python, click <strong>Visualize</strong>, and watch it execute step by step.
          </p>
        </div>
        <span className={`mt-1 rounded-full px-3 py-1 text-xs font-bold ${statusBadge.cls}`}>
          {statusBadge.label}
        </span>
      </div>

      {/* ── Quick examples ── */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 self-center mr-1">Examples:</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex.label}
            onClick={() => { setCode(ex.code); setResult(null); setError(null); }}
            className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* ── Editor card ── */}
      <article className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden mb-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 ml-1">Python 3</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">Ctrl+Enter to run</span>
            <button
              onClick={() => { setCode(''); setResult(null); setError(null); }}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={handleVisualize}
              disabled={loading || !code.trim()}
              className="rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 px-4 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              {loading ? 'Tracing…' : 'Visualize ▶'}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-slate-950 relative">
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full min-h-52 bg-transparent text-slate-200 font-mono text-sm p-4 resize-y border-none outline-none leading-6"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="# Write Python code here…"
          />
        </div>
      </article>

      {/* ── Cold start notice ── */}
      {backendStatus === 'waking' && (
        <div className="mb-4 rounded-xl border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/20 px-5 py-4 flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin shrink-0" />
          <div>
            <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Backend is waking up…</p>
            <p className="text-xs text-amber-700 dark:text-amber-400">Render free tier sleeps when idle. This takes ~15–30 s on first request.</p>
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wide text-red-500 mb-1">Error</p>
          <p className="text-sm font-mono text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* ── Step visualizer ── */}
      {result && <StepVisualizer key={result.code} example={result} />}

      {/* ── Empty state ── */}
      {!result && !error && !loading && (
        <div className="rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 p-10 text-center">
          <p className="text-muted dark:text-slate-500 text-sm">
            Write Python above and click{' '}
            <strong className="text-indigo-500">Visualize</strong>
            {' '}(or press{' '}
            <kbd className="rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 font-mono text-xs text-slate-600 dark:text-slate-300">Ctrl+Enter</kbd>
            ) to see execution step by step.
          </p>
        </div>
      )}

    </AppLayout>
  );
}
