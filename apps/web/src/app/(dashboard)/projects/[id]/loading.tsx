import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-0">
      {/* Bandeau projet */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <Skeleton className="h-32 w-full rounded-none" />
        <div className="px-5">
          {/* Métriques */}
          <div className="flex items-center gap-6 border-b border-slate-100 py-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-20" />
            ))}
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-1.5 w-24 rounded-full" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
          {/* Onglets */}
          <div className="flex gap-0 py-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="mx-2 my-3 h-3 w-16 first:ml-0" />
            ))}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex gap-5 pt-4">
        <div className="w-64 shrink-0 space-y-4">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-64 rounded-xl" />
        </div>
        <div className="w-56 shrink-0 space-y-4">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
