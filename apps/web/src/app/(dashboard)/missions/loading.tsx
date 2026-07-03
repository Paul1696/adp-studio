import { Skeleton, SkeletonStats, SkeletonCard } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5"><Skeleton className="h-5 w-40" /><Skeleton className="h-3 w-72" /></div>
        <Skeleton className="h-8 w-40 rounded-xl" />
      </div>
      <SkeletonStats cols={4} />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  )
}
