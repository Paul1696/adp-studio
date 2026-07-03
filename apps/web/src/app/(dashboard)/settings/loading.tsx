import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3 w-96" />
      </div>
      <div className="flex gap-6">
        <div className="w-52 shrink-0">
          <Skeleton className="h-80 rounded-xl" />
        </div>
        <div className="min-w-0 flex-1 space-y-4">
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
        <div className="w-56 shrink-0 space-y-3">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
