export const APP_NAME = 'ADP Studio' as const
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
export const APP_VERSION = '0.1.0' as const

export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  projects: '/projects',
  documents: '/documents',
  agents: '/agents',
  resources: '/resources',
  settings: '/settings',
} as const

export const QUERY_KEYS = {
  projects: ['projects'] as const,
  project: (id: string) => ['projects', id] as const,
  documents: ['documents'] as const,
  document: (id: string) => ['documents', id] as const,
  agents: ['agents'] as const,
  resources: ['resources'] as const,
  user: ['user'] as const,
} as const
