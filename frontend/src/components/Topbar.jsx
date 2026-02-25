import { NavLink, Link } from 'react-router-dom';

export default function Topbar({ tabs }) {
  return (
    <header className="border-b border-gray-200 bg-white/85 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-6 py-3.5 max-md:px-4 max-md:py-3">
        <nav className="flex gap-1.5 flex-wrap">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-500 hover:bg-slate-100'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/login" className="font-bold text-red-500 text-sm hover:text-red-600 transition-colors">
          Log out
        </Link>
      </div>
    </header>
  );
}
