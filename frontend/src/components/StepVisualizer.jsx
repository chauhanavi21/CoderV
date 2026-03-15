import { useState, useRef, useCallback, useMemo } from 'react';

const COLORS = {
  create: '#7C6AF6',
  update: '#7C6AF6',
  fn_def: '#D85A30',
  fn_call: '#D85A30',
  fn_return: '#7C6AF6',
  class_def: '#D85A30',
  loop: '#E24B4A',
  condition_true: '#1D9E75',
  condition_false: '#ef4444',
  attr: '#1D9E75',
  method_call: '#94a3b8',
  output: '#94a3b8',
};

function colorFor(action) {
  if (!action) return '#6366f1';
  if (action.color) return action.color;
  if (action.type === 'condition') return action.result ? COLORS.condition_true : COLORS.condition_false;
  return COLORS[action.type] || '#6366f1';
}

function labelFor(action) {
  if (!action) return '';
  switch (action.type) {
    case 'create':
    case 'update':
    case 'loop':
      return `${action.name} = ${action.val}`;
    case 'fn_def':
      return `def ${action.name}()`;
    case 'fn_call':
      return `${action.name}(${action.arg || ''})`;
    case 'fn_return':
      return `${action.ret} = ${action.val}`;
    case 'class_def':
      return `class ${action.name}`;
    case 'attr':
      return `${action.obj}.${action.attr} = ${action.val}`;
    case 'method_call':
      return `${action.obj}.${action.method}()`;
    case 'condition':
      return `${action.check} → ${action.result ? 'Yes' : 'No'}`;
    default:
      return '';
  }
}

function buildGraph(steps, upTo) {
  const nodes = new Map();
  const edges = [];
  const executed = steps.slice(0, upTo);

  for (const step of executed) {
    const a = step.action;
    if (!a) continue;

    switch (a.type) {
      case 'create':
      case 'update':
        nodes.set(a.name, { id: a.name, val: a.val, color: colorFor(a) });
        if (a.from) a.from.forEach((f) => { if (nodes.has(f)) edges.push({ from: f, to: a.name }); });
        if (a.val && nodes.has(a.val)) edges.push({ from: a.val, to: a.name, dashed: true });
        break;
      case 'loop':
        nodes.set(a.name, { id: a.name, val: a.val, color: colorFor(a), dashed: true });
        if (a.target && nodes.has(a.target)) edges.push({ from: a.target, to: a.name, dashed: true });
        break;
      case 'fn_def':
        nodes.set(a.name, { id: a.name, val: `def(${a.params || ''})`, color: colorFor(a) });
        break;
      case 'fn_call':
        if (a.ret && a.ret !== '_') edges.push({ from: a.name, to: a.ret, dashed: true });
        break;
      case 'fn_return':
        nodes.set(a.ret, { id: a.ret, val: a.val, color: colorFor(a) });
        break;
      case 'class_def':
        nodes.set(a.name, { id: a.name, val: 'class', color: colorFor(a) });
        break;
      case 'attr':
        { const key = `${a.obj}.${a.attr}`;
          nodes.set(key, { id: key, val: a.val, color: colorFor(a) });
          if (nodes.has(a.obj)) edges.push({ from: a.obj, to: key });
        }
        break;
      case 'method_call':
        { const mKey = `${a.obj}.${a.method}()`;
          nodes.set(mKey, { id: mKey, val: `(${a.arg || ''})`, color: colorFor(a), dashed: true });
          if (nodes.has(a.obj)) edges.push({ from: a.obj, to: mKey, dashed: true });
        }
        break;
      case 'condition':
        { const cKey = `cond_${edges.length}`;
          nodes.set(cKey, { id: cKey, val: a.check, color: colorFor(a) });
        }
        break;
      default:
        break;
    }
  }

  return { nodes: [...nodes.values()], edges };
}

function layoutNodes(nodeList, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const count = nodeList.length;
  if (count === 0) return {};
  if (count === 1) return { [nodeList[0].id]: { x: cx, y: cy } };
  const r = Math.min(w, h) / 2 - 60;
  const pos = {};
  nodeList.forEach((n, i) => {
    const angle = ((Math.PI * 2) / count) * i - Math.PI / 2;
    pos[n.id] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  return pos;
}

export default function StepVisualizer({ example }) {
  const steps = useMemo(() => example.steps || [], [example.steps]);
  const lines = example.code.split('\n');
  const [cursor, setCursor] = useState(0);
  const [outputs, setOutputs] = useState([]);
  const timerRef = useRef(null);
  const [running, setRunning] = useState(false);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setCursor(0);
    setOutputs([]);
    setRunning(false);
  }, []);

  const stepOnce = useCallback(() => {
    setCursor((prev) => {
      const next = prev + 1;
      if (next > steps.length) return prev;
      const step = steps[next - 1];
      if (step?.action?.type === 'output') {
        setOutputs((o) => [...o, step.action.val]);
      }
      return next;
    });
  }, [steps]);

  const runAll = useCallback(() => {
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
      const step = steps[i - 1];
      if (step?.action?.type === 'output') {
        setOutputs((o) => [...o, step.action.val]);
      }
      setCursor(i);
    }, 600);
  }, [steps, reset]);

  const currentStep = cursor > 0 ? steps[cursor - 1] : null;
  const activeLine = currentStep?.line ?? -1;
  const done = cursor >= steps.length;

  const graph = buildGraph(steps, cursor);
  const svgW = 480;
  const svgH = 280;
  const positions = layoutNodes(graph.nodes, svgW, svgH);

  return (
    <article className="rounded-2xl border border-gray-200 bg-slate-950 p-5 shadow-card text-white">
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-bold">Step-by-step visualizer</h2>
          <p className="text-sm text-slate-400">
            Step through the code and watch the graph build in real time.
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
          Step {cursor} / {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Code panel */}
        <div className="rounded-xl bg-slate-900 p-4 overflow-x-auto">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Code</p>
          <pre className="text-sm leading-7 font-mono">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`px-2 -mx-2 rounded transition-colors ${
                  i === activeLine
                    ? 'bg-yellow-500/20 text-yellow-200'
                    : 'text-slate-300'
                }`}
              >
                <span className="inline-block w-6 text-right mr-3 text-slate-600 select-none">
                  {i + 1}
                </span>
                {line || ' '}
              </div>
            ))}
          </pre>
        </div>

        {/* Graph panel */}
        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Graph</p>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
            <rect width={svgW} height={svgH} rx="16" fill="#0f172a" />

            {graph.edges.map((edge, i) => {
              const from = positions[edge.from];
              const to = positions[edge.to];
              if (!from || !to) return null;
              return (
                <line
                  key={`e${i}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeDasharray={edge.dashed ? '6 4' : 'none'}
                />
              );
            })}

            {graph.nodes.map((node) => {
              const p = positions[node.id];
              if (!p) return null;
              const label = node.id.length > 12 ? node.id.slice(0, 11) + '…' : node.id;
              const val = (node.val || '').length > 14 ? node.val.slice(0, 13) + '…' : (node.val || '');
              const boxW = 110;
              const boxH = 44;
              const isLatest = currentStep?.action?.name === node.id
                || currentStep?.action?.ret === node.id
                || `${currentStep?.action?.obj}.${currentStep?.action?.attr}` === node.id;

              return (
                <g key={node.id}>
                  {isLatest && (
                    <rect
                      x={p.x - boxW / 2 - 3}
                      y={p.y - boxH / 2 - 3}
                      width={boxW + 6}
                      height={boxH + 6}
                      rx="14"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                  )}
                  <rect
                    x={p.x - boxW / 2}
                    y={p.y - boxH / 2}
                    width={boxW}
                    height={boxH}
                    rx="11"
                    fill={node.color}
                    strokeDasharray={node.dashed ? '5 3' : 'none'}
                    stroke={node.dashed ? '#94a3b8' : 'none'}
                  />
                  <text
                    x={p.x}
                    y={p.y - 5}
                    textAnchor="middle"
                    className="fill-white text-[11px] font-bold"
                  >
                    {label}
                  </text>
                  <text
                    x={p.x}
                    y={p.y + 11}
                    textAnchor="middle"
                    className="fill-white/70 text-[10px]"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {graph.nodes.length === 0 && (
              <text x={svgW / 2} y={svgH / 2} textAnchor="middle" className="fill-slate-600 text-sm">
                Press Step or Run All to begin
              </text>
            )}
          </svg>
        </div>
      </div>

      {/* Status bar */}
      <div className="mt-4 rounded-xl bg-slate-900 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-slate-300">
          {currentStep ? (
            <>
              <span className="text-yellow-400 font-bold mr-2">Line {currentStep.line + 1}:</span>
              {currentStep.desc}
              {currentStep.action && currentStep.action.type !== 'output' && (
                <span className="ml-2 text-slate-500">({labelFor(currentStep.action)})</span>
              )}
            </>
          ) : (
            <span className="text-slate-500">Ready to start stepping through the code.</span>
          )}
        </p>
        {done && <span className="text-xs font-bold text-emerald-400 uppercase">Complete</span>}
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={runAll}
          disabled={running}
          className="rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer"
        >
          Run All
        </button>
        <button
          type="button"
          onClick={stepOnce}
          disabled={running || done}
          className="rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer"
        >
          Step &rarr;
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Output bar */}
      {outputs.length > 0 && (
        <div className="mt-3 rounded-xl bg-slate-900 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Output</p>
          <div className="text-sm font-mono text-emerald-300 space-y-0.5">
            {outputs.map((o, i) => (
              <div key={i}>&gt; {o}</div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
