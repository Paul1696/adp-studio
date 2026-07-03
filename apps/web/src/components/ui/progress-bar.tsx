import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  size?: 'xs' | 'sm' | 'md'
  showLabel?: boolean
  label?: string
  className?: string
}

const SIZE = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
}

export function ProgressBar({
  value,
  max = 100,
  color = 'bg-adp-blue',
  size = 'sm',
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="mb-1 flex items-center justify-between text-[12px]">
          {label && <span className="text-adp-muted">{label}</span>}
          {showLabel && <span className="font-semibold text-adp-slate">{pct}%</span>}
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-slate-100', SIZE[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
