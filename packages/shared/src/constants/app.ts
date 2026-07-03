export const APP_NAME = 'ADP Studio' as const
export const APP_VERSION = '0.1.0' as const
export const SUPPORTED_LOCALES = ['fr', 'en'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const FILE_SIZE_LIMIT_MB = 100
export const FILE_SIZE_LIMIT_BYTES = FILE_SIZE_LIMIT_MB * 1024 * 1024

export const SUPPORTED_DOCUMENT_FORMATS = [
  'pdf', 'dwg', 'rvt', 'ifc', 'xlsx', 'docx', 'jpg', 'png',
] as const

export const PROJECT_PHASES_LABELS: Record<string, string> = {
  pre_design:               'Pré-conception',
  schematic:                'Esquisse',
  design_development:       'APS / APD',
  construction_documents:   'DCE / PRO',
  bidding:                  'Consultation',
  construction:             'Chantier',
  closeout:                 'Réception',
}
