'use client'

const SUGGESTIONS = [
  "Analyser la conformité réglementaire PLU du projet",
  "Réviser l'estimation budgétaire après modifications",
  "Détecter les conflits inter-disciplines dans la maquette BIM",
  "Produire une note de synthèse environnementale",
  "Vérifier la cohérence des documents CCTP et DPGF",
]

interface Props {
  value: string
  onChange: (v: string) => void
}

export function StepObjectif({ value, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[16px] font-bold text-adp-slate">Quel est l&apos;objectif de cette mission ?</h2>
        <p className="mt-1 text-[14px] text-adp-muted">Décrivez précisément ce que vous souhaitez accomplir.</p>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex : Analyser la conformité du projet au PLU et identifier les risques avant le dépôt du permis…"
        rows={4}
        className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-adp-slate outline-none transition-all duration-150 placeholder:text-adp-muted/50 focus:border-adp-blue focus:bg-white focus:ring-2 focus:ring-adp-blue/10"
      />
      <p className="text-right text-[12px] text-adp-muted">{value.length} caractères (minimum 10)</p>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-adp-muted">Suggestions</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onChange(s)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-left text-[13px] text-adp-muted transition-colors duration-150 hover:border-adp-blue/40 hover:text-adp-slate"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
