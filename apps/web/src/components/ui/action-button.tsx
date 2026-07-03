'use client'

import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ActionButtonProps {
  children: ReactNode
  message?: string
  type?: 'success' | 'error' | 'info'
  className?: string
  variant?: 'primary' | 'danger' | 'ghost'
}

export function ActionButton({
  children,
  message = 'Action effectuée.',
  type = 'success',
  className,
  variant = 'primary',
}: ActionButtonProps) {
  const { toast } = useToast()

  const base = 'flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold shadow-sm transition-all duration-150 hover:shadow-md'
  const variants = {
    primary: 'bg-adp-blue text-white hover:bg-adp-blue-dark hover:shadow-adp-blue/20',
    danger:  'bg-red-500 text-white hover:bg-red-600',
    ghost:   'border border-slate-200 bg-white text-adp-muted hover:border-slate-300 hover:text-adp-slate',
  }

  return (
    <button
      onClick={() => toast(message, type)}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  )
}
