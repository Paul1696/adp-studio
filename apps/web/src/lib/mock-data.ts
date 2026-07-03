// ─────────────────────────────────────────────────────────────
// ADP Studio — Données fictives de démonstration
// ─────────────────────────────────────────────────────────────
import type { Mission, Conversation, Task, PlanningPhase, Budget, Report, TeamMember } from './types'

// ══════════════════════════════════════════════════════════════
// UTILISATEURS
// ══════════════════════════════════════════════════════════════

export interface MockUser {
  id: string
  fullName: string
  initials: string
  email: string
  role: 'owner' | 'admin' | 'editor' | 'viewer'
  profession: string
  avatarColor: string // classe Tailwind bg-*
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'u1',
    fullName: 'Paul Figueras',
    initials: 'PF',
    email: 'paul.figueras@ateliersdepaul.com',
    role: 'owner',
    profession: 'Architecte DPLG',
    avatarColor: 'bg-adp-blue',
  },
  {
    id: 'u2',
    fullName: 'Serge Manager',
    initials: 'SM',
    email: 'serge.manager@ateliersdepaul.com',
    role: 'admin',
    profession: 'BIM Manager',
    avatarColor: 'bg-violet-500',
  },
  {
    id: 'u3',
    fullName: 'Marie Tchiou',
    initials: 'MT',
    email: 'marie.tchiou@ateliersdepaul.com',
    role: 'editor',
    profession: 'Architecte',
    avatarColor: 'bg-emerald-500',
  },
  {
    id: 'u4',
    fullName: 'Charles Ateba',
    initials: 'CA',
    email: 'charles.ateba@ateliersdepaul.com',
    role: 'editor',
    profession: 'Ingénieur Structure',
    avatarColor: 'bg-orange-500',
  },
  {
    id: 'u5',
    fullName: 'Fichor Mbouvet',
    initials: 'FM',
    email: 'fichor.mbouvet@ateliersdepaul.com',
    role: 'editor',
    profession: 'Dessinateur Projeteur',
    avatarColor: 'bg-pink-500',
  },
  {
    id: 'u6',
    fullName: 'Brian Toko',
    initials: 'BT',
    email: 'brian.toko@ateliersdepaul.com',
    role: 'viewer',
    profession: 'Chef de Chantier',
    avatarColor: 'bg-teal-500',
  },
  {
    id: 'u7',
    fullName: 'Amina Nkoa',
    initials: 'AN',
    email: 'amina.nkoa@ateliersdepaul.com',
    role: 'viewer',
    profession: 'Économiste de la Construction',
    avatarColor: 'bg-rose-500',
  },
]

export const CURRENT_USER = MOCK_USERS[0]!

export interface MockProject {
  id: string
  name: string
  type: string
  phase: string
  status: 'en_cours' | 'en_pause' | 'termine' | 'archive'
  statusLabel: string
  surface: number
  budget: string
  progress: number
  startDate: string
  endDate: string
  location: string
  reference: string
  description: string
  image: string
  members: string[]
  bimEnabled: boolean
  apdStage: string
}

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: 'p1',
    name: 'Projet Kribi',
    type: 'Résidentiel',
    phase: 'PRO',
    status: 'en_cours',
    statusLabel: 'En cours',
    surface: 875,
    budget: '1,2 Md FCFA',
    progress: 67,
    startDate: '12 Janv. 2024',
    endDate: '30 Sept. 2025',
    location: 'Kribi, Cameroun',
    reference: 'APD',
    description: "Construction d'un complexe résidentiel haut standing face à l'Océan Atlantique. Le projet comprend 12 villas individuelles avec piscines et espaces communs paysagers.",
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    members: ['u1','u2','u3','u4','u5'],
    bimEnabled: true,
    apdStage: 'APD',
  },
  {
    id: 'p2',
    name: 'BCEC Bafoussam',
    type: 'Tertiaire',
    phase: 'DCE',
    status: 'en_cours',
    statusLabel: 'En cours',
    surface: 4200,
    budget: '3,8 Md FCFA',
    progress: 45,
    startDate: '3 Mars 2023',
    endDate: '15 Déc. 2025',
    location: 'Bafoussam, Cameroun',
    reference: 'DCE',
    description: "Bureau Central Économique du Centre — immeuble mixte bureaux/commerces sur 8 niveaux avec parking souterrain.",
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    members: ['u1','u2','u4','u6'],
    bimEnabled: true,
    apdStage: 'DCE',
  },
  {
    id: 'p3',
    name: 'Musée ESAPO Joël',
    type: 'Culturel',
    phase: 'APS',
    status: 'en_cours',
    statusLabel: 'En cours',
    surface: 2100,
    budget: '980 M FCFA',
    progress: 28,
    startDate: '10 Juin 2024',
    endDate: '30 Juin 2026',
    location: 'Yaoundé, Cameroun',
    reference: 'APS',
    description: "Musée d'art contemporain africain dédié à l'artiste peintre Joël ESAPO. Architecture organique inspirée des formes naturelles du bassin du Congo.",
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
    members: ['u1','u3','u5','u7'],
    bimEnabled: false,
    apdStage: 'APS',
  },
  {
    id: 'p4',
    name: 'Maison Sawa',
    type: 'Résidentiel',
    phase: 'Chantier',
    status: 'en_cours',
    statusLabel: 'En cours',
    surface: 320,
    budget: '145 M FCFA',
    progress: 82,
    startDate: '5 Fév. 2023',
    endDate: '20 Déc. 2024',
    location: 'Douala, Cameroun',
    reference: 'EXE',
    description: "Villa individuelle de standing avec toit-terrasse et piscine à débordement. Matériaux locaux et architecture bioclimatique.",
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    members: ['u1','u3','u6'],
    bimEnabled: false,
    apdStage: 'EXE',
  },
  {
    id: 'p5',
    name: 'USCA Bangangte',
    type: 'Institutionnel',
    phase: 'Esquisse',
    status: 'en_pause',
    statusLabel: 'En pause',
    surface: 6500,
    budget: '2,1 Md FCFA',
    progress: 15,
    startDate: '1 Sept. 2024',
    endDate: '31 Déc. 2027',
    location: 'Bangangté, Cameroun',
    reference: 'ESQ',
    description: "Université des Sciences du Cameroun Anglophone — campus comprenant amphithéâtres, laboratoires, résidences étudiantes et stade.",
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    members: ['u1','u2','u4','u5','u7'],
    bimEnabled: true,
    apdStage: 'ESQ',
  },
  {
    id: 'p6',
    name: 'Villa Bali',
    type: 'Résidentiel',
    phase: 'Réception',
    status: 'termine',
    statusLabel: 'Terminé',
    surface: 480,
    budget: '210 M FCFA',
    progress: 100,
    startDate: '15 Jan. 2022',
    endDate: '30 Sept. 2023',
    location: 'Limbé, Cameroun',
    reference: 'RCE',
    description: "Villa balnéaire de luxe avec vue panoramique sur l'Océan Atlantique. Livrée avec certification HQE.",
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    members: ['u1','u3'],
    bimEnabled: false,
    apdStage: 'RCE',
  },
  {
    id: 'p7',
    name: 'Centre Commercial Douala',
    type: 'Commercial',
    phase: 'PRO',
    status: 'en_cours',
    statusLabel: 'En cours',
    surface: 18000,
    budget: '12 Md FCFA',
    progress: 38,
    startDate: '1 Nov. 2023',
    endDate: '31 Mars 2027',
    location: 'Douala, Cameroun',
    reference: 'PRO',
    description: "Centre commercial nouvelle génération sur 4 niveaux — commerces, restaurants, cinéma multiplex et bureaux. Standard BREEAM Very Good visé.",
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80',
    members: ['u1','u2','u3','u4','u5','u6','u7'],
    bimEnabled: true,
    apdStage: 'PRO',
  },
]

// ══════════════════════════════════════════════════════════════
// DOCUMENTS
// ══════════════════════════════════════════════════════════════

export interface MockDocument {
  id: string
  name: string
  type: 'DWG' | 'IFC' | 'PDF' | 'RVT' | 'XLSX' | 'DOCX' | 'JPG' | 'PNG'
  category: 'Plans' | 'Maquette BIM' | 'Rapport' | 'Contrat' | 'Photo' | 'Calcul'
  size: string
  version: string
  projectId: string
  projectName: string
  uploadedBy: string
  uploadedAt: string
  status: 'valide' | 'en_revision' | 'archive'
  statusLabel: string
  tags: string[]
}

export const MOCK_DOCUMENTS: MockDocument[] = [
  { id: 'd1', name: 'PL_Plans', type: 'DWG', category: 'Plans', size: '4,2 Mo', version: 'V3', projectId: 'p1', projectName: 'Projet Kribi', uploadedBy: 'Paul Figueras', uploadedAt: '27 Nov. 2024 à 11h45', status: 'valide', statusLabel: 'Validé', tags: ['plan', 'architecture'] },
  { id: 'd2', name: 'BL_Plan', type: 'DWG', category: 'Plans', size: '3,1 Mo', version: 'V2', projectId: 'p1', projectName: 'Projet Kribi', uploadedBy: 'Marie Tchiou', uploadedAt: '25 Nov. 2024 à 09h12', status: 'valide', statusLabel: 'Validé', tags: ['plan', 'béton'] },
  { id: 'd3', name: 'Due_Diligence_Rapport', type: 'PDF', category: 'Rapport', size: '1,8 Mo', version: 'V1', projectId: 'p1', projectName: 'Projet Kribi', uploadedBy: 'Serge Manager', uploadedAt: '22 Nov. 2024 à 14h30', status: 'valide', statusLabel: 'Validé', tags: ['rapport', 'juridique'] },
  { id: 'd4', name: 'Maquette_BIM_v2', type: 'IFC', category: 'Maquette BIM', size: '42,3 Mo', version: 'V2', projectId: 'p1', projectName: 'Projet Kribi', uploadedBy: 'Serge Manager', uploadedAt: '20 Nov. 2024 à 16h00', status: 'en_revision', statusLabel: 'En révision', tags: ['BIM', 'IFC'] },
  { id: 'd5', name: 'architecture_APP.rvt', type: 'RVT', category: 'Maquette BIM', size: '89,1 Mo', version: 'V4', projectId: 'p1', projectName: 'Projet Kribi', uploadedBy: 'Paul Figueras', uploadedAt: '19 Nov. 2024 à 10h22', status: 'valide', statusLabel: 'Validé', tags: ['Revit', 'architecture'] },
  { id: 'd6', name: 'CCTP_Lot_Gros_Oeuvre', type: 'DOCX', category: 'Contrat', size: '2,4 Mo', version: 'V1', projectId: 'p2', projectName: 'BCEC Bafoussam', uploadedBy: 'Charles Ateba', uploadedAt: '15 Nov. 2024 à 09h00', status: 'valide', statusLabel: 'Validé', tags: ['CCTP', 'gros œuvre'] },
  { id: 'd7', name: 'Plans_Facades_A3', type: 'PDF', category: 'Plans', size: '6,7 Mo', version: 'V2', projectId: 'p2', projectName: 'BCEC Bafoussam', uploadedBy: 'Marie Tchiou', uploadedAt: '12 Nov. 2024 à 14h15', status: 'valide', statusLabel: 'Validé', tags: ['plan', 'façade'] },
  { id: 'd8', name: 'Rapport_Visite_Recep.pdf', type: 'PDF', category: 'Rapport', size: '3,2 Mo', version: 'V1', projectId: 'p6', projectName: 'Villa Bali', uploadedBy: 'Brian Toko', uploadedAt: '10 Nov. 2024 à 11h30', status: 'valide', statusLabel: 'Validé', tags: ['réception', 'chantier'] },
  { id: 'd9', name: 'Structure_calculs.xlsx', type: 'XLSX', category: 'Calcul', size: '1,1 Mo', version: 'V3', projectId: 'p1', projectName: 'Projet Kribi', uploadedBy: 'Charles Ateba', uploadedAt: '08 Nov. 2024 à 16h45', status: 'valide', statusLabel: 'Validé', tags: ['calcul', 'structure'] },
  { id: 'd10', name: 'Economie_APD.xlsx', type: 'XLSX', category: 'Calcul', size: '890 Ko', version: 'V2', projectId: 'p1', projectName: 'Projet Kribi', uploadedBy: 'Amina Nkoa', uploadedAt: '05 Nov. 2024 à 09h10', status: 'en_revision', statusLabel: 'En révision', tags: ['économie', 'budget'] },
]

// ══════════════════════════════════════════════════════════════
// ACTIVITÉS
// ══════════════════════════════════════════════════════════════

export interface MockActivity {
  id: string
  type: 'upload' | 'comment' | 'validation' | 'clash' | 'agent' | 'member'
  label: string
  detail: string
  projectId: string
  projectName: string
  userId: string
  userName: string
  agentName?: string
  date: string
  time: string
  priority: 'haute' | 'normale' | 'basse'
  status: 'termine' | 'en_cours' | 'en_attente'
}

export const MOCK_ACTIVITIES: MockActivity[] = [
  { id: 'a1', type: 'upload', label: 'Plan mis à jour', detail: 'Plans_APD.dwg — Version 3 importée', projectId: 'p1', projectName: 'Projet Kribi', userId: 'u1', userName: 'Paul Figueras', date: '27 Nov. 2024', time: '11:45', priority: 'normale', status: 'termine' },
  { id: 'a2', type: 'agent', label: 'Analyse formulée', detail: "ADP Architecte a analysé l'implantation du projet et formulé des recommandations.", projectId: 'p1', projectName: 'Projet Kribi', userId: 'u1', userName: 'Paul Figueras', agentName: 'ADP Architecte', date: '27 Nov. 2024', time: '10:20', priority: 'normale', status: 'termine' },
  { id: 'a3', type: 'clash', label: 'Clash détecté', detail: 'Conflit géométrique détecté entre dalle S2 et gaine CVC niveau 3.', projectId: 'p2', projectName: 'BCEC Bafoussam', userId: 'u2', userName: 'Serge Manager', agentName: 'ADP BIM Manager', date: '26 Nov. 2024', time: '16:00', priority: 'haute', status: 'en_cours' },
  { id: 'a4', type: 'validation', label: 'Document validé', detail: 'CCTP Gros Œuvre validé pour consultation entreprises.', projectId: 'p2', projectName: 'BCEC Bafoussam', userId: 'u4', userName: 'Charles Ateba', date: '25 Nov. 2024', time: '09:30', priority: 'normale', status: 'termine' },
  { id: 'a5', type: 'agent', label: 'Estimation générée', detail: 'ADP QuanTBIM a généré une estimation budgétaire révisée à 1,24 Md FCFA.', projectId: 'p1', projectName: 'Projet Kribi', userId: 'u7', userName: 'Amina Nkoa', agentName: 'ADP QuanTBIM', date: '24 Nov. 2024', time: '14:15', priority: 'haute', status: 'termine' },
  { id: 'a6', type: 'comment', label: 'Commentaire ajouté', detail: 'Mise à jour du planning suite à la réunion de coordination du 22/11.', projectId: 'p1', projectName: 'Projet Kribi', userId: 'u2', userName: 'Serge Manager', date: '22 Nov. 2024', time: '17:00', priority: 'basse', status: 'termine' },
  { id: 'a7', type: 'upload', label: 'Maquette IFC importée', detail: 'Maquette_BIM_v2.ifc — analyse automatique en cours.', projectId: 'p1', projectName: 'Projet Kribi', userId: 'u2', userName: 'Serge Manager', agentName: 'ADP BIM Manager', date: '20 Nov. 2024', time: '16:00', priority: 'normale', status: 'en_cours' },
  { id: 'a8', type: 'member', label: 'Membre ajouté', detail: 'Fichor Mbouvet a rejoint le projet en tant qu\'Éditeur.', projectId: 'p3', projectName: 'Musée ESAPO Joël', userId: 'u1', userName: 'Paul Figueras', date: '18 Nov. 2024', time: '10:00', priority: 'basse', status: 'termine' },
  { id: 'a9', type: 'agent', label: 'Rapport généré', detail: 'ADP Architecte a produit la note de synthèse réglementaire RE2020.', projectId: 'p5', projectName: 'USCA Bangangte', userId: 'u1', userName: 'Paul Figueras', agentName: 'ADP Architecte', date: '15 Nov. 2024', time: '11:30', priority: 'normale', status: 'termine' },
  { id: 'a10', type: 'validation', label: 'Note technique qualifiée', detail: 'Note structure béton armé approuvée par l\'ingénieur responsable.', projectId: 'p7', projectName: 'Centre Commercial Douala', userId: 'u4', userName: 'Charles Ateba', date: '12 Nov. 2024', time: '14:00', priority: 'haute', status: 'termine' },
]

// ══════════════════════════════════════════════════════════════
// AGENTS IA
// ══════════════════════════════════════════════════════════════

export interface MockAgent {
  id: string
  name: string
  specialty: string
  description: string
  model: string
  icon: string
  color: string
  colorBg: string
  usageCount: number
  rating: number
  isAdp: boolean
  competences: string[]
  tags: string[]
}

export const MOCK_AGENTS: MockAgent[] = [
  { id: 'ag1', name: 'ADP Architecte', specialty: 'Architecture & Réglementation', description: "Analyse les projets d'architecture, vérifie la conformité réglementaire (PLU, PMR, ERP) et formule des recommandations de conception.", model: 'claude-sonnet-4-6', icon: 'A', color: 'text-blue-600', colorBg: 'bg-blue-50', usageCount: 1243, rating: 4.9, isAdp: true, competences: ['Réglementation PLU/PLUi', 'Accessibilité PMR', 'Sécurité incendie ERP', 'Bioclimatisme', 'RE2020'], tags: ['Architecture', 'Réglementation'] },
  { id: 'ag2', name: 'ADP BIM Manager', specialty: 'BIM & Coordination', description: "Analyse les maquettes IFC, détecte les conflits inter-disciplines et vérifie la conformité NF EN ISO 19650.", model: 'claude-sonnet-4-6', icon: 'B', color: 'text-violet-600', colorBg: 'bg-violet-50', usageCount: 892, rating: 4.8, isAdp: true, competences: ['IFC 2x3 & IFC4', 'Clash Detection', 'ISO 19650', 'Revit', 'ArchiCAD'], tags: ['BIM', 'Coordination'] },
  { id: 'ag3', name: 'ADP QuanTBIM', specialty: 'Économie de la construction', description: "Génère des estimations budgétaires, analyse les DPGF et détecte les incohérences de métrés.", model: 'claude-sonnet-4-6', icon: 'Q', color: 'text-emerald-600', colorBg: 'bg-emerald-50', usageCount: 654, rating: 4.7, isAdp: true, competences: ['Estimation budgétaire', 'Analyse DPGF', 'Métrés', 'CCTP', 'Économie BIM'], tags: ['Économie', 'Quantités'] },
  { id: 'ag4', name: 'ADP Réduction', specialty: 'Optimisation & Valeur', description: "Identifie les optimisations de coûts sans dégrader la qualité du projet. Analyse valeur et substitutions.", model: 'claude-haiku-4-5-20251001', icon: 'R', color: 'text-orange-600', colorBg: 'bg-orange-50', usageCount: 421, rating: 4.6, isAdp: true, competences: ['Analyse valeur', 'Optimisation coûts', 'Substitutions matériaux', 'VE'], tags: ['Optimisation', 'Coûts'] },
  { id: 'ag5', name: 'ADP Contrôleur', specialty: 'Contrôle & Conformité', description: "Vérifie la conformité des documents de projet (plans, CCTP, DPGF) et signale les incohérences.", model: 'claude-sonnet-4-6', icon: 'C', color: 'text-red-600', colorBg: 'bg-red-50', usageCount: 387, rating: 4.7, isAdp: true, competences: ['Contrôle qualité', 'Cohérence documents', 'DTU', 'Normes EN'], tags: ['Contrôle', 'Qualité'] },
  { id: 'ag6', name: 'ADP Éco-Conception', specialty: 'Environnement & Durabilité', description: "Analyse l'impact environnemental du projet, propose des solutions bas-carbone et évalue les certifications.", model: 'claude-opus-4-8', icon: 'E', color: 'text-green-600', colorBg: 'bg-green-50', usageCount: 312, rating: 4.8, isAdp: true, competences: ['Bilan carbone', 'RE2020', 'HQE', 'BREEAM', 'Matériaux biosourcés'], tags: ['Environnement', 'Durabilité'] },
  { id: 'ag7', name: 'ADP Fluides', specialty: 'Fluides & CVC', description: "Assistant technique spécialisé en installations thermiques, plomberie, ventilation et électricité.", model: 'claude-sonnet-4-6', icon: 'F', color: 'text-cyan-600', colorBg: 'bg-cyan-50', usageCount: 278, rating: 4.6, isAdp: true, competences: ['CVC', 'Plomberie', 'Électricité', 'Thermique', 'RT2020'], tags: ['Fluides', 'Technique'] },
  { id: 'ag8', name: 'ADP Contrôle Métrés', specialty: 'Vérification quantités', description: "Compare les métrés entre disciplines, identifie les écarts et génère des rapports de contrôle.", model: 'claude-haiku-4-5-20251001', icon: 'M', color: 'text-pink-600', colorBg: 'bg-pink-50', usageCount: 198, rating: 4.5, isAdp: true, competences: ['Métrés', 'Comparaison disciplinaire', 'Écarts quantités'], tags: ['Métrés', 'Vérification'] },
  { id: 'ag9', name: 'ADP Urbain', specialty: 'Urbanisme & Aménagement', description: "Analyse les règles d'urbanisme, le PLU, les servitudes et les droits à construire.", model: 'claude-sonnet-4-6', icon: 'U', color: 'text-teal-600', colorBg: 'bg-teal-50', usageCount: 167, rating: 4.7, isAdp: true, competences: ['PLU / PLUi', 'COS / CES', 'Servitudes', 'Permis de construire', 'Recours'], tags: ['Urbanisme', 'Réglementation'] },
]

// ══════════════════════════════════════════════════════════════
// BIBLIOTHÈQUE
// ══════════════════════════════════════════════════════════════

export interface MockResource {
  id: string
  name: string
  category: 'Template' | 'Norme & Réglementation' | 'Détail constructif' | 'Famille BIM' | 'CCTP & Document type' | 'Guide & Tutoriel'
  format: string
  size: string
  author: string
  downloads: number
  updatedAt: string
  tags: string[]
  description: string
}

export const MOCK_RESOURCES: MockResource[] = [
  { id: 'r1', name: 'Template APS — Type A.dwg', category: 'Template', format: 'DWG', size: '2,4 Mo', author: 'Paul Figueras', downloads: 1246, updatedAt: '12 Oct. 2024', tags: ['APS', 'template'], description: 'Gabarit standard pour dossier APS conforme au CCAG.' },
  { id: 'r2', name: 'Notice descriptive APD', category: 'Template', format: 'DOCX', size: '340 Ko', author: 'Paul Figueras', downloads: 987, updatedAt: '8 Oct. 2024', tags: ['APD', 'notice'], description: 'Modèle de notice descriptive pour phase APD.' },
  { id: 'r3', name: 'RE2020 — Guide pratique 2024', category: 'Norme & Réglementation', format: 'PDF', size: '4,1 Mo', author: 'ADP Studio', downloads: 2341, updatedAt: '1 Sept. 2024', tags: ['RE2020', 'thermique'], description: 'Synthèse des exigences RE2020 avec exemples.' },
  { id: 'r4', name: 'DTU 20.1 — Maçonnerie', category: 'Norme & Réglementation', format: 'PDF', size: '1,8 Mo', author: 'ADP Studio', downloads: 1102, updatedAt: '15 Août 2024', tags: ['DTU', 'maçonnerie'], description: 'DTU 20.1 annoté avec commentaires pratiques.' },
  { id: 'r5', name: 'Détail — Acrotère étanche francais', category: 'Détail constructif', format: 'DWG', size: '890 Ko', author: 'Marie Tchiou', downloads: 756, updatedAt: '22 Oct. 2024', tags: ['étanchéité', 'toiture'], description: 'Détail acrotère conforme DTU 43.1.' },
  { id: 'r6', name: 'Détail jonction façade/plancher', category: 'Détail constructif', format: 'DWG', size: '670 Ko', author: 'Charles Ateba', downloads: 543, updatedAt: '18 Oct. 2024', tags: ['façade', 'plancher'], description: 'Traitement pont thermique façade/plancher.' },
  { id: 'r7', name: 'Famille Revit — Porte coupe-feu 1h', category: 'Famille BIM', format: 'RFA', size: '1,2 Mo', author: 'Serge Manager', downloads: 892, updatedAt: '5 Nov. 2024', tags: ['Revit', 'sécurité incendie'], description: 'Famille Revit paramétrique porte CF1h.' },
  { id: 'r8', name: 'Famille Revit — Escalier béton', category: 'Famille BIM', format: 'RFA', size: '2,1 Mo', author: 'Serge Manager', downloads: 634, updatedAt: '28 Oct. 2024', tags: ['Revit', 'escalier'], description: 'Famille escalier béton paramétrique.' },
  { id: 'r9', name: 'CCTP Lot 01 — Gros Œuvre type', category: 'CCTP & Document type', format: 'DOCX', size: '890 Ko', author: 'ADP Studio', downloads: 1567, updatedAt: '20 Oct. 2024', tags: ['CCTP', 'gros œuvre'], description: 'CCTP Gros Œuvre adapté au contexte africain.' },
  { id: 'r10', name: 'Guide — Conception bioclimatique', category: 'Guide & Tutoriel', format: 'PDF', size: '6,2 Mo', author: 'ADP Studio', downloads: 1123, updatedAt: '10 Oct. 2024', tags: ['bioclimatique', 'thermique'], description: 'Guide pratique conception bioclimatique zones tropicales.' },
]

// ══════════════════════════════════════════════════════════════
// MISSIONS IA
// ══════════════════════════════════════════════════════════════

const MISSION_1: Mission = {
  id: 'm1',
  projectId: 'p1',
  projectName: 'Projet Kribi',
  title: 'Analyse réglementaire PLU',
  objective: "Vérifier la conformité du projet Kribi au PLU de la commune et identifier les risques réglementaires avant le dépôt du permis de construire.",
  agentIds: ['ag1', 'ag9'],
  status: 'completed',
  createdAt: '24 Nov. 2024 à 09h00',
  completedAt: '24 Nov. 2024 à 09h18',
  createdBy: 'u1',
  summary: "Le projet Kribi est globalement conforme au PLU. Deux points d'attention identifiés : hauteur maximale à vérifier en zone UB et recul par rapport à la voie publique à ajuster sur le lot 3.",
  steps: [
    {
      id: 'ms1-1',
      agentId: 'ag9',
      agentName: 'ADP Urbain',
      title: 'Lecture du règlement de zone',
      description: 'Analyse des règles applicables à la zone UB du PLU de Kribi.',
      status: 'done',
      durationSeconds: 42,
      startedAt: '24 Nov. 2024 à 09h00',
      completedAt: '24 Nov. 2024 à 09h01',
      output: "Zone UB — Règlement applicable :\n• Hauteur max : 12 m à l'égout\n• CES : 0,40\n• Recul voie : 5 m minimum\n• Recul limites séparatives : 3 m minimum",
    },
    {
      id: 'ms1-2',
      agentId: 'ag1',
      agentName: 'ADP Architecte',
      title: 'Vérification des gabarits',
      description: 'Comparaison des gabarits du projet avec les règles de la zone.',
      status: 'done',
      durationSeconds: 68,
      startedAt: '24 Nov. 2024 à 09h01',
      completedAt: '24 Nov. 2024 à 09h02',
      output: "Gabarits analysés :\n✅ CES projeté : 0,38 (conforme)\n⚠️ Hauteur villa A : 12,40 m (dépasse de 0,40 m)\n⚠️ Recul lot 3 / voie : 4,20 m (insuffisant de 0,80 m)\n✅ Recul limites séparatives : 3,50 m (conforme)",
    },
    {
      id: 'ms1-3',
      agentId: 'ag1',
      agentName: 'ADP Architecte',
      title: 'Synthèse et recommandations',
      description: 'Rédaction de la note de synthèse réglementaire avec recommandations correctives.',
      status: 'done',
      durationSeconds: 95,
      startedAt: '24 Nov. 2024 à 09h02',
      completedAt: '24 Nov. 2024 à 09h04',
      output: "SYNTHÈSE RÉGLEMENTAIRE — Projet Kribi\n\n2 non-conformités mineures identifiées :\n\n1. Villa A — Hauteur\nAction : Abaisser la toiture de 40 cm ou solliciter une dérogation auprès des services d'urbanisme.\n\n2. Lot 3 — Recul voie\nAction : Décaler l'implantation de 80 cm vers l'intérieur du terrain ou modifier l'emprise au sol.\n\nCes corrections peuvent être intégrées en phase APD sans impact majeur sur le projet.",
    },
  ],
}

const MISSION_2: Mission = {
  id: 'm2',
  projectId: 'p2',
  projectName: 'BCEC Bafoussam',
  title: 'Estimation budgétaire révisée',
  objective: "Réviser l'estimation budgétaire du projet BCEC suite aux modifications de programme intervenues en novembre 2024 et identifier les postes en dépassement.",
  agentIds: ['ag3', 'ag4'],
  status: 'completed',
  createdAt: '22 Nov. 2024 à 14h00',
  completedAt: '22 Nov. 2024 à 14h22',
  createdBy: 'u7',
  summary: "L'estimation révisée s'établit à 3,94 Md FCFA, soit +3,7% par rapport au budget initial. Le dépassement est principalement dû au surcoût des façades rideaux (+180 M) et aux fondations spéciales (+62 M). 3 pistes d'optimisation proposées pour revenir sous le seuil initial.",
  steps: [
    {
      id: 'ms2-1',
      agentId: 'ag3',
      agentName: 'ADP QuanTBIM',
      title: 'Lecture du DPGF mis à jour',
      description: 'Analyse du Décomposition du Prix Global et Forfaitaire révisé.',
      status: 'done',
      durationSeconds: 55,
      startedAt: '22 Nov. 2024 à 14h00',
      completedAt: '22 Nov. 2024 à 14h01',
      output: "DPGF analysé — 14 lots identifiés\nTotal DPGF révisé : 3 942 M FCFA\nDelta vs budget initial (3 800 M) : +142 M FCFA (+3,7%)\n\nPrincipaux écarts :\n• Lot 4 Façades rideaux : +180 M FCFA\n• Lot 2 Fondations : +62 M FCFA\n• Lot 11 CVC : -58 M FCFA\n• Lot 7 Menuiseries : +28 M FCFA",
    },
    {
      id: 'ms2-2',
      agentId: 'ag4',
      agentName: 'ADP Réduction',
      title: 'Identification des optimisations',
      description: 'Recherche de pistes de réduction sans dégradation qualitative.',
      status: 'done',
      durationSeconds: 112,
      startedAt: '22 Nov. 2024 à 14h01',
      completedAt: '22 Nov. 2024 à 14h03',
      output: "3 pistes d'optimisation identifiées :\n\n1. Façades rideaux — Substitution partielle\nRemplacement des vitrages feuilletés par vitrages trempés sur niveaux R+4 à R+7 (hors RDC et R+1 exposés).\nÉconomie estimée : -95 M FCFA\n\n2. Fondations — Optimisation du radier\nRévision du ferraillage après recalcul par BE Structure avec nouveau rapport géotechnique.\nÉconomie estimée : -40 M FCFA\n\n3. Parking souterrain — Réduction d'un niveau\nSuppression du niveau -2 (42 places) en faveur d'un parking aérien annexe.\nÉconomie estimée : -85 M FCFA",
    },
    {
      id: 'ms2-3',
      agentId: 'ag3',
      agentName: 'ADP QuanTBIM',
      title: 'Rapport de synthèse budgétaire',
      description: 'Rédaction du rapport de synthèse avec tableau comparatif.',
      status: 'done',
      durationSeconds: 78,
      startedAt: '22 Nov. 2024 à 14h03',
      completedAt: '22 Nov. 2024 à 14h04',
      output: "RAPPORT BUDGÉTAIRE — BCEC Bafoussam\n\nBudget initial : 3 800 M FCFA\nEstimation révisée : 3 942 M FCFA (+3,7%)\n\nAvec optimisations retenues (pistes 1+2) :\nEstimation optimisée : 3 807 M FCFA (+0,2%)\n→ Retour quasi à l'enveloppe initiale sans sacrifice programmatique majeur.\n\nRecommandation : valider les pistes 1 et 2 en réunion MOE/MOA avant le 30/11.",
    },
  ],
}

const MISSION_3: Mission = {
  id: 'm3',
  projectId: 'p2',
  projectName: 'BCEC Bafoussam',
  title: 'Coordination BIM — Détection des clashes',
  objective: "Analyser la maquette IFC consolidée du BCEC, détecter les conflits inter-disciplines et produire un rapport de clashes priorisé pour la réunion de coordination du 30 novembre.",
  agentIds: ['ag2'],
  status: 'running',
  createdAt: '27 Nov. 2024 à 08h30',
  createdBy: 'u2',
  steps: [
    {
      id: 'ms3-1',
      agentId: 'ag2',
      agentName: 'ADP BIM Manager',
      title: 'Chargement et validation IFC',
      description: 'Validation de la conformité ISO 19650 de la maquette consolidée.',
      status: 'done',
      durationSeconds: 38,
      startedAt: '27 Nov. 2024 à 08h30',
      completedAt: '27 Nov. 2024 à 08h31',
      output: "Maquette IFC chargée — Maquette_BIM_v2.ifc (42,3 Mo)\nDisciplines détectées : Architecture, Structure, CVC, Plomberie\nConformité ISO 19650 : ✅ (niveau LOD 300)\nObjets analysés : 12 847\nWarnings mineurs : 3 (attributs manquants sur éléments secondaires)",
    },
    {
      id: 'ms3-2',
      agentId: 'ag2',
      agentName: 'ADP BIM Manager',
      title: 'Détection des clashes',
      description: 'Analyse des conflits géométriques entre disciplines.',
      status: 'running',
      startedAt: '27 Nov. 2024 à 08h31',
      output: "Analyse en cours...\n✅ Architecture vs Structure : 4 clashes détectés\n✅ Structure vs CVC : 7 clashes détectés\n⏳ CVC vs Plomberie : en cours d'analyse...",
    },
    {
      id: 'ms3-3',
      agentId: 'ag2',
      agentName: 'ADP BIM Manager',
      title: 'Rapport de clashes priorisé',
      description: 'Génération du rapport avec priorisation et recommandations.',
      status: 'pending',
    },
  ],
}

const MISSION_4: Mission = {
  id: 'm4',
  projectId: 'p5',
  projectName: 'USCA Bangangte',
  title: 'Note de synthèse environnementale',
  objective: "Préparer la note de synthèse environnementale pour le dossier de permis de construire du campus USCA : impact carbone, gestion des eaux, biodiversité et recommandations HQE.",
  agentIds: ['ag6', 'ag1'],
  status: 'draft',
  createdAt: '27 Nov. 2024 à 10h00',
  createdBy: 'u1',
  steps: [
    {
      id: 'ms4-1',
      agentId: 'ag6',
      agentName: 'ADP Éco-Conception',
      title: 'Analyse impact environnemental',
      description: "Évaluation de l'impact carbone et des ressources du projet.",
      status: 'pending',
    },
    {
      id: 'ms4-2',
      agentId: 'ag6',
      agentName: 'ADP Éco-Conception',
      title: 'Recommandations HQE',
      description: "Propositions d'amélioration environnementale ciblées.",
      status: 'pending',
    },
    {
      id: 'ms4-3',
      agentId: 'ag1',
      agentName: 'ADP Architecte',
      title: 'Rédaction note de synthèse',
      description: 'Intégration des éléments dans le document de permis.',
      status: 'pending',
    },
  ],
}

export const MOCK_MISSIONS: Mission[] = [MISSION_1, MISSION_2, MISSION_3, MISSION_4]

// ══════════════════════════════════════════════════════════════
// CONVERSATIONS IA
// ══════════════════════════════════════════════════════════════

const CONVERSATION_1: Conversation = {
  id: 'c1',
  projectId: 'p1',
  projectName: 'Projet Kribi',
  missionId: 'm1',
  agentId: 'ag1',
  agentName: 'ADP Architecte',
  title: 'Analyse PLU et conformité réglementaire',
  summary: 'Discussion autour des non-conformités PLU détectées et des corrections à apporter avant le dépôt du permis.',
  messageCount: 6,
  createdAt: '24 Nov. 2024 à 09h04',
  updatedAt: '24 Nov. 2024 à 09h22',
  messages: [
    {
      id: 'msg1-1',
      role: 'user',
      content: "La mission vient de se terminer. Est-ce que les deux non-conformités détectées sont bloquantes pour le permis de construire ?",
      timestamp: '24 Nov. 2024 à 09h04',
    },
    {
      id: 'msg1-2',
      role: 'agent',
      agentId: 'ag1',
      agentName: 'ADP Architecte',
      content: "Non, ces non-conformités ne sont pas bloquantes à ce stade, mais elles doivent être résolues avant le dépôt officiel du permis.\n\nLa non-conformité sur la hauteur de la villa A (+40 cm) peut être corrigée facilement en modifiant la pente de toiture ou en abaissant le niveau fini du RDC de quelques centimètres.\n\nPour le recul du lot 3, il suffit de décaler l'emprise de 80 cm vers l'intérieur. Cela ne remet pas en cause le programme.",
      timestamp: '24 Nov. 2024 à 09h05',
    },
    {
      id: 'msg1-3',
      role: 'user',
      content: "Quel est le délai habituel pour obtenir le permis dans cette commune ?",
      timestamp: '24 Nov. 2024 à 09h10',
    },
    {
      id: 'msg1-4',
      role: 'agent',
      agentId: 'ag1',
      agentName: 'ADP Architecte',
      content: "En règle générale, le délai d'instruction d'un permis de construire au Cameroun est de 2 à 3 mois pour un projet résidentiel, à compter du dépôt d'un dossier complet.\n\nJe vous recommande de vérifier directement auprès de la mairie de Kribi les délais actuels, qui peuvent varier selon la charge de travail des services d'urbanisme.",
      timestamp: '24 Nov. 2024 à 09h11',
    },
    {
      id: 'msg1-5',
      role: 'user',
      content: "Peut-on générer une note de synthèse à joindre au dossier ?",
      timestamp: '24 Nov. 2024 à 09h18',
    },
    {
      id: 'msg1-6',
      role: 'agent',
      agentId: 'ag1',
      agentName: 'ADP Architecte',
      content: "Oui, la note de synthèse réglementaire générée par la mission peut être directement jointe au dossier de permis. Elle récapitule les règles applicables, les points de conformité et les corrections apportées.\n\nVous pouvez la télécharger depuis l'onglet Rapports du projet.",
      timestamp: '24 Nov. 2024 à 09h22',
    },
  ],
}

const CONVERSATION_2: Conversation = {
  id: 'c2',
  projectId: 'p2',
  projectName: 'BCEC Bafoussam',
  missionId: 'm2',
  agentId: 'ag3',
  agentName: 'ADP QuanTBIM',
  title: 'Révision budgétaire et pistes d\'optimisation',
  summary: 'Analyse du dépassement budgétaire de 3,7% et discussion sur les optimisations retenues pour revenir sous l\'enveloppe initiale.',
  messageCount: 4,
  createdAt: '22 Nov. 2024 à 14h22',
  updatedAt: '22 Nov. 2024 à 15h05',
  messages: [
    {
      id: 'msg2-1',
      role: 'user',
      content: "Le dépassement de 142 M FCFA sur les façades rideaux — est-ce lié au choix initial du vitrage feuilleté ?",
      timestamp: '22 Nov. 2024 à 14h22',
    },
    {
      id: 'msg2-2',
      role: 'agent',
      agentId: 'ag3',
      agentName: 'ADP QuanTBIM',
      content: "Oui, exactement. Le vitrage feuilleté SGG Stadip 44.2 retenu au CCTP représente un surcoût d'environ 18 000 FCFA/m² par rapport au vitrage trempé simple.\n\nSur une surface de façade de ~2 400 m², cela représente environ 43 M FCFA de surcoût sur ce seul poste. Le reste de l'écart vient de l'augmentation du coût des profilés aluminium (hausse des matières premières depuis le devis initial).",
      timestamp: '22 Nov. 2024 à 14h25',
    },
    {
      id: 'msg2-3',
      role: 'user',
      content: "Si on retient les pistes 1 et 2, quel est le budget final prévisionnel ?",
      timestamp: '22 Nov. 2024 à 14h50',
    },
    {
      id: 'msg2-4',
      role: 'agent',
      agentId: 'ag3',
      agentName: 'ADP QuanTBIM',
      content: "Avec les pistes 1 (−95 M) et 2 (−40 M) retenues :\n\nEstimation révisée : 3 942 M FCFA\n− Optimisation piste 1 : −95 M\n− Optimisation piste 2 : −40 M\n= Budget optimisé : 3 807 M FCFA\n\nSoit +0,2% par rapport au budget initial de 3 800 M FCFA. L'écart résiduel de 7 M est dans la marge d'imprécision normale d'une estimation DCE.",
      timestamp: '22 Nov. 2024 à 15h05',
    },
  ],
}

const CONVERSATION_3: Conversation = {
  id: 'c3',
  projectId: 'p3',
  projectName: 'Musée ESAPO Joël',
  agentId: 'ag1',
  agentName: 'ADP Architecte',
  title: 'Conception bioclimatique — orientations et matériaux',
  summary: 'Session de conseil sur les stratégies bioclimatiques adaptées au contexte tropical de Yaoundé pour le musée ESAPO.',
  messageCount: 4,
  createdAt: '18 Nov. 2024 à 11h00',
  updatedAt: '18 Nov. 2024 à 11h45',
  messages: [
    {
      id: 'msg3-1',
      role: 'user',
      content: "Pour le musée ESAPO à Yaoundé, quelles orientations privilégier pour limiter les apports solaires tout en maximisant la lumière naturelle diffuse ?",
      timestamp: '18 Nov. 2024 à 11h00',
    },
    {
      id: 'msg3-2',
      role: 'agent',
      agentId: 'ag1',
      agentName: 'ADP Architecte',
      content: "À Yaoundé (3°N), le soleil est quasi vertical toute l'année. Les stratégies clés sont :\n\n1. Orientation Nord/Sud des façades principales pour éviter l'est et l'ouest (soleil bas et pénétrant).\n2. Casquettes horizontales sur façade sud (débord 1,20 m minimum) pour couper le soleil de zénith.\n3. Lanterneaux zénithaux orientés Nord pour une lumière diffuse homogène, idéale pour les œuvres.\n4. Doubles peaux ventilées sur façades est/ouest si le programme l'exige.",
      timestamp: '18 Nov. 2024 à 11h08',
    },
    {
      id: 'msg3-3',
      role: 'user',
      content: "Quels matériaux locaux pourraient convenir pour les façades en cohérence avec l'identité du musée ?",
      timestamp: '18 Nov. 2024 à 11h30',
    },
    {
      id: 'msg3-4',
      role: 'agent',
      agentId: 'ag1',
      agentName: 'ADP Architecte',
      content: "Plusieurs matériaux locaux s'y prêtent bien :\n\n• Bois de Moabi (Baillonella toxisperma) : essence dense, durable, belle teinte dorée — idéal en bardage ou brise-soleil.\n• Pierre de Mfou (calcaire local) : belle texture, bonne inertie thermique, cohérente avec l'architecture de Yaoundé.\n• Briques de terre comprimée (BTC) : démarche bas-carbone, aspect naturel, production locale possible.\n\nL'association pierre + bois + béton brut résonnerait bien avec l'univers de l'artiste ESAPO.",
      timestamp: '18 Nov. 2024 à 11h45',
    },
  ],
}

export const MOCK_CONVERSATIONS: Conversation[] = [CONVERSATION_1, CONVERSATION_2, CONVERSATION_3]

// ══════════════════════════════════════════════════════════════
// TÂCHES
// ══════════════════════════════════════════════════════════════

export const MOCK_TASKS: Task[] = [
  { id: 't1', projectId: 'p1', title: 'Corriger hauteur villa A (-40 cm)', description: 'Modifier la pente de toiture suite à la non-conformité PLU détectée.', status: 'in_progress', priority: 'high', assigneeId: 'u1', dueDate: '30 Nov. 2024', tags: ['PLU', 'toiture'] },
  { id: 't2', projectId: 'p1', title: 'Décaler implantation lot 3 (+80 cm)', description: 'Ajuster le recul par rapport à la voie publique.', status: 'todo', priority: 'high', assigneeId: 'u3', dueDate: '30 Nov. 2024', tags: ['PLU', 'implantation'] },
  { id: 't3', projectId: 'p1', title: 'Mettre à jour la maquette IFC v3', description: 'Intégrer les corrections PLU dans la maquette consolidée.', status: 'todo', priority: 'medium', assigneeId: 'u2', dueDate: '5 Déc. 2024', tags: ['BIM', 'IFC'] },
  { id: 't4', projectId: 'p1', title: 'Finaliser DPGF lot 4 — Façades', description: 'Compléter la décomposition des prix pour le lot façades.', status: 'done', priority: 'high', assigneeId: 'u7', dueDate: '20 Nov. 2024', completedAt: '19 Nov. 2024', tags: ['DPGF', 'façades'] },
  { id: 't5', projectId: 'p1', title: 'Réunion de coordination MOE/MOA', description: 'Présenter les résultats de la mission PLU et les corrections à apporter.', status: 'todo', priority: 'medium', assigneeId: 'u1', dueDate: '2 Déc. 2024', tags: ['réunion', 'coordination'] },
  { id: 't6', projectId: 'p2', title: 'Valider les optimisations budgétaires', description: 'Faire valider les pistes 1 et 2 en réunion MOE/MOA avant le 30/11.', status: 'in_progress', priority: 'high', assigneeId: 'u1', dueDate: '30 Nov. 2024', tags: ['budget', 'validation'] },
  { id: 't7', projectId: 'p2', title: 'Résoudre les clashes BIM détectés', description: 'Traiter les 11 clashes inter-disciplines identifiés par ADP BIM Manager.', status: 'in_progress', priority: 'high', assigneeId: 'u2', dueDate: '5 Déc. 2024', tags: ['BIM', 'clashes'] },
  { id: 't8', projectId: 'p2', title: 'Mettre à jour le CCTP lot façades', description: 'Intégrer la substitution vitrage feuilleté → trempé sur R+4 à R+7.', status: 'todo', priority: 'medium', assigneeId: 'u4', dueDate: '10 Déc. 2024', tags: ['CCTP', 'façades'] },
  { id: 't9', projectId: 'p3', title: 'Étude bioclimatique — orientations', description: 'Formaliser les orientations retenues avec ADP Architecte.', status: 'done', priority: 'medium', assigneeId: 'u3', dueDate: '20 Nov. 2024', completedAt: '18 Nov. 2024', tags: ['bioclimatique', 'APS'] },
  { id: 't10', projectId: 'p3', title: 'Sélection matériaux façades', description: 'Finaliser la palette matériaux (pierre, bois, BTC) et demander les fiches techniques.', status: 'todo', priority: 'low', assigneeId: 'u3', dueDate: '15 Déc. 2024', tags: ['matériaux', 'façades'] },
  { id: 't11', projectId: 'p4', title: 'Réception chantier — liste des réserves', description: 'Compiler la liste des réserves avant PV de réception.', status: 'in_progress', priority: 'high', assigneeId: 'u6', dueDate: '15 Déc. 2024', tags: ['réception', 'chantier'] },
  { id: 't12', projectId: 'p4', title: 'Levée des réserves peinture', description: 'Vérifier la levée des réserves peinture intérieure lots A et B.', status: 'blocked', priority: 'high', assigneeId: 'u6', dueDate: '10 Déc. 2024', tags: ['réserves', 'peinture'] },
]

// ══════════════════════════════════════════════════════════════
// PLANNING
// ══════════════════════════════════════════════════════════════

export const MOCK_PLANNING: PlanningPhase[] = [
  // Projet Kribi (p1) — PRO en cours
  { id: 'pl1', projectId: 'p1', label: 'Esquisse', code: 'ESQ', startDate: '12 Jan. 2024', endDate: '15 Fév. 2024', progress: 100, status: 'done', color: 'bg-slate-400', milestones: [{ id: 'ml1', label: 'Validation client', date: '15 Fév. 2024', done: true }] },
  { id: 'pl2', projectId: 'p1', label: 'Avant-Projet Sommaire', code: 'APS', startDate: '16 Fév. 2024', endDate: '31 Mars 2024', progress: 100, status: 'done', color: 'bg-slate-400', milestones: [{ id: 'ml2', label: 'Avis urbanisme', date: '28 Mars 2024', done: true }] },
  { id: 'pl3', projectId: 'p1', label: 'Avant-Projet Définitif', code: 'APD', startDate: '1 Avr. 2024', endDate: '30 Juin 2024', progress: 100, status: 'done', color: 'bg-slate-400', milestones: [{ id: 'ml3', label: 'Dépôt PC', date: '15 Juin 2024', done: true }] },
  { id: 'pl4', projectId: 'p1', label: 'Projet', code: 'PRO', startDate: '1 Juil. 2024', endDate: '31 Jan. 2025', progress: 67, status: 'current', color: 'bg-adp-blue', milestones: [{ id: 'ml4', label: 'Obtention PC', date: '15 Oct. 2024', done: true }, { id: 'ml5', label: 'Consultation entreprises', date: '15 Jan. 2025', done: false }] },
  { id: 'pl5', projectId: 'p1', label: 'Dossier Consultation Entreprises', code: 'DCE', startDate: '1 Fév. 2025', endDate: '30 Avr. 2025', progress: 0, status: 'upcoming', color: 'bg-slate-200', milestones: [] },
  { id: 'pl6', projectId: 'p1', label: 'Exécution & Chantier', code: 'EXE', startDate: '1 Mai 2025', endDate: '30 Sept. 2025', progress: 0, status: 'upcoming', color: 'bg-slate-200', milestones: [{ id: 'ml6', label: 'Réception', date: '30 Sept. 2025', done: false }] },

  // Projet BCEC (p2) — DCE en cours
  { id: 'pl7', projectId: 'p2', label: 'Esquisse', code: 'ESQ', startDate: '3 Mars 2023', endDate: '30 Avr. 2023', progress: 100, status: 'done', color: 'bg-slate-400', milestones: [{ id: 'ml7', label: 'Validation programme', date: '28 Avr. 2023', done: true }] },
  { id: 'pl8', projectId: 'p2', label: 'APS', code: 'APS', startDate: '1 Mai 2023', endDate: '31 Juil. 2023', progress: 100, status: 'done', color: 'bg-slate-400', milestones: [] },
  { id: 'pl9', projectId: 'p2', label: 'APD', code: 'APD', startDate: '1 Août 2023', endDate: '31 Jan. 2024', progress: 100, status: 'done', color: 'bg-slate-400', milestones: [{ id: 'ml8', label: 'Dépôt PC', date: '15 Jan. 2024', done: true }] },
  { id: 'pl10', projectId: 'p2', label: 'PRO', code: 'PRO', startDate: '1 Fév. 2024', endDate: '31 Août 2024', progress: 100, status: 'done', color: 'bg-slate-400', milestones: [] },
  { id: 'pl11', projectId: 'p2', label: 'DCE', code: 'DCE', startDate: '1 Sept. 2024', endDate: '28 Fév. 2025', progress: 45, status: 'current', color: 'bg-violet-500', milestones: [{ id: 'ml9', label: 'Consultation clôture', date: '28 Fév. 2025', done: false }] },
  { id: 'pl12', projectId: 'p2', label: 'Chantier', code: 'EXE', startDate: '1 Mars 2025', endDate: '15 Déc. 2025', progress: 0, status: 'upcoming', color: 'bg-slate-200', milestones: [{ id: 'ml10', label: 'Réception', date: '15 Déc. 2025', done: false }] },

  // Maison Sawa (p4) — Chantier avancé
  { id: 'pl13', projectId: 'p4', label: 'Études', code: 'PRO', startDate: '5 Fév. 2023', endDate: '30 Juin 2023', progress: 100, status: 'done', color: 'bg-slate-400', milestones: [] },
  { id: 'pl14', projectId: 'p4', label: 'Chantier', code: 'EXE', startDate: '1 Juil. 2023', endDate: '20 Déc. 2024', progress: 82, status: 'current', color: 'bg-emerald-500', milestones: [{ id: 'ml11', label: 'Clos couvert', date: '30 Sept. 2023', done: true }, { id: 'ml12', label: 'Second œuvre', date: '30 Sept. 2024', done: true }, { id: 'ml13', label: 'Réception', date: '20 Déc. 2024', done: false }] },
]

// ══════════════════════════════════════════════════════════════
// BUDGETS
// ══════════════════════════════════════════════════════════════

export const MOCK_BUDGETS: Budget[] = [
  {
    id: 'b1',
    projectId: 'p1',
    currency: 'FCFA',
    total: 1_200_000_000,
    engaged: 804_000_000,
    spent: 612_000_000,
    updatedAt: '27 Nov. 2024',
    lines: [
      { id: 'bl1', lot: 'Lot 01', label: 'Gros Œuvre', prevue: 420_000_000, engagee: 420_000_000, realisee: 380_000_000, status: 'ok' },
      { id: 'bl2', lot: 'Lot 02', label: 'Charpente & Couverture', prevue: 85_000_000, engagee: 85_000_000, realisee: 62_000_000, status: 'ok' },
      { id: 'bl3', lot: 'Lot 03', label: 'Façades & Menuiseries ext.', prevue: 180_000_000, engagee: 195_000_000, realisee: 110_000_000, status: 'alert' },
      { id: 'bl4', lot: 'Lot 04', label: 'Électricité', prevue: 95_000_000, engagee: 95_000_000, realisee: 42_000_000, status: 'ok' },
      { id: 'bl5', lot: 'Lot 05', label: 'Plomberie & CVC', prevue: 110_000_000, engagee: 0, realisee: 0, status: 'ok' },
      { id: 'bl6', lot: 'Lot 06', label: 'Menuiseries int. & Agencement', prevue: 75_000_000, engagee: 0, realisee: 0, status: 'ok' },
      { id: 'bl7', lot: 'Lot 07', label: 'Peinture & Revêtements', prevue: 60_000_000, engagee: 0, realisee: 0, status: 'ok' },
      { id: 'bl8', lot: 'Lot 08', label: 'Espaces extérieurs & Paysage', prevue: 45_000_000, engagee: 0, realisee: 0, status: 'ok' },
      { id: 'bl9', lot: 'Lot 09', label: 'Honoraires MOE', prevue: 130_000_000, engagee: 130_000_000, realisee: 130_000_000, status: 'ok' },
    ],
  },
  {
    id: 'b2',
    projectId: 'p2',
    currency: 'FCFA',
    total: 3_800_000_000,
    engaged: 1_710_000_000,
    spent: 980_000_000,
    updatedAt: '22 Nov. 2024',
    lines: [
      { id: 'bl10', lot: 'Lot 01', label: 'Fondations spéciales', prevue: 280_000_000, engagee: 342_000_000, realisee: 342_000_000, status: 'overrun' },
      { id: 'bl11', lot: 'Lot 02', label: 'Gros Œuvre', prevue: 920_000_000, engagee: 920_000_000, realisee: 480_000_000, status: 'ok' },
      { id: 'bl12', lot: 'Lot 03', label: 'Façades rideaux', prevue: 420_000_000, engagee: 600_000_000, realisee: 0, status: 'alert' },
      { id: 'bl13', lot: 'Lot 04', label: 'CVC & Plomberie', prevue: 380_000_000, engagee: 380_000_000, realisee: 158_000_000, status: 'ok' },
      { id: 'bl14', lot: 'Lot 05', label: 'Électricité & courants faibles', prevue: 290_000_000, engagee: 290_000_000, realisee: 0, status: 'ok' },
      { id: 'bl15', lot: 'Lot 06', label: 'Honoraires & études', prevue: 450_000_000, engagee: 450_000_000, realisee: 450_000_000, status: 'ok' },
    ],
  },
]

// ══════════════════════════════════════════════════════════════
// RAPPORTS
// ══════════════════════════════════════════════════════════════

export const MOCK_REPORTS: Report[] = [
  { id: 'rp1', projectId: 'p1', projectName: 'Projet Kribi', type: 'mission_ia', typeLabel: 'Mission IA', title: 'Analyse réglementaire PLU — Synthèse', author: 'ADP Architecte', status: 'final', statusLabel: 'Final', pages: 4, size: '380 Ko', createdAt: '24 Nov. 2024', missionId: 'm1' },
  { id: 'rp2', projectId: 'p2', projectName: 'BCEC Bafoussam', type: 'mission_ia', typeLabel: 'Mission IA', title: 'Estimation budgétaire révisée DCE', author: 'ADP QuanTBIM', status: 'final', statusLabel: 'Final', pages: 6, size: '520 Ko', createdAt: '22 Nov. 2024', missionId: 'm2' },
  { id: 'rp3', projectId: 'p1', projectName: 'Projet Kribi', type: 'compte_rendu', typeLabel: 'Compte-rendu', title: 'CR Réunion de coordination — 22 Nov. 2024', author: 'Paul Figueras', status: 'final', statusLabel: 'Final', pages: 3, size: '210 Ko', createdAt: '22 Nov. 2024' },
  { id: 'rp4', projectId: 'p2', projectName: 'BCEC Bafoussam', type: 'phase', typeLabel: 'Rapport de phase', title: 'Rapport PRO — Bilan de phase', author: 'Paul Figueras', status: 'shared', statusLabel: 'Partagé', pages: 18, size: '2,4 Mo', createdAt: '31 Août 2024' },
  { id: 'rp5', projectId: 'p1', projectName: 'Projet Kribi', type: 'note_technique', typeLabel: 'Note technique', title: 'Note structure — Calculs fondations', author: 'Charles Ateba', status: 'final', statusLabel: 'Final', pages: 12, size: '1,1 Mo', createdAt: '15 Oct. 2024' },
  { id: 'rp6', projectId: 'p5', projectName: 'USCA Bangangte', type: 'note_technique', typeLabel: 'Note technique', title: 'Note de synthèse environnementale RE2020', author: 'ADP Architecte', status: 'draft', statusLabel: 'Brouillon', pages: 8, size: '680 Ko', createdAt: '15 Nov. 2024' },
  { id: 'rp7', projectId: 'p4', projectName: 'Maison Sawa', type: 'compte_rendu', typeLabel: 'Compte-rendu', title: 'CR Visite de chantier — 20 Nov. 2024', author: 'Brian Toko', status: 'final', statusLabel: 'Final', pages: 5, size: '3,2 Mo', createdAt: '20 Nov. 2024' },
  { id: 'rp8', projectId: 'p1', projectName: 'Projet Kribi', type: 'budget', typeLabel: 'Budget', title: 'Point budgétaire — Novembre 2024', author: 'Amina Nkoa', status: 'draft', statusLabel: 'Brouillon', pages: 4, size: '290 Ko', createdAt: '27 Nov. 2024' },
]

// ══════════════════════════════════════════════════════════════
// MEMBRES D'ÉQUIPE
// ══════════════════════════════════════════════════════════════

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: 'tm1', userId: 'u1', projectId: 'p1', fullName: 'Paul Figueras', initials: 'PF', email: 'paul.figueras@ateliersdepaul.com', role: 'owner', profession: 'Architecte DPLG', avatarColor: 'bg-adp-blue', status: 'active', joinedAt: '12 Jan. 2024', lastActive: "Aujourd'hui à 11h45", tasksCount: 3, documentsCount: 12 },
  { id: 'tm2', userId: 'u2', projectId: 'p1', fullName: 'Serge Manager', initials: 'SM', email: 'serge.manager@ateliersdepaul.com', role: 'admin', profession: 'BIM Manager', avatarColor: 'bg-violet-500', status: 'active', joinedAt: '12 Jan. 2024', lastActive: "Aujourd'hui à 10h20", tasksCount: 2, documentsCount: 8 },
  { id: 'tm3', userId: 'u3', projectId: 'p1', fullName: 'Marie Tchiou', initials: 'MT', email: 'marie.tchiou@ateliersdepaul.com', role: 'editor', profession: 'Architecte', avatarColor: 'bg-emerald-500', status: 'active', joinedAt: '15 Jan. 2024', lastActive: "Hier à 17h30", tasksCount: 1, documentsCount: 5 },
  { id: 'tm4', userId: 'u4', projectId: 'p1', fullName: 'Charles Ateba', initials: 'CA', email: 'charles.ateba@ateliersdepaul.com', role: 'editor', profession: 'Ingénieur Structure', avatarColor: 'bg-orange-500', status: 'away', joinedAt: '20 Jan. 2024', lastActive: "Il y a 2 jours", tasksCount: 1, documentsCount: 4 },
  { id: 'tm5', userId: 'u5', projectId: 'p1', fullName: 'Fichor Mbouvet', initials: 'FM', email: 'fichor.mbouvet@ateliersdepaul.com', role: 'editor', profession: 'Dessinateur Projeteur', avatarColor: 'bg-pink-500', status: 'active', joinedAt: '22 Jan. 2024', lastActive: "Aujourd'hui à 09h00", tasksCount: 0, documentsCount: 6 },
  { id: 'tm6', userId: 'u1', projectId: 'p2', fullName: 'Paul Figueras', initials: 'PF', email: 'paul.figueras@ateliersdepaul.com', role: 'owner', profession: 'Architecte DPLG', avatarColor: 'bg-adp-blue', status: 'active', joinedAt: '3 Mars 2023', lastActive: "Aujourd'hui à 11h45", tasksCount: 1, documentsCount: 3 },
  { id: 'tm7', userId: 'u2', projectId: 'p2', fullName: 'Serge Manager', initials: 'SM', email: 'serge.manager@ateliersdepaul.com', role: 'admin', profession: 'BIM Manager', avatarColor: 'bg-violet-500', status: 'active', joinedAt: '3 Mars 2023', lastActive: "Aujourd'hui à 08h31", tasksCount: 1, documentsCount: 2 },
  { id: 'tm8', userId: 'u4', projectId: 'p2', fullName: 'Charles Ateba', initials: 'CA', email: 'charles.ateba@ateliersdepaul.com', role: 'editor', profession: 'Ingénieur Structure', avatarColor: 'bg-orange-500', status: 'away', joinedAt: '5 Mars 2023', lastActive: "Il y a 2 jours", tasksCount: 1, documentsCount: 3 },
  { id: 'tm9', userId: 'u6', projectId: 'p2', fullName: 'Brian Toko', initials: 'BT', email: 'brian.toko@ateliersdepaul.com', role: 'viewer', profession: 'Chef de Chantier', avatarColor: 'bg-teal-500', status: 'offline', joinedAt: '1 Sept. 2023', lastActive: "Il y a 5 jours", tasksCount: 0, documentsCount: 1 },
  { id: 'tm10', userId: 'u4', projectId: 'p4', fullName: 'Brian Toko', initials: 'BT', email: 'brian.toko@ateliersdepaul.com', role: 'editor', profession: 'Chef de Chantier', avatarColor: 'bg-teal-500', status: 'active', joinedAt: '1 Juil. 2023', lastActive: "Aujourd'hui à 08h00", tasksCount: 2, documentsCount: 2 },
]

export const RESOURCE_CATEGORIES = [
  { label: 'Templates', count: 42, icon: 'FileText', description: 'Modèles de documents et gabarits prêts à l\'emploi' },
  { label: 'Normes & Réglementations', count: 128, icon: 'Scale', description: 'DTU, Eurocodes, RE2020, PMR, ERP annotés' },
  { label: 'Détails constructifs', count: 86, icon: 'Layers', description: 'Détails DWG vérifiés par des professionnels' },
  { label: 'Familles BIM', count: 230, icon: 'Box', description: 'Familles Revit et objets BIM paramétriques' },
  { label: 'CCTP & Documents types', count: 64, icon: 'FileCheck', description: 'Pièces écrites types pour consultation' },
  { label: 'Guides & Tutoriels', count: 118, icon: 'BookOpen', description: 'Guides pratiques et formations métier' },
]
