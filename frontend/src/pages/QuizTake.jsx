import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { SkeletonCard } from '../components/SkeletonCard';
import { useAuth } from '../contexts/AuthContext';

const BASE = import.meta.env.VITE_API_URL || 'https://coderv-backend.onrender.com';

const difficultyStyles = {
  easy:   'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  hard:   'bg-red-100 text-red-800',
};

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function ScoreRing({ score, total }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const color = pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <div
      className="w-[160px] h-[160px] rounded-full grid place-items-center relative mx-auto"
      style={{ background: `conic-gradient(${color} ${pct * 3.6}deg, #e2e8f0 0deg)` }}
    >
      <div className="absolute w-[116px] h-[116px] rounded-full bg-white dark:bg-slate-800" />
      <div className="relative z-10 text-center">
        <p className="text-3xl font-extrabold" style={{ color }}>{pct}%</p>
        <p className="text-xs text-muted font-semibold">{score}/{total} correct</p>
      </div>
    </div>
  );
}

// ── State machine: 'loading' | 'ready' | 'active' | 'finished' ───────────────
export default function QuizTake() {
  const { quizId } = useParams();
  const navigate   = useNavigate();
  const { user, getToken } = useAuth();

  const [quiz,      setQuiz]      = useState(null);
  const [phase,     setPhase]     = useState('loading'); // loading|ready|active|finished
  const [error,     setError]     = useState(null);

  // Per-question answers [null | index]
  const [answers,   setAnswers]   = useState([]);
  const [current,   setCurrent]   = useState(0);
  const [revealed,  setRevealed]  = useState(false); // show correct/wrong for current Q

  // Timer
  const [timeLeft,  setTimeLeft]  = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Results
  const [score, setScore] = useState(0);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { to: '/quiz', label: '← All Quizzes' },
    { to: `/quiz/${quizId}`, label: quiz?.title ?? 'Quiz' },
  ];

  // ── Fetch quiz ──────────────────────────────────────────────────────────────
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

  // ── Timer ───────────────────────────────────────────────────────────────────
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
          // Time's up — finish with current answers
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

  // ── Save attempt ─────────────────────────────────────────────────────────
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
        // silent — result still shown locally
      }
    }
    persist();
  }, [phase, saved, user, score, quiz, quizId, timeTaken, getToken]);

  // ── Handlers ────────────────────────────────────────────────────────────────
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

  // ── Colour logic ────────────────────────────────────────────────────────────
  function optionClass(idx) {
    const base = 'flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all cursor-pointer ';
    if (!revealed) {
      return base + (answers[current] === idx
        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm'
        : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600');
    }
    if (idx === quiz.questions[current].answer) return base + 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30';
    if (idx === answers[current]) return base + 'border-red-400 bg-red-50 dark:bg-red-900/20';
    return base + 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-50';
  }

  const timerColor = timeLeft <= 30 ? 'text-red-500' : timeLeft <= 60 ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400';

  // ────────────────────────────────────────────────────────────────────────────
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
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
          <p className="font-bold text-lg mb-2">Could not load quiz</p>
          <p className="text-sm mb-6">{error}</p>
          <Link to="/quiz" className="text-sm font-bold text-indigo-600 hover:text-indigo-800">← Back to quizzes</Link>
        </div>
      </AppLayout>
    );
  }

  // ── READY screen ─────────────────────────────────────────────────────────────
  if (phase === 'ready') {
    return (
      <AppLayout tabs={tabs} sidebarId="quizTakeSidebar">
        <article className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-10 shadow-card text-center text-gray-900 dark:text-slate-100">
          <div className="text-6xl mb-6">{quiz.icon}</div>
          <h1 className="text-3xl font-extrabold mb-3">{quiz.title}</h1>
          <p className="text-muted dark:text-slate-400 text-base mb-6 leading-relaxed">{quiz.description}</p>

          <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-indigo-600">{quiz.questions.length}</p>
              <p className="text-xs text-muted font-semibold">Questions</p>
            </div>
            <div className="w-px h-10 bg-gray-200 dark:bg-slate-700" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-amber-500">{formatTime(quiz.time_limit)}</p>
              <p className="text-xs text-muted font-semibold">Time limit</p>
            </div>
            <div className="w-px h-10 bg-gray-200 dark:bg-slate-700" />
            <div className="text-center">
              <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${difficultyStyles[quiz.difficulty] || difficultyStyles.easy}`}>
                {quiz.difficulty}
              </span>
              <p className="text-xs text-muted font-semibold mt-1">Difficulty</p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 p-4 mb-8 text-left text-sm text-amber-900 dark:text-amber-200">
            <p className="font-bold mb-1">Before you start:</p>
            <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
              <li>Each question shows the correct answer after you select an option</li>
              <li>The timer counts down — the quiz auto-submits when time runs out</li>
              <li>Your result is saved to your account after finishing</li>
            </ul>
          </div>

          <button
            onClick={startQuiz}
            className="gradient-primary text-white rounded-xl px-10 py-4 text-base font-extrabold shadow-btn hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
          >
            Start Quiz →
          </button>
        </article>
      </AppLayout>
    );
  }

  // ── ACTIVE screen ─────────────────────────────────────────────────────────────
  if (phase === 'active') {
    const q = quiz.questions[current];
    const progress = ((current + (revealed ? 1 : 0)) / quiz.questions.length) * 100;

    return (
      <AppLayout tabs={tabs} sidebarId="quizTakeSidebar">
        <div className="max-w-2xl mx-auto">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-semibold text-muted dark:text-slate-400 mb-1.5">
                <span>Question {current + 1} of {quiz.questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 font-extrabold text-lg tabular-nums ${
              timeLeft <= 30
                ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                : timeLeft <= 60
                ? 'border-amber-300 bg-amber-50 dark:bg-amber-900/20'
                : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'
            } ${timerColor}`}>
              <span className={`text-base ${timeLeft <= 30 ? 'animate-pulse' : ''}`}>⏱</span>
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Question card */}
          <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-7 shadow-sm mb-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted dark:text-slate-400 mb-3">
              {quiz.title} · {quiz.difficulty}
            </p>
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-slate-100 leading-snug mb-6">
              {q.question}
            </h2>

            <div className="grid gap-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={revealed}
                  onClick={() => selectAnswer(idx)}
                  className={optionClass(idx)}
                >
                  <span className={`w-7 h-7 rounded-lg grid place-items-center text-xs font-extrabold shrink-0 ${
                    revealed && idx === q.answer
                      ? 'bg-emerald-500 text-white'
                      : revealed && idx === answers[current] && idx !== q.answer
                      ? 'bg-red-400 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-gray-800 dark:text-slate-200 leading-snug">{opt}</span>
                  {revealed && idx === q.answer && (
                    <span className="ml-auto text-emerald-600 font-bold text-base">✓</span>
                  )}
                  {revealed && idx === answers[current] && idx !== q.answer && (
                    <span className="ml-auto text-red-500 font-bold text-base">✗</span>
                  )}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {revealed && (
              <div className={`mt-5 rounded-xl px-5 py-3 text-sm font-semibold animate-fade-in ${
                answers[current] === q.answer
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/50'
              }`}>
                {answers[current] === q.answer
                  ? '✓ Correct!'
                  : `✗ Incorrect — the correct answer is "${q.options[q.answer]}"`}
              </div>
            )}
          </article>

          {/* Next / Finish */}
          {revealed && (
            <div className="flex justify-end animate-fade-in">
              <button
                onClick={nextQuestion}
                className="gradient-primary text-white rounded-xl px-8 py-3.5 text-sm font-extrabold shadow-btn hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
              >
                {current + 1 >= quiz.questions.length ? 'See Results →' : 'Next Question →'}
              </button>
            </div>
          )}

          {/* Skip hint */}
          {!revealed && (
            <p className="text-xs text-center text-muted dark:text-slate-500 mt-2">
              Select an answer to continue
            </p>
          )}
        </div>
      </AppLayout>
    );
  }

  // ── FINISHED screen ───────────────────────────────────────────────────────────
  const pct = quiz.questions.length > 0 ? Math.round((score / quiz.questions.length) * 100) : 0;
  const grade =
    pct >= 90 ? { label: 'Excellent!', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50' } :
    pct >= 70 ? { label: 'Good job!',  color: 'text-amber-600',   bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50'       } :
                { label: 'Keep practising!', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50'             };

  return (
    <AppLayout tabs={tabs} sidebarId="quizTakeSidebar">
      <div className="max-w-2xl mx-auto">
        {/* Result card */}
        <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-card mb-6 text-center">
          <div className="text-4xl mb-4">{quiz.icon}</div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100 mb-1">{quiz.title}</h1>
          <p className="text-sm text-muted dark:text-slate-400 mb-8">Quiz complete!</p>

          <ScoreRing score={score} total={quiz.questions.length} />

          <div className={`mt-6 rounded-xl border px-6 py-3 text-lg font-extrabold ${grade.color} ${grade.bg}`}>
            {grade.label}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: 'Correct',   value: score,                               color: 'text-emerald-600' },
              { label: 'Incorrect', value: quiz.questions.length - score,       color: 'text-red-500'     },
              { label: 'Time taken',value: formatTime(timeTaken),               color: 'text-indigo-600'  },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-200 dark:border-slate-700 px-3 py-4">
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted dark:text-slate-400 font-semibold mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Question review */}
        <h2 className="text-lg font-bold dark:text-slate-100 mb-4">Review Answers</h2>
        <div className="grid gap-4 mb-8">
          {quiz.questions.map((q, i) => {
            const correct = answers[i] === q.answer;
            return (
              <div
                key={i}
                className={`rounded-xl border p-5 ${
                  correct
                    ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/10'
                    : 'border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10'
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-muted dark:text-slate-400 mb-1">
                  Q{i + 1} · {correct ? '✓ Correct' : '✗ Incorrect'}
                </p>
                <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm mb-2">{q.question}</p>
                {!correct && answers[i] !== null && (
                  <p className="text-xs text-red-700 dark:text-red-400">
                    Your answer: <span className="font-bold">{q.options[answers[i]]}</span>
                  </p>
                )}
                {!correct && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Correct answer: <span className="font-bold">{q.options[q.answer]}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => { setAnswers(new Array(quiz.questions.length).fill(null)); setCurrent(0); setRevealed(false); setTimeLeft(quiz.time_limit); setSaved(false); setPhase('ready'); }}
            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-6 py-3 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            to="/quiz"
            className="gradient-primary text-white rounded-xl px-6 py-3 text-sm font-bold shadow-btn hover:-translate-y-0.5 transition-transform"
          >
            All Quizzes
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
