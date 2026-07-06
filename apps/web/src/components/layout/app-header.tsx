'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Settings, ChevronRight, Plus } from 'lucide-react'
import { useUser, SignOutButton } from '@clerk/nextjs'
import type { MockProject } from '@/lib/mock-data'
import { useProjects } from '@/hooks/use-projects'
import { cn } from '@/lib/utils'
import { SearchBar } from '@/components/ui/search-bar'

type RouteMeta = { crumbs: { label: string; href?: string }[]; action?: string; actionHref?: string }

/* ── Breadcrumb par route ─────────────────────────────── */
const ROUTE_META: Record<string, RouteMeta> = {
  '/dashboard':    { crumbs: [{ label: 'Accueil' }], action: 'Nouveau projet', actionHref: '/projects' },
  '/projects':     { crumbs: [{ label: 'Projets' }], action: 'Nouveau projet', actionHref: '/projects' },
  '/agents':       { crumbs: [{ label: 'Agents IA' }] },
  '/bibliotheque': { crumbs: [{ label: 'Bibliothèque' }] },
  '/documents':    { crumbs: [{ label: 'Documents' }], action: 'Importer', actionHref: '/documents' },
  '/activites':    { crumbs: [{ label: 'Activités' }] },
  '/missions':     { crumbs: [{ label: 'Missions IA' }], action: 'Nouvelle mission', actionHref: '/missions/new' },
  '/conversations':{ crumbs: [{ label: 'Conversations' }] },
  '/settings':     { crumbs: [{ label: 'Paramètres' }] },
}

function useRouteMeta(pathname: string, projects: MockProject[]): RouteMeta {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname]!

  // Routes projet dynamiques : /projects/[id]/...
  const projectMatch = pathname.match(/^\/projects\/([^/]+)(\/(.*))?$/)
  if (projectMatch) {
    const id = projectMatch[1]
    const sub = projectMatch[3] ?? ''
    const project = projects.find((p) => p.id === id)
    const projectLabel = project?.name ?? 'Projet'
    const SUB_LABELS: Record<string, string> = {
      documents: 'Documents', missions: 'Missions IA', planning: 'Planning',
      budget: 'Budget', activites: 'Activités', equipe: 'Équipe',
      rapports: 'Rapports', historique: 'Historique', parametres: 'Paramètres',
    }
    const crumbs: RouteMeta['crumbs'] = [
      { label: 'Projets', href: '/projects' },
      sub ? { label: projectLabel, href: `/projects/${id}` } : { label: projectLabel },
    ]
    if (sub && SUB_LABELS[sub]) crumbs.push({ label: SUB_LABELS[sub] })
    return { crumbs }
  }

  // Missions dynamiques : /missions/[id]/...
  const missionMatch = pathname.match(/^\/missions\/([^/]+)/)
  if (missionMatch) {
    if (missionMatch[1] === 'new') return { crumbs: [{ label: 'Missions IA', href: '/missions' }, { label: 'Nouvelle mission' }] }
    return { crumbs: [{ label: 'Missions IA', href: '/missions' }, { label: 'Détail mission' }] }
  }

  // Agents dynamiques : /agents/[id]
  const agentMatch = pathname.match(/^\/agents\/([^/]+)/)
  if (agentMatch) return { crumbs: [{ label: 'Agents IA', href: '/agents' }, { label: 'Détail agent' }] }

  // Conversations dynamiques
  const convMatch = pathname.match(/^\/conversations\/([^/]+)/)
  if (convMatch) return { crumbs: [{ label: 'Conversations', href: '/conversations' }, { label: 'Session' }] }

  // Préfixe le plus long (fallback)
  const key = Object.keys(ROUTE_META)
    .filter((k) => pathname.startsWith(k + '/'))
    .sort((a, b) => b.length - a.length)[0]
  return key ? ROUTE_META[key]! : { crumbs: [{ label: 'ADP Studio' }] }
}

export function AppHeader() {
  const pathname = usePathname()
  const { data: projects } = useProjects()
  const meta = useRouteMeta(pathname, projects ?? [])
  const { user } = useUser()
  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || 'U'
    : 'U'
  const displayName = user ? (user.fullName ?? user.emailAddresses[0]?.emailAddress ?? '') : ''

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-5">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-1 text-sm">
        <Link href="/dashboard" className="text-adp-muted hover:text-adp-slate transition-colors">
          Accueil
        </Link>
        {meta.crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            {c.href ? (
              <Link href={c.href} className="text-adp-muted hover:text-adp-slate transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className="font-medium text-adp-slate">{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* ── Search ── */}
      <SearchBar />

      {/* ── Actions droite ── */}
      <div className="flex items-center gap-2">
        {meta.action && meta.actionHref && (
          <Link
            href={meta.actionHref}
            className="flex items-center gap-1.5 rounded-lg bg-adp-blue px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-adp-blue-dark"
          >
            <Plus className="h-3.5 w-3.5" />
            {meta.action}
          </Link>
        )}

        <button
          className={cn(
            'relative flex h-8 w-8 items-center justify-center rounded-lg text-adp-muted',
            'transition-colors hover:bg-slate-50 hover:text-adp-slate'
          )}
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <Link
          href="/settings"
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg text-adp-muted',
            'transition-colors hover:bg-slate-50 hover:text-adp-slate',
            pathname === '/settings' && 'bg-slate-50 text-adp-slate'
          )}
          aria-label="Paramètres"
        >
          <Settings className="h-4 w-4" />
        </Link>

        {/* Avatar + déconnexion */}
        <SignOutButton redirectUrl="/login">
          <button className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-slate-50" title="Se déconnecter">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-adp-blue text-[12px] font-bold text-white">
              {initials}
            </div>
            <span className="hidden text-xs font-medium text-adp-slate md:block">
              {displayName}
            </span>
          </button>
        </SignOutButton>
      </div>
    </header>
  )
}
