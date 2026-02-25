import Sidebar from './Sidebar';
import Topbar from './Topbar';

const defaultTabs = [
  { to: '/dashboard', label: 'How to use' },
  { to: '/resources', label: 'Extra resources' },
  { to: '/about', label: 'About' },
];

export default function AppLayout({ children, tabs = defaultTabs, sidebarId = 'appSidebar' }) {
  return (
    <div className="grid md:grid-cols-[250px_1fr] min-h-screen">
      <Sidebar id={sidebarId} />
      <main className="min-w-0">
        <Topbar tabs={tabs} />
        <section className="p-6 max-md:p-4">
          {children}
        </section>
      </main>
    </div>
  );
}
