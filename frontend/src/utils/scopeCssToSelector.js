/**
 * Prefix top-level CSS rules with a root selector (e.g. sidebar scope).
 * Handles @media nesting; leaves @keyframes blocks as-is.
 */
export function scopeCssToSelector(css, rootSelector) {
  const root = String(rootSelector || '').trim();
  if (!root) return String(css ?? '');
  const cleaned = String(css ?? '').replace(/\/\*[\s\S]*?\*\//g, '');
  if (!cleaned.trim()) return '';
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '{') depth++;
    else if (cleaned[i] === '}' && depth > 0) {
      depth--;
      if (depth === 0) {
        const block = cleaned.slice(start, i + 1).trim();
        if (block) out.push(transformBlock(block, root));
        start = i + 1;
      }
    }
  }
  return out.filter(Boolean).join('\n');
}

function transformBlock(block, root) {
  const o = block.indexOf('{');
  if (o === -1) return block;
  let head = block.slice(0, o).trim();
  const inner = block.slice(o + 1, -1).trim();
  if (!head) return '';
  if (head.startsWith('@import')) return `${head};`;
  if (head.startsWith('@keyframes')) return `${head} { ${inner} }`;
  if (head.startsWith('@media')) {
    return `${head} { ${scopeCssToSelector(inner, root)} }`;
  }
  if (head.startsWith('@')) return `${head} { ${inner} }`;
  head = head.replace(/\bhtml\b/g, root).replace(/\bbody\b/g, root);
  const parts = head.split(',').map((s) => s.trim()).filter(Boolean);
  const scoped = parts
    .map((s) =>
      s === root || s.startsWith(`${root} `) || s.startsWith(`${root}:`) || s.startsWith(`${root}[`)
        ? s
        : `${root} ${s}`
    )
    .join(', ');
  return `${scoped} { ${inner} }`;
}
