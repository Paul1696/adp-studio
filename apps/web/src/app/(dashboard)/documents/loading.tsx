import { Skeleton, SkeletonStats, SkeletonTable } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex gap-5">
      <div className="min-w-0 flex-1 space-y-4">
        <div className="space-y-1.5"><Skeleton className="h-5 w-32" /><Skeleton className="h-3 w-64" /></div>
        <SkeletonStats cols={5} />
        <SkeletonTable rows={6} />
      </div>
      <div className="w-56 shrink-0 space-y-3">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  )
}
