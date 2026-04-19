import { useMemo, useState } from 'react';
import AppLayout from '../components/AppLayout';
import StepVisualizer from '../components/StepVisualizer';
import GraphPreview from '../components/GraphPreview';
import { lessonTypeOneModule } from '../data/lessonModules';

const tabs = [
  { to: '/lesson/type-1', label: 'Type 1 Module' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

const difficultyTone = {
  beginner: 'text-sky-500',
  easy: 'text-emerald-500',
  medium: 'text-amber-500',
  hard: 'text-red-500',
};

export default function GraphModule() {
  const module = lessonTypeOneModule;
  const [activeDifficulty, setActiveDifficulty] = useState(module.difficultyOrder[0]);
  const [activeExampleId, setActiveExampleId] = useState(
    module.difficulties[module.difficultyOrder[0]].examples[0].id
  );

  const activeDifficultyData = module.difficulties[activeDifficulty];
  const activeExample =
    activeDifficultyData.examples.find((e) => e.id === activeExampleId) ??
    activeDifficultyData.examples[0];

  const totalExamples = useMemo(
    () =>
      module.difficultyOrder.reduce(
        (count, difficultyId) => count + module.difficulties[difficultyId].examples.length,
        0
      ),
    [module]
  );

  return (
    <AppLayout tabs={tabs} sidebarId="graphModuleSidebar">
      <header className="hairline-b pb-6 mb-6">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-2">
          /lesson/type-1 · {module.lessonType.label} of {module.lessonType.totalTypes}
        </p>
        <h1 className="text-2xl font-semibold tracking-tightish text-fg leading-tight">
          {module.title}
        </h1>
        <p className="mt-2 max-w-3xl text-[13px] text-fg-muted leading-relaxed">
          {module.summary}
        </p>

        <div className="mt-5 hairline rounded-md grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 max-w-2xl">
          <div className="px-4 py-3">
            <p className="text-[10px] mono uppercase tracking-wider text-fg-subtle">Difficulties</p>
            <p className="text-xl font-semibold mono tabular-nums text-fg mt-1">4</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] mono uppercase tracking-wider text-fg-subtle">Examples</p>
            <p className="text-xl font-semibold mono tabular-nums text-fg mt-1">{totalExamples}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] mono uppercase tracking-wider text-fg-subtle">Focus</p>
            <p className="text-[12px] font-medium text-fg mt-1.5">Vars, loops, fns, OOP</p>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">
          Difficulty
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
          {module.difficultyOrder.map((difficultyId) => {
            const difficulty = module.difficulties[difficultyId];
            const isActive = difficultyId === activeDifficulty;

            return (
              <button
                key={difficulty.id}
                type="button"
                onClick={() => {
                  setActiveDifficulty(difficultyId);
                  setActiveExampleId(difficulty.examples[0].id);
                }}
                className={`hairline rounded-md p-3 text-left transition-colors ${
                  isActive
                    ? 'border-app-strong bg-zinc-100 dark:bg-zinc-900'
                    : 'bg-elevated hover:border-app-strong'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-[13px] font-medium mono uppercase tracking-wider ${difficultyTone[difficultyId]}`}>
                    {difficulty.label}
                  </h3>
                  <span className="text-[10px] mono text-fg-subtle">
                    {difficulty.examples.length}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-fg-muted">
                  {difficulty.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-4">
        <aside className="hairline rounded-md bg-elevated p-4 self-start">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle">
                Examples
              </p>
              <h2 className="text-[14px] font-medium text-fg mt-0.5">
                {activeDifficultyData.label}
              </h2>
            </div>
            <span className={`text-[10px] mono uppercase tracking-wider ${difficultyTone[activeDifficulty]}`}>
              {activeDifficulty}
            </span>
          </div>

          <div className="grid gap-1.5">
            {activeDifficultyData.examples.map((example, index) => {
              const isSelected = example.id === activeExample.id;
              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => setActiveExampleId(example.id)}
                  className={`hairline rounded-md p-3 text-left transition-colors ${
                    isSelected
                      ? 'border-app-strong bg-app'
                      : 'bg-app hover:border-app-strong'
                  }`}
                >
                  <p className="text-[10px] mono uppercase tracking-wider text-fg-subtle">
                    Ex {index + 1}
                  </p>
                  <h3 className="mt-0.5 text-[13px] font-medium text-fg">{example.title}</h3>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-fg-muted">{example.concept}</p>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="grid gap-4">
          <article className="hairline rounded-md bg-elevated p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle">
                  Active lesson
                </p>
                <h2 className="mt-1 text-[18px] font-semibold tracking-tightish text-fg">
                  {activeExample.title}
                </h2>
              </div>
              <span className="text-[10px] mono uppercase tracking-wider text-fg-subtle">
                {activeExample.nodes.length}n / {activeExample.edges.length}e
              </span>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
              {activeExample.explanation}
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="hairline rounded-md bg-app p-3">
                <p className="text-[10px] mono uppercase tracking-wider text-fg-subtle">
                  What you learn
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-fg">
                  {activeExample.concept}
                </p>
              </div>
              <div className="hairline border-amber-500/30 rounded-md bg-amber-500/5 p-3">
                <p className="text-[10px] mono uppercase tracking-wider text-amber-500">
                  Think about this
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-fg">
                  {activeExample.challenge}
                </p>
              </div>
            </div>
          </article>

          <article className="hairline rounded-md bg-zinc-950 overflow-hidden">
            <div className="px-4 py-2.5 hairline-b border-zinc-800 flex items-center justify-between gap-3">
              <p className="text-[11px] mono uppercase tracking-wider text-zinc-500">
                code · python
              </p>
              <span className="text-[10px] mono text-zinc-500">
                {activeExample.code.split('\n').length} lines
              </span>
            </div>
            <pre className="overflow-x-auto p-4 text-[12.5px] leading-6 text-zinc-200 mono">
              <code>{activeExample.code}</code>
            </pre>
          </article>

          <GraphPreview example={activeExample} />

          {activeExample.steps && activeExample.steps.length > 0 && (
            <StepVisualizer key={activeExample.id} example={activeExample} />
          )}
        </div>
      </section>
    </AppLayout>
  );
}
