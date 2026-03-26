import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const upcomingLessons = [
  {
    title: 'Type 1: Python Graph Explorer',
    desc: 'Learn nodes, edges, traversals, and paths with 4 difficulties and 20 examples.',
    to: '/lessons/type-1',
    cta: 'Start Type 1',
  },
  {
    title: 'Type 2: Coming soon',
    desc: 'Reserved for the second lesson type in the learning system.',
    to: '/lessons',
    cta: 'View all lessons',
  },
  {
    title: 'Type 3: Coming soon',
    desc: 'Reserved for the third lesson type so the lesson area can grow consistently.',
    to: '/lessons',
    cta: 'View all lessons',
  },
];

export default function Dashboard() {
  return (
    <AppLayout sidebarId="dashboardSidebar">
      {/* Hero card */}
      <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-7 shadow-card grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center mb-2">
        <div>
          <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold mb-2.5 dark:text-slate-100">
            Welcome, First Name
          </h1>
          <p className="text-muted dark:text-slate-400 text-base leading-relaxed">
            Start here. Complete your next lesson and keep the momentum.
          </p>
        </div>
        <div className="grid place-items-center lg:place-items-center max-lg:place-items-start">
          <div className="w-[170px] aspect-square rounded-full progress-conic grid place-items-center relative shadow-[0_8px_20px_rgba(16,185,129,0.15)]">
            <div className="absolute w-[128px] h-[128px] rounded-full bg-white dark:bg-slate-800" />
            <span className="relative z-10 text-center font-extrabold text-emerald-900 dark:text-emerald-300 text-sm leading-snug">
              Current<br />Progress<br />2 / 6
            </span>
          </div>
        </div>
      </article>

      {/* Upcoming lessons */}
      <h2 className="mt-8 mb-4 text-xl font-bold dark:text-slate-100">Upcoming lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {upcomingLessons.map((lesson) => (
          <article
            key={lesson.title}
            className="border border-gray-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-800 shadow-sm flex flex-col gap-3 hover:-translate-y-1 hover:shadow-hover transition-all duration-200"
          >
            <h3 className="font-bold text-base dark:text-slate-100">{lesson.title}</h3>
            <p className="text-muted dark:text-slate-400 text-sm leading-relaxed flex-1">{lesson.desc}</p>
            <Link
              to={lesson.to}
              className="w-full text-center bg-indigo-50 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:shadow-md transition-all"
            >
              {lesson.cta}
            </Link>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
