import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
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
    <section className="hairline rounded-md bg-elevated overflow-hidden text-fg">
      <div className="px-4 py-3 hairline-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-[13px] font-medium text-fg">
            Knowledge Check
          </h3>
          <p className="text-[11px] mono text-fg-subtle mt-0.5">
            Score {LESSON_QUIZ_PASS_THRESHOLD_PCT}%+ to complete this example.
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {quiz.map((_, i) => {
            let dot = 'bg-zinc-300 dark:bg-zinc-700';
            if (submitted) {
              dot = answers[i] === quiz[i].answer ? 'bg-emerald-500' : 'bg-red-500';
            }
            return <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${dot}`} />;
          })}
          <span className="ml-2 text-[11px] mono text-fg-subtle tabular-nums">
            {submitted ? `${correctCount}/${quiz.length}` : `${Object.keys(answers).length}/${quiz.length}`}
          </span>
        </div>
      </div>

      <div className="p-4 grid gap-4">
        {quiz.map((q, qIdx) => {
          const selected = answers[qIdx];
          const isRevealed = submitted || alreadyComplete;
          const isCorrect = selected === q.answer;
          const isWrong = isRevealed && selected !== undefined && !isCorrect;

          return (
            <div
              key={qIdx}
              className={`hairline rounded-md p-4 transition-colors ${
                isRevealed
                  ? isCorrect
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-red-500/30 bg-red-500/5'
                  : 'bg-app'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-md grid place-items-center text-[11px] font-medium mono ${
                    isRevealed
                      ? isCorrect
                        ? 'bg-emerald-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'hairline bg-elevated text-fg-muted'
                  }`}
                >
                  {isRevealed && isCorrect ? <Check size={11} strokeWidth={2.5} /> : qIdx + 1}
                </span>
                <p className="font-medium text-fg text-[13.5px] leading-snug pt-0.5">
                  {q.question}
                </p>
              </div>

              <div className="mt-3 grid gap-1.5">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  const isThisCorrectAnswer = optIdx === q.answer;

                  let optionStyle = 'bg-elevated hover:border-app-strong cursor-pointer';

                  if (isRevealed) {
                    if (isThisCorrectAnswer) {
                      optionStyle = 'border-emerald-500/40 bg-emerald-500/5 text-fg';
                    } else if (isThisSelected && isWrong) {
                      optionStyle = 'border-red-500/40 bg-red-500/5 text-fg line-through opacity-80';
                    } else {
                      optionStyle = 'opacity-50 cursor-default text-fg-subtle';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'border-app-strong bg-zinc-50 dark:bg-zinc-900';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`hairline flex items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-[12.5px] transition-all ${optionStyle}`}
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded grid place-items-center text-[10px] font-medium mono ${
                          isRevealed && isThisCorrectAnswer
                            ? 'bg-emerald-500 text-white'
                            : isRevealed && isThisSelected && isWrong
                            ? 'bg-red-500 text-white'
                            : 'hairline bg-app text-fg-muted'
                        }`}
                      >
                        {LETTERS[optIdx]}
                      </span>
                      <span className="leading-snug text-fg">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isWrong && (
                <p className="mt-2.5 text-[11.5px] text-red-500 font-medium inline-flex items-center gap-1">
                  <X size={11} strokeWidth={2.5} /> Incorrect — correct answer highlighted.
                </p>
              )}

              {isRevealed && isCorrect && (
                <p className="mt-2.5 text-[11.5px] font-medium text-emerald-500 inline-flex items-center gap-1">
                  <Check size={11} strokeWidth={2.5} /> Correct
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!alreadyComplete && (
        <div className="px-4 py-3 hairline-t bg-app flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {!submitted ? (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={handleSubmit}
              className="inline-flex items-center justify-center rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-4 h-9 text-[12px] font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Check my answers
            </button>
          ) : passed ? (
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-500 text-white grid place-items-center">
                <Check size={12} strokeWidth={2.5} />
              </span>
              <p className="text-[12.5px] font-medium text-emerald-500">
                You passed — example complete.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <p className="text-[12px] mono text-fg-muted">
                Scored {Math.round((correctCount / quiz.length) * 100)}% — need {LESSON_QUIZ_PASS_THRESHOLD_PCT}%.
              </p>
              <button
                type="button"
                onClick={handleTryAgain}
                className="hairline inline-flex items-center justify-center rounded-md px-3 h-8 text-[12px] font-medium text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}

      {alreadyComplete && (
        <div className="px-4 py-3 hairline-t border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-emerald-500 text-white grid place-items-center">
            <Check size={12} strokeWidth={2.5} />
          </span>
          <p className="text-[12.5px] font-medium text-emerald-500">
            Example already completed
          </p>
        </div>
      )}
    </section>
  );
}
