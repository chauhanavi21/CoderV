import { useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, RotateCcw, Send, User, Loader2 } from 'lucide-react';
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
    "I'm CoderV, your AI coding tutor. Ask me anything about programming, algorithms, data structures, web dev, debugging, or system design.",
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
      <div className="max-w-[860px] mx-auto">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">Assistant</p>
            <h1 className="mt-1 text-[22px] font-semibold tracking-tightish text-fg flex items-center gap-2">
              <Sparkles size={18} strokeWidth={1.75} className="text-fg-muted" />
              AI Tutor
            </h1>
            <p className="mt-1 text-[13px] text-fg-muted">
              Get instant help with coding, algorithms, debugging, and concepts.
            </p>
          </div>
          {totalCount > 0 && (
            <div className="hairline rounded-md px-3 py-2">
              <p className="text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle">Context</p>
              <p className="text-[12px] mono text-fg mt-0.5">
                {completedCount}/{totalCount} examples
                {progress?.totalPercent != null && <span className="text-fg-subtle"> · {progress.totalPercent}%</span>}
              </p>
            </div>
          )}
        </div>

        {/* Chat container */}
        <div className="hairline rounded-md bg-elevated overflow-hidden mb-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 h-10 hairline-b">
            <p className="text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle">
              conversation
            </p>
            <button
              type="button"
              onClick={clearChat}
              className="inline-flex items-center gap-1.5 text-[11px] mono font-medium text-fg-subtle hover:text-fg transition-colors"
              disabled={sending}
            >
              <RotateCcw size={11} strokeWidth={2} /> clear
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="min-h-[400px] max-h-[520px] overflow-y-auto p-4 bg-app grid gap-3"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="hairline w-7 h-7 rounded-md grid place-items-center shrink-0 bg-elevated text-fg">
                    <Sparkles size={13} strokeWidth={1.75} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-md text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 whitespace-pre-wrap'
                      : msg.isError
                      ? 'hairline border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-300 whitespace-pre-wrap'
                      : 'hairline bg-elevated text-fg'
                  }`}
                >
                  {msg.role === 'assistant' && !msg.isError ? (
                    <AssistantMessage content={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-md grid place-items-center shrink-0 bg-zinc-100 dark:bg-zinc-900 text-fg-muted">
                    <User size={13} strokeWidth={1.75} />
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <div className="flex gap-2.5 justify-start">
                <div className="hairline w-7 h-7 rounded-md grid place-items-center shrink-0 bg-elevated text-fg">
                  <Sparkles size={13} strokeWidth={1.75} />
                </div>
                <div className="hairline bg-elevated rounded-md px-3.5 py-2.5 text-[13px] text-fg-subtle italic inline-flex items-center gap-2">
                  <Loader2 size={12} className="animate-spin" /> Thinking
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
            className="p-3 hairline-t flex gap-2 max-md:flex-col"
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
              placeholder="Ask a coding question…  (Shift+Enter for newline)"
              rows={2}
              disabled={sending}
              className="flex-1 hairline bg-app rounded-md px-3 py-2 text-[13px] resize-none outline-none transition focus:border-app-strong font-sans disabled:opacity-50 text-fg placeholder:text-fg-subtle"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="self-end max-md:w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3 h-9 text-[12px] font-medium disabled:opacity-40 hover:opacity-90 transition"
            >
              <Send size={12} strokeWidth={2} />
              {sending ? 'Sending' : 'Send'}
            </button>
          </form>

          {error && (
            <div className="px-4 py-2 text-[11px] mono text-red-500 hairline-t bg-red-500/5">
              {error}
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="hairline rounded-md bg-elevated p-4">
          <p className="text-[10px] font-medium mono uppercase tracking-wider text-fg-subtle mb-3">Quick questions</p>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={sending}
                className="hairline rounded-md px-2.5 h-7 text-[12px] text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[10px] mono text-fg-subtle">
            CoderV's AI tutor only answers programming-related questions and tailors hints based on the lessons you've completed.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
