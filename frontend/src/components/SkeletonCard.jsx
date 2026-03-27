/**
 * Shimmer skeleton cards used while progress data loads.
 * SkeletonCard  — generic card placeholder
 * SkeletonHero  — wide hero bar (progress ring + text)
 * SkeletonList  — stacked list of SkeletonCards
 */

function Shimmer({ className = '' }) {
  return (
    <div
      className={`bg-gray-200 dark:bg-slate-700 rounded animate-pulse ${className}`}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm ${className}`}
    >
      <Shimmer className="h-5 w-2/3 mb-4" />
      <Shimmer className="h-3 w-full mb-2" />
      <Shimmer className="h-3 w-5/6 mb-2" />
      <Shimmer className="h-3 w-1/2 mb-5" />
      <Shimmer className="h-10 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonHero({ className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-7 shadow-card grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center ${className}`}
    >
      <div>
        <Shimmer className="h-8 w-1/2 mb-4" />
        <Shimmer className="h-4 w-full mb-2" />
        <Shimmer className="h-4 w-3/4" />
      </div>
      <div className="grid place-items-center">
        <Shimmer className="w-[170px] h-[170px] rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
