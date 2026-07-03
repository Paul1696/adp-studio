import type { Metadata } from 'next'
import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'

export const metadata: Metadata = { title: 'Connexion — ADP Studio' }

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-adp-surface px-4">
      <div className="flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo-adp.png"
            alt="ADP Studio"
            width={200}
            height={60}
            className="object-contain"
            priority
          />
          <p className="text-[14px] text-adp-muted">Plateforme IA pour architectes</p>
        </div>

        {/* Clerk SignIn */}
        <SignIn />

        <p className="text-[12px] text-adp-muted/60">© 2024 Ateliers de Paul</p>
      </div>
    </div>
  )
}
