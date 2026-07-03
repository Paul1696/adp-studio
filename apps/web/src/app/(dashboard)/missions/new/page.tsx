'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Zap, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_PROJECTS } from '@/lib/mock-data'
import { StepObjectif } from './_components/step-objectif'
import { StepProjet } from './_components/step-projet'
import { StepAgents } from './_components/step-agents'
import { StepRevue } from './_components/step-revue'

export interface WizardState {
  objectif: string
  projectId: string
  projectName: string
  agentIds: string[]
}

const STEPS = ['Objectif', 'Projet', 'Agents', 'Revue']

export default function NewMissionPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const prefilledId      = searchParams.get('projectId') ?? ''
  const prefilledObjectif = searchParams.get('objectif') ?? ''
  const prefilledProject = MOCK_PROJECTS.find((p) => p.id === prefilledId)

  const [step, setStep] = useState(prefilledId ? 1 : 0)
  const [state, setState] = useState<WizardState>({
    objectif: prefilledObjectif,
    projectId: prefilledProject?.id ?? '',
    projectName: prefilledProject?.name ?? '',
    agentIds: [],
  })

  const update = (patch: Partial<WizardState>) => setState((s) => ({ ...s, ...patch }))

  const canNext = () => {
    if (step === 0) return state.objectif.trim().length > 10
    if (step === 1) return state.projectId !== ''
    if (step === 2) return state.agentIds.length > 0
    return true
  }

  const handleLaunch = () => {
    // Simulation : redirige vers la mission m1 (mock)
    router.push('/missions/m1')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-adp-blue/10">
          <Zap className="h-5 w-5 text-adp-blue" strokeWidth={1.75} />
        </div>
        <div>
          <h1 className="text-[20px] font-bold text-adp-slate">Nouvelle mission IA</h1>
          <p className="text-[14px] text-adp-muted">Étape {step + 1} sur {STEPS.length}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-bold transition-colors duration-150',
                i < step  ? 'bg-adp-blue text-white' :
                i === step ? 'bg-adp-blue text-white ring-4 ring-adp-blue/20' :
                             'bg-slate-100 text-adp-muted'
              )}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={cn('mt-1 text-[12px] font-medium', i === step ? 'text-adp-blue' : 'text-adp-muted')}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn('mb-4 h-px flex-1 transition-colors duration-300', i < step ? 'bg-adp-blue' : 'bg-slate-200')} />
            )}
          </div>
        ))}
      </div>

      {/* Contenu étape */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
        {step === 0 && <StepObjectif value={state.objectif} onChange={(v) => update({ objectif: v })} />}
        {step === 1 && <StepProjet value={state.projectId} onChange={(id, name) => update({ projectId: id, projectName: name })} />}
        {step === 2 && <StepAgents value={state.agentIds} onChange={(ids) => update({ agentIds: ids })} />}
        {step === 3 && <StepRevue state={state} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => step > 0 ? setStep(step - 1) : router.back()}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[14px] font-medium text-adp-muted transition-colors duration-150 hover:border-slate-300 hover:text-adp-slate"
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
          {step === 0 ? 'Annuler' : 'Retour'}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className="flex items-center gap-1.5 rounded-xl bg-adp-blue px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
          >
            Suivant
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        ) : (
          <button
            onClick={handleLaunch}
            className="flex items-center gap-2 rounded-xl bg-adp-blue px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-adp-blue-dark hover:shadow-md"
          >
            <Zap className="h-3.5 w-3.5" strokeWidth={2} />
            Lancer la mission
          </button>
        )}
      </div>
    </div>
  )
}
