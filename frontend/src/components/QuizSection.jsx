import { useState, useEffect } from 'react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizSection({ quiz, onAllCorrect, alreadyComplete }) {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [allPassed, setAllPassed] = useState(false);

  useEffect(() => {
    setAnswers({});
    setRevealed({});
    setAllPassed(false);
  }, [quiz]);

  if (!quiz || quiz.length === 0) return null;

  const handleSelect = (qIdx, optIdx) => {
    if (revealed[qIdx] !== undefined) return;

    const isCorrect = optIdx === quiz[qIdx].answer;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setRevealed((prev) => ({ ...prev, [qIdx]: isCorrect }));

    if (isCorrect) {
      const nextRevealed = { ...revealed, [qIdx]: true };
      const done = quiz.every((_, i) => nextRevealed[i] === true);
      if (done) {
        setAllPassed(true);
        onAllCorrect?.();
      }
    }
  };

  const handleRetry = (qIdx) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[qIdx];
      return next;
    });
    setRevealed((prev) => {
      const next = { ...prev };
      delete next[qIdx];
      return next;
    });
  };

  const correctCount = Object.values(revealed).filter(Boolean).length;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden text-gray-900">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-indigo-900">
            Knowledge Check
          </h3>
          <p className="text-sm text-indigo-600 mt-0.5">
            Answer all 3 questions correctly to complete this example
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {quiz.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                revealed[i] === true
                  ? 'bg-emerald-500'
                  : revealed[i] === false
                  ? 'bg-red-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-bold text-indigo-700">
            {correctCount}/{quiz.length}
          </span>
        </div>
      </div>

      {/* Questions */}
      <div className="p-6 grid gap-6">
        {quiz.map((q, qIdx) => {
          const selected = answers[qIdx];
          const isRevealed = revealed[qIdx] !== undefined;
          const isCorrect = revealed[qIdx] === true;
          const isWrong = revealed[qIdx] === false;

          return (
            <div
              key={qIdx}
              className={`rounded-xl border p-5 transition-all duration-300 ${
                isCorrect
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : isWrong
                  ? 'border-red-200 bg-red-50/50'
                  : 'border-gray-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-lg grid place-items-center text-xs font-extrabold ${
                    isCorrect
                      ? 'bg-emerald-100 text-emerald-700'
                      : isWrong
                      ? 'bg-red-100 text-red-700'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {isCorrect ? '✓' : qIdx + 1}
                </span>
                <p className="font-bold text-slate-900 text-[15px] leading-snug pt-0.5">
                  {q.question}
                </p>
              </div>

              <div className="mt-4 grid gap-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  const isThisCorrectAnswer = optIdx === q.answer;

                  let optionStyle =
                    'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer';

                  if (isRevealed) {
                    if (isThisCorrectAnswer) {
                      optionStyle =
                        'border-emerald-300 bg-emerald-50 text-emerald-900';
                    } else if (isThisSelected && !isCorrect) {
                      optionStyle =
                        'border-red-300 bg-red-50 text-red-800 line-through opacity-70';
                    } else {
                      optionStyle = 'border-gray-100 opacity-50 cursor-default';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'border-indigo-400 bg-indigo-50';
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
                            ? 'bg-emerald-200 text-emerald-800'
                            : isRevealed && isThisSelected && !isCorrect
                            ? 'bg-red-200 text-red-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {LETTERS[optIdx]}
                      </span>
                      <span className="leading-snug text-gray-800">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isWrong && (
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-red-600 font-medium">
                    Not quite — try again!
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRetry(qIdx)}
                    className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              )}

              {isCorrect && (
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Correct!
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom bar */}
      {allPassed && !alreadyComplete && (
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-200 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center text-sm font-bold">
            ✓
          </span>
          <p className="text-sm font-bold text-emerald-800">
            All correct! This example is now complete.
          </p>
        </div>
      )}

      {alreadyComplete && (
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-200 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center text-sm font-bold">
            ✓
          </span>
          <p className="text-sm font-bold text-emerald-800">
            Example already completed
          </p>
        </div>
      )}
    </section>
  );
}
