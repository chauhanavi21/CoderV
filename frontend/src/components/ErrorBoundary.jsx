import { Component } from 'react';

/**
 * Catches any unhandled JS errors in the component tree and renders a friendly
 * fallback instead of a blank/broken page.
 */
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
      <main className="min-h-screen grid place-items-center py-7 bg-slate-50 dark:bg-slate-950">
        <div className="text-center max-w-md px-6">
          <div className="w-[90px] h-[90px] rounded-3xl bg-red-100 dark:bg-red-900/30 inline-grid place-items-center text-5xl mb-8 shadow-card">
            ⚠️
          </div>
          <h1 className="text-4xl font-black text-red-500 mb-4">Something broke</h1>
          <p className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
            An unexpected error occurred
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
            {this.state.message}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">
            This is likely a temporary issue. Refresh the page or go back to the dashboard.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => window.location.reload()}
              className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl px-5 py-3 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Reload page
            </button>
            <button
              onClick={() => this.handleReset()}
              className="gradient-primary text-white rounded-xl px-6 py-3 text-sm font-bold shadow-btn hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }
}
