// ─────────────────────────────────────────────────────────────
// ADP Studio — Interfaces de services abstraits
// Principe : les pages utilisent ces interfaces.
// Aujourd'hui → implémentation mock.
// Demain → implémentation Supabase sans toucher aux pages.
// ─────────────────────────────────────────────────────────────

export type ServiceResult<T> =
  | { data: T; error: null }
  | { data: null; error: string }

export function ok<T>(data: T): ServiceResult<T> {
  return { data, error: null }
}

export function err<T>(message: string): ServiceResult<T> {
  return { data: null, error: message }
}

// ── Interfaces génériques ─────────────────────────────────

export interface IProjectService {
  getAll(): Promise<ServiceResult<import('../mock-data').MockProject[]>>
  getById(id: string): Promise<ServiceResult<import('../mock-data').MockProject>>
}

export interface IMissionService {
  getAll(): Promise<ServiceResult<import('../types').Mission[]>>
  getById(id: string): Promise<ServiceResult<import('../types').Mission>>
  getByProject(projectId: string): Promise<ServiceResult<import('../types').Mission[]>>
}

export interface IAgentService {
  getAll(): Promise<ServiceResult<import('../mock-data').MockAgent[]>>
  getById(id: string): Promise<ServiceResult<import('../mock-data').MockAgent>>
}

export interface IDocumentService {
  getAll(): Promise<ServiceResult<import('../mock-data').MockDocument[]>>
  getByProject(projectId: string): Promise<ServiceResult<import('../mock-data').MockDocument[]>>
}

export interface IActivityService {
  getAll(): Promise<ServiceResult<import('../mock-data').MockActivity[]>>
  getByProject(projectId: string): Promise<ServiceResult<import('../mock-data').MockActivity[]>>
}

export interface IConversationService {
  getAll(): Promise<ServiceResult<import('../types').Conversation[]>>
  getById(id: string): Promise<ServiceResult<import('../types').Conversation>>
}
