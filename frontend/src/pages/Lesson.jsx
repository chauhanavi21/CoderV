import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

const sidebarLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/lesson', label: 'Learning' },
  { to: '/quiz', label: 'Extra Quiz' },
  { to: '/ai', label: 'Ask AI' },
];

export default function Lesson() {
  const [answer, setAnswer] = useState('');
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 840);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 840;
      setIsMobile(mobile);
      if (!mobile) setSidebarHidden(false);
      else setSidebarHidden(true);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    if (!isMobile) return;
    const handler = (e) => {
      if (
        sidebarRef.current && toggleRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target)
      ) {
        setSidebarHidden(true);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isMobile]);

  return (
    <div className="grid md:grid-cols-[230px_1fr] min-h-screen">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <strong className="text-sm font-bold">Lesson View</strong>
        <button
          ref={toggleRef}
          onClick={() => setSidebarHidden(!sidebarHidden)}
          className="border border-gray-200 bg-white rounded-lg px-3 py-2 font-bold text-sm cursor-pointer"
        >
          Menu
        </button>
      </div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          border-r border-gray-200 bg-white/80 backdrop-blur-sm p-4 sticky top-0 h-screen
          max-md:fixed max-md:z-[60] max-md:w-[260px] max-md:left-0 max-md:top-14 max-md:h-[calc(100vh-56px)]
          max-md:shadow-xl max-md:transition-transform max-md:duration-300
          ${isMobile && sidebarHidden ? 'max-md:-translate-x-full' : 'max-md:translate-x-0'}
        `}
      >
        <div className="flex items-center gap-2.5 bg-indigo-50 border border-indigo-100 p-3 rounded-xl mb-4">
          <div className="w-[38px] h-[38px] rounded-full gradient-avatar text-white grid place-items-center font-extrabold text-sm">
            TC
          </div>
          <div>
            <div className="font-bold text-sm">Team Name</div>
            <div className="text-xs text-muted">Learning panel</div>
          </div>
        </div>
        <nav className="grid gap-1.5">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => isMobile && setSidebarHidden(true)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  isActive ? 'bg-violet-100 text-indigo-800' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="p-5 max-md:p-4">
        {/* Lesson header */}
        <div className="border border-gray-200 rounded-xl bg-white px-4 py-3.5 flex items-center justify-between gap-3 flex-wrap">
          <span className="font-extrabold text-sm">Lesson name and number</span>
          <span className="px-2.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            Question / Puzzle Mode
          </span>
        </div>

        {/* Q&A section */}
        <div className="mt-4 grid gap-3.5">
          <article className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="mt-0 mb-2 font-bold">Learning / Question / Puzzle</h3>
            <p className="text-muted text-sm leading-relaxed">
              If a class has 40 students and 25 percent are absent, how many are present?
              Show the complete steps, not only final answer.
            </p>
          </article>

          <article className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="mt-0 mb-2 font-bold">Answer</h3>
            <textarea
              placeholder="Type your solution here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full min-h-[150px] resize-y border border-gray-200 rounded-xl px-3.5 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </article>
        </div>

        {/* Footer navigation */}
        <div className="mt-3 flex justify-between gap-2.5 flex-wrap">
          <button className="bg-indigo-50 text-primary rounded-xl px-4 py-3 text-sm font-semibold hover:bg-violet-100 hover:shadow-md transition-all cursor-pointer">
            Previous
          </button>
          <button className="gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer">
            Next
          </button>
        </div>
      </main>

      {/* Floating AI button */}
      <Link
        to="/ai"
        className="fixed right-5 bottom-5 w-[76px] h-[76px] rounded-full gradient-float-ai text-white font-extrabold text-xs grid place-items-center shadow-[0_12px_24px_rgba(249,115,22,0.3)] cursor-pointer hover:scale-105 transition-transform z-40"
      >
        Ask AI
      </Link>
    </div>
  );
}
