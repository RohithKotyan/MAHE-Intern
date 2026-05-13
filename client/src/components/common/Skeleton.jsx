import { cn } from '../../utils/helpers';

export function SkeletonLine({ className }) {
  return <div className={cn('skeleton h-4 rounded', className)} />;
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 space-y-4', className)}>
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-3 w-1/4 rounded" />
        </div>
      </div>
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="skeleton h-32 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }) {
  const s = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  return <div className={cn('skeleton rounded-full', s[size])} />;
}

export default function Skeleton({ type = 'line', ...props }) {
  if (type === 'card') return <SkeletonCard {...props} />;
  if (type === 'avatar') return <SkeletonAvatar {...props} />;
  return <SkeletonLine {...props} />;
}
