import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen grid place-items-center bg-app text-fg">
      <div className="text-center max-w-md px-6">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
          status: 404
        </p>
        <h1 className="text-6xl font-semibold mono tabular-nums text-fg mb-3">404</h1>
        <p className="text-[15px] font-medium text-fg mb-2">
          Page not found
        </p>
        <p className="text-[13px] text-fg-muted mb-7 leading-relaxed">
          The page you're looking for doesn't exist, was removed, or the URL is wrong.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="hairline inline-flex items-center gap-1.5 rounded-md px-3.5 h-9 text-[12px] font-medium text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <ArrowLeft size={12} strokeWidth={2} /> Go back
          </button>
          <Link
            to="/dashboard"
            className="rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3.5 h-9 inline-flex items-center text-[12px] font-medium hover:opacity-90 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
