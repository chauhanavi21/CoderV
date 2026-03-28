import { useState, useEffect } from 'react';
import { LESSON_QUIZ_PASS_THRESHOLD_PCT } from '../utils/lessonProgressGates';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizSection({ quiz, onPass, alreadyComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (!quiz?.length) return;
    if (alreadyComplete) {
      setAnswers(Object.fromEntries(quiz.map((q, i) => [i, q.answer])));
      setSubmitted(true);
      setPassed(true);
    } else {
      setAnswers({});
      setSubmitted(false);
      setPassed(false);
    }
  }, [quiz, alreadyComplete]);

  if (!quiz || quiz.length === 0) return null;

  const allAnswered = quiz.every((_, i) => answers[i] !== undefined && answers[i] !== null);

  const handleSelect = (qIdx, optIdx) => {
    if (submitted || alreadyComplete) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    if (!allAnswered || submitted) return;

    let correct = 0;
    for (let i = 0; i < quiz.length; i++) {
      if (answers[i] === quiz[i].answer) correct += 1;
    }
    const scorePct = (correct / quiz.length) * 100;
    const ok = scorePct >= LESSON_QUIZ_PASS_THRESHOLD_PCT;

    setSubmitted(true);
    setPassed(ok);
    if (ok) onPass?.();
  };

  const handleTryAgain = () => {
    setAnswers({});
    setSubmitted(false);
    setPassed(false);
  };

  const correctCount = submitted
    ? quiz.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0)
    : Object.keys(answers).length;

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden text-gray-900 dark:text-slate-100">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border-b border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-indigo-900 dark:text-indigo-200">
            Knowledge Check
          </h3>
          <p className="text-sm text-indigo-600 dark:text-indigo-300 mt-0.5">
            Score {LESSON_QUIZ_PASS_THRESHOLD_PCT}% or higher on this check to complete this example.
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {quiz.map((_, i) => {
            let dot = 'bg-gray-300 dark:bg-slate-600';
            if (submitted) {
              dot =
                answers[i] === quiz[i].answer
                  ? 'bg-emerald-500'
                  : 'bg-red-400';
            }
            return <span key={i} className={`w-3 h-3 rounded-full transition-colors duration-300 ${dot}`} />;
          })}
          <span className="ml-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            {submitted ? `${correctCount}/${quiz.length}` : `${Object.keys(answers).length}/${quiz.length}`}
          </span>
        </div>
      </div>

      <div className="p-6 grid gap-6">
        {quiz.map((q, qIdx) => {
          const selected = answers[qIdx];
          const isRevealed = submitted || alreadyComplete;
          const isCorrect = selected === q.answer;
          const isWrong = isRevealed && selected !== undefined && !isCorrect;

          return (
            <div
              key={qIdx}
              className={`rounded-xl border p-5 transition-all duration-300 ${
                isRevealed
                  ? isCorrect
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/20'
                    : 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/30'
                  : 'border-gray-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-lg grid place-items-center text-xs font-extrabold ${
                    isRevealed
                      ? isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                      : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {isRevealed && isCorrect ? '✓' : qIdx + 1}
                </span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-[15px] leading-snug pt-0.5">
                  {q.question}
                </p>
              </div>

              <div className="mt-4 grid gap-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  const isThisCorrectAnswer = optIdx === q.answer;

                  let optionStyle =
                    'border-gray-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer';

                  if (isRevealed) {
                    if (isThisCorrectAnswer) {
                      optionStyle =
                        'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-200';
                    } else if (isThisSelected && isWrong) {
                      optionStyle =
                        'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 line-through opacity-80';
                    } else {
                      optionStyle =
                        'border-gray-100 dark:border-slate-700 opacity-50 cursor-default text-slate-500 dark:text-slate-400';
                    }
                  } else if (isThisSelected) {
                    optionStyle =
                      'border-indigo-400 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${optionStyle}`}
                    >
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-md grid place-items-center text-xs font-bold ${
                          isRevealed && isThisCorrectAnswer
                            ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100'
                            : isRevealed && isThisSelected && isWrong
                            ? 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'
                        }`}
                      >
                        {LETTERS[optIdx]}
                      </span>
                      <span className="leading-snug text-gray-800 dark:text-slate-200">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isWrong && (
                <p className="mt-3 text-sm text-red-600 dark:text-red-400 font-medium">
                  Incorrect — correct answer is highlighted.
                </p>
              )}

              {isRevealed && isCorrect && (
                <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Correct!
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!alreadyComplete && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {!submitted ? (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={handleSubmit}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-45 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:ring-offset-slate-900"
            >
              Check my answers
            </button>
          ) : passed ? (
            <div className="flex items-center gap-3 w-full sm:w-auto bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-xl px-4 py-3 border border-emerald-200 dark:border-emerald-800/50">
              <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 grid place-items-center text-sm font-bold">
                ✓
              </span>
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                You passed! This example is now complete.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                You scored{' '}
                {Math.round((correctCount / quiz.length) * 100)}%. You need at least{' '}
                {LESSON_QUIZ_PASS_THRESHOLD_PCT}% to continue.
              </p>
              <button
                type="button"
                onClick={handleTryAgain}
                className="inline-flex items-center justify-center rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-extrabold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}

      {alreadyComplete && (
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-t border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 grid place-items-center text-sm font-bold">
            ✓
          </span>
          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
            Example already completed
          </p>
        </div>
      )}
    </section>
  );
}
