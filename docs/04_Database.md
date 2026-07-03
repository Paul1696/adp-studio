# 04 — Base de Données

> **Statut** : Schéma conceptuel — implémentation Supabase/PostgreSQL à venir.

## Moteur & hébergement

- **PostgreSQL** via Supabase
- Extension **pgvector** pour les embeddings des agents IA
- **Row Level Security (RLS)** activé sur toutes les tables
- Migrations gérées via `supabase/migrations/`

---

## Schéma entités-relations (simplifié)

```
organizations ──< org_members >── users
      │
      ├──< projects
      │         │
      │         ├──< project_members >── users
      │         ├──< documents
      │         │         └──< document_versions
      │         ├──< agent_sessions
      │         │         └──< agent_messages
      │         └──< activities
      │
      └──< agents (templates org)
```

---

## Tables principales

### `organizations`
| Colonne | Type | Description |
|---|---|---|
| id | uuid PK | Identifiant unique |
| name | text | Nom de l'organisation |
| slug | text UNIQUE | Slug URL |
| plan | text | starter / pro / enterprise |
| settings | jsonb | Configuration organisation |
| created_at | timestamptz | Date de création |

### `users` (géré par Supabase Auth)
| Colonne | Type | Description |
|---|---|---|
| id | uuid PK | Identifiant Supabase Auth |
| email | text UNIQUE | Email vérifié |
| full_name | text | Nom complet |
| avatar_url | text | URL avatar |
| profession | text | Métier (architect, bim_manager…) |
| preferences | jsonb | Langue, thème, notifications |
| created_at | timestamptz | |

### `projects`
| Colonne | Type | Description |
|---|---|---|
| id | uuid PK | |
| organization_id | uuid FK | Référence organisation |
| name | text | Nom du projet |
| reference | text | Référence interne |
| type | text | residential / commercial… |
| phase | text | pre_design / schematic… |
| status | text | active / archived… |
| address | jsonb | Adresse et coordonnées |
| bim_enabled | boolean | Module BIM activé |
| metadata | jsonb | Données complémentaires |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `documents`
| Colonne | Type | Description |
|---|---|---|
| id | uuid PK | |
| project_id | uuid FK | Projet parent (nullable) |
| organization_id | uuid FK | |
| name | text | Nom du document |
| category | text | plans / specs / reports… |
| format | text | pdf / dwg / rvt / ifc… |
| current_version_id | uuid FK | Version active |
| status | text | active / archived |
| tags | text[] | Tags libres |
| embedding | vector(1536) | Embedding pour recherche sémantique |
| created_at | timestamptz | |

### `document_versions`
| Colonne | Type | Description |
|---|---|---|
| id | uuid PK | |
| document_id | uuid FK | |
| version_number | text | ex: "A", "B", "01" |
| file_path | text | Chemin Supabase Storage |
| file_size | bigint | Taille en octets |
| uploaded_by | uuid FK | Utilisateur |
| metadata | jsonb | Pages, révision, discipline… |
| created_at | timestamptz | |

### `agents`
| Colonne | Type | Description |
|---|---|---|
| id | uuid PK | |
| organization_id | uuid FK | |
| name | text | Nom de l'agent |
| specialty | text | bim_analyst / compliance… |
| model | text | Modèle Claude utilisé |
| system_prompt | text | Prompt système personnalisé |
| tools | jsonb | Outils activés |
| status | text | active / inactive |
| created_at | timestamptz | |

### `agent_sessions`
| Colonne | Type | Description |
|---|---|---|
| id | uuid PK | |
| agent_id | uuid FK | |
| user_id | uuid FK | |
| project_id | uuid FK | Contexte projet (nullable) |
| status | text | active / completed / error |
| total_tokens | integer | Tokens consommés |
| created_at | timestamptz | |
| completed_at | timestamptz | |

### `agent_messages`
| Colonne | Type | Description |
|---|---|---|
| id | uuid PK | |
| session_id | uuid FK | |
| role | text | user / assistant / system |
| content | text | Contenu du message |
| tokens_used | integer | |
| created_at | timestamptz | |

---

## Politiques RLS (exemples)

```sql
-- Un utilisateur ne voit que les projets de son organisation
CREATE POLICY "projects_org_isolation" ON projects
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM org_members WHERE user_id = auth.uid()
    )
  );

-- Un utilisateur ne voit que ses propres sessions d'agents
CREATE POLICY "agent_sessions_owner" ON agent_sessions
  FOR ALL USING (user_id = auth.uid());
```

---

## Indexes prévus

```sql
CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_documents_embedding ON documents USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_agent_sessions_user ON agent_sessions(user_id);
CREATE INDEX idx_agent_messages_session ON agent_messages(session_id);
```
