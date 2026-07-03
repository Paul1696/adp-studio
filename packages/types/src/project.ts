import type { BaseEntity, ID, Status } from './common'

export type ProjectPhase =
  | 'pre_design'
  | 'schematic'
  | 'design_development'
  | 'construction_documents'
  | 'bidding'
  | 'construction'
  | 'closeout'

export type ProjectType =
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'infrastructure'
  | 'renovation'
  | 'mixed_use'

export interface Project extends BaseEntity {
  name: string
  description?: string
  reference: string
  type: ProjectType
  phase: ProjectPhase
  status: Status
  ownerId: ID
  organizationId: ID
  startDate?: string
  endDate?: string
  address?: ProjectAddress
  members: ProjectMember[]
  tags: string[]
  bimEnabled: boolean
}

export interface ProjectAddress {
  street?: string
  city: string
  postalCode: string
  country: string
  coordinates?: { lat: number; lng: number }
}

export interface ProjectMember {
  userId: ID
  role: 'owner' | 'manager' | 'contributor' | 'viewer'
  joinedAt: string
}
