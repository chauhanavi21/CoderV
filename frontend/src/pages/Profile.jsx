import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Calendar,
  ShieldCheck,
  LogOut,
  ArrowRight,
  BookOpen,
  Trophy,
  Target,
  Flame,
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { useLessonsContext } from '../contexts/LessonsContext';
import { SkeletonHero, SkeletonList } from '../components/SkeletonCard';

const tabs = [
  { to: '/resources', label: 'Resources' },
  { to: '/about',     label: 'About' },
];

function formatDate(value) {
  if (!value) return '—';
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString(undefined, {
      year:  'numeric',
      month: 'short',
      day:   'numeric',
    });
  } catch {
    return '—';
  }
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const { registry, registryLoading } = useLessonsContext();
  const { getTotalProgress, getLessonProgress, progressLoading } = useProgress();

  const displayName = user?.displayName?.trim()
    || user?.email?.split('@')[0]
    || 'User';

  const initials = user?.displayName
    ? user.displayName.trim().split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : (user?.email?.[0]?.toUpperCase() ?? 'U');

  const total = getTotalProgress();

  const lessonCards = useMemo(
    () => registry.map((lesson) => ({
      ...lesson,
      progress: lesson.available ? getLessonProgress(lesson.id) : null,
    })),
    [registry, getLessonProgress]
  );

  const completedLessons = lessonCards.filter(
    (l) => l.progress && l.progress.total > 0 && l.progress.completed === l.progress.total
  );
  const inProgressLessons = lessonCards.filter(
    (l) => l.progress && l.progress.completed > 0 && l.progress.completed < l.progress.total
  );

  if (progressLoading || registryLoading) {
    return (
      <AppLayout tabs={tabs} sidebarId="profileSidebar">
        <SkeletonHero className="mb-6" />
        <SkeletonList count={3} />
      </AppLayout>
    );
  }

  const joined = formatDate(user?.metadata?.creationTime);
  const lastSeen = formatDate(user?.metadata?.lastSignInTime);
  const provider = user?.providerData?.[0]?.providerId?.replace('.com', '') ?? 'password';

  return (
    <AppLayout tabs={tabs} sidebarId="profileSidebar">
      {/* Header */}
      <header className="hairline-b pb-6 mb-8 flex items-start gap-5 flex-wrap">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={displayName}
            className="w-16 h-16 rounded-md object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 grid place-items-center font-semibold text-xl mono shrink-0">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-1">/profile</p>
          <h1 className="text-2xl font-semibold tracking-tightish text-fg leading-none truncate">
            {displayName}
          </h1>
          <p className="mt-2 text-[12.5px] text-fg-muted flex items-center gap-2 truncate">
            <Mail size={13} strokeWidth={1.75} className="text-fg-subtle shrink-0" />
            <span className="truncate">{user?.email ?? '—'}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="inline-flex items-center gap-2 rounded-md hairline px-3 h-9 text-[13px] font-medium text-fg-muted hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5 transition-colors"
        >
          <LogOut size={14} strokeWidth={1.75} />
          Sign out
        </button>
      </header>

      {/* Account meta */}
      <section className="mb-8">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">Account</p>
        <div className="hairline rounded-md grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 bg-elevated">
          <div className="px-4 py-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono mb-1.5 flex items-center gap-1.5">
              <Calendar size={11} strokeWidth={2} /> Joined
            </p>
            <p className="text-[13px] font-medium text-fg mono tabular-nums">{joined}</p>
          </div>
          <div className="px-4 py-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono mb-1.5 flex items-center gap-1.5">
              <Flame size={11} strokeWidth={2} /> Last sign-in
            </p>
            <p className="text-[13px] font-medium text-fg mono tabular-nums">{lastSeen}</p>
          </div>
          <div className="px-4 py-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono mb-1.5 flex items-center gap-1.5">
              <ShieldCheck size={11} strokeWidth={2} /> Provider
            </p>
            <p className="text-[13px] font-medium text-fg mono capitalize">{provider}</p>
          </div>
        </div>
      </section>

      {/* Learning stats */}
      <section className="mb-8">
        <p className="text-[11px] mono uppercase tracking-wider text-fg-subtle mb-3">Learning stats</p>
        <div className="hairline rounded-md bg-elevated overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-zinc-200 dark:divide-zinc-800">
            {[
              { Icon: Target,  label: 'Completed', value: total.completed },
              { Icon: BookOpen, label: 'Remaining', value: total.total - total.completed },
              { Icon: Trophy,  label: 'Lessons done', value: completedLessons.length },
              { Icon: Flame,   label: 'Progress', value: `${total.percent}%` },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="px-4 py-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle mono mb-1.5 flex items-center gap-1.5">
                  <Icon size={11} strokeWidth={2} /> {label}
                </p>
                <p className="text-[20px] font-semibold tracking-tightish text-fg mono tabular-nums">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="h-px bg-bg">
            <div
              className="h-px bg-emerald-500 transition-all duration-500"
              style={{ width: `${total.percent}%` }}
            />
          </div>
        </div>
      </section>

      {/* In progress */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">In progress</p>
          <div className="flex-1 hairline-b" />
        </div>
        {inProgressLessons.length === 0 ? (
          <div className="hairline rounded-md p-8 text-center bg-elevated">
            <BookOpen size={18} strokeWidth={1.5} className="mx-auto mb-2 text-fg-subtle" />
            <p className="text-[12.5px] text-fg-muted mb-4">No lessons in progress.</p>
            <Link
              to="/lessons"
              className="inline-flex items-center gap-1.5 rounded-md bg-fg text-bg-elevated dark:bg-zinc-100 dark:text-zinc-950 px-3 h-8 text-[13px] font-medium hover:opacity-90 transition"
            >
              Browse lessons <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {inProgressLessons.map((lesson) => {
              const p = lesson.progress;
              return (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="hairline rounded-md p-4 bg-elevated flex flex-col gap-3 hover:border-app-strong transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-md grid place-items-center text-[11px] font-semibold mono bg-zinc-100 dark:bg-zinc-900 text-fg shrink-0">
                      {String(lesson.number+1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-medium text-fg truncate">{lesson.title}</h3>
                      <p className="text-[11px] text-fg-subtle mono mt-0.5">
                        {p.completed} / {p.total} examples
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-px">
                    <div
                      className="h-px bg-fg transition-all duration-500"
                      style={{ width: `${p.percent}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Completed */}
      {completedLessons.length > 0 && (
        <section className="mb-2">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle mono">Completed</p>
            <div className="flex-1 hairline-b" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {completedLessons.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className="hairline rounded-md p-4 bg-elevated flex items-center gap-3 hover:border-app-strong transition-colors"
              >
                <span className="w-7 h-7 rounded-md grid place-items-center text-[11px] font-semibold mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  {String(lesson.number+1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-medium text-fg truncate">{lesson.title}</h3>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mono mt-0.5 uppercase tracking-wider">
                    Completed
                  </p>
                </div>
                <Trophy size={14} strokeWidth={1.75} className="text-emerald-500 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </AppLayout>
  );
}
