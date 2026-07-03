# 05 — Agents IA

> **Statut** : Architecture définie — intégration API Claude à venir.

## Modèle utilisé

ADP Studio utilise l'API **Anthropic Claude** comme moteur de tous les agents IA.

| Modèle | Usage |
|---|---|
| `claude-sonnet-4-6` | Agent principal — bon équilibre vitesse/qualité |
| `claude-opus-4-8` | Analyses complexes, documents longs, BIM critique |
| `claude-haiku-4-5-20251001` | Tâches simples, suggestions rapides, autocomplete |

---

## Agents disponibles (v1)

### 1. BIM Analyst
**Spécialité** : Analyse et contrôle qualité de maquettes numériques

Capacités :
- Analyse de fichiers IFC (structure, disciplines, nomenclature)
- Détection de conflits entre lots
- Vérification de la conformité NF EN ISO 19650
- Génération de rapports de contrôle qualité BIM

Outils : `analyze_ifc`, `search_documents`, `generate_report`

---

### 2. Conformité Réglementaire
**Spécialité** : Vérification de la conformité aux réglementations françaises

Capacités :
- Analyse PLU / PLUi et règles d'urbanisme
- Vérification accessibilité PMR (Loi 2005-102)
- Conformité sécurité incendie ERP / IGH
- Conformité thermique RE2020
- Vérification DTU applicables

Outils : `search_regulations`, `search_documents`, `generate_report`

---

### 3. Analyseur de Documents
**Spécialité** : Extraction et analyse de documents techniques

Capacités :
- Analyse de CCTP, DPGF, BPU
- Extraction de quantités et données techniques
- Détection d'incohérences entre pièces écrites et plans
- Comparaison de versions de documents
- Résumé de documents volumineux

Outils : `search_documents`, `generate_report`

---

### 4. Générateur de Rapports
**Spécialité** : Production automatisée de documents projet

Capacités :
- Comptes-rendus de réunions (OPR, réunions de chantier)
- Rapports d'avancement hebdomadaires / mensuels
- Notes de synthèse technique
- Bilans financiers simplifiés
- Supports de présentation MOA

Outils : `get_project_info`, `search_documents`, `generate_report`

---

### 5. Coordinateur de Projet *(v2)*
**Spécialité** : Assistance à la gestion et coordination de projet

Capacités :
- Analyse de plannings et identification de risques
- Suivi des réserves et levées de réserves
- Gestion des interfaces entre corps d'état
- Alertes sur jalons critiques

---

### 6. Expert Revit *(v2)*
**Spécialité** : Assistance aux tâches Revit et workflows BIM

Capacités :
- Aide à la création de familles Revit
- Optimisation de modèles Revit
- Scripts Dynamo pour automatisation
- Intégration avec ADP Tools

---

## Architecture multi-agents

```
Utilisateur
    │
    ▼
[Orchestrateur]
    ├── Sélectionne le/les agents adaptés
    ├── Injecte le contexte projet
    └── Coordonne les résultats
         │
         ├──► [BIM Analyst]
         ├──► [Conformité]
         ├──► [Analyseur Docs]
         └──► [Rapport Generator]
                    │
                    ▼
              [Résultat consolidé]
                    │
                    ▼
             [Sauvegarde auto
              dans Documents]
```

---

## Contexte injecté dans chaque session

```typescript
interface AgentContext {
  project: {
    name: string
    phase: ProjectPhase
    type: ProjectType
    address: ProjectAddress
  }
  documents: {
    id: string
    name: string
    category: string
    summary?: string  // résumé pré-calculé
  }[]
  user: {
    name: string
    profession: UserProfession
    preferences: UserPreferences
  }
  organization: {
    name: string
    customInstructions?: string
  }
}
```

---

## Sécurité & contrôle

- Aucune donnée projet envoyée sans consentement explicite
- Possibilité de désactiver les agents sur un projet
- Logs de toutes les sessions (tokens, coût, contenu)
- Limite de tokens configurable par plan
- Possibilité d'exclure certains documents du contexte
