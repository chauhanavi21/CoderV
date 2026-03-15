import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const sidebarLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/lessons', label: 'Learning' },
  { to: '/quiz', label: 'Extra Quiz' },
  { to: '/ai', label: 'Ask AI' },
];

export default function Sidebar({ id }) {
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 840);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 840;
      setIsMobile(mobile);
      if (!mobile) setHidden(false);
      else setHidden(true);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const handler = (e) => {
      const sidebar = document.getElementById(id);
      const btn = document.getElementById(`${id}-toggle`);
      if (sidebar && btn && !sidebar.contains(e.target) && !btn.contains(e.target)) {
        setHidden(true);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isMobile, id]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <strong className="text-sm font-bold">CoderV</strong>
        <button
          id={`${id}-toggle`}
          onClick={() => setHidden(!hidden)}
          className="border border-gray-200 bg-white rounded-lg px-3 py-2 font-bold text-sm cursor-pointer"
        >
          Menu
        </button>
      </div>

      {/* Sidebar */}
      <aside
        id={id}
        className={`
          border-r border-gray-200 bg-white/80 backdrop-blur-sm p-4 sticky top-0 h-screen
          max-md:fixed max-md:z-[60] max-md:w-[260px] max-md:left-0 max-md:top-14 max-md:h-[calc(100vh-56px)]
          max-md:shadow-xl max-md:transition-transform max-md:duration-300
          ${isMobile && hidden ? 'max-md:-translate-x-full' : 'max-md:translate-x-0'}
        `}
      >
        {/* User chip */}
        <div className="flex items-center gap-2.5 bg-indigo-50 border border-indigo-100 p-3 rounded-xl mb-4">
          <div className="w-[38px] h-[38px] rounded-full gradient-avatar text-white grid place-items-center font-extrabold text-sm">
            TC
          </div>
          <div>
            <div className="font-bold text-sm">Team Name</div>
            <div className="text-xs text-muted">Student account</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="grid gap-1.5">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => isMobile && setHidden(true)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  isActive
                    ? 'bg-violet-100 text-indigo-800'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
