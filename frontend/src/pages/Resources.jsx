import { BookOpen, Code2, Target, Play, Globe, MessageSquare, GitBranch, GraduationCap, ArrowRight, Clock } from 'lucide-react';
import AppLayout from '../components/AppLayout';

const guides = [
  { Icon: BookOpen, title: 'Programming Basics', desc: 'Comprehensive guide covering fundamental programming concepts.' },
  { Icon: Code2, title: 'Code Style Guide', desc: 'Best practices for writing clean, maintainable code.' },
  { Icon: Target, title: 'Problem Solving Tips', desc: 'Strategies and techniques for tackling coding challenges.' },
];

const videos = [
  { title: 'Data Structures Explained', desc: 'Visual guide to common data structures.', duration: '42m' },
  { title: 'Algorithm Fundamentals', desc: 'Step-by-step algorithm explanations.', duration: '38m' },
  { title: 'Debugging Techniques', desc: 'Master the art of finding and fixing bugs.', duration: '25m' },
];

const externalLinks = [
  { Icon: Globe, title: 'MDN Web Docs', desc: 'Comprehensive web development documentation.' },
  { Icon: MessageSquare, title: 'Stack Overflow', desc: 'Community-driven Q&A for programmers.' },
  { Icon: GitBranch, title: 'GitHub Learning Lab', desc: 'Interactive courses on Git and GitHub.' },
  { Icon: GraduationCap, title: 'FreeCodeCamp', desc: 'Free coding bootcamp with certificates.' },
];

const tabs = [
  { to: '/dashboard', label: 'How to use' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function Resources() {
  return (
    <AppLayout tabs={tabs} sidebarId="resourcesSidebar">
      <header className="hairline-b pb-5 mb-8">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-1.5">/resources</p>
        <h1 className="text-2xl font-semibold tracking-tightish text-fg">Learning Resources</h1>
        <p className="text-[13px] text-fg-muted mt-1.5">
          Curated materials to supplement your learning journey.
        </p>
      </header>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
          Documentation & Guides
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {guides.map(({ Icon, title, desc }) => (
            <article
              key={title}
              className="hairline rounded-md bg-elevated p-4 flex flex-col gap-2.5 hover:border-app-strong transition-colors"
            >
              <Icon size={16} strokeWidth={1.75} className="text-fg" />
              <h3 className="font-medium text-[14px] text-fg">{title}</h3>
              <p className="text-fg-muted text-[12.5px] leading-relaxed flex-1">{desc}</p>
              <button className="hairline mt-2 inline-flex items-center justify-center gap-1.5 rounded-md px-3 h-8 text-[12px] font-medium text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                View Guide <ArrowRight size={11} strokeWidth={2} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
          Video Tutorials
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {videos.map((v) => (
            <article
              key={v.title}
              className="hairline rounded-md bg-elevated overflow-hidden hover:border-app-strong transition-colors flex flex-col"
            >
              <div className="hairline-b aspect-video bg-app grid place-items-center relative">
                <Play size={28} strokeWidth={1.5} className="text-fg-subtle" fill="currentColor" />
                <span className="absolute top-2 right-2 hairline bg-app rounded px-1.5 py-0.5 text-[10px] mono text-fg-muted inline-flex items-center gap-1">
                  <Clock size={9} strokeWidth={2} /> {v.duration}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-medium text-[14px] text-fg">{v.title}</h3>
                <p className="text-fg-muted text-[12.5px] leading-relaxed flex-1">{v.desc}</p>
                <button className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3 h-8 text-[12px] font-medium hover:opacity-90 transition">
                  <Play size={11} strokeWidth={2} fill="currentColor" /> Watch
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
          External Resources
        </p>
        <div className="hairline rounded-md bg-elevated divide-y divide-zinc-200 dark:divide-zinc-800">
          {externalLinks.map(({ Icon, title, desc }) => (
            <a
              key={title}
              href="#"
              className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group"
            >
              <span className="hairline grid place-items-center w-8 h-8 rounded-md bg-app text-fg shrink-0">
                <Icon size={14} strokeWidth={1.75} />
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[13px] text-fg">{title}</h4>
                <p className="text-fg-muted text-[12px] mt-0.5">{desc}</p>
              </div>
              <ArrowRight
                size={14}
                strokeWidth={1.75}
                className="text-fg-subtle group-hover:text-fg group-hover:translate-x-0.5 transition-all"
              />
            </a>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
