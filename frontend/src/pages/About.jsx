import AppLayout from '../components/AppLayout';

const features = [
  { icon: '📚', title: 'Structured Learning', desc: 'Step-by-step lessons designed to build your skills progressively' },
  { icon: '🎯', title: 'Practice Quizzes', desc: 'Test your knowledge with comprehensive quizzes and challenges' },
  { icon: '🤖', title: 'AI Assistant', desc: 'Get instant help and explanations from our AI learning assistant' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed progress insights' },
  { icon: '🎓', title: 'Expert Content', desc: 'Learn from carefully curated, industry-standard materials' },
  { icon: '💡', title: 'Interactive Learning', desc: 'Hands-on practice with real coding challenges and projects' },
];

const stats = [
  { number: '50+', label: 'Lessons' },
  { number: '200+', label: 'Practice Questions' },
  { number: '24/7', label: 'AI Support' },
  { number: '100%', label: 'Free Access' },
];

const tabs = [
  { to: '/dashboard', label: 'How to use' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function About() {
  return (
    <AppLayout tabs={tabs} sidebarId="aboutSidebar">
      {/* Hero */}
      <div className="text-center pt-12 pb-10 max-md:pt-6 max-md:pb-6">
        <div className="mb-6">
          <div className="w-[90px] h-[90px] rounded-3xl gradient-primary inline-grid place-items-center font-black text-5xl text-white shadow-[0_12px_30px_rgba(99,102,241,0.3)]">
            C
          </div>
        </div>
        <h1 className="text-5xl max-md:text-3xl font-black mb-3 gradient-about-text">CoderV</h1>
        <p className="text-xl max-md:text-base text-muted font-medium">
          Learn smarter, code better, succeed faster
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-[900px] mx-auto mb-12">
        <h2 className="text-2xl font-extrabold mb-4">Our Mission</h2>
        <p className="text-base leading-[1.8]">
          CoderV is an innovative learning platform designed to help students master programming
          through structured lessons, interactive quizzes, and AI-powered assistance. We believe
          that learning to code should be accessible, engaging, and effective for everyone.
        </p>
      </div>

      {/* What We Offer */}
      <div className="max-w-[900px] mx-auto mb-12">
        <h2 className="text-2xl font-extrabold mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-hover transition-all duration-200"
            >
              <div className="text-[2.5rem] mb-3">{f.icon}</div>
              <h3 className="font-bold text-base mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision */}
      <div className="max-w-[900px] mx-auto mb-12">
        <h2 className="text-2xl font-extrabold mb-4">Our Vision</h2>
        <p className="text-base leading-[1.8]">
          We envision a world where quality programming education is accessible to everyone,
          regardless of their background. CoderV combines modern technology with proven teaching
          methods to create an optimal learning environment that adapts to each student's needs.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-[900px] mx-auto mb-12">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-gray-200 rounded-xl py-8 px-5 text-center"
          >
            <div className="text-[2.5rem] font-black text-primary leading-none mb-2">{s.number}</div>
            <div className="text-sm text-muted font-semibold">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="max-w-[900px] mx-auto mb-12 text-center bg-gradient-to-br from-sky-50 to-amber-50 border border-gray-200 rounded-2xl p-10">
        <h2 className="text-2xl font-extrabold mb-4">Get in Touch</h2>
        <p className="text-base leading-[1.8] mb-6">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <div className="text-base leading-[2] font-medium">
          <p>📧 Email: support@coderv.com</p>
          <p>🌐 Website: www.coderv.com</p>
          <p>💬 Discord: CoderV Community</p>
        </div>
      </div>
    </AppLayout>
  );
}
