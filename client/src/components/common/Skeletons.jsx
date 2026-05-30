// Generic skeleton block
export function SkeletonBlock({ className, animate = true }) {
  return (
    <div className={`bg-surface-variant/50 rounded-xl ${animate ? 'animate-pulse' : ''} ${className}`}></div>
  );
}

// Full page loader for route suspense fallback (blurred gradient style as requested)
export function PageSuspenseLoader() {
  return (
    <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
        <span className="material-symbols-outlined text-primary text-3xl animate-bounce relative z-10">eco</span>
      </div>
      <p className="mt-4 font-label-sm text-on-surface-variant uppercase tracking-widest animate-pulse">Loading...</p>
    </div>
  );
}

// Crop Card Skeleton
export function CropCardSkeleton() {
  return (
    <div className="glass-panel rounded-[24px] overflow-hidden flex flex-col border border-outline-variant/20 bg-surface-container-lowest animate-pulse">
      <div className="h-48 bg-surface-variant/40 w-full"></div>
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div>
          <SkeletonBlock className="h-3 w-24 mb-3" animate={false} />
          <SkeletonBlock className="h-6 w-3/4 mb-1" animate={false} />
        </div>
        <div className="mt-auto grid grid-cols-2 gap-3 mb-2">
          <SkeletonBlock className="h-10 w-full rounded-xl" animate={false} />
          <SkeletonBlock className="h-10 w-full rounded-xl" animate={false} />
        </div>
        <div className="flex gap-2">
          <SkeletonBlock className="h-10 flex-1 rounded-xl" animate={false} />
          <SkeletonBlock className="h-10 flex-1 rounded-xl" animate={false} />
        </div>
      </div>
    </div>
  );
}

// Notification Skeleton
export function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest animate-pulse">
      <SkeletonBlock className="w-10 h-10 rounded-full shrink-0" animate={false} />
      <div className="flex-1 space-y-2 py-1">
        <SkeletonBlock className="h-4 w-3/4" animate={false} />
        <SkeletonBlock className="h-3 w-1/2" animate={false} />
      </div>
      <SkeletonBlock className="w-2 h-2 rounded-full shrink-0" animate={false} />
    </div>
  );
}

// Community Post Skeleton
export function PostSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest animate-pulse space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonBlock className="w-12 h-12 rounded-full shrink-0" animate={false} />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-4 w-32" animate={false} />
          <SkeletonBlock className="h-3 w-20" animate={false} />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-full" animate={false} />
        <SkeletonBlock className="h-4 w-5/6" animate={false} />
        <SkeletonBlock className="h-4 w-4/6" animate={false} />
      </div>
      <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
        <SkeletonBlock className="h-8 w-16 rounded-full" animate={false} />
        <SkeletonBlock className="h-8 w-16 rounded-full" animate={false} />
      </div>
    </div>
  );
}

// Dashboard Main Skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-between items-end">
        <div className="space-y-3">
          <SkeletonBlock className="h-8 w-64" animate={false} />
          <SkeletonBlock className="h-4 w-96" animate={false} />
        </div>
        <SkeletonBlock className="h-10 w-32 rounded-full" animate={false} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-6">
          <SkeletonBlock className="h-6 w-40" animate={false} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SkeletonBlock className="h-24 rounded-xl" animate={false} />
            <SkeletonBlock className="h-24 rounded-xl" animate={false} />
            <SkeletonBlock className="h-24 rounded-xl" animate={false} />
            <SkeletonBlock className="h-24 rounded-xl" animate={false} />
          </div>
        </div>
        <div className="md:col-span-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-4">
          <SkeletonBlock className="h-6 w-32" animate={false} />
          <SkeletonBlock className="h-16 w-16 rounded-full my-4" animate={false} />
          <SkeletonBlock className="h-4 w-full" animate={false} />
          <SkeletonBlock className="h-4 w-3/4" animate={false} />
        </div>
      </div>
    </div>
  );
}
