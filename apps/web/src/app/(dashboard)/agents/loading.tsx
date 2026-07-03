import { Skeleton, SkeletonStats } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-72" />
        </div>
        <SkeletonStats cols={4} />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-2.5 w-1/2" />
                <Skeleton className="h-2.5 w-full" />
                <Skeleton className="h-2.5 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-56 shrink-0 space-y-3">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    </div>
  )
}
