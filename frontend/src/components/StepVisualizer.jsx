import { useState, useRef, useCallback, useMemo } from 'react';
import { Play, RotateCcw, ChevronRight, FileCode2, Network } from 'lucide-react';

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
    <article className="hairline rounded-md bg-elevated overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 h-10 hairline-b">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium mono uppercase tracking-wider text-fg-subtle">
            Step Visualizer
          </span>
          <span className="text-[10px] mono text-fg-subtle">
            {cursor} / {steps.length}
          </span>
        </div>
        {done && (
          <span className="text-[10px] font-medium mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            done
          </span>
        )}
      </div>

      {/* Mobile tab switcher */}
      <div className="flex lg:hidden hairline-b">
        {[
          { key: 'code', label: 'Code', Icon: FileCode2 },
          { key: 'graph', label: 'Graph & Vars', Icon: Network },
        ].map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setMobileTab(key)}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-[11px] font-medium mono uppercase tracking-wider transition-colors ${
              mobileTab === key
                ? 'text-fg border-b border-fg -mb-px'
                : 'text-fg-subtle hover:text-fg-muted'
            }`}
          >
            <Icon size={11} strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-zinc-200 dark:divide-zinc-800">
        {/* Code */}
        <div className={`p-4 ${mobileTab !== 'code' ? 'hidden lg:block' : ''}`}>
          <p className="text-[10px] font-medium uppercase tracking-wider mono text-fg-subtle mb-2">Code</p>
          <div className="rounded bg-zinc-50 dark:bg-zinc-950 hairline p-3 overflow-x-auto">
            <pre className="text-[12px] leading-6 mono">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`px-2 -mx-2 rounded transition-colors duration-150 ${
                    i === activeLine
                      ? isError
                        ? 'bg-red-500/15 text-red-600 dark:text-red-300'
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-200'
                      : 'text-fg'
                  }`}
                >
                  <span className="inline-block w-6 text-right mr-3 text-fg-subtle select-none text-[11px]">
                    {i + 1}
                  </span>
                  {line || ' '}
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Graph + variables */}
        <div className={`p-4 flex flex-col gap-4 ${mobileTab !== 'graph' ? 'hidden lg:flex' : ''}`}>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mono text-fg-subtle mb-2">Memory graph</p>
            <div className="rounded bg-zinc-50 dark:bg-zinc-950 hairline p-2">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
                <rect width={svgW} height={svgH} rx="4" fill="transparent" />
                {graph.edges.map((edge, i) => {
                  const from = positions[edge.from];
                  const to   = positions[edge.to];
                  if (!from || !to) return null;
                  return (
                    <line key={`e${i}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="#52525b" strokeWidth="1"
                      strokeDasharray={edge.dashed ? '4 3' : 'none'} />
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
                          width={boxW + 6} height={boxH + 6} rx="6"
                          fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                      )}
                      <rect x={p.x - boxW/2} y={p.y - boxH/2}
                        width={boxW} height={boxH} rx="4" fill={node.color}
                        strokeDasharray={node.dashed ? '4 3' : 'none'}
                        stroke={node.dashed ? '#a1a1aa' : 'none'} />
                      <text x={p.x} y={p.y - 5} textAnchor="middle" fontSize="11" fontWeight="600" fill="white" fontFamily="JetBrains Mono, monospace">{lbl}</text>
                      <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,.75)" fontFamily="JetBrains Mono, monospace">{val}</text>
                    </g>
                  );
                })}
                {graph.nodes.length === 0 && (
                  <text x={svgW/2} y={svgH/2} textAnchor="middle" fontSize="11" fill="#71717a" fontFamily="JetBrains Mono, monospace">
                    Press Step or Run to begin
                  </text>
                )}
              </svg>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mono text-fg-subtle mb-2">Variables</p>
            <div className="rounded bg-zinc-50 dark:bg-zinc-950 hairline overflow-hidden">
              {Object.keys(locals).length === 0 ? (
                <p className="text-[12px] mono text-fg-subtle px-4 py-3">No variables yet.</p>
              ) : (
                <table className="w-full text-[12px] mono">
                  <thead>
                    <tr className="hairline-b">
                      <th className="text-left px-4 py-2 text-fg-subtle font-medium uppercase tracking-wider text-[10px] w-1/3">Name</th>
                      <th className="text-left px-4 py-2 text-fg-subtle font-medium uppercase tracking-wider text-[10px]">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(locals).map(([k, v]) => {
                      const isChanged =
                        currentStep?.action?.name === k ||
                        currentStep?.action?.ret  === k;
                      return (
                        <tr key={k} className={`border-b border-zinc-100 dark:border-zinc-900 last:border-0 ${isChanged ? 'bg-amber-500/10' : ''}`}>
                          <td className={`px-4 py-1.5 font-medium ${isChanged ? 'text-amber-600 dark:text-amber-300' : 'text-fg'}`}>{k}</td>
                          <td className="px-4 py-1.5 text-fg-muted break-all">{v}</td>
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

      {/* Status bar */}
      <div className={`px-4 py-2.5 hairline-t text-[12px] mono ${isError ? 'text-red-500' : 'text-fg-muted'}`}>
        {currentStep ? (
          <>
            <span className={`font-semibold mr-2 ${isError ? 'text-red-500' : 'text-amber-600 dark:text-amber-400'}`}>
              line {currentStep.line + 1}
            </span>
            {currentStep.desc}
            {currentStep.action && !['output','error'].includes(currentStep.action.type) && (
              <span className="ml-2 text-fg-subtle">({labelFor(currentStep.action)})</span>
            )}
          </>
        ) : (
          <span className="text-fg-subtle">ready — press Step or Run.</span>
        )}
      </div>

      {/* Controls */}
      <div className="px-4 pb-3 pt-2 flex items-center gap-2 flex-wrap hairline-t">
        <button onClick={runAll} disabled={running}
          className="inline-flex items-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3 h-7 text-[12px] font-medium disabled:opacity-40 hover:opacity-90 transition">
          <Play size={11} strokeWidth={2.5} fill="currentColor" />
          Run all
        </button>
        <button onClick={stepOnce} disabled={running || done}
          className="hairline inline-flex items-center gap-1.5 rounded-md px-3 h-7 text-[12px] font-medium text-fg disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
          Step
          <ChevronRight size={11} strokeWidth={2.5} />
        </button>
        <button onClick={reset}
          className="hairline inline-flex items-center gap-1.5 rounded-md px-3 h-7 text-[12px] font-medium text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
          <RotateCcw size={11} strokeWidth={2} />
          Reset
        </button>

        {outputs.length > 0 && (
          <div className="ml-auto hairline rounded-md px-3 py-1.5 flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950">
            <span className="text-[10px] font-medium uppercase tracking-wider mono text-fg-subtle">stdout</span>
            <div className="text-[12px] mono text-emerald-600 dark:text-emerald-400 space-y-0.5">
              {outputs.map((o, i) => <div key={i}>&gt; {o}</div>)}
            </div>
          </div>
        )}
      </div>

    </article>
  );
}
