import AppLayout from '../components/AppLayout';

const quizzes = [
  {
    icon: '📊',
    title: 'Data Structures Quiz',
    desc: '25 questions covering arrays, lists, stacks, and queues',
    time: '30 min',
    difficulty: 'easy',
  },
  {
    icon: '🔄',
    title: 'Algorithms Challenge',
    desc: '20 questions on sorting, searching, and optimization',
    time: '45 min',
    difficulty: 'medium',
  },
  {
    icon: '🌐',
    title: 'Web Development Basics',
    desc: '30 questions on HTML, CSS, and JavaScript fundamentals',
    time: '40 min',
    difficulty: 'easy',
  },
  {
    icon: '⚡',
    title: 'Python Programming',
    desc: '35 questions covering Python syntax and features',
    time: '50 min',
    difficulty: 'medium',
  },
  {
    icon: '🗄️',
    title: 'Database Systems',
    desc: '20 questions on SQL, NoSQL, and database design',
    time: '35 min',
    difficulty: 'hard',
  },
  {
    icon: '🔐',
    title: 'Security Fundamentals',
    desc: '15 questions on cybersecurity and best practices',
    time: '25 min',
    difficulty: 'hard',
  },
];

const difficultyStyles = {
  easy: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-red-100 text-red-800',
};

const tabs = [
  { to: '/quiz', label: 'Practice Quiz' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function Quiz() {
  return (
    <AppLayout tabs={tabs} sidebarId="quizSidebar">
      {/* Hero */}
      <article className="bg-white border border-gray-200 rounded-2xl p-7 shadow-card grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center mb-2 text-gray-900">
        <div>
          <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold mb-2.5">
            Extra Practice Quizzes
          </h1>
          <p className="text-muted text-base leading-relaxed">
            Test your knowledge with additional practice questions and challenges.
          </p>
        </div>
        <div className="grid place-items-center lg:place-items-center max-lg:place-items-start">
          <div className="w-[170px] h-[170px] rounded-full gradient-quiz-badge grid place-items-center shadow-[0_12px_30px_rgba(99,102,241,0.25)]">
            <div className="bg-white w-[130px] h-[130px] rounded-full flex flex-col items-center justify-center">
              <span className="text-[2.5rem] font-extrabold text-primary leading-none">12</span>
              <span className="text-xs text-muted font-semibold text-center leading-snug">
                Quizzes<br />Available
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* Quiz grid */}
      <h2 className="mt-8 mb-4 text-xl font-bold">Available Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {quizzes.map((q) => (
          <article
            key={q.title}
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col gap-3 hover:-translate-y-1 hover:shadow-hover transition-all duration-200 text-gray-900"
          >
            <div className="text-[2.5rem] mb-2">{q.icon}</div>
            <h3 className="font-bold text-base">{q.title}</h3>
            <p className="text-muted text-sm leading-relaxed flex-1">{q.desc}</p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200 mt-2">
              <span className="text-xs text-muted font-semibold">⏱ {q.time}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${difficultyStyles[q.difficulty]}`}
              >
                {q.difficulty}
              </span>
            </div>
            <button className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform">
              Start Quiz
            </button>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
