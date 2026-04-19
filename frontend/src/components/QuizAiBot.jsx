import { useState, useRef, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

const greetingMessage = (count) => ({
  role: 'assistant',
  content:
    count > 1
      ? `Hi! I'm CoderV's AI tutor. Which question would you like a hint on? Reply with a number from 1 to ${count}.`
      : `Hi! I'm CoderV's AI tutor. Tap the question number below (1) and ask me anything about it.`,
});

function buildHelpHint(qIndex) {
  return `Give me a hint to help me think through question ${qIndex + 1} — but please don't tell me the answer.`;
}

export default function QuizAiBot({ quiz, exampleTitle, exampleConcept }) {
  const { user, getToken } = useAuth();

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState(() => [greetingMessage(quiz?.length ?? 0)]);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const questionCount = quiz?.length ?? 0;

  useEffect(() => {
    setMessages([greetingMessage(questionCount)]);
    setActiveIdx(null);
    setInput('');
    setError(null);
  }, [questionCount, exampleTitle]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending, open]);

  const activeQuestion = useMemo(
    () => (activeIdx != null ? quiz[activeIdx] : null),
    [activeIdx, quiz]
  );

  if (!quiz || quiz.length === 0) return null;

  function selectQuestion(idx) {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setError(null);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: `Question ${idx + 1}` },
      {
        role: 'assistant',
        content: `Got it — focusing on question ${idx + 1}. Ask me anything about it, or click "Give me a hint" below to start.`,
      },
    ]);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function resetChat() {
    setMessages([greetingMessage(questionCount)]);
    setActiveIdx(null);
    setInput('');
    setError(null);
  }

  async function send(rawText) {
    const text = (rawText ?? input).trim();
    if (!text || sending) return;

    if (activeIdx == null) {
      const num = parseInt(text, 10);
      if (!Number.isNaN(num) && num >= 1 && num <= questionCount) {
        setInput('');
        selectQuestion(num - 1);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: text },
        {
          role: 'assistant',
          content: `Please pick a question first by tapping a number above (1–${questionCount}) or typing it here.`,
        },
      ]);
      setInput('');
      return;
    }

    if (!user) {
      setError('Please sign in to use the AI bot.');
      return;
    }

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setSending(true);
    setError(null);

    try {
      const token = await getToken();
      const history = nextMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-10);

      const res = await fetch(`${BASE}/api/ai/quiz-hint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: activeQuestion.question,
          options: activeQuestion.options,
          answerIndex: activeQuestion.answer,
          userMessage: text,
          history,
          exampleTitle,
          exampleConcept,
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
          content:
            "I couldn't fetch a hint right now. Please try again in a moment.",
          isError: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="rounded-2xl border border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-slate-800 shadow-sm overflow-hidden text-gray-900 dark:text-slate-100">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border-b border-indigo-100 dark:border-indigo-900/40 text-left transition-colors hover:bg-indigo-100/60 dark:hover:bg-indigo-900/30"
        aria-expanded={open}
      >
        <span className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-lg shadow-sm shrink-0">
          🤖
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-extrabold text-indigo-900 dark:text-indigo-200 text-sm">
            Stuck? Ask the AI tutor
          </span>
          <span className="block text-xs text-indigo-700/80 dark:text-indigo-300/80 mt-0.5">
            Get hints for any question — no spoilers, just nudges in the right direction.
          </span>
        </span>
        <span className="text-indigo-700 dark:text-indigo-300 text-xs font-bold shrink-0">
          {open ? 'Hide ▲' : 'Open ▼'}
        </span>
      </button>

      {open && (
        <div className="p-5 grid gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
              Pick a question
            </p>
            <div className="flex flex-wrap gap-2">
              {quiz.map((_, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectQuestion(idx)}
                    className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-extrabold border transition-all ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
              {activeIdx != null && (
                <button
                  type="button"
                  onClick={resetChat}
                  className="ml-auto text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                >
                  ↻ Reset chat
                </button>
              )}
            </div>

            {activeQuestion && (
              <div className="mt-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 px-3 py-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Q{activeIdx + 1}
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-200 mt-0.5 leading-snug">
                  {activeQuestion.question}
                </p>
              </div>
            )}
          </div>

          <div
            ref={scrollRef}
            className="rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4 max-h-72 overflow-y-auto grid gap-3"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-sm shrink-0">
                    🤖
                  </span>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : msg.isError
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800/50 rounded-bl-md'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-gray-200 dark:border-slate-700 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-bold shrink-0">
                    👤
                  </span>
                )}
              </div>
            ))}

            {sending && (
              <div className="flex gap-2.5 justify-start">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-sm shrink-0">
                  🤖
                </span>
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm text-slate-500 dark:text-slate-400 italic">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          {activeIdx != null && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => send(buildHelpHint(activeIdx))}
                disabled={sending}
                className="text-xs font-bold rounded-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                💡 Give me a hint
              </button>
              <button
                type="button"
                onClick={() =>
                  send(
                    `Explain the concept behind question ${activeIdx + 1} in simple words, without telling me the answer.`
                  )
                }
                disabled={sending}
                className="text-xs font-bold rounded-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                📚 Explain the concept
              </button>
              <button
                type="button"
                onClick={() =>
                  send(
                    `Help me eliminate one of the wrong options for question ${activeIdx + 1} so I can narrow it down.`
                  )
                }
                disabled={sending}
                className="text-xs font-bold rounded-full px-3 py-1.5 border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ✂️ Eliminate an option
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                activeIdx == null
                  ? `Type a number 1–${questionCount} to pick a question…`
                  : 'Ask the bot for a hint…'
              }
              disabled={sending}
              className="flex-1 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>

          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
              {error}
            </p>
          )}

          <p className="text-[11px] text-slate-500 dark:text-slate-500 text-center">
            The AI tutor only gives hints — it will never reveal the correct answer.
          </p>
        </div>
      )}
    </section>
  );
}
