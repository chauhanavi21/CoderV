import { useMemo } from 'react';

const NODE_COLORS = {
  create:    { fill: '#27272a', ring: '#52525b' },
  fn_def:    { fill: '#27272a', ring: '#a3a3a3' },
  class_def: { fill: '#27272a', ring: '#a3a3a3' },
  loop:      { fill: '#27272a', ring: '#71717a' },
  condition: { fill: '#27272a', ring: '#71717a' },
  attr:      { fill: '#27272a', ring: '#71717a' },
  default:   { fill: '#27272a', ring: '#52525b' },
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
    <div className="hairline rounded-md bg-zinc-950 p-3 text-zinc-100">
      <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[10px] mono uppercase tracking-wider text-zinc-500 mb-0.5">graph</p>
          <p className="text-[12px] text-zinc-400">
            Nodes represent variables, functions, or classes from the example.
          </p>
        </div>
        <span className="hairline border-zinc-800 rounded px-2 py-0.5 text-[10px] mono uppercase tracking-wider text-zinc-400">
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
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#71717a" />
          </marker>
        </defs>

        <rect x="0" y="0" width={width} height={height} rx="6" fill="#09090b" />

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
                stroke="#3f3f46"
                strokeWidth="1"
                strokeDasharray="3 3"
                strokeLinecap="round"
                markerEnd="url(#graph-arrow)"
              />
              {edge.label ? (
                <>
                  <rect x={labelX - 14} y={labelY - 10} width="28" height="16" rx="3" fill="#18181b" stroke="#27272a" />
                  <text x={labelX} y={labelY + 2} textAnchor="middle" className="fill-zinc-400 text-[10px] font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
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
              <circle cx={point.x} cy={point.y} r={nodeRadius} fill={col.fill} stroke={col.ring} strokeWidth="1" />
              <text x={point.x} y={point.y + 3} textAnchor="middle" className="fill-zinc-200 text-[10px] font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {node.label ?? node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
