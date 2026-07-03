import { CheckCircle, Clock, Loader, AlertCircle, Bot, Timer } from 'lucide-react'
import type { Mission, MissionStep } from '@/lib/types'
import { cn } from '@/lib/utils'

function StepOutput({ output }: { output: string }) {
  const lines = output.split('\n')
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-slate-800/60 bg-slate-900">
      <div className="flex items-center gap-1.5 border-b border-slate-700/60 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-[10px] font-medium text-slate-500">output</span>
      </div>
      <div className="p-3 space-y-0.5">
        {lines.map((line, i) => {
          const isOk  = line.startsWith('✅')
          const isWarn= line.startsWith('⚠️')
          const isErr = line.startsWith('❌')
          const isPending = line.startsWith('⏳')
          return (
            <p key={i} className={cn(
              'font-mono text-[11px] leading-relaxed',
              isOk      && 'text-emerald-400',
              isWarn    && 'text-amber-400',
              isErr     && 'text-red-400',
              isPending && 'text-blue-400',
              !isOk && !isWarn && !isErr && !isPending && 'text-slate-300',
            )}>
              {line || ' '}
            </p>
          )
        })}
      </div>
    </div>
  )
}

const STEP_CFG = {
  pending: { icon: Clock,        color: 'text-slate-400',   bg: 'bg-slate-100',    label: 'En attente' },
  running: { icon: Loader,       color: 'text-adp-blue',    bg: 'bg-blue-50',      label: 'En cours' },
  done:    { icon: CheckCircle,  color: 'text-emerald-600', bg: 'bg-emerald-50',   label: 'Terminée' },
  error:   { icon: AlertCircle,  color: 'text-red-500',     bg: 'bg-red-50',       label: 'Erreur' },
}

function StepCard({ step, index, isLast }: { step: MissionStep; index: number; isLast: boolean }) {
  const cfg = STEP_CFG[step.status]
  const Icon = cfg.icon

  return (
    <div className="flex gap-4">
      {/* Connecteur vertical */}
      <div className="flex flex-col items-center">
        <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', cfg.bg)}>
          <Icon className={cn('h-4 w-4', cfg.color, step.status === 'running' && 'animate-spin')} strokeWidth={1.75} />
        </div>
        {!isLast && <div className={cn('mt-1 w-px flex-1', step.status === 'done' ? 'bg-emerald-200' : 'bg-slate-100')} style={{ minHeight: '1.5rem' }} />}
      </div>

      {/* Contenu */}
      <div className={cn('min-w-0 pb-4', isLast && 'pb-0')}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-adp-muted">#{index + 1}</span>
          <p className="text-[14px] font-semibold text-adp-slate">{step.title}</p>
          <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-bold', cfg.bg, cfg.color)}>{cfg.label}</span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <div className="flex items-center gap-1 text-[12px] text-adp-muted">
            <Bot className="h-3 w-3" strokeWidth={1.75} />
            {step.agentName}
          </div>
          {step.durationSeconds && (
            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              <Timer className="h-2.5 w-2.5" strokeWidth={2} />
              {step.durationSeconds}s
            </span>
          )}
        </div>

        <p className="mt-1 text-[12px] text-adp-muted">{step.description}</p>

        {step.output && <StepOutput output={step.output} />}

        {step.status === 'running' && !step.output && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
            <Loader className="h-3 w-3 animate-spin text-adp-blue" strokeWidth={2} />
            <span className="text-[12px] text-adp-blue">Analyse en cours…</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function MissionSteps({ mission }: { mission: Mission }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-[14px] font-semibold tracking-tight text-adp-slate">
        Étapes de la mission
      </h2>
      <div>
        {mission.steps.map((step, i) => (
          <StepCard key={step.id} step={step} index={i} isLast={i === mission.steps.length - 1} />
        ))}
      </div>
    </div>
  )
}
