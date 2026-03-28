/** Minimum quiz score (percent) required to count an example as complete. */
export const LESSON_QUIZ_PASS_THRESHOLD_PCT = 80;

/**
 * @param {object} module - Lesson module with difficultyOrder and difficulties
 * @param {string} lessonId
 * @param {string} difficultyId
 * @param {(lessonId: string, difficultyId: string, exampleId: string) => boolean} isComplete
 */
export function isDifficultyAccessible(module, lessonId, difficultyId, isComplete) {
  const order = module.difficultyOrder;
  const idx = order.indexOf(difficultyId);
  if (idx <= 0) return true;

  const prevDiffId = order[idx - 1];
  const prev = module.difficulties[prevDiffId];
  const examples = prev?.examples ?? [];
  if (examples.length === 0) return true;

  return examples.every((ex) => isComplete(lessonId, prevDiffId, ex.id));
}

/**
 * @param {{ id: string }[]} examples - Ordered list for one difficulty
 * @param {number} index - Index of the example in `examples`
 */
export function isExampleUnlocked(examples, index, lessonId, difficultyId, isComplete) {
  if (index <= 0) return true;
  const prevId = examples[index - 1].id;
  return isComplete(lessonId, difficultyId, prevId);
}

/**
 * First example that is not complete, or last example if all complete.
 */
export function getSuggestedExampleId(examples, lessonId, difficultyId, isComplete) {
  if (!examples?.length) return null;
  const firstIncomplete = examples.findIndex(
    (ex) => !isComplete(lessonId, difficultyId, ex.id)
  );
  if (firstIncomplete === -1) return examples[examples.length - 1].id;
  return examples[firstIncomplete].id;
}
