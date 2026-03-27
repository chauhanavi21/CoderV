import { useState, useRef, useCallback, useMemo } from 'react';

/* ─── colour map ──────────────────────────────────────────────────────────── */
const TYPE_COLOR = {
  create:         '#7C6AF6',
  update:         '#7C6AF6',
  fn_call:        '#D85A30',
  fn_return:      '#7C6AF6',
  fn_def:         '#D85A30',
  class_def:      '#D85A30',
  loop:           '#E24B4A',
  condition_true: '#1D9E75',
  condition_false:'#ef4444',
  attr:           '#1D9E75',
  method_call:    '#94a3b8',
  output:         '#94a3b8',
  error:          '#ef4444',
};

function colorFor(action) {
  if (!action) return '#6366f1';
  if (action.color) return action.color;
  if (action.type === 'condition') return action.result ? TYPE_COLOR.condition_true : TYPE_COLOR.condition_false;
  return TYPE_COLOR[action.type] || '#6366f1';
}

function labelFor(action) {
  if (!action) return '';
  switch (action.type) {
    case 'create':
    case 'update':
    case 'loop':      return `${action.name} = ${action.val}`;
    case 'fn_def':    return `def ${action.name}()`;
    case 'fn_call':   return `${action.name}(${action.arg || ''})`;
    case 'fn_return': return `return ${action.val}`;
    case 'class_def': return `class ${action.name}`;
    case 'attr':      return `${action.obj}.${action.attr} = ${action.val}`;
    case 'method_call': return `${action.obj}.${action.method}()`;
    case 'condition': return `${action.check} → ${action.result ? 'Yes' : 'No'}`;
    case 'output':    return `print → ${action.val}`;
    case 'error':     return action.val;
    default: return '';
  }
}

/* ─── graph builder ───────────────────────────────────────────────────────── */
function buildGraph(steps, upTo) {
  const nodes = new Map();
  const edges = [];

  for (const step of steps.slice(0, upTo)) {
    const a = step.action;
    if (!a) continue;
    switch (a.type) {
      case 'create':
      case 'update':
        nodes.set(a.name, { id: a.name, val: a.val, color: colorFor(a) });
        if (a.from) a.from.forEach(f => { if (nodes.has(f)) edges.push({ from: f, to: a.name }); });
        if (a.val && nodes.has(a.val)) edges.push({ from: a.val, to: a.name, dashed: true });
        break;
      case 'loop':
        nodes.set(a.name, { id: a.name, val: a.val, color: colorFor(a), dashed: true });
        if (a.target && nodes.has(a.target)) edges.push({ from: a.target, to: a.name, dashed: true });
        break;
      case 'fn_def':
        nodes.set(a.name, { id: a.name, val: `def(${a.params || ''})`, color: colorFor(a) });
        break;
      case 'fn_return':
        nodes.set(a.ret, { id: a.ret, val: a.val, color: colorFor(a) });
        break;
      case 'class_def':
        nodes.set(a.name, { id: a.name, val: 'class', color: colorFor(a) });
        break;
      case 'attr': {
        const key = `${a.obj}.${a.attr}`;
        nodes.set(key, { id: key, val: a.val, color: colorFor(a) });
        if (nodes.has(a.obj)) edges.push({ from: a.obj, to: key });
        break;
      }
      default: break;
    }
  }
  return { nodes: [...nodes.values()], edges };
}

function layoutNodes(nodeList, w, h) {
  if (!nodeList.length) return {};
  if (nodeList.length === 1) return { [nodeList[0].id]: { x: w / 2, y: h / 2 } };
  const r = Math.min(w, h) / 2 - 56;
  const pos = {};
  nodeList.forEach((n, i) => {
    const angle = ((Math.PI * 2) / nodeList.length) * i - Math.PI / 2;
    pos[n.id] = { x: w / 2 + r * Math.cos(angle), y: h / 2 + r * Math.sin(angle) };
  });
  return pos;
}

/* ─── component ───────────────────────────────────────────────────────────── */
export default function StepVisualizer({ example, onFirstInteraction }) {
  const steps = useMemo(() => example.steps || [], [example.steps]);
  const lines = useMemo(() => example.code.split('\n'), [example.code]);

  const [cursor,       setCursor]       = useState(0);
  const [outputs,      setOutputs]      = useState([]);
  const [running,      setRunning]      = useState(false);
  const [interacted,   setInteracted]   = useState(false);
  const [mobileTab,    setMobileTab]    = useState('code');
  const timerRef = useRef(null);

  const notifyFirstInteraction = useCallback(() => {
    if (!interacted) {
      setInteracted(true);
      onFirstInteraction?.();
    }
  }, [interacted, onFirstInteraction]);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setCursor(0);
    setOutputs([]);
    setRunning(false);
  }, []);

  const applyStep = useCallback((step) => {
    if (step?.action?.type === 'output') {
      setOutputs(o => [...o, step.action.val]);
    }
  }, []);

  const stepOnce = useCallback(() => {
    notifyFirstInteraction();
    setCursor(prev => {
      const next = prev + 1;
      if (next > steps.length) return prev;
      applyStep(steps[next - 1]);
      return next;
    });
  }, [steps, applyStep, notifyFirstInteraction]);

  const runAll = useCallback(() => {
    notifyFirstInteraction();
    reset();
    setRunning(true);
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      if (i > steps.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setRunning(false);
        return;
      }
      applyStep(steps[i - 1]);
      setCursor(i);
    }, 500);
  }, [steps, reset, applyStep]);

  const currentStep = cursor > 0 ? steps[cursor - 1] : null;
  const activeLine  = currentStep?.line ?? -1;
  const done        = cursor >= steps.length;
  const locals      = currentStep?.locals ?? {};

  const graph     = buildGraph(steps, cursor);
  const svgW      = 440;
  const svgH      = 260;
  const positions = layoutNodes(graph.nodes, svgW, svgH);

  const isError = currentStep?.action?.type === 'error';

  return (
    <article className="rounded-2xl border border-gray-200 bg-slate-950 shadow-card text-white overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-800 flex-wrap">
        <div>
          <h2 className="text-base font-bold">Step-by-step visualizer</h2>
          <p className="text-xs text-slate-400">Watch each line execute and variables update in real time.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
            {cursor} / {steps.length} steps
          </span>
          {done && <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-3 py-1 text-xs font-bold">Done</span>}
        </div>
      </div>

      {/* ── Mobile tab switcher (hidden on lg+) ── */}
      <div className="flex lg:hidden border-b border-slate-800">
        {['code', 'graph'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMobileTab(tab)}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
              mobileTab === tab
                ? 'text-indigo-400 border-b-2 border-indigo-500 -mb-px'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab === 'code' ? '📄 Code' : '📊 Graph & Vars'}
          </button>
        ))}
      </div>

      {/* ── Main panels ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">

        {/* Left — code */}
        <div className={`p-4 ${mobileTab !== 'code' ? 'hidden lg:block' : ''}`}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Code</p>
          <div className="rounded-xl bg-slate-900 p-3 overflow-x-auto">
            <pre className="text-sm leading-6 font-mono">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`px-2 -mx-2 rounded transition-colors duration-150 ${
                    i === activeLine
                      ? isError
                        ? 'bg-red-500/20 text-red-200'
                        : 'bg-yellow-500/20 text-yellow-200'
                      : 'text-slate-300'
                  }`}
                >
                  <span className="inline-block w-6 text-right mr-3 text-slate-600 select-none text-xs">
                    {i + 1}
                  </span>
                  {line || ' '}
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Right — graph + variables */}
        <div className={`p-4 flex flex-col gap-4 ${mobileTab !== 'graph' ? 'hidden lg:flex' : ''}`}>

          {/* Graph */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Memory graph</p>
            <div className="rounded-xl bg-slate-900 p-2">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
                <rect width={svgW} height={svgH} rx="14" fill="#0f172a" />
                {graph.edges.map((edge, i) => {
                  const from = positions[edge.from];
                  const to   = positions[edge.to];
                  if (!from || !to) return null;
                  return (
                    <line key={`e${i}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="#475569" strokeWidth="1.5"
                      strokeDasharray={edge.dashed ? '6 4' : 'none'} />
                  );
                })}
                {graph.nodes.map(node => {
                  const p = positions[node.id];
                  if (!p) return null;
                  const lbl = node.id.length > 12 ? node.id.slice(0, 11) + '…' : node.id;
                  const val = (node.val || '').length > 14 ? node.val.slice(0, 13) + '…' : (node.val || '');
                  const boxW = 110; const boxH = 42;
                  const isLatest =
                    currentStep?.action?.name === node.id ||
                    currentStep?.action?.ret  === node.id;
                  return (
                    <g key={node.id}>
                      {isLatest && (
                        <rect x={p.x - boxW/2 - 3} y={p.y - boxH/2 - 3}
                          width={boxW + 6} height={boxH + 6} rx="14"
                          fill="none" stroke="#fbbf24" strokeWidth="2" />
                      )}
                      <rect x={p.x - boxW/2} y={p.y - boxH/2}
                        width={boxW} height={boxH} rx="11" fill={node.color}
                        strokeDasharray={node.dashed ? '5 3' : 'none'}
                        stroke={node.dashed ? '#94a3b8' : 'none'} />
                      <text x={p.x} y={p.y - 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">{lbl}</text>
                      <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,.7)">{val}</text>
                    </g>
                  );
                })}
                {graph.nodes.length === 0 && (
                  <text x={svgW/2} y={svgH/2} textAnchor="middle" fontSize="13" fill="#475569">
                    Press Step → or Run All to begin
                  </text>
                )}
              </svg>
            </div>
          </div>

          {/* Variables table */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Variables</p>
            <div className="rounded-xl bg-slate-900 overflow-hidden">
              {Object.keys(locals).length === 0 ? (
                <p className="text-xs text-slate-600 px-4 py-3">No variables yet.</p>
              ) : (
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left px-4 py-2 text-slate-500 font-semibold w-1/3">Name</th>
                      <th className="text-left px-4 py-2 text-slate-500 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(locals).map(([k, v]) => {
                      const isChanged =
                        currentStep?.action?.name === k ||
                        currentStep?.action?.ret  === k;
                      return (
                        <tr key={k} className={`border-b border-slate-800/50 ${isChanged ? 'bg-yellow-500/10' : ''}`}>
                          <td className={`px-4 py-1.5 font-bold ${isChanged ? 'text-yellow-300' : 'text-indigo-300'}`}>{k}</td>
                          <td className="px-4 py-1.5 text-slate-200 break-all">{v}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className={`px-5 py-3 border-t border-slate-800 text-sm ${isError ? 'text-red-300' : 'text-slate-300'}`}>
        {currentStep ? (
          <>
            <span className={`font-bold mr-2 ${isError ? 'text-red-400' : 'text-yellow-400'}`}>
              Line {currentStep.line + 1}:
            </span>
            {currentStep.desc}
            {currentStep.action && !['output','error'].includes(currentStep.action.type) && (
              <span className="ml-2 text-slate-500 text-xs">({labelFor(currentStep.action)})</span>
            )}
          </>
        ) : (
          <span className="text-slate-500">Ready — press Step → or Run All.</span>
        )}
      </div>

      {/* ── Controls ── */}
      <div className="px-5 pb-4 pt-3 flex items-center gap-3 flex-wrap border-t border-slate-800">
        <button onClick={runAll}    disabled={running}
          className="rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer">
          ▶ Run All
        </button>
        <button onClick={stepOnce}  disabled={running || done}
          className="rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer">
          Step →
        </button>
        <button onClick={reset}
          className="rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer">
          ↺ Reset
        </button>

        {/* Output inline */}
        {outputs.length > 0 && (
          <div className="ml-auto rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase text-slate-500">Output</span>
            <div className="text-sm font-mono text-emerald-300 space-y-0.5">
              {outputs.map((o, i) => <div key={i}>&gt; {o}</div>)}
            </div>
          </div>
        )}
      </div>

    </article>
  );
}
