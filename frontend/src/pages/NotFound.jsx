import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center py-7">
      <div className="text-center max-w-md px-6">
        <div className="w-[90px] h-[90px] rounded-3xl gradient-primary inline-grid place-items-center font-black text-5xl text-white shadow-card mb-8">
          ?
        </div>
        <h1 className="text-6xl font-black text-primary mb-4">404</h1>
        <p className="text-xl font-bold mb-2">Page not found</p>
        <p className="text-muted text-sm mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/dashboard"
          className="inline-block gradient-primary text-white rounded-xl px-6 py-3 text-sm font-bold shadow-btn hover:-translate-y-0.5 active:translate-y-0 transition-transform"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
