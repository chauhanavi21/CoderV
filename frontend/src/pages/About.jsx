import { BookOpen, ListChecks, Sparkles, BarChart3, GraduationCap, Lightbulb, Mail, Globe, MessageSquare } from 'lucide-react';
import AppLayout from '../components/AppLayout';

const features = [
  { Icon: BookOpen, title: 'Structured Learning', desc: 'Step-by-step lessons designed to build skills progressively.' },
  { Icon: ListChecks, title: 'Practice Quizzes', desc: 'Test your knowledge with comprehensive quizzes and challenges.' },
  { Icon: Sparkles, title: 'AI Assistant', desc: 'Get instant help and explanations from our AI learning assistant.' },
  { Icon: BarChart3, title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed progress insights.' },
  { Icon: GraduationCap, title: 'Expert Content', desc: 'Learn from carefully curated, industry-standard materials.' },
  { Icon: Lightbulb, title: 'Interactive Learning', desc: 'Hands-on practice with real coding challenges and projects.' },
];

const stats = [
  { number: '50+', label: 'Lessons' },
  { number: '200+', label: 'Practice Q' },
  { number: '24/7', label: 'AI Support' },
  { number: '100%', label: 'Free Access' },
];

const tabs = [
  { to: '/dashboard', label: 'How to use' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function About() {
  return (
    <AppLayout tabs={tabs} sidebarId="aboutSidebar">
      <header className="hairline-b pb-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-md bg-zinc-900 dark:bg-zinc-100 grid place-items-center text-zinc-100 dark:text-zinc-900 font-semibold text-xl mono">
          C
        </div>
        <div>
          <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-1">/about</p>
          <h1 className="text-2xl font-semibold tracking-tightish text-fg leading-none">CoderV</h1>
          <p className="text-[12.5px] text-fg-muted mt-1.5">
            Learn smarter. Code better. Succeed faster.
          </p>
        </div>
      </header>

      <section className="mb-10 max-w-3xl">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-2">Mission</p>
        <p className="text-[13.5px] text-fg-muted leading-relaxed">
          CoderV is a learning platform that helps students master programming through structured
          lessons, interactive quizzes, and AI-powered assistance. Learning to code should be
          accessible, engaging, and effective for everyone.
        </p>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">What we offer</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {features.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="hairline rounded-md bg-elevated p-4 hover:border-app-strong transition-colors"
            >
              <Icon size={16} strokeWidth={1.75} className="text-fg mb-2.5" />
              <h3 className="font-medium text-[13.5px] text-fg mb-1">{title}</h3>
              <p className="text-fg-muted text-[12.5px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 max-w-3xl">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-2">Vision</p>
        <p className="text-[13.5px] text-fg-muted leading-relaxed">
          A world where quality programming education is accessible to everyone, regardless of
          background. CoderV combines modern technology with proven teaching methods to create an
          optimal learning environment that adapts to each student's needs.
        </p>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">By the numbers</p>
        <div className="hairline rounded-md grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-200 dark:divide-zinc-800">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-5">
              <div className="text-2xl font-semibold mono tabular-nums text-fg leading-none mb-1.5">
                {s.number}
              </div>
              <div className="text-[10px] mono uppercase tracking-wider text-fg-subtle">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="hairline rounded-md bg-elevated p-6 max-w-3xl">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-2">Contact</p>
        <h2 className="text-[15px] font-medium text-fg mb-1">Get in touch</h2>
        <p className="text-[12.5px] text-fg-muted mb-4">
          Have questions or feedback? We'd love to hear from you.
        </p>
        <div className="grid gap-2 mono text-[12.5px]">
          <p className="flex items-center gap-2 text-fg-muted">
            <Mail size={12} strokeWidth={1.75} className="text-fg-subtle" /> support@coderv.com
          </p>
          <p className="flex items-center gap-2 text-fg-muted">
            <Globe size={12} strokeWidth={1.75} className="text-fg-subtle" /> www.coderv.com
          </p>
          <p className="flex items-center gap-2 text-fg-muted">
            <MessageSquare size={12} strokeWidth={1.75} className="text-fg-subtle" /> CoderV Community (Discord)
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
