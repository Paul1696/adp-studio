export type ID = string

export type Timestamp = string // ISO 8601

export interface BaseEntity {
  id: ID
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type Status = 'active' | 'inactive' | 'archived' | 'draft'

export type Role = 'owner' | 'admin' | 'editor' | 'viewer'

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
}
