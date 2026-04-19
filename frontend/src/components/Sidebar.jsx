import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  TerminalSquare,
  ListChecks,
  Sparkles,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWebLabUiCustomizeOptional } from '../contexts/WebLabUiCustomizeContext';

const sidebarLinks = [
  { to: '/dashboard',  label: 'Home',       icon: Home },
  { to: '/lessons',    label: 'Learning',   icon: GraduationCap },
  { to: '/playground', label: 'Playground', icon: TerminalSquare },
  { to: '/quiz',       label: 'Extra Quiz', icon: ListChecks },
  { to: '/ai',         label: 'Ask AI',     icon: Sparkles },
];

export default function Sidebar({ id }) {
  const [hidden,   setHidden]   = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 840);
  const { user, signOut } = useAuth();
  const uiCustomize = useWebLabUiCustomizeOptional();

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
      const btn     = document.getElementById(`${id}-toggle`);
      if (sidebar && btn && !sidebar.contains(e.target) && !btn.contains(e.target)) {
        setHidden(true);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isMobile, id]);

  const displayName = user?.displayName?.trim()
    || user?.email?.split('@')[0]
    || 'User';

  const initials = user?.displayName
    ? user.displayName.trim().split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : (user?.email?.[0]?.toUpperCase() ?? 'U');

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 h-12 bg-app hairline-b">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-zinc-900 dark:bg-zinc-100 grid place-items-center text-[10px] font-bold text-zinc-100 dark:text-zinc-900 mono">C</div>
          <span className="text-sm font-semibold tracking-tightish text-fg">CoderV</span>
        </div>
        <button
          id={`${id}-toggle`}
          onClick={() => setHidden(!hidden)}
          className="hairline rounded-md w-8 h-8 grid place-items-center text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          aria-label="Toggle menu"
        >
          {hidden ? <Menu size={16} /> : <X size={16} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        id={id}
        data-coderv-sidebar-shell=""
        className={`
          hairline-r bg-app flex flex-col sticky top-0 h-screen
          max-md:fixed max-md:z-[60] max-md:w-[240px] max-md:left-0 max-md:top-12 max-md:h-[calc(100vh-48px)]
          max-md:bg-elevated max-md:transition-transform max-md:duration-200
          ${isMobile && hidden ? 'max-md:-translate-x-full' : 'max-md:translate-x-0'}
        `}
      >
        {/* Brand row (desktop only) */}
        <div className="hidden md:flex items-center gap-2 h-12 px-4 hairline-b">
          <div className="w-5 h-5 rounded-sm bg-zinc-900 dark:bg-zinc-100 grid place-items-center text-[10px] font-bold text-zinc-100 dark:text-zinc-900 mono">C</div>
          <span className="text-[13px] font-semibold tracking-tightish text-fg">CoderV</span>
          <span className="ml-auto text-[10px] mono text-fg-subtle">v1</span>
        </div>

        {/* Section label */}
        <div className="px-4 pt-4 pb-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono">Workspace</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-px px-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const label =
              link.to === '/lessons' && uiCustomize?.learningNavLabel != null && uiCustomize.learningNavLabel !== ''
                ? uiCustomize.learningNavLabel
                : link.label;
            return (
            <NavLink
              key={link.to}
              to={link.to}
              {...(link.to === '/lessons' ? { 'data-coderv-sidebar-learning': '' } : {})}
              onClick={() => isMobile && setHidden(true)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 h-8 px-2 rounded-md text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-900 text-fg'
                    : 'text-fg-muted hover:text-fg hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60'
                }`
              }
            >
              <Icon size={14} strokeWidth={1.75} />
              <span>{label}</span>
            </NavLink>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* User chip */}
        <div className="px-2 pb-1">
          <div className="flex items-center gap-2.5 hairline rounded-md p-2">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={displayName}
                className="w-7 h-7 rounded-md object-cover shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-md bg-zinc-200 dark:bg-zinc-800 text-fg grid place-items-center font-semibold text-[11px] shrink-0 mono">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-medium text-fg truncate leading-tight">{displayName}</div>
              <div className="text-[10px] text-fg-subtle leading-tight mt-0.5">Student</div>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <div className="px-2 pb-3 pt-1">
          <button
            type="button"
            data-coderv-sidebar-signout=""
            onClick={() => signOut()}
            className="w-full flex items-center gap-2.5 h-8 px-2 rounded-md text-[13px] font-medium text-fg-muted hover:text-red-500 hover:bg-red-500/5 transition-colors"
          >
            <LogOut size={14} strokeWidth={1.75} />
            <span>
              {uiCustomize?.signOutLabel != null && uiCustomize.signOutLabel !== ''
                ? uiCustomize.signOutLabel
                : 'Sign out'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
