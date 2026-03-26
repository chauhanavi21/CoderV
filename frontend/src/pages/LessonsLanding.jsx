import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { lessonsRegistry } from '../data/lessonModules';
import { useProgress } from '../hooks/useProgress';

const tabs = [
  { to: '/lessons', label: 'All Lessons' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function LessonsLanding() {
  const { getLessonProgress, getTotalProgress } = useProgress();
  const total = getTotalProgress();

  return (
    <AppLayout tabs={tabs} sidebarId="lessonsSidebar">
      {/* Hero */}
      <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-7 shadow-card grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center">
        <div>
          <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold mb-2.5 dark:text-slate-100">
            Your Learning Path
          </h1>
          <p className="text-muted dark:text-slate-400 text-base leading-relaxed">
            Work through each lesson at your own pace. Every lesson type covers a
            different learning experience and builds on the last.
          </p>
        </div>
        <div className="grid place-items-center lg:place-items-center max-lg:place-items-start">
          <div
            className="w-[170px] aspect-square rounded-full grid place-items-center relative shadow-[0_8px_20px_rgba(99,102,241,0.15)]"
            style={{
              background: `conic-gradient(#6366f1 ${total.percent * 3.6}deg, #e2e8f0 0deg)`,
            }}
          >
            <div className="absolute w-[128px] h-[128px] rounded-full bg-white dark:bg-slate-800" />
            <span className="relative z-10 text-center font-extrabold text-indigo-900 dark:text-indigo-200 text-sm leading-snug">
              Total<br />Progress<br />{total.completed} / {total.total}
            </span>
          </div>
        </div>
      </article>

      {/* Lesson cards */}
      <h2 className="mt-8 mb-4 text-xl font-bold dark:text-slate-100">All Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {lessonsRegistry.map((lesson) => {
          const progress = getLessonProgress(lesson.id);
          return (
            <article
              key={lesson.id}
              className={`border rounded-2xl p-6 bg-white dark:bg-slate-800 flex flex-col gap-4 transition-all duration-200 ${
                lesson.available
                  ? 'border-gray-200 dark:border-slate-700 shadow-sm hover:-translate-y-1 hover:shadow-hover'
                  : 'border-gray-100 dark:border-slate-800 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`w-11 h-11 rounded-xl grid place-items-center font-extrabold text-white ${lesson.color}`}
                >
                  {lesson.number}
                </span>
                {lesson.available ? (
                  <span className="text-xs font-bold text-muted dark:text-slate-400">
                    {progress.completed} / {progress.total} complete
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 dark:bg-slate-700 px-3 py-1 text-xs font-bold text-gray-400 dark:text-slate-500">
                    Locked
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg dark:text-slate-100">{lesson.title}</h3>
                <p className="mt-1.5 text-sm text-muted dark:text-slate-400 leading-relaxed">
                  {lesson.description}
                </p>
              </div>

              {lesson.available ? (
                <>
                  <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="w-full text-center bg-indigo-50 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:shadow-md transition-all"
                  >
                    {progress.completed > 0 ? 'Continue' : 'Start'} Lesson{' '}
                    {lesson.number}
                  </Link>
                </>
              ) : (
                <div className="w-full text-center bg-gray-50 dark:bg-slate-700/50 text-gray-400 dark:text-slate-500 rounded-xl px-4 py-3 text-sm font-semibold">
                  Coming Soon
                </div>
              )}
            </article>
          );
        })}
      </div>
    </AppLayout>
  );
}
