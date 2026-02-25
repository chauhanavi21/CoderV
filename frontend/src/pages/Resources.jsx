import AppLayout from '../components/AppLayout';

const guides = [
  { icon: '📖', title: 'Programming Basics', desc: 'Comprehensive guide covering fundamental programming concepts' },
  { icon: '💻', title: 'Code Style Guide', desc: 'Best practices for writing clean, maintainable code' },
  { icon: '🎯', title: 'Problem Solving Tips', desc: 'Strategies and techniques for tackling coding challenges' },
];

const videos = [
  { title: 'Data Structures Explained', desc: 'Visual guide to common data structures', duration: '42 min' },
  { title: 'Algorithm Fundamentals', desc: 'Step-by-step algorithm explanations', duration: '38 min' },
  { title: 'Debugging Techniques', desc: 'Master the art of finding and fixing bugs', duration: '25 min' },
];

const externalLinks = [
  { icon: '🌐', title: 'MDN Web Docs', desc: 'Comprehensive web development documentation' },
  { icon: '📚', title: 'Stack Overflow', desc: 'Community-driven Q&A for programmers' },
  { icon: '💡', title: 'GitHub Learning Lab', desc: 'Interactive courses on Git and GitHub' },
  { icon: '🎓', title: 'FreeCodeCamp', desc: 'Free coding bootcamp with certificates' },
];

const tabs = [
  { to: '/dashboard', label: 'How to use' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function Resources() {
  return (
    <AppLayout tabs={tabs} sidebarId="resourcesSidebar">
      {/* Hero */}
      <div className="text-center py-10 max-md:py-6 mb-5">
        <h1 className="text-[2.5rem] max-md:text-2xl font-extrabold mb-3">Learning Resources</h1>
        <p className="text-muted text-lg max-md:text-base">
          Curated materials to supplement your learning journey
        </p>
      </div>

      {/* Documentation & Guides */}
      <h2 className="mt-8 mb-4 text-xl font-bold">📚 Documentation &amp; Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {guides.map((g) => (
          <article
            key={g.title}
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col gap-3 hover:-translate-y-1 hover:shadow-hover transition-all duration-200"
          >
            <div className="text-[2.5rem] mb-2">{g.icon}</div>
            <h3 className="font-bold text-base">{g.title}</h3>
            <p className="text-muted text-sm leading-relaxed flex-1">{g.desc}</p>
            <button className="w-full bg-indigo-50 text-primary rounded-xl px-4 py-3 text-sm font-semibold hover:bg-violet-100 hover:shadow-md transition-all cursor-pointer">
              View Guide
            </button>
          </article>
        ))}
      </div>

      {/* Video Tutorials */}
      <h2 className="mt-8 mb-4 text-xl font-bold">🎥 Video Tutorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {videos.map((v) => (
          <article
            key={v.title}
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col gap-3 hover:-translate-y-1 hover:shadow-hover transition-all duration-200 relative"
          >
            <div className="w-full h-40 gradient-quiz-badge rounded-lg grid place-items-center text-5xl text-white mb-3">
              ▶️
            </div>
            <span className="absolute top-10 right-10 bg-black/75 text-white px-2.5 py-1 rounded-md text-xs font-semibold">
              {v.duration}
            </span>
            <h3 className="font-bold text-base">{v.title}</h3>
            <p className="text-muted text-sm leading-relaxed flex-1">{v.desc}</p>
            <button className="w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform">
              Watch Now
            </button>
          </article>
        ))}
      </div>

      {/* External Resources */}
      <h2 className="mt-8 mb-4 text-xl font-bold">🔗 External Resources</h2>
      <div className="grid gap-3.5 mb-10">
        {externalLinks.map((link) => (
          <a
            key={link.title}
            href="#"
            className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl transition-all hover:border-primary hover:shadow-[0_8px_20px_rgba(99,102,241,0.12)] hover:translate-x-1 group"
          >
            <div className="text-[2rem] w-[50px] h-[50px] bg-gray-100 rounded-lg grid place-items-center shrink-0">
              {link.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-1">{link.title}</h4>
              <p className="text-muted text-sm">{link.desc}</p>
            </div>
            <span className="text-2xl text-primary font-bold ml-auto group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        ))}
      </div>
    </AppLayout>
  );
}
