# 02 — Architecture Technique

## Vue d'ensemble

ADP Studio est une application **monorepo** organisée en packages découplés, deployable sur Vercel (frontend) et une infrastructure cloud managée (backend, à venir).

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTS                            │
│         Browser  │  Mobile (futur)  │  API publique     │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│                   apps/web (Next.js 15)                 │
│  App Router  │  RSC  │  Server Actions  │  API Routes   │
└─────────────────────────────────────────────────────────┘
                         │
┌────────────┬────────────┬────────────┬───────────────────┐
│  @adp/ui   │ @adp/types │ @adp/shared│  @adp/agents      │
│ Components │  TS Types  │  Utils     │  Prompts / Tools  │
└────────────┴────────────┴────────────┴───────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (à venir)                    │
│    Supabase (DB + Auth + Storage)  │  Edge Functions    │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│                  SERVICES EXTERNES                      │
│   Claude API  │  Revit API  │  ADP Tools  │  Webhooks   │
└─────────────────────────────────────────────────────────┘
```

---

## Monorepo — Structure des packages

| Package | Rôle |
|---|---|
| `apps/web` | Application Next.js 15 — interface utilisateur |
| `packages/ui` | Design system interne (composants Shadcn/Radix) |
| `packages/types` | Types TypeScript partagés entre tous les packages |
| `packages/shared` | Utilitaires, constantes, validateurs cross-packages |
| `packages/agents` | Prompts, outils et types des agents IA |

---

## Stack Frontend détaillée

| Couche | Technologie | Rôle |
|---|---|---|
| Framework | Next.js 15 (App Router) | Routing, SSR, RSC, Server Actions |
| Langage | TypeScript 5.6 (strict) | Typage statique complet |
| Styles | Tailwind CSS 3 | Utility-first CSS |
| Composants | Shadcn UI + Radix UI | Composants accessibles headless |
| Icônes | Lucide React | Icônes cohérentes et légères |
| État global | Zustand 5 | Store client léger et typé |
| Données serveur | TanStack Query 5 | Cache, synchronisation, mutations |
| Build | Turborepo 2 | Orchestration monorepo |
| Qualité | ESLint 9 + Prettier 3 | Linting et formatage automatiques |

---

## Conventions de routing (App Router)

```
app/
├── (marketing)/          # Groupe sans layout dashboard
│   └── page.tsx          # Landing page (/)
├── (auth)/               # Groupe authentification
│   ├── login/page.tsx
│   └── layout.tsx
├── (dashboard)/          # Groupe espace de travail
│   ├── dashboard/page.tsx
│   ├── projects/
│   │   ├── page.tsx      # Liste des projets
│   │   └── [id]/page.tsx # Détail d'un projet
│   ├── documents/page.tsx
│   ├── agents/page.tsx
│   └── layout.tsx        # Sidebar + Header
└── api/                  # API Routes Next.js
```

---

## Patterns de data fetching

```
RSC (Server Component)     → fetch() natif, pas de useEffect
Client Component + Query   → useQuery() pour données interactives
Server Actions             → mutations formulaires sans endpoint dédié
```

---

## Gestion d'état

```
Zustand stores
├── ui.store.ts      → sidebar, modals, préférences UI
├── user.store.ts    → utilisateur authentifié
└── project.store.ts → projet actif en cours (à venir)

React Query cache
├── projects         → liste et détails projets
├── documents        → bibliothèque documentaire
├── agents           → sessions et configurations
└── user             → profil et préférences
```

---

## Sécurité (à implémenter)

- Authentification via Supabase Auth (JWT)
- Row Level Security (RLS) sur toutes les tables
- RBAC : Owner / Admin / Editor / Viewer par organisation
- Validation entrées côté serveur (Zod)
- Headers sécurité : CSP, HSTS, X-Frame-Options via Next.js

---

## Déploiement cible

| Environnement | Infrastructure |
|---|---|
| Production | Vercel (Edge Network) |
| Base de données | Supabase (PostgreSQL + pgvector) |
| Stockage fichiers | Supabase Storage (S3-compatible) |
| CI/CD | GitHub Actions + Vercel Preview |
| Monitoring | Vercel Analytics + Sentry (à venir) |
