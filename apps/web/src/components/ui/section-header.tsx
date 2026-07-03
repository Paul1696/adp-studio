import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  href?: string
  linkLabel?: string
  action?: React.ReactNode
}

export function SectionHeader({ title, href, linkLabel = 'Voir tout', action }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-semibold tracking-tight text-adp-slate">{title}</h2>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-[13px] font-medium text-adp-muted transition-colors duration-150 hover:text-adp-blue">
          {linkLabel} <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      )}
      {action && !href && action}
    </div>
  )
}
