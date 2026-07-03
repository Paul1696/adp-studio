# Workflow — Validation IFC

**Déclencheur** : Upload d'un fichier `.ifc`  
**Statut** : Spécification (à implémenter en Phase 4)

## Étapes

1. **Détection** — Fichier IFC détecté à l'upload
2. **Parse** — Extraction de la structure IFC (entités, propriétés, relations)
3. **Validation ISO 19650** — Vérification nomenclature et métadonnées
4. **Clash detection** — Analyse des conflits géométriques entre disciplines
5. **Rapport** — Génération du rapport par l'agent BIM Analyst
6. **Sauvegarde** — Rapport sauvegardé dans les documents du projet
