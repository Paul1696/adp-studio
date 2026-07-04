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
      <Decorations />

      {/* Plan architectural — gauche */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[38%]">
        <FloorPlan />
      </div>

      {/* Bâtiment fil de fer — droite */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[38%]">
        <Building />
      </div>

      {/* Centre : logo + Clerk */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <Image
          src="/logo-adp-studio.png"
          alt="ADP Studio"
          width={200}
          height={77}
          className="object-contain"
          priority
        />
        <SignIn />
        <p className="text-[12px]" style={{ color: '#94a3b8' }}>
          © 2026 Ateliers de Paul
        </p>
      </div>
    </div>
  )
}
