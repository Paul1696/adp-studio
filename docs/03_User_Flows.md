# 03 — Flux Utilisateurs

## Flux d'authentification

```
[Landing Page]
      │
      ▼
[Clic "Se connecter"]
      │
      ▼
[Page /login]
  ├── Email + Mot de passe
  └── SSO (Google / Microsoft) ← futur
      │
      ▼
[Vérification Auth]
  ├── Succès → [Dashboard /dashboard]
  └── Échec  → Message d'erreur + retry
```

---

## Flux — Création d'un projet

```
[Dashboard]
      │
      ▼
[Clic "Nouveau projet"]
      │
      ▼
[Modal / Page de création]
  ├── Nom du projet *
  ├── Référence interne *
  ├── Type (Résidentiel, Tertiaire...)
  ├── Phase (Esquisse, APD, PRO...)
  ├── Adresse
  └── Activation BIM
      │
      ▼
[Création → Redirection /projects/[id]]
      │
      ▼
[Tableau de bord projet]
  ├── Résumé + Membres
  ├── Documents associés
  └── Agents IA du projet
```

---

## Flux — Gestion documentaire

```
[Section Documents]
      │
      ▼
[Navigation par projet / catégorie]
      │
  ┌───┴────────────────┐
  ▼                    ▼
[Upload document]    [Recherche]
  ├── Drag & drop      ├── Full-text
  ├── Métadonnées      ├── Filtres (type, date)
  └── Tag + version    └── Résultats
      │
      ▼
[Fiche document]
  ├── Visualiseur PDF / DWG
  ├── Historique des versions
  ├── Commentaires
  └── Partage / Droits d'accès
```

---

## Flux — Agent IA

```
[Section Agents]
      │
      ▼
[Sélection d'un agent]
  ├── BIM Analyst
  ├── Conformité réglementaire
  ├── Analyseur de documents
  └── Générateur de rapports
      │
      ▼
[Interface de conversation]
  ├── Context = projet actif
  ├── Accès aux documents du projet
  └── Outils disponibles selon spécialité
      │
      ▼
[Résultat agent]
  ├── Réponse textuelle
  ├── Rapport généré (PDF/MD)
  └── Sauvegarde dans les documents
```

---

## Flux — Collaboration

```
[Espace Organisation]
      │
      ▼
[Inviter un collaborateur]
  ├── Email
  └── Rôle (Admin / Éditeur / Lecteur)
      │
      ▼
[Email d'invitation]
      │
      ▼
[Acceptation → Accès projet]
      │
      ▼
[Activité en temps réel]
  ├── Notifications in-app
  ├── Commentaires sur documents
  └── Historique d'activité
```

---

## États d'un projet

```
[Brouillon] → [Actif] → [En pause] → [Archivé]
                 │
                 └──► [Réception] (phase finale)
```

---

## Permissions par rôle

| Action | Owner | Admin | Editor | Viewer |
|---|:---:|:---:|:---:|:---:|
| Créer un projet | ✓ | ✓ | — | — |
| Modifier le projet | ✓ | ✓ | ✓ | — |
| Uploader des documents | ✓ | ✓ | ✓ | — |
| Supprimer des documents | ✓ | ✓ | — | — |
| Utiliser les agents IA | ✓ | ✓ | ✓ | ✓ |
| Gérer les membres | ✓ | ✓ | — | — |
| Supprimer le projet | ✓ | — | — | — |
| Gérer la facturation | ✓ | — | — | — |
