import { useMemo } from 'react';

const NODE_COLORS = {
  create:    { fill: '#7C6AF6', ring: '#a594f9' },
  fn_def:    { fill: '#D85A30', ring: '#f0997b' },
  class_def: { fill: '#D85A30', ring: '#f0997b' },
  loop:      { fill: '#E24B4A', ring: '#f09595' },
  condition: { fill: '#1D9E75', ring: '#5dcaa5' },
  attr:      { fill: '#1D9E75', ring: '#5dcaa5' },
  default:   { fill: '#6366f1', ring: '#818cf8' },
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

export default function GraphPreview({ example }) {
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
