import { useState, useRef, useEffect, useMemo } from 'react';
import { Sparkles, User, RotateCcw, Lightbulb, BookOpen, Scissors, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

const greetingMessage = (count) => ({
  role: 'assistant',
  content:
    count > 1
      ? `Which question would you like a hint on? Reply with a number from 1 to ${count}.`
      : `Tap the question number below (1) and ask me anything about it.`,
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
    <section className="hairline rounded-md bg-elevated overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 h-12 hairline-b text-left transition-colors hover:bg-zinc-100/40 dark:hover:bg-zinc-900/40"
        aria-expanded={open}
      >
        <span className="hairline grid place-items-center w-7 h-7 rounded-md bg-app text-fg shrink-0">
          <Sparkles size={13} strokeWidth={1.75} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[13px] font-medium text-fg">Stuck? Ask the AI tutor</span>
          <span className="block text-[11px] text-fg-subtle mt-0.5">
            Hints only — no spoilers.
          </span>
        </span>
        <span className="text-fg-muted">
          {open ? <ChevronUp size={14} strokeWidth={2} /> : <ChevronDown size={14} strokeWidth={2} />}
        </span>
      </button>

      {open && (
        <div className="p-4 grid gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider mono text-fg-subtle mb-2">
              Pick a question
            </p>
            <div className="flex flex-wrap gap-1.5 items-center">
              {quiz.map((_, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectQuestion(idx)}
                    className={`min-w-[28px] h-7 px-2 rounded-md text-[12px] font-medium mono transition ${
                      isActive
                        ? 'bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950'
                        : 'hairline text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900'
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
                  className="ml-auto inline-flex items-center gap-1.5 text-[11px] mono font-medium text-fg-subtle hover:text-fg transition-colors"
                >
                  <RotateCcw size={11} strokeWidth={2} /> reset
                </button>
              )}
            </div>

            {activeQuestion && (
              <div className="mt-3 hairline rounded-md bg-app px-3 py-2">
                <p className="text-[10px] font-medium uppercase tracking-wider mono text-fg-subtle">
                  Q{activeIdx + 1}
                </p>
                <p className="text-[13px] text-fg mt-0.5 leading-snug">
                  {activeQuestion.question}
                </p>
              </div>
            )}
          </div>

          <div
            ref={scrollRef}
            className="hairline rounded-md bg-app p-3 max-h-72 overflow-y-auto grid gap-2.5"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <span className="hairline grid place-items-center w-6 h-6 rounded-md bg-elevated text-fg shrink-0">
                    <Sparkles size={11} strokeWidth={1.75} />
                  </span>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-md text-[12px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950'
                      : msg.isError
                      ? 'hairline border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-300'
                      : 'hairline bg-elevated text-fg'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <span className="grid place-items-center w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-900 text-fg-muted shrink-0">
                    <User size={11} strokeWidth={1.75} />
                  </span>
                )}
              </div>
            ))}

            {sending && (
              <div className="flex gap-2 justify-start">
                <span className="hairline grid place-items-center w-6 h-6 rounded-md bg-elevated text-fg shrink-0">
                  <Sparkles size={11} strokeWidth={1.75} />
                </span>
                <div className="hairline bg-elevated rounded-md px-3 py-2 text-[12px] text-fg-subtle italic inline-flex items-center gap-1.5">
                  <Loader2 size={11} className="animate-spin" /> Thinking
                </div>
              </div>
            )}
          </div>

          {activeIdx != null && (
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => send(buildHelpHint(activeIdx))}
                disabled={sending}
                className="hairline inline-flex items-center gap-1.5 rounded-md px-2.5 h-7 text-[11px] font-medium text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-50 transition-colors"
              >
                <Lightbulb size={11} strokeWidth={1.75} /> Give me a hint
              </button>
              <button
                type="button"
                onClick={() =>
                  send(
                    `Explain the concept behind question ${activeIdx + 1} in simple words, without telling me the answer.`
                  )
                }
                disabled={sending}
                className="hairline inline-flex items-center gap-1.5 rounded-md px-2.5 h-7 text-[11px] font-medium text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-50 transition-colors"
              >
                <BookOpen size={11} strokeWidth={1.75} /> Explain the concept
              </button>
              <button
                type="button"
                onClick={() =>
                  send(
                    `Help me eliminate one of the wrong options for question ${activeIdx + 1} so I can narrow it down.`
                  )
                }
                disabled={sending}
                className="hairline inline-flex items-center gap-1.5 rounded-md px-2.5 h-7 text-[11px] font-medium text-fg-muted hover:text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-50 transition-colors"
              >
                <Scissors size={11} strokeWidth={1.75} /> Eliminate an option
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
                  ? `Type a number 1–${questionCount}…`
                  : 'Ask the bot for a hint…'
              }
              disabled={sending}
              className="flex-1 hairline bg-app rounded-md px-3 h-9 text-[13px] outline-none focus:border-app-strong disabled:opacity-50 text-fg placeholder:text-fg-subtle"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 text-[12px] font-medium disabled:opacity-40 hover:opacity-90 transition"
            >
              Send
            </button>
          </form>

          {error && (
            <p className="text-[11px] mono text-red-500">
              {error}
            </p>
          )}

          <p className="text-[10px] mono text-fg-subtle text-center">
            The AI tutor only gives hints — it will never reveal the correct answer.
          </p>
        </div>
      )}
    </section>
  );
}
