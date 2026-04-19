import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Check, X, Play } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { SkeletonCard } from '../components/SkeletonCard';
import { useAuth } from '../contexts/AuthContext';

const BASE = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

const difficultyTone = {
  easy: 'text-emerald-500',
  medium: 'text-amber-500',
  hard: 'text-red-500',
};

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function QuizTake() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user, getToken } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [phase, setPhase] = useState('loading');
  const [error, setError] = useState(null);

  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const [score, setScore] = useState(0);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { to: '/quiz', label: 'All Quizzes' },
    { to: `/quiz/${quizId}`, label: quiz?.title ?? 'Quiz' },
  ];

  useEffect(() => {
    fetch(`${BASE}/api/quizzes/${quizId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setQuiz(d.quiz);
        setAnswers(new Array(d.quiz.questions.length).fill(null));
        setTimeLeft(d.quiz.time_limit);
        setPhase('ready');
      })
      .catch((e) => { setError(e.message); setPhase('ready'); });
  }, [quizId]);

  const finishQuiz = useCallback((currentAnswers, elapsed) => {
    clearInterval(timerRef.current);
    const finalAnswers = currentAnswers ?? answers;
    const s = quiz.questions.reduce(
      (acc, q, i) => acc + (finalAnswers[i] === q.answer ? 1 : 0),
      0
    );
    setScore(s);
    setTimeTaken(elapsed ?? (quiz.time_limit - timeLeft));
    setPhase('finished');
  }, [answers, quiz, timeLeft]);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
          finishQuiz(null, elapsed);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [finishQuiz]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  useEffect(() => {
    if (phase !== 'finished' || saved || !user) return;
    async function persist() {
      try {
        const token = await getToken();
        await fetch(`${BASE}/api/quizzes/${quizId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ score, total: quiz.questions.length, timeTaken }),
        });
        setSaved(true);
      } catch {
        // silent
      }
    }
    persist();
  }, [phase, saved, user, score, quiz, quizId, timeTaken, getToken]);

  function startQuiz() {
    setPhase('active');
    startTimer();
  }

  function selectAnswer(idx) {
    if (revealed) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
    setRevealed(true);
  }

  function nextQuestion() {
    setRevealed(false);
    if (current + 1 >= quiz.questions.length) {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      finishQuiz(answers, elapsed);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  function optionClass(idx) {
    const base = 'flex items-center gap-3 hairline rounded-md px-3.5 py-3 text-left text-[13px] transition-all cursor-pointer ';
    if (!revealed) {
      return base + (answers[current] === idx
        ? 'border-app-strong bg-zinc-50 dark:bg-zinc-900'
        : 'bg-elevated hover:border-app-strong');
    }
    if (idx === quiz.questions[current].answer) return base + 'border-emerald-500/60 bg-emerald-500/5';
    if (idx === answers[current]) return base + 'border-red-500/60 bg-red-500/5';
    return base + 'bg-elevated opacity-50';
  }

  const timerTone =
    timeLeft <= 30 ? 'text-red-500 border-red-500/40 bg-red-500/5'
    : timeLeft <= 60 ? 'text-amber-500 border-amber-500/40 bg-amber-500/5'
    : 'text-fg';

  if (phase === 'loading') {
    return (
      <AppLayout tabs={tabs} sidebarId="quizTakeSidebar">
        <SkeletonCard className="h-64 mb-6" />
        <SkeletonCard />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout tabs={tabs} sidebarId="quizTakeSidebar">
        <div className="hairline rounded-md bg-red-500/5 border-red-500/30 p-8 text-center">
          <p className="font-medium text-[14px] text-red-500 mb-1.5">Could not load quiz</p>
          <p className="text-[13px] text-fg-muted mb-5">{error}</p>
          <Link
            to="/quiz"
            className="hairline inline-flex items-center gap-1.5 rounded-md px-3 h-8 text-[12px] font-medium text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <ArrowLeft size={12} /> Back to quizzes
          </Link>
        </div>
      </AppLayout>
    );
  }

  if (phase === 'ready') {
    return (
      <AppLayout tabs={tabs} sidebarId="quizTakeSidebar">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-2">
            /quiz/{quizId}
          </p>
          <h1 className="text-2xl font-semibold tracking-tightish text-fg mb-2">{quiz.title}</h1>
          <p className="text-[13px] text-fg-muted leading-relaxed mb-6 max-w-xl">{quiz.description}</p>

          <div className="hairline rounded-md bg-elevated overflow-hidden mb-5">
            <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800">
              <div className="p-4">
                <p className="text-2xl font-semibold text-fg mono tabular-nums">{quiz.questions.length}</p>
                <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mt-0.5">Questions</p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-semibold text-fg mono tabular-nums">{formatTime(quiz.time_limit)}</p>
                <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mt-0.5">Time limit</p>
              </div>
              <div className="p-4">
                <p className={`text-[13px] font-medium mono uppercase tracking-wider ${difficultyTone[quiz.difficulty] || 'text-fg-muted'}`}>
                  {quiz.difficulty}
                </p>
                <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mt-0.5">Difficulty</p>
              </div>
            </div>
          </div>

          <div className="hairline rounded-md bg-elevated p-4 mb-6">
            <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-2">
              Notes
            </p>
            <ul className="text-[12.5px] text-fg-muted leading-relaxed space-y-1 list-disc list-inside marker:text-fg-subtle">
              <li>Each question reveals the correct answer after you choose</li>
              <li>The timer counts down — quiz auto-submits when time runs out</li>
              <li>Your result saves to your account when finished</li>
            </ul>
          </div>

          <button
            onClick={startQuiz}
            className="inline-flex items-center gap-2 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-5 h-10 text-[13px] font-medium hover:opacity-90 transition"
          >
            <Play size={13} strokeWidth={2} fill="currentColor" />
            Start Quiz
          </button>
        </div>
      </AppLayout>
    );
  }

  if (phase === 'active') {
    const q = quiz.questions[current];
    const progress = ((current + (revealed ? 1 : 0)) / quiz.questions.length) * 100;

    return (
      <AppLayout tabs={tabs} sidebarId="quizTakeSidebar">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-5 gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-[11px] mono uppercase tracking-wider text-fg-subtle mb-1.5">
                <span>Question {current + 1} / {quiz.questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="hairline-t h-px bg-bg">
                <div
                  className="h-px bg-fg transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className={`hairline inline-flex items-center gap-1.5 rounded-md px-2.5 h-8 mono tabular-nums text-[13px] font-medium ${timerTone}`}>
              <Clock size={12} strokeWidth={2} className={timeLeft <= 30 ? 'animate-pulse' : ''} />
              {formatTime(timeLeft)}
            </div>
          </div>

          <article className="hairline rounded-md bg-elevated p-5 mb-4">
            <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
              {quiz.title} · {quiz.difficulty}
            </p>
            <h2 className="text-[15px] font-medium text-fg leading-snug mb-5">
              {q.question}
            </h2>

            <div className="grid gap-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={revealed}
                  onClick={() => selectAnswer(idx)}
                  className={optionClass(idx)}
                >
                  <span className={`w-6 h-6 rounded-md grid place-items-center text-[11px] font-medium mono shrink-0 ${
                    revealed && idx === q.answer
                      ? 'bg-emerald-500 text-white'
                      : revealed && idx === answers[current] && idx !== q.answer
                      ? 'bg-red-500 text-white'
                      : 'hairline bg-app text-fg-muted'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-fg leading-snug flex-1">{opt}</span>
                  {revealed && idx === q.answer && (
                    <Check size={14} strokeWidth={2.5} className="text-emerald-500 shrink-0" />
                  )}
                  {revealed && idx === answers[current] && idx !== q.answer && (
                    <X size={14} strokeWidth={2.5} className="text-red-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {revealed && (
              <div className={`mt-4 hairline rounded-md px-3.5 py-2.5 text-[12.5px] ${
                answers[current] === q.answer
                  ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                  : 'bg-red-500/5 border-red-500/30 text-red-600 dark:text-red-300'
              }`}>
                {answers[current] === q.answer
                  ? 'Correct.'
                  : `Incorrect — the answer is "${q.options[q.answer]}"`}
              </div>
            )}
          </article>

          {revealed && (
            <div className="flex justify-end">
              <button
                onClick={nextQuestion}
                className="inline-flex items-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 text-[12px] font-medium hover:opacity-90 transition"
              >
                {current + 1 >= quiz.questions.length ? 'See Results' : 'Next'}
                <ArrowRight size={12} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {!revealed && (
            <p className="text-[11px] mono text-center text-fg-subtle mt-2">
              Select an answer to continue
            </p>
          )}
        </div>
      </AppLayout>
    );
  }

  const pct = quiz.questions.length > 0 ? Math.round((score / quiz.questions.length) * 100) : 0;
  const grade =
    pct >= 90 ? { label: 'Excellent', tone: 'text-emerald-500' }
    : pct >= 70 ? { label: 'Good', tone: 'text-amber-500' }
    : { label: 'Keep practising', tone: 'text-red-500' };

  return (
    <AppLayout tabs={tabs} sidebarId="quizTakeSidebar">
      <div className="max-w-2xl mx-auto">
        <article className="hairline rounded-md bg-elevated p-6 mb-5">
          <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-1">
            Quiz complete
          </p>
          <h1 className="text-xl font-semibold tracking-tightish text-fg mb-5">{quiz.title}</h1>

          <div className="flex items-baseline gap-3 mb-1">
            <span className={`text-5xl font-semibold mono tabular-nums ${grade.tone}`}>{pct}%</span>
            <span className="text-[12px] mono text-fg-subtle">{score} / {quiz.questions.length} correct</span>
          </div>
          <p className={`text-[13px] font-medium ${grade.tone} mb-5`}>{grade.label}</p>

          <div className="hairline-t h-px bg-bg mb-5">
            <div
              className={`h-px transition-all ${pct >= 90 ? 'bg-emerald-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 hairline rounded-md">
            {[
              { label: 'Correct', value: score, tone: 'text-emerald-500' },
              { label: 'Incorrect', value: quiz.questions.length - score, tone: 'text-red-500' },
              { label: 'Time', value: formatTime(timeTaken), tone: 'text-fg' },
            ].map((s) => (
              <div key={s.label} className="px-3 py-3">
                <p className={`text-xl font-semibold mono tabular-nums ${s.tone}`}>{s.value}</p>
                <p className="text-[10px] mono uppercase tracking-wider text-fg-subtle mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </article>

        <h2 className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">Review</h2>
        <div className="grid gap-2 mb-6">
          {quiz.questions.map((q, i) => {
            const correct = answers[i] === q.answer;
            return (
              <div
                key={i}
                className={`hairline rounded-md p-4 ${
                  correct
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                }`}
              >
                <p className="text-[10px] mono uppercase tracking-wider text-fg-subtle mb-1 flex items-center gap-1.5">
                  Q{i + 1}
                  {correct ? (
                    <span className="inline-flex items-center gap-0.5 text-emerald-500">
                      <Check size={10} strokeWidth={2.5} /> correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-red-500">
                      <X size={10} strokeWidth={2.5} /> incorrect
                    </span>
                  )}
                </p>
                <p className="font-medium text-fg text-[13px] mb-1.5">{q.question}</p>
                {!correct && answers[i] !== null && (
                  <p className="text-[11.5px] text-red-500">
                    Your answer: <span className="font-medium">{q.options[answers[i]]}</span>
                  </p>
                )}
                {!correct && (
                  <p className="text-[11.5px] text-emerald-500 mt-0.5">
                    Correct: <span className="font-medium">{q.options[q.answer]}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => {
              setAnswers(new Array(quiz.questions.length).fill(null));
              setCurrent(0);
              setRevealed(false);
              setTimeLeft(quiz.time_limit);
              setSaved(false);
              setPhase('ready');
            }}
            className="hairline rounded-md px-4 h-9 text-[12px] font-medium text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Try Again
          </button>
          <Link
            to="/quiz"
            className="rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 inline-flex items-center text-[12px] font-medium hover:opacity-90 transition"
          >
            All Quizzes
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
