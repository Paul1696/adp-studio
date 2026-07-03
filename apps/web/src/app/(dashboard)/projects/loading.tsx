import { Skeleton, SkeletonCard } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5"><Skeleton className="h-5 w-32" /><Skeleton className="h-3 w-64" /></div>
        <Skeleton className="h-8 w-36 rounded-xl" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  )
}
