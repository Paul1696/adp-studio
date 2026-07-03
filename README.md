# ADP Studio

Plateforme SaaS collaborative pour architectes, BIM Managers, ingénieurs et professionnels de la construction.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript 5.6 (mode strict) |
| Styles | Tailwind CSS 3 |
| Composants | Shadcn UI + Radix UI |
| Icônes | Lucide React |
| État global | Zustand 5 |
| Données serveur | TanStack Query 5 |
| Build | Turborepo 2 |
| Package manager | pnpm 9 |
| Qualité | ESLint 9 + Prettier 3 |

---

## Architecture monorepo

```
ADP-STUDIO/
├── apps/
│   └── web/                    # Application Next.js 15
├── packages/
│   ├── ui/                     # Design system interne
│   ├── types/                  # Types TypeScript partagés
│   ├── shared/                 # Utils, constantes, validateurs
│   └── agents/                 # Prompts et outils IA
├── docs/                       # Documentation projet
├── database/                   # Migrations SQL (à venir)
├── prompts/                    # Prompts bruts des agents
└── workflows/                  # Définitions de workflows
```

---

## Démarrage rapide

```bash
# Prérequis : Node >= 20, pnpm >= 9

# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev

# Build de production
pnpm build

# Linting
pnpm lint

# Formatage
pnpm format
```

L'application démarre sur [http://localhost:3000](http://localhost:3000).

---

## Structure de `apps/web`

```
src/
├── app/
│   ├── (marketing)/            # Landing page publique
│   ├── (auth)/                 # Login, register
│   │   └── login/
│   └── (dashboard)/            # Espace de travail
│       ├── dashboard/
│       ├── projects/
│       ├── documents/
│       ├── agents/
│       ├── resources/
│       └── settings/
├── components/
│   ├── layout/                 # AppSidebar, AppHeader, Providers
│   ├── ui/                     # Composants réutilisables locaux
│   └── features/               # Composants métier
├── hooks/                      # Custom hooks React
├── lib/                        # Utils (cn, constants)
├── stores/                     # Stores Zustand
├── styles/                     # CSS global + tokens
└── types/                      # Types locaux à l'app
```

---

## Alias de chemins

Dans `apps/web`, les imports utilisent les alias suivants :

```typescript
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui.store'
import { Button } from '@adp-studio/ui'
import type { Project } from '@adp-studio/types'
import { formatDate } from '@adp-studio/shared'
```

| Alias | Résolution |
|---|---|
| `@/*` | `apps/web/src/*` |
| `@adp-studio/ui` | `packages/ui/src` |
| `@adp-studio/types` | `packages/types/src` |
| `@adp-studio/shared` | `packages/shared/src` |
| `@adp-studio/agents` | `packages/agents/src` |

---

## Conventions de code

### Nommage
- **Fichiers composants** : `kebab-case.tsx` (`app-sidebar.tsx`)
- **Fichiers stores** : `kebab-case.store.ts` (`ui.store.ts`)
- **Fichiers types** : `kebab-case.ts` (`project.ts`)
- **Composants React** : `PascalCase` (`AppSidebar`)
- **Fonctions utilitaires** : `camelCase` (`formatDate`)
- **Constantes** : `SCREAMING_SNAKE_CASE` (`QUERY_KEYS`)

### Composants
```typescript
// Server Component par défaut (pas de 'use client')
export default function ProjectsPage() { ... }

// Client Component uniquement si nécessaire
'use client'
export function ProjectCard() { ... }
```

### Imports — ordre conventionnel
```typescript
// 1. React / Next.js
import { useState } from 'react'
import Link from 'next/link'
// 2. Packages externes
import { useQuery } from '@tanstack/react-query'
// 3. Packages internes (@adp-studio/*)
import { Button } from '@adp-studio/ui'
import type { Project } from '@adp-studio/types'
// 4. Imports locaux (@/)
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui.store'
```

### Types
```typescript
// Préférer 'type' pour les imports de types
import type { Project } from '@adp-studio/types'

// Props de composants : interface locale
interface ProjectCardProps {
  project: Project
  className?: string
}
```

---

## Documentation

| Fichier | Contenu |
|---|---|
| `docs/01_Vision.md` | Vision produit et positionnement |
| `docs/02_Architecture.md` | Architecture technique détaillée |
| `docs/03_User_Flows.md` | Flux utilisateurs et permissions |
| `docs/04_Database.md` | Schéma de base de données |
| `docs/05_Agents.md` | Architecture des agents IA |
| `docs/06_Roadmap.md` | Roadmap et phases de développement |

---

## Statut

> **Phase 0 — Fondations** : structure de projet, configuration, types et composants de base.
> Aucune fonctionnalité backend ni intégration IA active à ce stade.
