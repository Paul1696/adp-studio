import { prisma } from '@/lib/prisma'
import type { MockDocument } from '@/lib/mock-data'
import { getCurrentDbUser, fullName } from './users'

const TYPE_CATEGORY: Record<string, MockDocument['category']> = {
  PLAN: 'Plans',
  REPORT: 'Rapport',
  CONTRACT: 'Contrat',
  PHOTO: 'Photo',
  BIM: 'Maquette BIM',
  OTHER: 'Rapport',
}

function extension(name: string, mimeType: string | null): MockDocument['type'] {
  const ext = name.split('.').pop()?.toUpperCase() ?? ''
  const known: MockDocument['type'][] = ['DWG', 'IFC', 'PDF', 'RVT', 'XLSX', 'DOCX', 'JPG', 'PNG']
  if (known.includes(ext as MockDocument['type'])) return ext as MockDocument['type']
  if (mimeType?.includes('pdf')) return 'PDF'
  if (mimeType?.startsWith('image/')) return 'JPG'
  return 'PDF'
}

export function formatSize(bytes: number | null): string {
  if (bytes == null) return '—'
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mo`
  if (bytes >= 1_024) return `${Math.round(bytes / 1_024)} Ko`
  return `${bytes} o`
}

function formatDateTime(d: Date): string {
  return `${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })} à ${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}`
}

const DOC_INCLUDE = {
  project: { select: { id: true, name: true } },
  uploader: true,
} as const

type DbDocument = Awaited<ReturnType<typeof prisma.document.findMany<{ include: typeof DOC_INCLUDE }>>>[number]

export function toUiDocument(d: DbDocument): MockDocument {
  return {
    id: d.id,
    name: d.name,
    type: extension(d.name, d.mimeType),
    category: TYPE_CATEGORY[d.type] ?? 'Rapport',
    size: formatSize(d.size),
    version: 'V1',
    projectId: d.project?.id ?? '',
    projectName: d.project?.name ?? 'Sans projet',
    uploadedBy: d.uploader ? fullName(d.uploader) : '—',
    uploadedAt: formatDateTime(d.createdAt),
    status: 'valide',
    statusLabel: 'Validé',
    tags: [],
  }
}

/** Documents visibles par l'utilisateur connecté. */
export async function getUserDocuments(): Promise<MockDocument[]> {
  const user = await getCurrentDbUser()
  if (!user) return []
  const rows = await prisma.document.findMany({
    where: {
      OR: [{ uploadedBy: user.id }, { project: { members: { some: { userId: user.id } } } }],
    },
    include: DOC_INCLUDE,
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toUiDocument)
}

/** Documents d'un projet. */
export async function getProjectDocuments(projectId: string): Promise<MockDocument[]> {
  const rows = await prisma.document.findMany({
    where: { projectId },
    include: DOC_INCLUDE,
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toUiDocument)
}
