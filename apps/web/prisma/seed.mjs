// Seed du catalogue d'agents ADP — idempotent (upsert par slug)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const AGENTS = [
  {
    slug: 'adp-architecte',
    name: 'ADP Architecte',
    category: 'Architecture & Réglementation',
    description:
      "Analyse les projets d'architecture, vérifie la conformité réglementaire (PLU, PMR, ERP) et formule des recommandations de conception.",
    model: 'claude-sonnet-4-6',
    competences: ['Réglementation PLU/PLUi', 'Accessibilité PMR', 'Sécurité incendie ERP', 'Bioclimatisme', 'RE2020'],
    tags: ['Architecture', 'Réglementation'],
  },
  {
    slug: 'adp-bim-manager',
    name: 'ADP BIM Manager',
    category: 'BIM & Coordination',
    description:
      'Analyse les maquettes IFC, détecte les conflits inter-disciplines et vérifie la conformité NF EN ISO 19650.',
    model: 'claude-sonnet-4-6',
    competences: ['IFC 2x3 & IFC4', 'Clash Detection', 'ISO 19650', 'Revit', 'ArchiCAD'],
    tags: ['BIM', 'Coordination'],
  },
  {
    slug: 'adp-quantbim',
    name: 'ADP QuanTBIM',
    category: 'Économie de la construction',
    description: 'Génère des estimations budgétaires, analyse les DPGF et détecte les incohérences de métrés.',
    model: 'claude-sonnet-4-6',
    competences: ['Estimation budgétaire', 'Analyse DPGF', 'Métrés', 'CCTP', 'Économie BIM'],
    tags: ['Économie', 'Quantités'],
  },
  {
    slug: 'adp-reduction',
    name: 'ADP Réduction',
    category: 'Optimisation & Valeur',
    description:
      'Identifie les optimisations de coûts sans dégrader la qualité du projet. Analyse valeur et substitutions.',
    model: 'claude-haiku-4-5-20251001',
    competences: ['Analyse valeur', 'Optimisation coûts', 'Substitutions matériaux', 'VE'],
    tags: ['Optimisation', 'Coûts'],
  },
  {
    slug: 'adp-controleur',
    name: 'ADP Contrôleur',
    category: 'Contrôle & Conformité',
    description:
      'Vérifie la conformité des documents de projet (plans, CCTP, DPGF) et signale les incohérences.',
    model: 'claude-sonnet-4-6',
    competences: ['Contrôle qualité', 'Cohérence documents', 'DTU', 'Normes EN'],
    tags: ['Contrôle', 'Qualité'],
  },
  {
    slug: 'adp-eco-conception',
    name: 'ADP Éco-Conception',
    category: 'Environnement & Durabilité',
    description:
      "Analyse l'impact environnemental du projet, propose des solutions bas-carbone et évalue les certifications.",
    model: 'claude-opus-4-8',
    competences: ['Bilan carbone', 'RE2020', 'HQE', 'BREEAM', 'Matériaux biosourcés'],
    tags: ['Environnement', 'Durabilité'],
  },
  {
    slug: 'adp-fluides',
    name: 'ADP Fluides',
    category: 'Fluides & CVC',
    description:
      'Assistant technique spécialisé en installations thermiques, plomberie, ventilation et électricité.',
    model: 'claude-sonnet-4-6',
    competences: ['CVC', 'Plomberie', 'Électricité', 'Thermique', 'RT2020'],
    tags: ['Fluides', 'Technique'],
  },
  {
    slug: 'adp-controle-metres',
    name: 'ADP Contrôle Métrés',
    category: 'Vérification quantités',
    description:
      'Compare les métrés entre disciplines, identifie les écarts et génère des rapports de contrôle.',
    model: 'claude-haiku-4-5-20251001',
    competences: ['Métrés', 'Comparaison disciplinaire', 'Écarts quantités'],
    tags: ['Métrés', 'Vérification'],
  },
  {
    slug: 'adp-urbain',
    name: 'ADP Urbain',
    category: 'Urbanisme & Aménagement',
    description: "Analyse les règles d'urbanisme, le PLU, les servitudes et les droits à construire.",
    model: 'claude-sonnet-4-6',
    competences: ['PLU / PLUi', 'COS / CES', 'Servitudes', 'Permis de construire', 'Recours'],
    tags: ['Urbanisme', 'Réglementation'],
  },
]

for (const agent of AGENTS) {
  await prisma.agent.upsert({
    where: { slug: agent.slug },
    update: agent,
    create: agent,
  })
}

const count = await prisma.agent.count()
console.log(`Seed terminé — ${count} agents en base.`)
await prisma.$disconnect()
