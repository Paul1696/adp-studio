import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-adp-surface text-center">

      {/* Logo */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-adp-blue shadow-lg shadow-adp-blue/20">
        <span className="text-sm font-bold text-white">A</span>
      </div>

      {/* Code */}
      <p className="text-[80px] font-bold leading-none tracking-tight text-slate-100">404</p>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="text-[20px] font-bold text-adp-slate">Page introuvable</h1>
        <p className="max-w-xs text-[15px] leading-relaxed text-adp-muted">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl bg-adp-blue px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-adp-blue-dark hover:shadow-md"
        >
          <Home className="h-4 w-4" strokeWidth={1.75} />
          Accueil
        </Link>
        <Link
          href="javascript:history.back()"
          className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-5 py-2.5 text-[15px] font-semibold text-adp-slate shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Retour
        </Link>
      </div>
    </div>
  )
}
