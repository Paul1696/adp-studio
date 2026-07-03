import { cn } from '@/lib/utils'

interface SidebarPanelProps {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function SidebarPanel({ title, children, action, className }: SidebarPanelProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm', className)}>
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-[13px] font-semibold tracking-tight text-adp-slate">{title}</h3>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  )
}
