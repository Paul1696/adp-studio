import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, FolderKanban, Bot, FileText, Users, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'ADP Studio — Plateforme IA pour architectes' }

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563EB]">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <span className="text-sm font-bold text-slate-900">ADP Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[15px] font-medium text-slate-500 hover:text-slate-900">
              Connexion
            </Link>
            <Link href="/dashboard" className="rounded-lg bg-[#2563EB] px-4 py-1.5 text-[15px] font-semibold text-white hover:bg-blue-700">
              Accéder →
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Features ── */}
      <FeaturesSection />

      {/* ── How it works ── */}
      <HowItWorksSection />

      {/* ── CTA final ── */}
      <CtaSection />

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 py-8 text-center text-[14px] text-slate-400">
        © 2024 Ateliers de Paul. Tous droits réservés.
      </footer>
    </main>
  )
}

// ── Features ────────────────────────────────────────────────

const FEATURES = [
  { icon: Zap,          title: 'Missions IA',       desc: 'Lancez des analyses complexes en quelques clics. Les agents travaillent en séquence et produisent des résultats structurés.',       color: 'text-[#2563EB]', bg: 'bg-blue-50' },
  { icon: FolderKanban, title: 'Gestion de projets', desc: 'Centralisez tous vos projets avec planning, budget, équipe et documents. Suivi en temps réel de chaque phase.',                   color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Bot,          title: '9 agents spécialisés', desc: 'Architecture, BIM, économie, environnement, fluides… chaque agent maîtrise son domaine et répond avec précision.',              color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: FileText,     title: 'Gestion documentaire', desc: 'DWG, IFC, PDF, RVT — tous vos formats supportés. Versioning, statuts et partage d\'équipe intégrés.',                           color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Users,        title: 'Collaboration équipe', desc: 'Invitez votre MOE, MOA et sous-traitants. Rôles granulaires, notifications et historique complet des actions.',                  color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: BarChart3,    title: 'Rapports automatiques', desc: 'Comptes-rendus, notes techniques, rapports de phase — générés et mis en forme automatiquement depuis vos données projet.',      color: 'text-teal-600', bg: 'bg-teal-50' },
]

function FeaturesSection() {
  return (
    <section className="bg-slate-50/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[14px] font-semibold uppercase tracking-widest text-[#2563EB]">Fonctionnalités</p>
          <h2 className="text-[36px] font-bold tracking-tight text-slate-900">Tout ce dont vous avez besoin</h2>
          <p className="mt-3 text-[16px] text-slate-500">Un espace unique pour piloter vos projets et vos agents IA.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-[16px] font-bold text-slate-900">{title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How it works ─────────────────────────────────────────────

const STEPS = [
  { n: '01', title: 'Décrivez votre objectif', desc: 'En une phrase, expliquez ce que vous souhaitez accomplir : analyser, estimer, vérifier, coordonner.' },
  { n: '02', title: 'Sélectionnez les agents', desc: 'Choisissez un ou plusieurs agents IA spécialisés. Chaque agent apporte son expertise métier au résultat.' },
  { n: '03', title: 'Obtenez vos résultats', desc: 'En moins d\'une minute, recevez une synthèse structurée, des recommandations et des documents prêts à l\'emploi.' },
]

function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[14px] font-semibold uppercase tracking-widest text-[#2563EB]">Comment ça marche</p>
          <h2 className="text-[36px] font-bold tracking-tight text-slate-900">Simple comme bonjour</h2>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/10">
                <span className="text-[21px] font-bold text-[#2563EB]">{n}</span>
              </div>
              <h3 className="mb-2 text-[16px] font-bold text-slate-900">{title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA final ────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="bg-[#0F172A] py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-[36px] font-bold text-white">Prêt à transformer votre pratique ?</h2>
        <p className="mt-4 text-[16px] leading-relaxed text-slate-400">
          Rejoignez les architectes et ingénieurs qui utilisent déjà ADP Studio pour aller plus vite.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/dashboard" className="rounded-xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white shadow-lg transition-all hover:bg-blue-500">
            Accéder à l&apos;application →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── App Mockup ───────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Tableau de bord', dot: 'bg-[#2563EB]', active: true  },
  { label: 'Projets',         dot: 'bg-violet-500', active: false },
  { label: 'Missions IA',     dot: 'bg-amber-400',  active: false },
  { label: 'Agents IA',       dot: 'bg-emerald-500',active: false },
  { label: 'Documents',       dot: 'bg-rose-400',   active: false },
  { label: 'Activités',       dot: 'bg-teal-400',   active: false },
]

function MockSidebar() {
  return (
    <div className="flex w-[14%] shrink-0 flex-col bg-[#0f172a] py-3">
      {/* Logo */}
      <div className="mb-5 flex items-center gap-1.5 px-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#2563EB] shadow-sm shadow-blue-500/40">
          <span className="text-[11px] font-black text-white">A</span>
        </div>
        <span className="text-[11px] font-bold tracking-tight text-white">ADP Studio</span>
      </div>
      {/* Nav */}
      <div className="space-y-0.5 px-2">
        {NAV_ITEMS.map(({ label, dot, active }) => (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[7px] font-medium transition-colors ${
              active
                ? 'bg-white/10 text-white'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${active ? dot : 'bg-slate-600'}`} />
            {label}
            {active && <div className="ml-auto h-3 w-0.5 rounded-full bg-[#2563EB]" />}
          </div>
        ))}
      </div>
      {/* User */}
      <div className="mt-auto border-t border-white/[0.08] px-2 pt-3">
        <div className="flex items-center gap-2 rounded-lg bg-white/5 p-1.5">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[6px] font-black text-white shadow-sm">PE</div>
          <div className="min-w-0">
            <p className="truncate text-[7px] font-semibold text-white">Paul Etoundi</p>
            <p className="text-[5.5px] text-slate-400">Architecte Principal</p>
          </div>
          <div className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
        </div>
      </div>
    </div>
  )
}

function MockHeader() {
  return (
    <div className="flex h-8 items-center justify-between border-b border-slate-200 bg-white px-3">
      <div className="flex items-center gap-1.5">
        <span className="text-[7px] text-slate-400">Tableau de bord</span>
        <span className="text-[7px] text-slate-300">/</span>
        <span className="text-[7px] font-semibold text-slate-700">Accueil</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-[#2563EB] px-2 py-0.5 text-[7px] font-semibold text-white">+ Nouvelle mission</div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-[7px] font-bold text-white">PE</div>
      </div>
    </div>
  )
}

const MOCK_STATS = [
  { label: 'Projets actifs',    value: '7',    trend: '+2',  up: true,  iconBg: 'bg-blue-50',    iconDot: 'bg-[#2563EB]',   trendCls: 'text-emerald-600' },
  { label: 'Missions IA',       value: '34',   trend: '+8',  up: true,  iconBg: 'bg-violet-50',  iconDot: 'bg-violet-500',  trendCls: 'text-emerald-600' },
  { label: 'Documents',         value: '284',  trend: '+12', up: true,  iconBg: 'bg-emerald-50', iconDot: 'bg-emerald-500', trendCls: 'text-emerald-600' },
  { label: 'Satisfaction',      value: '97%',  trend: '+3%', up: true,  iconBg: 'bg-amber-50',   iconDot: 'bg-amber-500',   trendCls: 'text-emerald-600' },
]

function MockStatCards() {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {MOCK_STATS.map(({ label, value, trend, up, iconBg, iconDot, trendCls }) => (
        <div key={label} className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
          <div className={`mb-1.5 flex h-5 w-5 items-center justify-center rounded-md ${iconBg}`}>
            <div className={`h-2 w-2 rounded-sm ${iconDot}`} />
          </div>
          <div className="flex items-end justify-between">
            <p className="text-[13px] font-bold leading-none text-slate-800">{value}</p>
            <span className={`text-[6px] font-semibold ${trendCls}`}>{up ? '▲' : '▼'} {trend}</span>
          </div>
          <p className="mt-0.5 text-[6px] font-medium text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  )
}

const QUICK_ACTIONS_MOCK = [
  { label: 'Analyser doc',    bg: 'bg-blue-50',   txt: 'text-[#2563EB]', bar: 'bg-[#2563EB]' },
  { label: 'Estimer budget',  bg: 'bg-violet-50', txt: 'text-violet-600', bar: 'bg-violet-500' },
  { label: 'Générer rapport', bg: 'bg-emerald-50',txt: 'text-emerald-600',bar: 'bg-emerald-500' },
]

function MockQuickActions() {
  return (
    <div className="flex gap-1.5">
      {QUICK_ACTIONS_MOCK.map(({ label, bg, txt, bar }) => (
        <div key={label} className={`flex flex-1 items-center gap-1.5 rounded-lg border border-slate-200/80 ${bg} px-2 py-1.5`}>
          <div className={`h-3 w-1 shrink-0 rounded-full ${bar}`} />
          <span className={`text-[6.5px] font-semibold ${txt}`}>{label}</span>
          <span className="ml-auto text-[7px] text-slate-300">→</span>
        </div>
      ))}
    </div>
  )
}

const MOCK_PROJECTS = [
  { name: 'Résidence Les Acacias', type: 'Résidentiel', phase: 'APD', progress: 68, gradient: 'from-blue-400 to-blue-600', status: 'En cours', statusCls: 'bg-emerald-100 text-emerald-700' },
  { name: 'Médiathèque Centrale',  type: 'ERP',         phase: 'PRO', progress: 45, gradient: 'from-violet-400 to-violet-600', status: 'En cours', statusCls: 'bg-emerald-100 text-emerald-700' },
  { name: 'Tour de Bureaux Nord',  type: 'Tertiaire',   phase: 'DCE', progress: 82, gradient: 'from-emerald-400 to-emerald-600', status: 'En pause', statusCls: 'bg-amber-100 text-amber-700' },
]

const AVATAR_COLORS = ['bg-[#2563EB]','bg-violet-500','bg-emerald-500','bg-amber-500']

function MockProjectCard({ name, type, phase, progress, gradient, status, statusCls }: typeof MOCK_PROJECTS[number]) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
      <div className={`relative h-12 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute left-1.5 top-1">
          <span className="rounded bg-white/20 px-1 py-0.5 text-[6px] font-bold text-white backdrop-blur-sm">{phase}</span>
        </div>
        <div className="absolute right-1.5 top-1">
          <span className={`rounded px-1 py-0.5 text-[6px] font-semibold ${statusCls}`}>{status}</span>
        </div>
        <div className="absolute bottom-1 left-1.5 right-1.5">
          <p className="truncate text-[7px] font-bold text-white">{name}</p>
          <p className="text-[5.5px] text-white/60">{type}</p>
        </div>
      </div>
      <div className="p-1.5">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex -space-x-1">
            {AVATAR_COLORS.slice(0,3).map((c,i) => (
              <div key={i} className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white text-[4px] font-bold text-white ${c}`}>
                {String.fromCharCode(65+i)}
              </div>
            ))}
          </div>
          <span className="text-[6px] font-bold text-[#2563EB]">{progress}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

function MockProjectGrid() {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[8px] font-semibold text-slate-700">Projets récents</p>
        <span className="text-[7px] text-[#2563EB]">Voir tout →</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {MOCK_PROJECTS.map((p) => <MockProjectCard key={p.name} {...p} />)}
      </div>
    </div>
  )
}

const MOCK_AGENTS = [
  { icon: '🏛️', name: 'ArchiDesign',  specialty: 'Architecture',  color: 'bg-blue-100' },
  { icon: '📐', name: 'BIM Master',   specialty: 'Coordination',  color: 'bg-violet-100' },
  { icon: '💰', name: 'EconoBuilder', specialty: 'Économie',      color: 'bg-emerald-100' },
]

const MOCK_ACTIVITIES = [
  { label: 'Plan masse téléchargé',        time: 'Il y a 5 min',  dot: 'bg-blue-500' },
  { label: 'Mission BIM terminée',          time: 'Il y a 23 min', dot: 'bg-emerald-500' },
  { label: 'Rapport APD généré',            time: 'Il y a 1h',     dot: 'bg-violet-500' },
]

function MockRightPanel() {
  return (
    <div className="flex w-[23%] shrink-0 flex-col gap-2.5 border-l border-slate-200 bg-white p-2.5">
      {/* Mission en cours */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-2">
        <div className="mb-1 flex items-center gap-1">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
          <p className="text-[6.5px] font-semibold text-blue-700">Mission en cours</p>
        </div>
        <p className="mb-1.5 text-[7px] font-semibold text-slate-700">Analyse BIM — Médiathèque</p>
        <div className="mb-1 h-1 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full w-[62%] rounded-full bg-blue-500" />
        </div>
        <p className="text-[5.5px] text-blue-600">Étape 3/5 · 62% — BIM Master</p>
      </div>

      {/* Agents */}
      <div>
        <p className="mb-1 text-[7px] font-semibold text-slate-600">Agents favoris</p>
        <div className="space-y-1">
          {MOCK_AGENTS.map(({ icon, name, specialty, color }) => (
            <div key={name} className="flex items-center gap-1.5 rounded-md border border-slate-100 bg-slate-50/60 p-1.5">
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] ${color}`}>{icon}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[7px] font-semibold text-slate-700">{name}</p>
                <p className="text-[5.5px] text-slate-400">{specialty}</p>
              </div>
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Activités */}
      <div>
        <p className="mb-1 text-[7px] font-semibold text-slate-600">Activité récente</p>
        <div className="space-y-1.5">
          {MOCK_ACTIVITIES.map(({ label, time, dot }) => (
            <div key={label} className="flex items-start gap-1.5">
              <div className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
              <div>
                <p className="text-[6.5px] font-medium text-slate-700">{label}</p>
                <p className="text-[5.5px] text-slate-400">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AppMockup() {
  return (
    <div className="flex h-80 overflow-hidden bg-[#f8fafc]">
      <MockSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <MockHeader />
        <div className="flex flex-1 overflow-hidden">
          {/* Main */}
          <div className="flex-1 space-y-2 overflow-hidden p-3">
            <MockStatCards />
            <MockQuickActions />
            <MockProjectGrid />
          </div>
          {/* Right panel */}
          <MockRightPanel />
        </div>
      </div>
    </div>
  )
}

// ── Hero ────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
        <Zap className="h-3.5 w-3.5 text-[#2563EB]" strokeWidth={2} />
        <span className="text-[14px] font-semibold text-[#2563EB]">Version bêta — Accès anticipé disponible</span>
      </div>

      {/* Titre */}
      <h1 className="mx-auto max-w-3xl text-[52px] font-bold leading-[1.1] tracking-tight text-slate-900">
        La plateforme IA pour{' '}
        <span className="text-[#2563EB]">architectes et ingénieurs</span>
      </h1>

      {/* Sous-titre */}
      <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-slate-500">
        ADP Studio centralise vos projets, documents et agents IA spécialisés en un seul espace.
        Analysez, estimez, coordonnez — en quelques secondes.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-[16px] font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg"
        >
          Accéder à l&apos;application
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
        <Link
          href="/agents"
          className="rounded-xl border border-slate-200 px-6 py-3 text-[16px] font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
        >
          Découvrir les agents IA
        </Link>
      </div>

      {/* Social proof */}
      <div className="mt-10 flex items-center justify-center gap-6 text-[14px] text-slate-400">
        {['9 agents IA spécialisés', '7 projets actifs', '284 Go de documents', '342 sessions ce mois'].map((item) => (
          <div key={item} className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
            {item}
          </div>
        ))}
      </div>

      {/* App mockup */}
      <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60">
        {/* Browser chrome */}
        <div className="flex h-8 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4">
          {['bg-red-400', 'bg-yellow-400', 'bg-emerald-400'].map((c) => (
            <div key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />
          ))}
          <div className="mx-auto w-48 rounded-md bg-slate-200 py-0.5 text-center text-[12px] text-slate-400">
            studio.ateliersdepaul.com
          </div>
        </div>
        {/* Dashboard UI mockup */}
        <AppMockup />
      </div>
    </section>
  )
}
