import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineItemProps {
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  title: string
  description?: string
  date: string
  meta?: string
  isLast?: boolean
  className?: string
}

export function TimelineItem({
  icon: Icon,
  iconColor = 'text-adp-muted',
  iconBg = 'bg-slate-100',
  title,
  description,
  date,
  meta,
  isLast = false,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn('flex gap-3', className)}>
      {/* Ligne verticale + icône */}
      <div className="flex flex-col items-center">
        <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg', iconBg)}>
          <Icon className={cn('h-3.5 w-3.5', iconColor)} strokeWidth={1.75} />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-slate-100" />}
      </div>

      {/* Contenu */}
      <div className={cn('min-w-0 pb-4', isLast && 'pb-0')}>
        <p className="text-[14px] font-medium text-adp-slate">{title}</p>
        {description && (
          <p className="mt-0.5 text-[13px] leading-snug text-adp-muted">{description}</p>
        )}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[12px] text-adp-muted">{date}</span>
          {meta && <span className="text-[12px] text-adp-muted/60">· {meta}</span>}
        </div>
      </div>
    </div>
  )
}
