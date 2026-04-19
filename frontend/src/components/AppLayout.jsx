import Sidebar from './Sidebar';
import Topbar from './Topbar';

const defaultTabs = [
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function AppLayout({ children, tabs = defaultTabs, sidebarId = 'appSidebar' }) {
  return (
    <div className="grid md:grid-cols-[220px_1fr] min-h-screen bg-app text-fg">
      <Sidebar id={sidebarId} />
      <main className="min-w-0 flex flex-col">
        <Topbar tabs={tabs} />
        <section className="p-6 max-md:p-4 flex-1">
          {children}
        </section>
        <footer className="hairline-t h-7 px-4 flex items-center justify-between text-[10px] mono text-fg-subtle">
          <div className="flex items-center gap-3">
            <span>main</span>
            <span className="opacity-60">·</span>
            <span>UTF-8</span>
            <span className="opacity-60">·</span>
            <span>LF</span>
          </div>
          <div className="flex items-center gap-3">
            <span>ready</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
