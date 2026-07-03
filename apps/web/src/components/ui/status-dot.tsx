import { cn } from '@/lib/utils'

type Status = 'active' | 'away' | 'offline' | 'running' | 'error'

interface StatusDotProps {
  status: Status
  label?: string
  className?: string
}

const DOT: Record<Status, string> = {
  active:  'bg-emerald-500',
  away:    'bg-amber-400',
  offline: 'bg-slate-300',
  running: 'bg-adp-blue animate-pulse',
  error:   'bg-red-500',
}

const LABEL: Record<Status, string> = {
  active:  'Actif',
  away:    'Absent',
  offline: 'Hors ligne',
  running: 'En cours',
  error:   'Erreur',
}

export function StatusDot({ status, label, className }: StatusDotProps) {
  return (
    <span className={cn('flex items-center gap-1.5', className)}>
      <span className={cn('h-2 w-2 shrink-0 rounded-full', DOT[status])} />
      <span className="text-[13px] text-adp-muted">{label ?? LABEL[status]}</span>
    </span>
  )
}
