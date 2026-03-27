import { SignIn } from '@clerk/react';
import { useTheme } from '../contexts/ThemeContext';

export default function Login() {
  const { isDark } = useTheme();

  const clerkAppearance = {
    variables: {
      colorBackground:              isDark ? '#1e293b' : '#ffffff',
      colorText:                    isDark ? '#f1f5f9' : '#111827',
      colorTextSecondary:           isDark ? '#94a3b8' : '#6b7280',
      colorInputBackground:         isDark ? '#0f172a' : '#f8fafc',
      colorInputText:               isDark ? '#f1f5f9' : '#111827',
      colorPrimary:                 '#4f46e5',
      colorTextOnPrimaryBackground: '#ffffff',
      colorNeutral:                 isDark ? '#94a3b8' : '#6b7280',
      borderRadius:                 '0.75rem',
      fontFamily:                   'inherit',
    },
    elements: {
      rootBox:    'w-full',
      card:       '!shadow-none !border-0 p-0 w-full',
      headerTitle: 'font-bold',
      formButtonPrimary:
        'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-90 transition-opacity font-bold',
      socialButtonsBlockButton: isDark
        ? 'border-slate-600 text-slate-200 hover:bg-slate-700'
        : 'border-gray-200 hover:bg-gray-50',
      footerActionLink: 'text-indigo-500 font-semibold',
      footer: isDark ? 'bg-slate-800' : 'bg-white',
      internal: isDark ? 'bg-slate-800' : 'bg-white',
    },
  };

  return (
    <main className="min-h-screen grid place-items-center py-7 px-4">
      <section className="w-[min(900px,96%)] grid grid-cols-1 md:grid-cols-2 border border-gray-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-card">

        {/* ── Brand side ── */}
        <aside className="gradient-auth text-white p-10 max-md:p-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2.5 font-extrabold tracking-tight">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-white/25 grid place-items-center font-black">C</div>
            CoderV
          </div>
          <h1 className="mt-5 mb-2.5 text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight font-extrabold">
            Learn smarter, code better
          </h1>
          <p className="mb-7 opacity-90 leading-relaxed">
            Focused learning with structured lessons, practice quizzes, and AI-powered support.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['6 Learning tracks', 'Daily quiz mode', 'Progress insights', 'Ask AI support'].map((t) => (
              <div key={t} className="bg-white/[0.18] border border-white/[0.28] rounded-xl px-3.5 py-3 text-sm">{t}</div>
            ))}
          </div>
        </aside>

        {/* ── Clerk Sign-In ── */}
        <div className={`flex items-center justify-center p-8 max-md:p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <SignIn
            forceRedirectUrl="/dashboard"
            signUpUrl="/signup"
            appearance={clerkAppearance}
          />
        </div>

      </section>
    </main>
  );
}
