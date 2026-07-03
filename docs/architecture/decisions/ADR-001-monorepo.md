# ADR-001 — Choix d'une architecture monorepo

**Date** : 2026-06-25  
**Statut** : Accepté

## Contexte

ADP Studio est composé d'une application web, d'un futur SDK public et de packages partagés (types, UI, agents). Il faut décider de l'organisation du code.

## Décision

Utiliser un **monorepo Turborepo + pnpm workspaces**.

## Justification

- Partage de types et utilitaires sans publication npm intermédiaire
- Refactoring cross-packages facilité (rename global, cohérence)
- CI unifié — un seul pipeline pour tester l'ensemble
- Cache Turborepo — builds incrementaux rapides
- Même DX que Vercel, Linear, Shadcn (références industrie)

## Conséquences

- Tous les packages vivent dans le même dépôt git
- pnpm obligatoire (workspaces)
- Turborepo gère l'orchestration des tâches
