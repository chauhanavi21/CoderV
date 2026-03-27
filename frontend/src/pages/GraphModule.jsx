import { useMemo, useState } from 'react';
import AppLayout from '../components/AppLayout';
import StepVisualizer from '../components/StepVisualizer';
import { lessonTypeOneModule } from '../data/lessonModules';

const tabs = [
  { to: '/lesson/type-1', label: 'Type 1 Module' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

const difficultyTone = {
  beginner: 'bg-sky-100 text-sky-800 border-sky-200',
  easy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  medium: 'bg-amber-100 text-amber-800 border-amber-200',
  hard: 'bg-rose-100 text-rose-800 border-rose-200',
};

const NODE_COLORS = {
  create:      { fill: '#7C6AF6', ring: '#a594f9' },
  fn_def:      { fill: '#D85A30', ring: '#f0997b' },
  class_def:   { fill: '#D85A30', ring: '#f0997b' },
  loop:        { fill: '#E24B4A', ring: '#f09595' },
  condition:   { fill: '#1D9E75', ring: '#5dcaa5' },
  attr:        { fill: '#1D9E75', ring: '#5dcaa5' },
  default:     { fill: '#6366f1', ring: '#818cf8' },
};

function getNodePositions(nodes, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 48;

  return nodes.reduce((acc, node, index) => {
    const angle = ((Math.PI * 2) / nodes.length) * index - Math.PI / 2;
    acc[node.id] = {
      x: node.x ?? centerX + radius * Math.cos(angle),
      y: node.y ?? centerY + radius * Math.sin(angle),
    };
    return acc;
  }, {});
}

function getLinePoint(start, end, distance) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy) || 1;
  return {
    x: start.x + (dx / length) * distance,
    y: start.y + (dy / length) * distance,
  };
}

function nodeColor(nodeId, steps) {
  if (!steps) return NODE_COLORS.default;
  const lastStep = [...steps]
    .reverse()
    .find((s) => s.action?.name === nodeId || s.action?.obj === nodeId);
  return NODE_COLORS[lastStep?.action?.type] ?? NODE_COLORS.default;
}

function GraphPreview({ example }) {
  const width = 520;
  const height = 300;
  const nodeRadius = 22;
  const positions = useMemo(
    () => getNodePositions(example.nodes, width, height),
    [example.nodes]
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-slate-950 p-4 text-white shadow-card">
      <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-bold text-base">Graph view</h3>
          <p className="text-sm text-slate-300">
            Each node represents a variable, function, or class from the example.
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-200">
          {example.nodes.length} node{example.nodes.length !== 1 ? 's' : ''}
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
        <defs>
          <marker
            id="graph-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
          </marker>
        </defs>

        <rect x="0" y="0" width={width} height={height} rx="20" fill="#020617" />

        {example.edges.map((edge) => {
          const start = positions[edge.from];
          const end = positions[edge.to];
          if (!start || !end) return null;
          const lineStart = getLinePoint(start, end, nodeRadius);
          const lineEnd = getLinePoint(end, start, nodeRadius + 4);
          const labelX = (lineStart.x + lineEnd.x) / 2;
          const labelY = (lineStart.y + lineEnd.y) / 2 - 8;

          return (
            <g key={`${edge.from}-${edge.to}-${edge.label ?? 'edge'}`}>
              <line
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineEnd.x}
                y2={lineEnd.y}
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
                markerEnd="url(#graph-arrow)"
              />
              {edge.label ? (
                <>
                  <rect x={labelX - 14} y={labelY - 12} width="28" height="18" rx="9" fill="#1e293b" />
                  <text x={labelX} y={labelY + 1} textAnchor="middle" className="fill-slate-200 text-[11px] font-bold">
                    {edge.label}
                  </text>
                </>
              ) : null}
            </g>
          );
        })}

        {example.nodes.map((node) => {
          const point = positions[node.id];
          if (!point) return null;
          const col = nodeColor(node.id, example.steps);
          return (
            <g key={node.id}>
              <circle cx={point.x} cy={point.y} r={nodeRadius + 5} fill={col.fill} opacity="0.18" />
              <circle cx={point.x} cy={point.y} r={nodeRadius} fill={col.fill} />
              <circle cx={point.x} cy={point.y} r={nodeRadius - 4} fill={col.ring} />
              <text x={point.x} y={point.y + 4} textAnchor="middle" className="fill-white text-[11px] font-bold">
                {node.label ?? node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function GraphModule() {
  const module = lessonTypeOneModule;
  const [activeDifficulty, setActiveDifficulty] = useState(module.difficultyOrder[0]);
  const [activeExampleId, setActiveExampleId] = useState(
    module.difficulties[module.difficultyOrder[0]].examples[0].id
  );

  const activeDifficultyData = module.difficulties[activeDifficulty];
  const activeExample =
    activeDifficultyData.examples.find((e) => e.id === activeExampleId) ??
    activeDifficultyData.examples[0];

  const totalExamples = useMemo(
    () =>
      module.difficultyOrder.reduce(
        (count, difficultyId) => count + module.difficulties[difficultyId].examples.length,
        0
      ),
    [module]
  );

  return (
    <AppLayout tabs={tabs} sidebarId="graphModuleSidebar">
      <article className="bg-white border border-gray-200 rounded-2xl p-7 shadow-card grid grid-cols-1 xl:grid-cols-[1.4fr_260px] gap-6 items-start text-gray-900">
        <div>
          <div className="mb-3 flex items-center gap-2 flex-wrap">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-800">
              {module.lessonType.label} of {module.lessonType.totalTypes}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              {module.lessonType.name}
            </span>
          </div>
          <h1 className="text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold leading-tight">
            {module.title}
          </h1>
          <p className="mt-3 max-w-3xl text-muted text-base leading-relaxed">
            {module.summary} Each lesson type builds on the last, so the structure stays reusable
            as the learning system grows.
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <p className="text-sm font-bold text-indigo-900">Module snapshot</p>
          <dl className="mt-4 grid gap-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Difficulties
              </dt>
              <dd className="text-2xl font-extrabold text-indigo-950">4</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Python examples
              </dt>
              <dd className="text-2xl font-extrabold text-indigo-950">{totalExamples}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Focus
              </dt>
              <dd className="text-sm font-semibold text-indigo-900">
                Variables, loops, functions, OOP
              </dd>
            </div>
          </dl>
        </div>
      </article>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold">Choose a difficulty</h2>
            <p className="text-sm text-muted">
              Each level contains five examples designed for this Type 1 learning format.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {module.difficultyOrder.map((difficultyId) => {
            const difficulty = module.difficulties[difficultyId];
            const isActive = difficultyId === activeDifficulty;

            return (
              <button
                key={difficulty.id}
                type="button"
                onClick={() => {
                  setActiveDifficulty(difficultyId);
                  setActiveExampleId(difficulty.examples[0].id);
                }}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? `shadow-card -translate-y-0.5 ${difficultyTone[difficultyId]}`
                    : 'border-gray-200 bg-white text-gray-900 hover:-translate-y-0.5 hover:shadow-hover'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-base">{difficulty.label}</h3>
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-slate-700">
                    {difficulty.examples.length} examples
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-current/80">
                  {difficulty.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
        <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-gray-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">{activeDifficultyData.label} examples</h2>
              <p className="text-sm text-muted">{activeDifficultyData.description}</p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${difficultyTone[activeDifficulty]}`}>
              {activeDifficulty}
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {activeDifficultyData.examples.map((example, index) => {
              const isSelected = example.id === activeExample.id;
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
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">
                    Example {index + 1}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-900">{example.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{example.concept}</p>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="grid gap-6">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-gray-900">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Active lesson
                </p>
                <h2 className="mt-1 text-2xl font-extrabold">{activeExample.title}</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {activeExample.nodes.length} node{activeExample.nodes.length !== 1 ? 's' : ''} /{' '}
                {activeExample.edges.length} edge{activeExample.edges.length !== 1 ? 's' : ''}
              </span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted">{activeExample.explanation}</p>

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
          </article>

          <article className="rounded-2xl border border-gray-200 bg-slate-950 p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-lg font-bold text-white">Python code</h2>
                <p className="text-sm text-slate-400">
                  Each line maps to a node or edge in the graph below.
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
                Python
              </span>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm leading-6 text-slate-100">
              <code>{activeExample.code}</code>
            </pre>
          </article>

          <GraphPreview example={activeExample} />

          {activeExample.steps && activeExample.steps.length > 0 && (
            <StepVisualizer key={activeExample.id} example={activeExample} />
          )}
        </div>
      </section>
    </AppLayout>
  );
}