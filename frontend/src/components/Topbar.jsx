import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Topbar({ tabs }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="hairline-b bg-app sticky top-0 z-30">
      <div className="flex items-center justify-between gap-3 px-4 h-12">
        <nav className="flex items-center gap-px">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `relative flex items-center h-12 px-3 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'text-fg after:absolute after:left-3 after:right-3 after:bottom-0 after:h-px after:bg-fg'
                    : 'text-fg-muted hover:text-fg'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="hairline rounded-md w-8 h-8 grid place-items-center text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={14} strokeWidth={1.75} /> : <Moon size={14} strokeWidth={1.75} />}
        </button>
      </div>
    </header>
  );
}
