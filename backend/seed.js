/**
 * Seed script — populates Supabase with all lesson data from lessonModules.js.
 *
 * Run once (or re-run anytime to refresh):
 *   node seed.js
 *
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env
 *
 * Loads backend/.env from this file's directory so it works even if your shell
 * cwd is not the backend folder.
 */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL?.trim();
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!supabaseUrl || !supabaseKey) {
  console.error('\n✗ Missing Supabase credentials for seed.js.');
  console.error(`  Expected file: ${join(__dirname, '.env')}`);
  console.error('  Required variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl && process.env.VITE_SUPABASE_URL) {
    console.error(
      '\n  Hint: VITE_SUPABASE_URL is set (often in frontend/.env). Copy SUPABASE_URL and\n' +
        '  SUPABASE_SERVICE_ROLE_KEY into backend/.env — the server seed uses unprefixed names.\n'
    );
  }
  process.exit(1);
}
import {
  lessonsRegistry,
  lessonTypeOneModule,
  lessonTypeTwoModule,
  lessonTypeThreeModule,
  lessonTypeFourModule,
  webLabModule,
} from '../frontend/src/data/lessonModules.js';

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

const MODULES = {
  'type-1': lessonTypeOneModule,
  'type-2': lessonTypeTwoModule,
  'type-3': lessonTypeThreeModule,
  'type-4': lessonTypeFourModule,
  'web-lab': webLabModule,
};

async function upsert(table, rows, conflict) {
  const { error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: conflict, ignoreDuplicates: false });
  if (error) throw new Error(`[${table}] ${error.message}`);
}

async function deleteWhere(table, column, value) {
  const { error } = await supabase.from(table).delete().eq(column, value);
  if (error) throw new Error(`[delete ${table}] ${error.message}`);
}

async function insertBatch(table, rows) {
  if (!rows.length) return;
  const { error } = await supabase.from(table).insert(rows);
  if (error) throw new Error(`[insert ${table}] ${error.message}`);
}

async function getQuestionIds(exampleId) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('id, sort_order')
    .eq('example_id', exampleId)
    .order('sort_order');
  if (error) throw error;
  return data;
}

async function seed() {
  console.log('━━━ CoderV Seed ━━━');

  // ── 1. lesson_types ────────────────────────────────────────────────────────
  console.log('Seeding lesson_types…');
  const lessonTypeRows = lessonsRegistry.map((l) => {
    const mod = MODULES[l.id];
    return {
      id: l.id,
      number: l.number,
      title: l.title,
      description: l.description,
      color: l.color,
      available: l.available,
      summary: mod?.summary ?? '',
      lesson_label: mod?.lessonType?.label ?? '',
      lesson_name: mod?.lessonType?.name ?? '',
      sort_order: l.number,
    };
  });
  await upsert('lesson_types', lessonTypeRows, 'id');
  console.log(`  ✓ ${lessonTypeRows.length} lesson types`);

  // ── 2. Per module: difficulties + examples + steps + quiz + nodes + edges ──
  for (const [lessonId, mod] of Object.entries(MODULES)) {
    console.log(`\nSeeding module: ${mod.title}`);

    // -- difficulties --
    const diffRows = mod.difficultyOrder.map((diffKey, i) => {
      const d = mod.difficulties[diffKey];
      return {
        lesson_id: lessonId,
        difficulty_key: diffKey,
        label: d.label,
        description: d.description,
        sort_order: i,
      };
    });
    await upsert('difficulties', diffRows, 'lesson_id,difficulty_key');
    console.log(`  ✓ ${diffRows.length} difficulties`);

    // Drop difficulties (and their examples) removed from the module definition
    const { data: allDiffKeys, error: diffListErr } = await supabase
      .from('difficulties')
      .select('difficulty_key')
      .eq('lesson_id', lessonId);
    if (diffListErr) throw diffListErr;
    for (const { difficulty_key: dk } of allDiffKeys || []) {
      if (mod.difficultyOrder.includes(dk)) continue;
      const { data: orphanedEx, error: exListErr } = await supabase
        .from('examples')
        .select('id')
        .eq('lesson_id', lessonId)
        .eq('difficulty_key', dk);
      if (exListErr) throw exListErr;
      for (const { id: exId } of orphanedEx || []) {
        await deleteWhere('example_steps', 'example_id', exId);
        await deleteWhere('graph_edges', 'example_id', exId);
        await deleteWhere('graph_nodes', 'example_id', exId);
        const qRows = await getQuestionIds(exId);
        for (const q of qRows) {
          const { error: optDelErr } = await supabase.from('quiz_options').delete().eq('question_id', q.id);
          if (optDelErr) throw new Error(`[delete quiz_options] ${optDelErr.message}`);
        }
        await deleteWhere('quiz_questions', 'example_id', exId);
        const { error: exDelErr } = await supabase.from('examples').delete().eq('id', exId);
        if (exDelErr) throw new Error(`[delete examples] ${exDelErr.message}`);
      }
      const { error: diffDelErr } = await supabase.from('difficulties').delete().eq('lesson_id', lessonId).eq('difficulty_key', dk);
      if (diffDelErr) throw new Error(`[delete difficulties] ${diffDelErr.message}`);
    }

    let exCount = 0;
    let stepCount = 0;
    let quizCount = 0;
    let nodeCount = 0;

    for (const [diffIdx, diffKey] of mod.difficultyOrder.entries()) {
      const diff = mod.difficulties[diffKey];

      for (const [exIdx, example] of diff.examples.entries()) {
        // -- example row --
        await upsert('examples', [{
          id: example.id,
          lesson_id: lessonId,
          difficulty_key: diffKey,
          title: example.title,
          concept: example.concept ?? '',
          code: example.code ?? '',
          explanation: example.explanation ?? '',
          challenge: example.challenge ?? '',
          sort_order: exIdx,
        }], 'id');
        exCount++;

        // -- steps (delete + re-insert for clean refresh) --
        await deleteWhere('example_steps', 'example_id', example.id);
        if (example.steps?.length) {
          const stepRows = example.steps.map((s, i) => ({
            example_id: example.id,
            sort_order: i,
            line_number: s.line ?? 0,
            description: s.desc ?? '',
            action: s.action ?? null,
          }));
          await insertBatch('example_steps', stepRows);
          stepCount += stepRows.length;
        }

        // -- quiz (delete + re-insert) --
        await deleteWhere('quiz_questions', 'example_id', example.id);
        if (example.quiz?.length) {
          const questionRows = example.quiz.map((q, i) => ({
            example_id: example.id,
            sort_order: i,
            question_text: q.question,
            correct_index: q.answer,
          }));
          await insertBatch('quiz_questions', questionRows);

          // fetch back IDs to link options
          const questionIds = await getQuestionIds(example.id);
          const optionRows = [];
          for (const qRow of questionIds) {
            const q = example.quiz[qRow.sort_order];
            q.options.forEach((opt, oi) => {
              optionRows.push({
                question_id: qRow.id,
                sort_order: oi,
                option_text: opt,
              });
            });
          }
          await insertBatch('quiz_options', optionRows);
          quizCount += questionRows.length;
        }

        // -- graph nodes --
        await deleteWhere('graph_nodes', 'example_id', example.id);
        if (example.nodes?.length) {
          const nodeRows = example.nodes.map((n) => ({
            example_id: example.id,
            node_id: n.id,
            label: n.label,
          }));
          await insertBatch('graph_nodes', nodeRows);
          nodeCount += nodeRows.length;
        }

        // -- graph edges --
        await deleteWhere('graph_edges', 'example_id', example.id);
        if (example.edges?.length) {
          const edgeRows = example.edges.map((e) => ({
            example_id: example.id,
            from_node: e.from,
            to_node: e.to,
          }));
          await insertBatch('graph_edges', edgeRows);
        }
      }
    }

    console.log(`  ✓ ${exCount} examples | ${stepCount} steps | ${quizCount} quiz questions | ${nodeCount} nodes`);
  }

  console.log('\n━━━ Seed complete! ━━━\n');
}

seed().catch((err) => {
  console.error('\n✗ Seed failed:', err.message);
  process.exit(1);
});
