# Workflow — Indexation automatique de documents

**Déclencheur** : Upload d'un nouveau document  
**Statut** : Spécification (à implémenter en Phase 3)

## Étapes

1. **Réception** — Document uploadé dans Supabase Storage
2. **Extraction** — Extraction du texte (PDF → text, DWG → metadata)
3. **Chunking** — Découpage en segments de 512 tokens
4. **Embedding** — Génération des vecteurs via API Claude
5. **Stockage** — Insertion dans `documents` (colonne `embedding`)
6. **Notification** — Notification in-app "Document indexé et prêt"

## Déclencheurs de ré-indexation

- Upload d'une nouvelle version du document
- Modification des métadonnées (tags, catégorie)
- Demande manuelle de l'utilisateur
