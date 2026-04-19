import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown error' };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset() {
    this.setState({ hasError: false, message: '' });
    window.location.href = '/dashboard';
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-screen grid place-items-center bg-app text-fg">
        <div className="text-center max-w-md px-6">
          <div className="hairline border-red-500/40 w-12 h-12 rounded-md bg-red-500/5 inline-grid place-items-center mb-6">
            <AlertTriangle size={20} strokeWidth={1.75} className="text-red-500" />
          </div>
          <p className="text-[11px] mono uppercase tracking-wider text-red-500 mb-2">
            error
          </p>
          <h1 className="text-2xl font-semibold tracking-tightish text-fg mb-2">
            Something broke
          </h1>
          <p className="text-[13px] text-fg-muted mb-2 leading-relaxed">
            An unexpected error occurred.
          </p>
          <p className="hairline rounded-md bg-elevated mono text-[11.5px] text-red-500 px-3 py-2 mb-2 break-all text-left">
            {this.state.message}
          </p>
          <p className="text-[11.5px] text-fg-subtle mb-6">
            Likely temporary. Refresh the page or return to the dashboard.
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <button
              onClick={() => window.location.reload()}
              className="hairline inline-flex items-center gap-1.5 rounded-md px-3.5 h-9 text-[12px] font-medium text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <RefreshCw size={12} strokeWidth={2} /> Reload
            </button>
            <button
              onClick={() => this.handleReset()}
              className="rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3.5 h-9 inline-flex items-center text-[12px] font-medium hover:opacity-90 transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }
}
