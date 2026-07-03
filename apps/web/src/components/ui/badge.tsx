import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  className?: string
  variant?: 'default' | 'pill'
}

export function Badge({ label, className, variant = 'default' }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 text-[12px] font-semibold',
      variant === 'pill' ? 'rounded-full' : 'rounded-md',
      className
    )}>
      {label}
    </span>
  )
}

export const STATUS_BADGE = {
  en_cours: 'bg-emerald-500 text-white',
  en_pause: 'bg-amber-500 text-white',
  termine:  'bg-blue-500 text-white',
  archive:  'bg-slate-400 text-white',
  valide:   'bg-emerald-100 text-emerald-700',
  en_revision: 'bg-amber-100 text-amber-700',
} as const

export const TYPE_BADGE = {
  DWG:  'bg-blue-100 text-blue-700',
  IFC:  'bg-violet-100 text-violet-700',
  PDF:  'bg-red-100 text-red-700',
  RVT:  'bg-orange-100 text-orange-700',
  XLSX: 'bg-emerald-100 text-emerald-700',
  DOCX: 'bg-sky-100 text-sky-700',
  RFA:  'bg-orange-100 text-orange-700',
} as const

export const PHASE_BADGE: Record<string, string> = {
  ESQ: 'bg-slate-700 text-white',
  APS: 'bg-violet-600 text-white',
  APD: 'bg-blue-600 text-white',
  PRO: 'bg-adp-blue text-white',
  DCE: 'bg-orange-500 text-white',
  EXE: 'bg-emerald-600 text-white',
  RCE: 'bg-teal-600 text-white',
}
