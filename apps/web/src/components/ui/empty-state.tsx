import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center', className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200/80">
        <Icon className="h-5 w-5 text-adp-muted" strokeWidth={1.75} />
      </div>
      <p className="mt-4 text-[15px] font-semibold text-adp-slate">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-adp-muted">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
