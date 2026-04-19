function Shimmer({ className = '' }) {
  return (
    <div
      className={`bg-zinc-200/70 dark:bg-zinc-800/70 rounded-sm animate-pulse ${className}`}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`hairline rounded-md bg-elevated p-4 ${className}`}
    >
      <Shimmer className="h-4 w-2/3 mb-3" />
      <Shimmer className="h-2.5 w-full mb-2" />
      <Shimmer className="h-2.5 w-5/6 mb-2" />
      <Shimmer className="h-2.5 w-1/2 mb-4" />
      <Shimmer className="h-8 w-full rounded-md" />
    </div>
  );
}

export function SkeletonHero({ className = '' }) {
  return (
    <div
      className={`hairline rounded-md bg-elevated p-5 ${className}`}
    >
      <Shimmer className="h-5 w-1/2 mb-3" />
      <Shimmer className="h-3 w-full mb-2" />
      <Shimmer className="h-3 w-3/4 mb-4" />
      <Shimmer className="h-px w-full" />
    </div>
  );
}

export function SkeletonList({ count = 3, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
