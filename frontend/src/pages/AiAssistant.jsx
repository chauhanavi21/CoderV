import { useState } from 'react';
import AppLayout from '../components/AppLayout';

const quickQuestions = [
  'What is Big O notation?',
  'How do arrays work?',
  'Explain object-oriented programming',
  'What are REST APIs?',
  'Difference between var, let, and const',
  'How to debug code effectively?',
];

const tabs = [
  { to: '/ai', label: 'AI Assistant' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hello! I'm your AI learning assistant. Ask me anything about programming, algorithms, or any coding concept you're learning.",
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    // Backend integration later
  };

  const handleChip = (text) => {
    setMessages([...messages, { role: 'user', text }]);
    // Backend integration later
  };

  return (
    <AppLayout tabs={tabs} sidebarId="aiSidebar">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-gray-200 rounded-2xl p-7 mb-6 max-md:flex-col max-md:text-center">
          <div className="text-[3.5rem] gradient-quiz-badge w-20 h-20 rounded-full grid place-items-center shadow-[0_8px_20px_rgba(99,102,241,0.2)] shrink-0">
            🤖
          </div>
          <div>
            <h1 className="text-2xl font-extrabold mb-2">AI Learning Assistant</h1>
            <p className="text-muted text-sm">
              Get instant help with coding questions, explanations, and debugging
            </p>
          </div>
        </div>

        {/* Chat container */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-card mb-6 text-gray-900">
          {/* Messages */}
          <div className="min-h-[400px] max-h-[500px] overflow-y-auto p-6 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex gap-3 mb-5 animate-slide-in">
                <div
                  className={`text-2xl w-10 h-10 rounded-full grid place-items-center shrink-0 ${
                    msg.role === 'ai' ? 'gradient-quiz-badge' : 'bg-indigo-100'
                  }`}
                >
                  {msg.role === 'ai' ? '🤖' : '👤'}
                </div>
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 max-w-[85%] shadow-sm text-gray-900">
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-5 bg-white border-t border-gray-200 flex gap-3 max-md:flex-col">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
              placeholder="Ask a question... (e.g., 'Explain recursion in simple terms')"
              rows={3}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 font-sans"
            />
            <button
              onClick={sendMessage}
              className="self-end max-md:w-full gradient-primary text-white rounded-xl px-4 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform whitespace-nowrap"
            >
              Send Question
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card text-gray-900">
          <h3 className="font-bold text-sm mb-4">Quick Questions</h3>
          <div className="flex flex-wrap gap-2.5 max-md:justify-center">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleChip(q)}
                className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-50 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
