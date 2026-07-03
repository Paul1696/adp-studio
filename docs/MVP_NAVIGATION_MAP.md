# ADP Studio — Carte de navigation MVP

## Pages et routes

### Dashboard principal
| Route | Fichier | Rôle |
|-------|---------|------|
| `/` | `(marketing)/page.tsx` | Landing page publique |
| `/login` | `(auth)/login/page.tsx` | Connexion |
| `/dashboard` | `(dashboard)/dashboard/page.tsx` | Accueil utilisateur : actions rapides, projets récents, agents favoris |

### Projets
| Route | Fichier | Rôle |
|-------|---------|------|
| `/projects` | `projects/page.tsx` | Liste de tous les projets (grille + filtres) |
| `/projects/[id]` | `projects/[id]/page.tsx` | Vue générale du projet |
| `/projects/[id]/documents` | `projects/[id]/documents/page.tsx` | Documents du projet |
| `/projects/[id]/missions` | `projects/[id]/missions/page.tsx` | Missions IA du projet |
| `/projects/[id]/planning` | `projects/[id]/planning/page.tsx` | Gantt / planning |
| `/projects/[id]/budget` | `projects/[id]/budget/page.tsx` | Budget et postes de dépenses |
| `/projects/[id]/activites` | `projects/[id]/activites/page.tsx` | Activités et journal du projet |
| `/projects/[id]/equipe` | `projects/[id]/equipe/page.tsx` | Membres de l'équipe |
| `/projects/[id]/rapports` | `projects/[id]/rapports/page.tsx` | Rapports générés |
| `/projects/[id]/historique` | `projects/[id]/historique/page.tsx` | Historique des actions |
| `/projects/[id]/parametres` | `projects/[id]/parametres/page.tsx` | Paramètres du projet |

### Missions IA
| Route | Fichier | Rôle |
|-------|---------|------|
| `/missions` | `missions/page.tsx` | Liste de toutes les missions IA |
| `/missions/new` | `missions/new/page.tsx` | Wizard création mission (4 étapes) |
| `/missions/[id]` | `missions/[id]/page.tsx` | Détail d'une mission : steps, résultats, sidebar |

### Agents IA
| Route | Fichier | Rôle |
|-------|---------|------|
| `/agents` | `agents/page.tsx` | Liste des agents ADP par spécialité |
| `/agents/[id]` | `agents/[id]/page.tsx` | Fiche agent : stats, missions associées |

### Conversations
| Route | Fichier | Rôle |
|-------|---------|------|
| `/conversations` | `conversations/page.tsx` | Historique des conversations IA |
| `/conversations/[id]` | `conversations/[id]/page.tsx` | Session de conversation |

### Documents & Ressources
| Route | Fichier | Rôle |
|-------|---------|------|
| `/documents` | `documents/page.tsx` | Tous les documents (multi-projets) |
| `/bibliotheque` | `bibliotheque/page.tsx` | Bibliothèque de ressources partagées |
| `/resources` | redirect → `/bibliotheque` | Alias redirigé |

### Activités & Paramètres
| Route | Fichier | Rôle |
|-------|---------|------|
| `/activites` | `activites/page.tsx` | Journal global des activités |
| `/settings` | `settings/page.tsx` | Paramètres utilisateur et organisation |

---

## Parcours utilisateur principal

```
Landing (/)
  └── Accéder → /dashboard
        ├── Nouveau projet → /projects → /projects/[id]
        │     └── Onglets : Documents / Missions / Planning / Budget / Équipe / Rapports
        ├── Nouvelle mission → /missions/new (wizard 4 étapes)
        │     └── Résultat → /missions/[id]
        ├── Agents IA → /agents → /agents/[id]
        │     └── Lancer → /missions/new (pré-sélection agent)
        ├── Conversations → /conversations → /conversations/[id]
        ├── Documents → /documents
        ├── Bibliothèque → /bibliotheque
        ├── Activités → /activites
        └── Paramètres → /settings
```

## Liens entre pages

| Source | Cible | Déclencheur |
|--------|-------|-------------|
| `/dashboard` | `/projects` | "Voir tous les projets" |
| `/dashboard` | `/projects/[id]` | Clic sur card projet |
| `/dashboard` | `/missions/new` | Quick actions (Analyser, Estimer, Générer) |
| `/dashboard` | `/agents` | "Trouver une solution" |
| `/dashboard` | `/conversations` | "Discuter avec un expert" |
| `/projects` | `/projects/[id]` | Clic sur card "Ouvrir →" |
| `/projects/[id]` | `/projects/[id]/equipe` | "Voir tout" équipe |
| `/projects/[id]` | `/projects/[id]/activites` | "Voir tout" activités |
| `/missions` | `/missions/[id]` | Clic sur ligne mission |
| `/missions` | `/missions/new` | Bouton "Nouvelle mission" |
| `/agents` | `/agents/[id]` | Clic sur card agent |

## Données mockées (src/lib/mock-data.ts)

| Export | Contenu |
|--------|---------|
| `MOCK_PROJECTS` | 4 projets (Résidence, Médiathèque, Tour de bureaux, Musée) |
| `MOCK_USERS` | 10 membres d'équipe avec rôles |
| `CURRENT_USER` | Paul Etoundi Amougou (utilisateur connecté) |
| `MOCK_MISSIONS` | Missions IA (draft, running, completed) |
| `MOCK_AGENTS` | 9 agents spécialisés (Architecture, BIM, Économie…) |
| `MOCK_CONVERSATIONS` | 3 conversations IA |
| `MOCK_DOCUMENTS` | Documents multi-formats (DWG, IFC, PDF, RVT) |
| `MOCK_ACTIVITIES` | Journal d'activités par projet |
| `MOCK_TASKS` | Tâches de planning |
| `MOCK_PLANNING` | Phases Gantt |
| `MOCK_BUDGETS` | Postes budgétaires |
| `MOCK_REPORTS` | Rapports générés |
| `MOCK_TEAM_MEMBERS` | Membres équipe projets |

## Contraintes MVP

- Pas de backend — toutes les données viennent de `mock-data.ts`
- Pas de Supabase (structure prête dans `src/lib/services/supabase/`)
- Pas d'IA réelle — agents et missions sont simulés
- Les services abstraits (`src/lib/services/mock/`) permettront le swap Supabase sans toucher aux pages
