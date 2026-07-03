import { Avatar } from './avatar'
import { cn } from '@/lib/utils'

interface AvatarItem {
  initials: string
  color?: string
  label?: string
}

interface AvatarGroupProps {
  items: AvatarItem[]
  max?: number
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export function AvatarGroup({ items, max = 4, size = 'sm', className }: AvatarGroupProps) {
  const visible = items.slice(0, max)
  const overflow = items.length - max

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((item, i) => (
        <div
          key={i}
          className="-ml-1.5 first:ml-0"
          title={item.label ?? item.initials}
        >
          <Avatar initials={item.initials} color={item.color ?? 'bg-adp-blue'} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div className="-ml-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[12px] font-bold text-adp-muted ring-2 ring-white">
          +{overflow}
        </div>
      )}
    </div>
  )
}
