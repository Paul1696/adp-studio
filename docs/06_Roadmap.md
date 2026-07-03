# 06 — Roadmap

## Phases de développement

---

### Phase 0 — Fondations *(actuel)*
> Objectif : base de code propre, scalable, prête pour le développement

- [x] Monorepo Turborepo configuré
- [x] Next.js 15 App Router + TypeScript strict
- [x] Design system Shadcn UI + Tailwind CSS
- [x] Packages partagés : types, shared, ui, agents
- [x] Architecture de routing (marketing / auth / dashboard)
- [x] Stores Zustand (UI, User)
- [x] React Query configuré
- [x] Documentation initiale (Vision, Architecture, DB, Agents)
- [ ] Storybook pour le package UI
- [ ] Tests unitaires (Vitest)

---

### Phase 1 — Auth & Workspace *(T3 2026)*
> Objectif : première version utilisable avec authentification réelle

- [ ] Supabase project setup + migrations
- [ ] Authentification (email/password + magic link)
- [ ] Gestion des organisations (création, invitations)
- [ ] Profil utilisateur (édition, avatar, profession)
- [ ] Onboarding guidé (premier projet)
- [ ] Thème clair/sombre persistant
- [ ] Dashboard avec métriques réelles

---

### Phase 2 — Gestion de Projets *(T4 2026)*
> Objectif : cœur fonctionnel — projets et documents

- [ ] CRUD projets complet
- [ ] Membres et permissions par projet (RBAC)
- [ ] Upload et versioning de documents
- [ ] Visualiseur PDF intégré
- [ ] Recherche full-text dans les documents
- [ ] Système de tags et catégorisation
- [ ] Activité / audit log par projet
- [ ] Notifications in-app

---

### Phase 3 — Agents IA *(T1 2027)*
> Objectif : intégration Claude API, premier agent fonctionnel

- [ ] Intégration Claude API (claude-sonnet-4-6)
- [ ] Agent "Analyseur de Documents" (v1)
- [ ] Agent "Générateur de Rapports" (v1)
- [ ] Interface de conversation contextualisée
- [ ] Sauvegarde des sessions et outputs
- [ ] Comptage et gestion des tokens/coûts
- [ ] Embeddings documents (pgvector)

---

### Phase 4 — BIM & Intégrations *(T2 2027)*
> Objectif : ouverture vers l'écosystème BIM

- [ ] Visualiseur IFC (via ifc.js ou Forge Viewer)
- [ ] Agent "BIM Analyst" (analyse IFC)
- [ ] Import/Export IFC
- [ ] Connecteur ADP Tools (plugin Revit)
- [ ] API webhooks pour automatisations
- [ ] Intégration Autodesk Construction Cloud (ACC)

---

### Phase 5 — Scale & Enterprise *(T3–T4 2027)*
> Objectif : montée en charge et marché enterprise

- [ ] SSO (SAML 2.0 / Azure AD)
- [ ] API publique REST + documentation OpenAPI
- [ ] Marketplace d'agents (communauté)
- [ ] Module de reporting avancé (BI)
- [ ] Audit trail complet (ISO 27001)
- [ ] Déploiement on-premise (option Enterprise)
- [ ] Mobile app (React Native) — consultation seule

---

## Conventions de versioning

```
MAJOR.MINOR.PATCH

0.x.x  → Phase 0 (fondations)
1.x.x  → Phase 1–2 (auth + projets)
2.x.x  → Phase 3 (agents IA)
3.x.x  → Phase 4 (BIM)
```

---

## KPIs cibles (12 mois après lancement)

| Indicateur | Cible |
|---|---|
| Utilisateurs actifs mensuels | 500 |
| Projets créés | 1 000 |
| Documents indexés | 50 000 |
| Sessions agents IA | 10 000/mois |
| Taux de rétention M1 | > 60% |
| NPS | > 45 |
