import { SignIn } from '@clerk/react';

export default function Login() {
  return (
    <main className="min-h-screen grid place-items-center py-7 px-4">
      <section className="w-[min(900px,96%)] grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-card">

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
        <div className="flex items-center justify-center p-8 max-md:p-6">
          <SignIn
            forceRedirectUrl="/dashboard"
            signUpUrl="/signup"
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border-0 bg-transparent p-0 w-full gap-5',
                headerTitle: 'text-2xl font-bold text-gray-900',
                headerSubtitle: 'text-sm text-gray-500',
                socialButtonsBlockButton: 'border border-gray-200 rounded-xl font-semibold text-sm',
                dividerLine: 'bg-gray-200',
                dividerText: 'text-gray-400 text-xs',
                formFieldLabel: 'text-sm font-semibold text-gray-700',
                formFieldInput:
                  'border border-gray-200 rounded-xl px-3.5 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 w-full',
                formButtonPrimary:
                  'w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl px-4 py-3 text-sm font-bold shadow-lg transition-all',
                footerActionLink: 'text-indigo-600 font-bold',
                identityPreviewText: 'text-sm text-gray-700',
                identityPreviewEditButton: 'text-indigo-600',
                alertText: 'text-sm',
                formFieldErrorText: 'text-xs text-red-600',
              },
            }}
          />
        </div>

      </section>
    </main>
  );
}
