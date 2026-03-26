import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import StepVisualizer from '../components/StepVisualizer';
import { traceCode, checkBackendHealth } from '../api/visualizer';

const DEFAULT_CODE = `# Try writing any Python code!
x = 10
y = 20
z = x + y
print(z)

name = "CoderV"
greeting = "Hello, " + name
print(greeting)
`;

const tabs = [
  { to: '/playground', label: 'Playground' },
  { to: '/lessons', label: 'Lessons' },
];

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendOnline, setBackendOnline] = useState(null); // null = checking

  useEffect(() => {
    checkBackendHealth().then(setBackendOnline);
  }, []);

  const handleVisualize = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await traceCode(code);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to visualize
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleVisualize();
    }
    // Tab key inserts spaces instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newVal = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newVal);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
  };

  return (
    <AppLayout tabs={tabs} sidebarId="playgroundSidebar">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold dark:text-slate-100">Python Playground</h1>
          <p className="mt-1 text-muted dark:text-slate-400 text-sm">
            Write Python code and watch its execution visualized step by step.
          </p>
        </div>
        {/* Backend status badge */}
        <span
          className={`mt-1 rounded-full px-3 py-1 text-xs font-bold ${
            backendOnline === null
              ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-400'
              : backendOnline
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}
        >
          {backendOnline === null
            ? 'Checking backend...'
            : backendOnline
            ? 'Backend online'
            : 'Backend offline — start server'}
        </span>
      </div>

      <div className="grid gap-6">
        {/* Code editor card */}
        <article className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 ml-1">
                Python 3
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
                Ctrl+Enter to run
              </span>
              <button
                type="button"
                onClick={() => { setCode(''); setResult(null); setError(null); }}
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleVisualize}
                disabled={loading || !code.trim() || backendOnline === false}
                className="rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 px-4 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                {loading ? 'Tracing...' : 'Visualize'}
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="bg-slate-950 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full min-h-64 bg-transparent text-slate-200 font-mono text-sm p-4 resize-y border-none outline-none leading-6"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              placeholder="# Write Python code here..."
            />
          </div>
        </article>

        {/* Offline warning */}
        {backendOnline === false && (
          <div className="rounded-xl border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/20 px-5 py-4">
            <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">
              Backend server is not running
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400 font-mono">
              cd backend &amp;&amp; npm install &amp;&amp; npm run dev
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-red-500 dark:text-red-400 mb-1">Error</p>
            <p className="text-sm font-mono text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Result visualizer */}
        {result && (
          <StepVisualizer key={result.code} example={result} />
        )}

        {/* Empty state */}
        {!result && !error && !loading && (
          <div className="rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 p-10 text-center">
            <p className="text-muted dark:text-slate-500 text-sm">
              Write your Python code above and click{' '}
              <strong className="text-indigo-500">Visualize</strong> (or press{' '}
              <kbd className="rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 font-mono text-xs text-slate-600 dark:text-slate-300">
                Ctrl+Enter
              </kbd>
              ) to see the step-by-step execution.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
