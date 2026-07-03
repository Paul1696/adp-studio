import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  sub?: string
  iconColor: string
  iconBg: string
  className?: string
}

export function StatCard({ icon: Icon, label, value, sub, iconColor, iconBg, className }: StatCardProps) {
  return (
    <div className={cn(
      'flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition-all duration-150 hover:border-slate-300 hover:shadow-md',
      className
    )}>
      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', iconBg)}>
        <Icon className={cn('h-4 w-4', iconColor)} strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-[20px] font-bold leading-tight text-adp-slate">{value}</p>
        <p className="text-[12px] leading-snug text-adp-muted">{label}</p>
        {sub && <p className="text-[11px] text-adp-muted/70">{sub}</p>}
      </div>
    </div>
  )
}

interface StatCardSimpleProps {
  label: string
  value: string | number
  sub?: string
  className?: string
}

export function StatCardSimple({ label, value, sub, className }: StatCardSimpleProps) {
  return (
    <div className={cn(
      'rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm',
      className
    )}>
      <p className="text-[22px] font-bold leading-tight text-adp-blue">{value}</p>
      <p className="mt-0.5 text-[13px] font-medium text-adp-slate">{label}</p>
      {sub && <p className="text-[12px] text-adp-muted">{sub}</p>}
    </div>
  )
}
