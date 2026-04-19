import { useEffect, useMemo, useRef, useState } from 'react';
import AppLayout from '../components/AppLayout';
import AssistantMessage from '../components/AssistantMessage';
import { useAuth } from '../contexts/AuthContext';
import { useLessonsContext } from '../contexts/LessonsContext';
import { useProgress } from '../hooks/useProgress';

const BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

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

const initialMessage = {
  role: 'assistant',
  content:
    "Hi! I'm CoderV, your AI coding tutor. Ask me anything about programming, algorithms, data structures, web dev, debugging, or system design. I only help with code-related topics — let's level up.",
};

function buildProgressContext({ registry, modulesCache, getDifficultyProgress, getTotalProgress }) {
  const lessons = [];
  for (const lesson of registry || []) {
    if (!lesson.available) continue;
    const mod = modulesCache.current?.[lesson.id];
    if (!mod) continue;

    const difficulties = (mod.difficultyOrder || []).map((diffId) => {
      const dp = getDifficultyProgress(lesson.id, diffId);
      const label = mod.difficulties?.[diffId]?.label || diffId;
      return {
        id: diffId,
        label,
        completed: dp.completed,
        total: dp.total,
        percent: dp.percent,
      };
    });

    const totalCompleted = difficulties.reduce((a, d) => a + d.completed, 0);
    if (totalCompleted === 0 && difficulties.every((d) => d.total === 0)) continue;

    lessons.push({
      id: lesson.id,
      title: mod.title || lesson.title || lesson.id,
      difficulties,
    });
  }

  const total = getTotalProgress();
  return {
    totalCompleted: total.completed,
    totalAvailable: total.total,
    totalPercent: total.percent,
    lessons,
  };
}

function buildRoutes({ registry, modulesCache }) {
  const routes = [
    { path: '/lessons', label: 'Browse all lesson modules' },
    { path: '/quiz', label: 'Extra practice quizzes' },
    { path: '/playground', label: 'Open the Python playground' },
    { path: '/dashboard', label: 'Student dashboard' },
  ];

  for (const lesson of registry || []) {
    if (!lesson.available) continue;
    const mod = modulesCache.current?.[lesson.id];
    const title = mod?.title || lesson.title || lesson.id;
    routes.push({
      path: `/lessons/${lesson.id}`,
      label: `${title} — overview`,
    });
    if (mod?.difficultyOrder) {
      for (const diffId of mod.difficultyOrder) {
        const diffLabel = mod.difficulties?.[diffId]?.label || diffId;
        routes.push({
          path: `/lessons/${lesson.id}/${diffId}`,
          label: `${title} — ${diffLabel} examples`,
        });
      }
    }
  }
  return routes;
}

export default function AiAssistant() {
  const { user, getToken } = useAuth();
  const { registry, modulesCache, registryLoading } = useLessonsContext();
  const { getDifficultyProgress, getTotalProgress, progressLoading } = useProgress();

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const progress = useMemo(() => {
    if (registryLoading || progressLoading) return null;
    return buildProgressContext({
      registry,
      modulesCache,
      getDifficultyProgress,
      getTotalProgress,
    });
  }, [registry, modulesCache, registryLoading, progressLoading, getDifficultyProgress, getTotalProgress]);

  const routes = useMemo(() => {
    if (registryLoading) return [];
    return buildRoutes({ registry, modulesCache });
  }, [registry, modulesCache, registryLoading]);

  async function send(rawText) {
    const text = (rawText ?? input).trim();
    if (!text || sending) return;

    if (!user) {
      setError('Please sign in to chat with the AI tutor.');
      return;
    }

    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setSending(true);
    setError(null);

    try {
      const token = await getToken();
      const res = await fetch(`${BASE}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: next,
          progress,
          routes,
          displayName: user.displayName || null,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I couldn't reach the AI right now. Please try again in a moment.",
          isError: true,
        },
      ]);
    } finally {
      setSending(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function clearChat() {
    setMessages([initialMessage]);
    setError(null);
  }

  const completedCount = progress?.totalCompleted ?? 0;
  const totalCount = progress?.totalAvailable ?? 0;

  return (
    <AppLayout tabs={tabs} sidebarId="aiSidebar">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-5 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border border-gray-200 dark:border-slate-700 rounded-2xl p-7 mb-6 max-md:flex-col max-md:text-center">
          <div className="text-[3.5rem] gradient-quiz-badge w-20 h-20 rounded-full grid place-items-center shadow-[0_8px_20px_rgba(99,102,241,0.2)] shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold mb-2 dark:text-slate-100">AI Learning Assistant</h1>
            <p className="text-muted dark:text-slate-400 text-sm">
              Get instant help with coding, algorithms, debugging, and concepts.
              <span className="hidden sm:inline"> I only answer programming questions.</span>
            </p>
            {totalCount > 0 && (
              <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mt-2">
                I can see your progress: {completedCount} / {totalCount} examples completed
                {progress?.totalPercent != null && ` · ${progress.totalPercent}%`}
              </p>
            )}
          </div>
        </div>

        {/* Chat container */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-card mb-6 text-gray-900 dark:text-slate-100">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Conversation
            </p>
            <button
              type="button"
              onClick={clearChat}
              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
              disabled={sending}
            >
              ↻ Clear chat
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="min-h-[400px] max-h-[520px] overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900/40 grid gap-4"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="text-xl w-9 h-9 rounded-full grid place-items-center shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md text-sm leading-relaxed whitespace-pre-wrap'
                      : msg.isError
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800/50 rounded-bl-md text-sm leading-relaxed whitespace-pre-wrap'
                      : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' && !msg.isError ? (
                    <AssistantMessage content={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="text-lg w-9 h-9 rounded-full grid place-items-center shrink-0 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold">
                    👤
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <div className="flex gap-3 justify-start">
                <div className="text-xl w-9 h-9 rounded-full grid place-items-center shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
                  🤖
                </div>
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl rounded-bl-md px-4 py-3 text-sm italic text-slate-500 dark:text-slate-400">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="p-5 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex gap-3 max-md:flex-col"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask a coding question... (Shift+Enter for newline)"
              rows={2}
              disabled={sending}
              className="flex-1 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 font-sans disabled:opacity-50 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="self-end max-md:w-full gradient-primary text-white rounded-xl px-5 py-3 text-sm font-bold shadow-btn cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform whitespace-nowrap disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {sending ? 'Sending…' : 'Send Question'}
            </button>
          </form>

          {error && (
            <div className="px-5 py-2 text-xs text-red-600 dark:text-red-400 font-semibold border-t border-red-100 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20">
              {error}
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-card text-gray-900 dark:text-slate-100">
          <h3 className="font-bold text-sm mb-4">Quick Questions</h3>
          <div className="flex flex-wrap gap-2.5 max-md:justify-center">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={sending}
                className="px-4 py-2.5 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-primary hover:text-primary dark:hover:text-indigo-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {q}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-500">
            CoderV's AI tutor only answers programming-related questions and tailors hints based on the lessons you've completed.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
