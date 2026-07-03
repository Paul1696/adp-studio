import type { BaseEntity, Role } from './common'

export type UserProfession =
  | 'architect'
  | 'bim_manager'
  | 'engineer'
  | 'project_manager'
  | 'draftsman'
  | 'other'

export interface User extends BaseEntity {
  email: string
  fullName: string
  avatarUrl?: string
  profession: UserProfession
  organizationId?: string
  role: Role
  isEmailVerified: boolean
  lastLoginAt?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  language: 'fr' | 'en'
  theme: 'light' | 'dark' | 'system'
  notifications: NotificationPreferences
}

export interface NotificationPreferences {
  email: boolean
  inApp: boolean
  projectUpdates: boolean
  agentAlerts: boolean
}
