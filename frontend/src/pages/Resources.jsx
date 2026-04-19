import {
  BookOpen,
  Code2,
  Target,
  Play,
  Globe,
  MessageSquare,
  GitBranch,
  GraduationCap,
  ArrowRight,
  Clock,
  Brain,
  Sparkles,
  Boxes,
  Network,
  Eye,
  Wrench,
  ExternalLink,
} from 'lucide-react';
import AppLayout from '../components/AppLayout';

const guides = [
  {
    Icon: BookOpen,
    title: 'Python Official Tutorial',
    desc: 'The canonical, always-up-to-date walkthrough of the Python language from python.org.',
    href: 'https://docs.python.org/3/tutorial/',
  },
  {
    Icon: Code2,
    title: 'PEP 8 — Python Style Guide',
    desc: 'The standard for writing clean, idiomatic, and readable Python code.',
    href: 'https://peps.python.org/pep-0008/',
  },
  {
    Icon: Target,
    title: 'Big-O Cheat Sheet',
    desc: 'Time and space complexity for every common data structure and algorithm at a glance.',
    href: 'https://www.bigocheatsheet.com/',
  },
  {
    Icon: Eye,
    title: 'VisuAlgo — Algorithm Visualizer',
    desc: 'Interactive animations for sorting, graphs, trees, and core algorithms.',
    href: 'https://visualgo.net/en',
  },
  {
    Icon: Brain,
    title: 'Python Tutor — Step Visualizer',
    desc: 'See exactly how Python executes your code one step at a time.',
    href: 'https://pythontutor.com/',
  },
  {
    Icon: Wrench,
    title: 'Refactoring Guru — Patterns',
    desc: 'Beautifully illustrated guide to design patterns and refactoring techniques.',
    href: 'https://refactoring.guru/design-patterns',
  },
];

// Hand-picked, highest-quality YouTube videos matching the CoderV curriculum.
// `id` is the YouTube video id used for both the thumbnail and the watch link.
const videos = [
  {
    id: 'rfscVS0vtbw',
    title: 'Learn Python — Full Course for Beginners',
    desc: 'Mosh Hamedani\'s legendary 4-hour Python crash course on freeCodeCamp.',
    duration: '4h 27m',
    channel: 'freeCodeCamp',
  },
  {
    id: 'JeznW_7DlB0',
    title: 'Python OOP Tutorial',
    desc: 'Corey Schafer\'s classic deep-dive into classes, inheritance and special methods.',
    duration: '40m',
    channel: 'Corey Schafer',
  },
  {
    id: 'pkYVOmU3MgA',
    title: 'Python Data Structures & Algorithms',
    desc: 'A complete walkthrough of lists, stacks, queues, trees and graphs in Python.',
    duration: '8h',
    channel: 'freeCodeCamp',
  },
  {
    id: '8hly31xKli0',
    title: 'Algorithms Course — Graph Theory & More',
    desc: 'William Fiset\'s in-depth tour of algorithms, recursion, DP and graph theory.',
    duration: '5h 47m',
    channel: 'freeCodeCamp',
  },
  {
    id: 'v4cd1O4zkGw',
    title: 'Big-O Notation in 5 Minutes',
    desc: 'The fastest, clearest intro to time complexity you\'ll ever watch.',
    duration: '5m',
    channel: 'HackerRank',
  },
  {
    id: 'F2FmTdLtb_4',
    title: 'System Design Concepts — Full Course',
    desc: 'Caching, load balancing, databases, sharding — everything in one hour.',
    duration: '1h 9m',
    channel: 'freeCodeCamp',
  },
];

const externalLinks = [
  {
    Icon: Code2,
    title: 'Python Documentation',
    desc: 'Official reference for the language and standard library.',
    href: 'https://docs.python.org/3/',
  },
  {
    Icon: Sparkles,
    title: 'Real Python',
    desc: 'Tutorials and articles for every level of Python developer.',
    href: 'https://realpython.com/',
  },
  {
    Icon: Target,
    title: 'LeetCode',
    desc: 'Practice 3,000+ coding interview problems with instant feedback.',
    href: 'https://leetcode.com/',
  },
  {
    Icon: Boxes,
    title: 'GeeksforGeeks',
    desc: 'In-depth articles on data structures, algorithms and CS fundamentals.',
    href: 'https://www.geeksforgeeks.org/',
  },
  {
    Icon: Network,
    title: 'NeetCode',
    desc: 'Curated DSA roadmap with video explanations for every problem.',
    href: 'https://neetcode.io/roadmap',
  },
  {
    Icon: MessageSquare,
    title: 'Stack Overflow',
    desc: 'Community-driven Q&A — odds are someone has hit your bug before.',
    href: 'https://stackoverflow.com/',
  },
  {
    Icon: GitBranch,
    title: 'GitHub',
    desc: 'Host your code, collaborate, and explore millions of open-source projects.',
    href: 'https://github.com/',
  },
  {
    Icon: GraduationCap,
    title: 'freeCodeCamp',
    desc: 'Free, certificate-backed bootcamps spanning Python, web dev and ML.',
    href: 'https://www.freecodecamp.org/',
  },
  {
    Icon: Globe,
    title: 'MDN Web Docs',
    desc: 'The web platform reference — HTML, CSS, JavaScript and APIs.',
    href: 'https://developer.mozilla.org/',
  },
];

const tabs = [
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
          Hand-picked materials to supplement your CoderV journey — from Python basics to system design.
        </p>
      </header>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
          Documentation & Guides
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {guides.map(({ Icon, title, desc, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline rounded-md bg-elevated p-4 flex flex-col gap-2.5 hover:border-app-strong transition-colors group"
            >
              <Icon size={16} strokeWidth={1.75} className="text-fg" />
              <h3 className="font-medium text-[14px] text-fg">{title}</h3>
              <p className="text-fg-muted text-[12.5px] leading-relaxed flex-1">{desc}</p>
              <span className="hairline mt-2 inline-flex items-center justify-center gap-1.5 rounded-md px-3 h-8 text-[12px] font-medium text-fg group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 transition-colors">
                View Guide <ArrowRight size={11} strokeWidth={2} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
          Video Tutorials
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {videos.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline rounded-md bg-elevated overflow-hidden hover:border-app-strong transition-colors flex flex-col group"
            >
              <div className="hairline-b aspect-video bg-app relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="w-10 h-10 rounded-full bg-black/60 backdrop-blur grid place-items-center text-white">
                    <Play size={16} strokeWidth={2} fill="currentColor" />
                  </span>
                </div>
                <span className="absolute top-2 right-2 bg-black/70 backdrop-blur rounded px-1.5 py-0.5 text-[10px] mono text-white inline-flex items-center gap-1">
                  <Clock size={9} strokeWidth={2} /> {v.duration}
                </span>
                <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur rounded px-1.5 py-0.5 text-[10px] mono text-white">
                  {v.channel}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-medium text-[14px] text-fg">{v.title}</h3>
                <p className="text-fg-muted text-[12.5px] leading-relaxed flex-1">{v.desc}</p>
                <span className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3 h-8 text-[12px] font-medium group-hover:opacity-90 transition">
                  <Play size={11} strokeWidth={2} fill="currentColor" /> Watch on YouTube
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
          External Resources
        </p>
        <div className="hairline rounded-md bg-elevated divide-y divide-zinc-200 dark:divide-zinc-800">
          {externalLinks.map(({ Icon, title, desc, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group"
            >
              <span className="hairline grid place-items-center w-8 h-8 rounded-md bg-app text-fg shrink-0">
                <Icon size={14} strokeWidth={1.75} />
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[13px] text-fg flex items-center gap-1.5">
                  {title}
                  <ExternalLink size={11} strokeWidth={1.75} className="text-fg-subtle" />
                </h4>
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
