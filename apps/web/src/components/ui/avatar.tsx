import { cn } from '@/lib/utils'

interface AvatarProps {
  initials: string
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE = {
  xs: 'h-6 w-6 text-[11px]',
  sm: 'h-7 w-7 text-[12px]',
  md: 'h-9 w-9 text-[13px]',
  lg: 'h-12 w-12 text-[15px]',
}

export function Avatar({ initials, color = 'bg-adp-blue', size = 'md', className }: AvatarProps) {
  return (
    <div className={cn(
      'flex shrink-0 items-center justify-center rounded-full font-bold text-white ring-2 ring-white',
      SIZE[size],
      color,
      className,
    )}>
      {initials}
    </div>
  )
}
