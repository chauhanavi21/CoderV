import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LINK_REGEX = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function isInternal(href) {
  return typeof href === 'string' && href.startsWith('/');
}

/**
 * Renders an AI assistant message. Markdown links of the form [label](/path)
 * are turned into clickable in-app navigation buttons; external https/http
 * links open in a new tab; everything else renders as preserved-whitespace text.
 */
export default function AssistantMessage({ content }) {
  if (!content) return null;

  const parts = [];
  const buttons = [];
  let lastIndex = 0;
  let match;

  LINK_REGEX.lastIndex = 0;
  while ((match = LINK_REGEX.exec(content)) !== null) {
    const [whole, label, href] = match;
    if (match.index > lastIndex) {
      parts.push({ kind: 'text', value: content.slice(lastIndex, match.index) });
    }
    parts.push({ kind: 'link', label, href });
    if (isInternal(href)) {
      buttons.push({ label, href, key: `${label}|${href}|${match.index}` });
    }
    lastIndex = match.index + whole.length;
  }
  if (lastIndex < content.length) {
    parts.push({ kind: 'text', value: content.slice(lastIndex) });
  }

  return (
    <div>
      <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
        {parts.map((p, idx) => {
          if (p.kind === 'text') {
            return <span key={idx}>{p.value}</span>;
          }
          if (isInternal(p.href)) {
            return (
              <Link
                key={idx}
                to={p.href}
                className="font-medium text-fg underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2 hover:decoration-fg"
              >
                {p.label}
              </Link>
            );
          }
          if (/^https?:\/\//i.test(p.href)) {
            return (
              <a
                key={idx}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-fg underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2 hover:decoration-fg"
              >
                {p.label}
              </a>
            );
          }
          return <span key={idx}>{p.label}</span>;
        })}
      </p>

      {buttons.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {buttons.map((b) => (
            <Link
              key={b.key}
              to={b.href}
              className="hairline inline-flex items-center gap-1.5 rounded-md bg-app hover:bg-zinc-100 dark:hover:bg-zinc-900 text-fg text-[12px] font-medium px-2.5 h-7 transition-colors"
            >
              {b.label}
              <ArrowRight size={11} strokeWidth={2} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
