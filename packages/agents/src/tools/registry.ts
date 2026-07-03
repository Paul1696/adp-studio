/**
 * Registre des outils disponibles pour les agents.
 * Les implémentations seront connectées lors de l'intégration API.
 */

export interface ToolDefinition {
  name: string
  description: string
  category: 'document' | 'bim' | 'project' | 'search' | 'report'
  inputSchema: Record<string, unknown>
}

export const AGENT_TOOLS: ToolDefinition[] = [
  {
    name: 'search_documents',
    description: 'Recherche dans la bibliothèque documentaire du projet',
    category: 'document',
    inputSchema: { query: 'string', projectId: 'string?', limit: 'number?' },
  },
  {
    name: 'get_project_info',
    description: 'Récupère les informations et métadonnées d\'un projet',
    category: 'project',
    inputSchema: { projectId: 'string' },
  },
  {
    name: 'analyze_ifc',
    description: 'Analyse un fichier IFC et retourne un rapport de structure',
    category: 'bim',
    inputSchema: { fileUrl: 'string', checks: 'string[]?' },
  },
  {
    name: 'generate_report',
    description: 'Génère un rapport structuré au format Markdown ou PDF',
    category: 'report',
    inputSchema: { type: 'string', data: 'object', format: 'string?' },
  },
  {
    name: 'search_regulations',
    description: 'Recherche dans la base de données réglementaire',
    category: 'search',
    inputSchema: { query: 'string', country: 'string?', category: 'string?' },
  },
]

export function getToolsByCategory(category: ToolDefinition['category']): ToolDefinition[] {
  return AGENT_TOOLS.filter((t) => t.category === category)
}

export function getToolByName(name: string): ToolDefinition | undefined {
  return AGENT_TOOLS.find((t) => t.name === name)
}
