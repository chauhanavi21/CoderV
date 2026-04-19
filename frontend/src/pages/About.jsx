import {
  BookOpen,
  ListChecks,
  Sparkles,
  BarChart3,
  GraduationCap,
  Lightbulb,
  FileText,
  Image as ImageIcon,
  User,
} from 'lucide-react';
import AppLayout from '../components/AppLayout';

function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const features = [
  { Icon: BookOpen, title: 'Structured Learning', desc: 'Step-by-step lessons designed to build skills progressively.' },
  { Icon: ListChecks, title: 'Practice Quizzes', desc: 'Test your knowledge with comprehensive quizzes and challenges.' },
  { Icon: Sparkles, title: 'AI Assistant', desc: 'Get instant help and explanations from our AI learning assistant.' },
  { Icon: BarChart3, title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed progress insights.' },
  { Icon: GraduationCap, title: 'Expert Content', desc: 'Learn from carefully curated, industry-standard materials.' },
  { Icon: Lightbulb, title: 'Interactive Learning', desc: 'Hands-on practice with real coding challenges and projects.' },
];

const stats = [
  { number: '6', label: 'Lessons' },
  { number: '100+', label: 'Practice Q' },
  { number: 'ICSI 680', label: 'Project of Class' },
  { number: '100%', label: 'Free Access' },
];

const contributors = [
  'Ishan Pathak',
  'Karan Patel',
  'Avi Chauhan',
  'Rahil Shah',
  'Jainik Desai',
];

const milestones = [
  { label: 'Milestone 1', href: '/TeamG-milestone1.pdf' },
  { label: 'Milestone 2', href: '/TeamG-milestone2.pdf' },
  { label: 'Milestone 3', href: '/TeamG-milestone3.pdf' },
  { label: 'Milestone 4', href: '/TeamG-milestone4.pdf' },
];

const tabs = [
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

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">Project</p>
        <div className="hairline rounded-md bg-elevated p-5 max-w-3xl">
          <h2 className="text-[15px] font-medium text-fg mb-2">ICSI 680 — Masters Project</h2>
          <div className="grid gap-1 text-[12.5px] text-fg-muted mono">
            <p>Professor: Jeff Offutt</p>
            <p>Class of 2024</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">Contributors</p>
        <div className="hairline rounded-md bg-elevated p-5 max-w-3xl">
          <ul className="grid sm:grid-cols-2 gap-2">
            {contributors.map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 text-[13px] text-fg"
              >
                <User size={13} strokeWidth={1.75} className="text-fg-subtle" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">Repository</p>
        <a
          href="https://github.com/chauhanavi21/CoderV"
          target="_blank"
          rel="noopener noreferrer"
          className="hairline rounded-md bg-elevated p-4 max-w-3xl flex items-center gap-3 hover:border-app-strong transition-colors group"
        >
          <GithubIcon size={16} className="text-fg" />
          <div className="min-w-0">
            <div className="text-[13.5px] text-fg font-medium group-hover:underline">
              chauhanavi21/CoderV
            </div>
            <div className="text-[12px] mono text-fg-muted truncate">
              https://github.com/chauhanavi21/CoderV
            </div>
          </div>
        </a>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">Milestones</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {milestones.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline rounded-md bg-elevated p-4 hover:border-app-strong transition-colors group"
            >
              <FileText size={16} strokeWidth={1.75} className="text-fg mb-2.5" />
              <h3 className="font-medium text-[13.5px] text-fg mb-1 group-hover:underline">
                {label}
              </h3>
              <p className="text-[11.5px] mono text-fg-subtle">PDF</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">Poster</p>
        <a
          href="/CoderV_TeamG.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hairline rounded-md bg-elevated p-4 max-w-3xl flex items-center gap-3 hover:border-app-strong transition-colors group"
        >
          <ImageIcon size={16} strokeWidth={1.75} className="text-fg" />
          <div className="min-w-0">
            <div className="text-[13.5px] text-fg font-medium group-hover:underline">
              CoderV — Team G Poster
            </div>
            <div className="text-[12px] mono text-fg-muted">PDF</div>
          </div>
        </a>
      </section>

    </AppLayout>
  );
}
