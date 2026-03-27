import { SignIn } from '@clerk/react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle({ isDark, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center
                 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors"
    >
      {isDark ? (
        /* sun */
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" />
          <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        /* moon */
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-indigo-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Login() {
  const { isDark, toggleTheme } = useTheme();

  /* dark mode  → white card (bright, readable)
     light mode → dark card (indigo-950, light text) */
  const panelBg    = isDark ? 'bg-white'        : 'bg-indigo-950';
  const clerkBg    = isDark ? '#ffffff'          : '#1e1b4b';
  const clerkInput = isDark ? '#f1f5f9'          : '#2e2b6e';
  const clerkText  = isDark ? '#111827'          : '#f1f5f9';
  const clerkSub   = isDark ? '#6b7280'          : '#a5b4fc';
  const clerkNeutral = isDark ? '#374151'        : '#818cf8';

  const clerkAppearance = {
    variables: {
      colorBackground:              clerkBg,
      colorText:                    clerkText,
      colorTextSecondary:           clerkSub,
      colorInputBackground:         clerkInput,
      colorInputText:               clerkText,
      colorPrimary:                 '#4f46e5',
      colorTextOnPrimaryBackground: '#ffffff',
      colorNeutral:                 clerkNeutral,
      borderRadius:                 '0.75rem',
      fontFamily:                   'inherit',
    },
    elements: {
      rootBox:              'w-full',
      card:                 '!shadow-none !border-0 p-0 w-full',
      formButtonPrimary:    'font-bold hover:opacity-90 transition-opacity',
      footerActionLink:     isDark ? 'text-indigo-600 font-semibold' : 'text-indigo-300 font-semibold',
      footer:               `bg-[${clerkBg}]`,
      socialButtonsBlockButton: isDark
        ? 'border-gray-200 hover:bg-gray-50'
        : 'border-indigo-700 text-indigo-100 hover:bg-indigo-900',
    },
  };

  return (
    <main className="min-h-screen grid place-items-center py-7 px-4 relative">

      {/* ── Theme toggle (floats top-right of viewport) ── */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center
                   bg-gray-200/80 dark:bg-slate-700/80 border border-gray-300 dark:border-slate-600
                   backdrop-blur-sm hover:scale-110 transition-transform shadow"
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="5" />
            <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>

      <section className="w-[min(900px,96%)] grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

        {/* ── Brand side ── */}
        <aside className="gradient-auth text-white p-10 max-md:p-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2.5 font-extrabold tracking-tight">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-white/25 grid place-items-center font-black">C</div>
            CoderV
          </div>
          <h1 className="mt-5 mb-2.5 text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight font-extrabold">
            Learn smarter,<br />code better
          </h1>
          <p className="mb-7 opacity-90 leading-relaxed text-sm">
            Focused learning with structured lessons, practice quizzes, and AI-powered support.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['6 Learning tracks', 'Daily quiz mode', 'Progress insights', 'Ask AI support'].map((t) => (
              <div key={t} className="bg-white/[0.18] border border-white/[0.28] rounded-xl px-3.5 py-3 text-xs font-medium">{t}</div>
            ))}
          </div>
        </aside>

        {/* ── Clerk Sign-In ── */}
        <div className={`flex items-center justify-center p-8 max-md:p-6 transition-colors ${panelBg}`}>
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
