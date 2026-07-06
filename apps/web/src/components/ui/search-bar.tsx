'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, FolderOpen, Bot, FileText } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'

interface SearchResults {
  projects: { id: string; name: string; location: string }[]
  agents: { id: string; name: string; specialty: string }[]
  documents: { id: string; name: string; type: string }[]
}

const EMPTY_RESULTS: SearchResults = { projects: [], agents: [], documents: [] }

function useSearch(query: string) {
  const debounced = useDebounce(query, 250)
  const [results, setResults] = useState<SearchResults>(EMPTY_RESULTS)

  useEffect(() => {
    const q = debounced.trim()
    if (q.length < 2) { setResults(EMPTY_RESULTS); return }

    const controller = new AbortController()
    fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: SearchResults) => setResults(data))
      .catch(() => {})

    return () => controller.abort()
  }, [debounced])

  return results
}

export function SearchBar() {
  const [query, setQuery]   = useState('')
  const [open, setOpen]     = useState(false)
  const ref                 = useRef<HTMLDivElement>(null)
  const router              = useRouter()
  const results             = useSearch(query)
  const hasResults          = results.projects.length + results.agents.length + results.documents.length > 0

  // Ferme au clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const go = (href: string) => { router.push(href); setQuery(''); setOpen(false) }

  return (
    <div ref={ref} className="relative mx-4 w-72">
      {/* Input */}
      <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-adp-surface px-3 py-1.5">
        <Search className="h-3.5 w-3.5 shrink-0 text-adp-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Rechercher un document, projet..."
          className="flex-1 bg-transparent text-xs text-adp-slate outline-none placeholder:text-adp-muted/70"
        />
        <kbd className="hidden rounded border border-slate-200/80 bg-white px-1 py-0.5 text-[12px] text-adp-muted sm:inline">
          ⌘K
        </kbd>
      </div>

      {/* Dropdown */}
      {open && query.length >= 2 && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {!hasResults ? (
            <p className="px-4 py-6 text-center text-[14px] text-adp-muted">Aucun résultat pour « {query} »</p>
          ) : (
            <div className="max-h-80 overflow-y-auto py-2">
              {results.projects.length > 0 && (
                <Group label="Projets">
                  {results.projects.map((p) => (
                    <ResultRow key={p.id} icon={<FolderOpen className="h-3.5 w-3.5 text-adp-blue" strokeWidth={1.75} />}
                      label={p.name} sub={p.location} onClick={() => go(`/projects/${p.id}`)} />
                  ))}
                </Group>
              )}
              {results.agents.length > 0 && (
                <Group label="Agents">
                  {results.agents.map((a) => (
                    <ResultRow key={a.id} icon={<Bot className="h-3.5 w-3.5 text-violet-500" strokeWidth={1.75} />}
                      label={a.name} sub={a.specialty} onClick={() => go(`/agents/${a.id}`)} />
                  ))}
                </Group>
              )}
              {results.documents.length > 0 && (
                <Group label="Documents">
                  {results.documents.map((d) => (
                    <ResultRow key={d.id} icon={<FileText className="h-3.5 w-3.5 text-emerald-500" strokeWidth={1.75} />}
                      label={d.name} sub={d.type} onClick={() => go(`/documents`)} />
                  ))}
                </Group>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="px-4 pb-1 pt-2 text-[11px] font-bold uppercase tracking-widest text-adp-muted">{label}</p>
      {children}
    </div>
  )
}

function ResultRow({ icon, label, sub, onClick }: { icon: React.ReactNode; label: string; sub: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors duration-100 hover:bg-slate-50"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100">{icon}</div>
      <div className="min-w-0">
        <p className="truncate text-[14px] font-medium text-adp-slate">{label}</p>
        <p className="truncate text-[12px] text-adp-muted">{sub}</p>
      </div>
    </button>
  )
}
