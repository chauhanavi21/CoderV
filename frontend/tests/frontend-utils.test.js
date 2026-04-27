import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getSuggestedExampleId,
  isDifficultyAccessible,
  isExampleUnlocked,
  LESSON_QUIZ_PASS_THRESHOLD_PCT,
} from '../src/utils/lessonProgressGates.js';
import { scopeCssToSelector } from '../src/utils/scopeCssToSelector.js';

const sampleModule = {
  difficultyOrder: ['beginner', 'easy', 'medium'],
  difficulties: {
    beginner: {
      examples: [{ id: 'variables' }, { id: 'loops' }],
    },
    easy: {
      examples: [{ id: 'functions' }],
    },
    medium: {
      examples: [{ id: 'classes' }],
    },
  },
};

test('UNIT LEVEL - lessonProgressGates - exposes the quiz pass threshold used by lesson completion', () => {
  assert.equal(LESSON_QUIZ_PASS_THRESHOLD_PCT, 80);
});

test('UNIT LEVEL - lessonProgressGates - keeps later difficulties locked until previous difficulty examples are complete', () => {
  const nothingComplete = () => false;
  assert.equal(isDifficultyAccessible(sampleModule, 'type-1', 'easy', nothingComplete), false);

  const beginnerComplete = (_lessonId, difficultyId) => difficultyId === 'beginner';
  assert.equal(isDifficultyAccessible(sampleModule, 'type-1', 'easy', beginnerComplete), true);
});

test('UNIT LEVEL - lessonProgressGates - unlocks examples in sequence inside one difficulty', () => {
  const examples = [{ id: 'first-example' }, { id: 'second-example' }];

  assert.equal(isExampleUnlocked(examples, 0, 'type-1', 'beginner', () => false), true);
  assert.equal(isExampleUnlocked(examples, 1, 'type-1', 'beginner', () => false), false);

  const firstComplete = (_lessonId, _difficultyId, exampleId) => exampleId === 'first-example';
  assert.equal(isExampleUnlocked(examples, 1, 'type-1', 'beginner', firstComplete), true);
});

test('UNIT LEVEL - lessonProgressGates - suggests the first incomplete example for continue learning', () => {
  const examples = [{ id: 'variables' }, { id: 'loops' }, { id: 'functions' }];
  const firstTwoComplete = (_lessonId, _difficultyId, exampleId) =>
    ['variables', 'loops'].includes(exampleId);

  assert.equal(getSuggestedExampleId(examples, 'type-1', 'beginner', firstTwoComplete), 'functions');
});

test('UNIT LEVEL - scopeCssToSelector - scopes plain CSS selectors to the Web Lab sidebar root', () => {
  const css = 'body { color: red; } .nav-item, button:hover { padding: 4px; }';
  const scoped = scopeCssToSelector(css, '#coderv-sidebar');

  assert.match(scoped, /#coderv-sidebar \{ color: red; \}/);
  assert.match(scoped, /#coderv-sidebar \.nav-item, #coderv-sidebar button:hover \{ padding: 4px; \}/);
});

test('UNIT LEVEL - scopeCssToSelector - scopes nested media query rules without changing keyframes', () => {
  const css = '@media (max-width: 600px) { .title { font-size: 12px; } } @keyframes pulse { from { opacity: 0; } to { opacity: 1; } }';
  const scoped = scopeCssToSelector(css, '#coderv-sidebar');

  assert.match(scoped, /@media \(max-width: 600px\) \{ #coderv-sidebar \.title \{ font-size: 12px; \} \}/);
  assert.match(scoped, /@keyframes pulse \{ from \{ opacity: 0; \} to \{ opacity: 1; \} \}/);
});
