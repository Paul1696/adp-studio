import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'

export const metadata: Metadata = { title: 'Connexion — ADP Studio' }

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-adp-surface px-4">
      <div className="flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-adp-blue shadow-lg shadow-adp-blue/25">
            <span className="text-base font-bold text-white">A</span>
          </div>
          <div className="text-center">
            <h1 className="text-[20px] font-bold text-adp-slate">ADP Studio</h1>
            <p className="mt-0.5 text-[14px] text-adp-muted">Plateforme IA pour architectes</p>
          </div>
        </div>

        {/* Clerk SignIn */}
        <SignIn />

        <p className="text-[12px] text-adp-muted/60">© 2024 Ateliers de Paul</p>
      </div>
    </div>
  )
}
