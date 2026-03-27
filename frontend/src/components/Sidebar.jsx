import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/react';

const sidebarLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/lessons', label: 'Learning' },
  { to: '/playground', label: 'Playground' },
  { to: '/quiz', label: 'Extra Quiz' },
  { to: '/ai', label: 'Ask AI' },
];

export default function Sidebar({ id }) {
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 840);
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

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

  const initials = isLoaded && user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'U'
    : '?';

  const displayName = isLoaded && user
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User'
    : 'Loading...';

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <strong className="text-sm font-bold dark:text-slate-100">CoderV</strong>
        <button
          id={`${id}-toggle`}
          onClick={() => setHidden(!hidden)}
          className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 rounded-lg px-3 py-2 font-bold text-sm cursor-pointer"
        >
          Menu
        </button>
      </div>

      {/* Sidebar */}
      <aside
        id={id}
        className={`
          border-r border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/90 backdrop-blur-sm p-4
          flex flex-col sticky top-0 h-screen
          max-md:fixed max-md:z-[60] max-md:w-[260px] max-md:left-0 max-md:top-14 max-md:h-[calc(100vh-56px)]
          max-md:shadow-xl max-md:transition-transform max-md:duration-300
          ${isMobile && hidden ? 'max-md:-translate-x-full' : 'max-md:translate-x-0'}
        `}
      >
        {/* User chip */}
        <div className="flex items-center gap-2.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 p-3 rounded-xl mb-4">
          {isLoaded && user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName}
              className="w-[38px] h-[38px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[38px] h-[38px] rounded-full gradient-avatar text-white grid place-items-center font-extrabold text-sm shrink-0">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <div className="font-bold text-sm dark:text-slate-100 truncate">{displayName}</div>
            <div className="text-xs text-muted dark:text-slate-400">Student account</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 py-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => isMobile && setHidden(true)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  isActive
                    ? 'bg-violet-100 dark:bg-violet-900/40 text-indigo-800 dark:text-violet-200'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* spacer pushes sign-out to bottom */}
        <div className="flex-1" />

        {/* Sign out at bottom */}
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: '/login' })}
          className="mt-4 w-full text-left px-3 py-2.5 rounded-lg font-semibold text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </aside>
    </>
  );
}
