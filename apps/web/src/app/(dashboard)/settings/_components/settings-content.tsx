'use client'

import { useState } from 'react'
import { SettingsNav, type SettingsTab } from './settings-nav'
import {
  SectionGeneral, SectionProfil, SectionAgents,
  SectionDocuments, SectionNotifications, SectionSecurite,
  SectionIntegrations, SectionFacturation,
} from './settings-sections'

function ActiveSection({ tab }: { tab: SettingsTab }) {
  switch (tab) {
    case 'profil':        return <SectionProfil />
    case 'agents':        return <SectionAgents />
    case 'general':       return <SectionGeneral />
    case 'documents':     return <SectionDocuments />
    case 'notifications': return <SectionNotifications />
    case 'securite':      return <SectionSecurite />
    case 'integrations':  return <SectionIntegrations />
    case 'facturation':   return <SectionFacturation />
  }
}

export function SettingsContent() {
  const [active, setActive] = useState<SettingsTab>('general')

  return (
    <div className="flex gap-6">
      <div className="w-52 shrink-0">
        <SettingsNav active={active} onChange={setActive} />
      </div>
      <div className="min-w-0 flex-1">
        <ActiveSection tab={active} />
      </div>
    </div>
  )
}
