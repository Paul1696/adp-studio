'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FolderKanban, Bot, Library,
  FileText, Activity, Settings, ChevronRight,
  Sparkles, Zap, MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_MAIN = [
  { href: '/dashboard',   label: 'Accueil',    icon: LayoutDashboard },
  { href: '/projects',    label: 'Projets',    icon: FolderKanban },
  { href: '/documents',   label: 'Documents',  icon: FileText },
  { href: '/activites',   label: 'Activités',  icon: Activity },
]

const NAV_IA = [
  { href: '/missions',      label: 'Missions IA',   icon: Zap,          badge: '4' },
  { href: '/agents',        label: 'Agents',         icon: Bot },
  { href: '/conversations', label: 'Conversations',  icon: MessageSquare, badge: '3' },
]

const NAV_RESSOURCES = [
  { href: '/bibliotheque', label: 'Bibliothèque', icon: Library },
  { href: '/settings',     label: 'Paramètres',   icon: Settings },
]

type NavItem = { href: string; label: string; icon: React.ElementType; badge?: string }

export function AppSidebar() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const NavLink = ({ href, label, icon: Icon, badge }: NavItem) => (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[14px] font-medium transition-all duration-150',
        isActive(href)
          ? 'bg-adp-blue/10 text-adp-blue'
          : 'text-adp-muted hover:bg-slate-50 hover:text-adp-slate'
      )}
    >
      <Icon className={cn('h-4 w-4 shrink-0', isActive(href) ? 'text-adp-blue' : 'text-adp-muted group-hover:text-adp-slate')} strokeWidth={1.75} />
      <span className="flex-1">{label}</span>
      {badge && !isActive(href) && (
        <span className="rounded-full bg-adp-blue/10 px-1.5 py-0.5 text-[11px] font-bold text-adp-blue">{badge}</span>
      )}
      {isActive(href) && <ChevronRight className="h-3 w-3 text-adp-blue/60" />}
    </Link>
  )

  const GroupLabel = ({ label }: { label: string }) => (
    <p className="mb-1 mt-4 px-3 text-[12px] font-semibold uppercase tracking-widest text-adp-muted/60 first:mt-0">{label}</p>
  )

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-slate-200/80 bg-white">

      {/* Logo */}
      <div className="flex h-14 items-center border-b border-slate-200/80 px-4">
        <Image
          src="/logo-adp-studio.png"
          alt="ADP Studio"
          width={130}
          height={50}
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 scrollbar-hide">
        <GroupLabel label="Principal" />
        {NAV_MAIN.map((item) => <NavLink key={item.href} {...item} />)}

        <GroupLabel label="IA & Agents" />
        {NAV_IA.map((item) => <NavLink key={item.href} {...item} />)}

        <GroupLabel label="Ressources" />
        {NAV_RESSOURCES.map((item) => <NavLink key={item.href} {...item} />)}
      </nav>

      {/* Carte promo */}
      <div className="mx-2 mb-3 rounded-xl bg-adp-slate-mid p-4 text-white">
        <div className="mb-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-blue-300" strokeWidth={1.75} />
          <span className="text-xs font-semibold text-blue-200">ADP Studio</span>
        </div>
        <p className="mb-3 text-[13px] leading-snug text-slate-300">
          Lancez une mission IA sur vos projets en quelques secondes.
        </p>
        <Link href="/missions/new" className="block rounded-lg bg-adp-blue px-3 py-1.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-adp-blue-dark">
          Nouvelle mission →
        </Link>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200/80 px-4 py-3">
        <p className="text-[12px] text-adp-muted/60">© 2024 Ateliers de Paul.</p>
      </div>
    </aside>
  )
}
