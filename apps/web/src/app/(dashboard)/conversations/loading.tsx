import { Skeleton, SkeletonCard } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-3 w-80" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
      <div className="w-56 shrink-0 space-y-3">
        <Skeleton className="h-52 rounded-xl" />
      </div>
    </div>
  )
}
