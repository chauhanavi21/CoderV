import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const upcomingLessons = [
  { title: 'Lesson 3: Ratios', desc: 'Core concept + 5 practice questions.' },
  { title: 'Lesson 4: Percentages', desc: 'Quick walkthrough with mini puzzle.' },
  { title: 'Lesson 5: Data basics', desc: 'Interpret graphs and avoid common mistakes.' },
];

export default function Dashboard() {
  return (
    <AppLayout sidebarId="dashboardSidebar">
      {/* Hero card */}
      <article className="bg-white border border-gray-200 rounded-2xl p-7 shadow-card grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center mb-2">
        <div>
          <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold mb-2.5">
            Welcome, First Name
          </h1>
          <p className="text-muted text-base leading-relaxed">
            Start here. Complete your next lesson and keep the momentum.
          </p>
        </div>
        <div className="grid place-items-center lg:place-items-center max-lg:place-items-start">
          <div className="w-[170px] aspect-square rounded-full progress-conic grid place-items-center relative shadow-[0_8px_20px_rgba(16,185,129,0.15)]">
            <div className="absolute w-[128px] h-[128px] rounded-full bg-white" />
            <span className="relative z-10 text-center font-extrabold text-emerald-900 text-sm leading-snug">
              Current<br />Progress<br />2 / 6
            </span>
          </div>
        </div>
      </article>

      {/* Upcoming lessons */}
      <h2 className="mt-8 mb-4 text-xl font-bold">Upcoming lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {upcomingLessons.map((lesson) => (
          <article
            key={lesson.title}
            className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm flex flex-col gap-3 hover:-translate-y-1 hover:shadow-hover transition-all duration-200"
          >
            <h3 className="font-bold text-base">{lesson.title}</h3>
            <p className="text-muted text-sm leading-relaxed flex-1">{lesson.desc}</p>
            <Link
              to="/lesson"
              className="w-full text-center bg-indigo-50 text-primary rounded-xl px-4 py-3 text-sm font-semibold hover:bg-violet-100 hover:shadow-md transition-all"
            >
              Open lesson
            </Link>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
