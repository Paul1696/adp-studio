import type { BaseEntity, ID, Status } from './common'

export type DocumentCategory =
  | 'plans'
  | 'specifications'
  | 'reports'
  | 'contracts'
  | 'permits'
  | 'bim'
  | 'photos'
  | 'other'

export type DocumentFormat =
  | 'pdf'
  | 'dwg'
  | 'rvt'
  | 'ifc'
  | 'xlsx'
  | 'docx'
  | 'jpg'
  | 'png'
  | 'other'

export interface Document extends BaseEntity {
  name: string
  description?: string
  category: DocumentCategory
  format: DocumentFormat
  fileUrl: string
  fileSize: number
  version: string
  status: Status
  projectId?: ID
  uploadedById: ID
  tags: string[]
  metadata: DocumentMetadata
}

export interface DocumentMetadata {
  pageCount?: number
  discipline?: string
  drawingNumber?: string
  revision?: string
  scale?: string
}
