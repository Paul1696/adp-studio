import type { Metadata } from 'next'
import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'
import { FloorPlan } from '../_components/floor-plan'
import { Building } from '../_components/building'
import { Decorations } from '../_components/decorations'

export const metadata: Metadata = { title: 'Connexion — ADP Studio' }

export default function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: '#eef1f6' }}
    >
      {/* Décorations fond */}
      <div className="hidden md:contents">
        <Decorations />
      </div>

      {/* Plan architectural — gauche */}
      <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-[38%] md:block">
        <FloorPlan />
      </div>

      {/* Bâtiment fil de fer — droite */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38%] md:block">
        <Building />
      </div>

      {/* Centre : logo + Clerk */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-4 py-10">
        <Image
          src="/logo-adp-studio.png"
          alt="ADP Studio"
          width={200}
          height={77}
          className="object-contain"
          priority
        />
        <p className="max-w-xs text-center text-[13px]" style={{ color: '#64748b' }}>
          Votre espace de travail pour l&apos;architecture, le BIM et la gestion de projets.
        </p>
        <SignIn
          appearance={{
            elements: {
              cardBox: 'shadow-[0_20px_50px_-12px_rgba(37,99,235,0.18)] border border-slate-200/80',
              headerSubtitle: 'text-slate-500',
            },
          }}
        />
        <p className="text-[12px]" style={{ color: '#94a3b8' }}>
          © {new Date().getFullYear()} Ateliers de Paul
        </p>
      </div>
    </div>
  )
}
