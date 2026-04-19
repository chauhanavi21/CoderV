import { useState, useEffect, useRef } from 'react';
import { Play, Circle, Loader2 } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import StepVisualizer from '../components/StepVisualizer';
import { traceCode, checkBackendHealth } from '../api/visualizer';

const DEFAULT_CODE = `# Write any Python code and click Run.
x = 10
y = 20
z = x + y
print(z)

name = "CoderV"
greeting = "Hello, " + name
print(greeting)
`;

const EXAMPLES = [
  { label: 'Variables', code: `a = 5\nb = 3\nc = a + b\nprint(c)` },
  { label: 'Loop',      code: `total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)` },
  { label: 'Function',  code: `def square(n):\n    return n * n\n\nresult = square(4)\nprint(result)` },
  { label: 'List',      code: `nums = [1, 2, 3, 4, 5]\ndoubled = [x * 2 for x in nums]\nprint(doubled)` },
];

export default function Playground() {
  const [code,          setCode]          = useState(DEFAULT_CODE);
  const [result,        setResult]        = useState(null);
  const [error,         setError]         = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const wakeTimerRef = useRef(null);

  useEffect(() => {
    checkBackendHealth().then(ok => setBackendStatus(ok ? 'online' : 'offline'));
  }, []);

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
    null:    { dotCls: 'bg-zinc-400',   label: 'Checking',     mono: 'text-fg-subtle' },
    online:  { dotCls: 'bg-emerald-500', label: 'Online',       mono: 'text-emerald-600 dark:text-emerald-400' },
    waking:  { dotCls: 'bg-amber-500',   label: 'Waking',       mono: 'text-amber-600 dark:text-amber-400' },
    offline: { dotCls: 'bg-red-500',     label: 'Offline',      mono: 'text-red-600 dark:text-red-400' },
  }[backendStatus] ?? { dotCls: 'bg-zinc-400', label: '', mono: '' };

  return (
    <AppLayout sidebarId="playgroundSidebar">

      {/* Header */}
      <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">Playground</p>
          <h1 className="mt-1 text-[22px] font-semibold tracking-tightish text-fg">Python sandbox</h1>
          <p className="mt-1 text-[13px] text-fg-muted">
            Write Python, run it, and step through execution.
          </p>
        </div>
        <div className="hairline rounded-md px-3 h-8 inline-flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dotCls} ${backendStatus === 'waking' ? 'animate-pulse' : ''}`} />
          <span className={`text-[11px] font-medium mono uppercase tracking-wider ${statusBadge.mono}`}>{statusBadge.label}</span>
        </div>
      </div>

      {/* Examples */}
      <div className="mb-3 flex gap-1.5 flex-wrap items-center">
        <span className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono mr-1">Examples</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex.label}
            onClick={() => { setCode(ex.code); setResult(null); setError(null); }}
            className="hairline rounded-md px-2.5 h-7 text-[11px] font-medium text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <article className="hairline rounded-md bg-elevated overflow-hidden mb-5">
        <div className="flex items-center justify-between gap-3 px-3 py-2 hairline-b">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5">
              <Circle size={9} fill="#ef4444" strokeWidth={0} className="text-red-500" />
              <Circle size={9} fill="#f59e0b" strokeWidth={0} className="text-amber-500" />
              <Circle size={9} fill="#22c55e" strokeWidth={0} className="text-emerald-500" />
            </span>
            <span className="text-[11px] mono text-fg-subtle ml-1">main.py — Python 3</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] mono text-fg-subtle hidden sm:block">⌘↵ to run</span>
            <button
              onClick={() => { setCode(''); setResult(null); setError(null); }}
              className="text-[11px] mono font-medium text-fg-subtle hover:text-red-500 transition-colors"
            >
              clear
            </button>
            <button
              onClick={handleVisualize}
              disabled={loading || !code.trim()}
              className="inline-flex items-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-2.5 h-7 text-[12px] font-medium disabled:opacity-40 hover:opacity-90 transition"
            >
              {loading ? <Loader2 size={11} className="animate-spin" /> : <Play size={11} strokeWidth={2.5} fill="currentColor" />}
              {loading ? 'Tracing' : 'Run'}
            </button>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 relative flex">
          {/* Gutter */}
          <div className="select-none mono text-[12px] text-fg-subtle py-4 pl-4 pr-2 text-right leading-6">
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-h-52 bg-transparent text-fg mono text-[13px] py-4 pr-4 resize-y border-none outline-none leading-6"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="# Write Python here…"
          />
        </div>
      </article>

      {/* Cold start notice */}
      {backendStatus === 'waking' && (
        <div className="mb-4 hairline rounded-md bg-amber-500/5 border-amber-500/30 px-4 py-3 flex items-center gap-3">
          <Loader2 size={14} className="animate-spin text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-[13px] font-medium text-amber-700 dark:text-amber-300">Backend is waking up</p>
            <p className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mono">Render free tier sleeps when idle. ~15–30s on first request.</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 hairline rounded-md bg-red-500/5 border-red-500/30 px-4 py-3">
          <p className="text-[10px] mono font-medium uppercase tracking-wider text-red-600 dark:text-red-400 mb-1">Error</p>
          <p className="text-[13px] mono text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Visualizer */}
      {result && <StepVisualizer key={result.code} example={result} />}

      {/* Empty state */}
      {!result && !error && !loading && (
        <div className="hairline rounded-md p-10 text-center border-dashed">
          <p className="text-[13px] text-fg-muted">
            Write Python above and press{' '}
            <kbd className="hairline rounded px-1.5 py-0.5 mono text-[11px] text-fg">⌘↵</kbd>{' '}
            or click <span className="text-fg font-medium">Run</span> to see step-by-step execution.
          </p>
        </div>
      )}

    </AppLayout>
  );
}
