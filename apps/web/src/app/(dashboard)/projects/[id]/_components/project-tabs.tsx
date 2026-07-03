'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const TABS = [
  { label: 'Vue générale', href: '' },
  { label: 'Documents',    href: '/documents' },
  { label: 'Missions IA',  href: '/missions' },
  { label: 'Planning',     href: '/planning' },
  { label: 'Budget',       href: '/budget' },
  { label: 'Activités',    href: '/activites' },
  { label: 'Équipe',       href: '/equipe' },
  { label: 'Rapports',     href: '/rapports' },
  { label: 'Historique',   href: '/historique' },
  { label: 'Paramètres',   href: '/parametres' },
]

export function ProjectTabs({ id }: { id: string }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    const full = `/projects/${id}${href}`
    if (href === '') return pathname === `/projects/${id}` || pathname === `/projects/${id}/`
    return pathname.startsWith(full)
  }

  return (
    <div className="flex gap-0 overflow-x-auto scrollbar-hide">
      {TABS.map(({ label, href }) => (
        <Link
          key={label}
          href={`/projects/${id}${href}`}
          className={cn(
            'shrink-0 border-b-2 px-4 py-2.5 text-[13px] font-medium transition-colors duration-150',
            isActive(href)
              ? 'border-adp-blue text-adp-blue'
              : 'border-transparent text-adp-muted hover:text-adp-slate'
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
