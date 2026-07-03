'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SplashScreen() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 2200
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start
      const p = Math.min((elapsed / duration) * 100, 100)
      setProgress(p)
      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => router.push('/dashboard'), 150)
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [router])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f0f4f8]">

      {/* Grille plans archi — coin haut gauche */}
      <svg className="pointer-events-none absolute left-0 top-0 opacity-[0.12]" width="420" height="340" viewBox="0 0 420 340" fill="none">
        {/* Lignes horizontales */}
        {[40,80,120,160,200,240,280].map(y => <line key={y} x1="0" y1={y} x2="420" y2={y} stroke="#3b82f6" strokeWidth="0.8"/>)}
        {/* Lignes verticales */}
        {[40,80,120,160,200,240,280,320,360,400].map(x => <line key={x} x1={x} y1="0" x2={x} y2="340" stroke="#3b82f6" strokeWidth="0.8"/>)}
        {/* Rectangle plan */}
        <rect x="60" y="60" width="220" height="160" stroke="#3b82f6" strokeWidth="1.2" fill="none"/>
        <rect x="100" y="100" width="80" height="60" stroke="#3b82f6" strokeWidth="1" fill="none"/>
        <rect x="200" y="100" width="60" height="60" stroke="#3b82f6" strokeWidth="1" fill="none"/>
        <line x1="60" y1="140" x2="280" y2="140" stroke="#3b82f6" strokeWidth="0.8"/>
        {/* Cotes */}
        <line x1="60" y1="50" x2="280" y2="50" stroke="#3b82f6" strokeWidth="0.6"/>
        <line x1="60" y1="46" x2="60" y2="54" stroke="#3b82f6" strokeWidth="0.6"/>
        <line x1="280" y1="46" x2="280" y2="54" stroke="#3b82f6" strokeWidth="0.6"/>
      </svg>

      {/* Points décoratifs */}
      {[
        [88,82],[1148,78],[84,620],[1320,480],[220,680],
        [1100,200],[60,400],[1380,300],[500,50],[900,700],
      ].map(([x,y],i) => (
        <div key={i} className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-adp-blue/30" style={{left:x,top:y}}/>
      ))}

      {/* Bâtiment fil de fer — coin bas droite */}
      <svg className="pointer-events-none absolute bottom-0 right-0 opacity-[0.13]" width="360" height="320" viewBox="0 0 360 320" fill="none">
        {/* Base bâtiment */}
        <polyline points="40,280 40,120 180,60 320,120 320,280" stroke="#3b82f6" strokeWidth="1.2" fill="none"/>
        {/* Arêtes verticales */}
        <line x1="40" y1="280" x2="320" y2="280" stroke="#3b82f6" strokeWidth="1.2"/>
        {/* Façade centrale */}
        <rect x="130" y="180" width="100" height="100" stroke="#3b82f6" strokeWidth="1" fill="none"/>
        {/* Fenêtres */}
        {[60,100,140,200,240,280].map(x => [140,200].map(y => (
          <rect key={`${x}-${y}`} x={x} y={y} width="28" height="22" stroke="#3b82f6" strokeWidth="0.8" fill="none"/>
        )))}
        {/* Toit */}
        <line x1="40" y1="120" x2="180" y2="60" stroke="#3b82f6" strokeWidth="1"/>
        <line x1="320" y1="120" x2="180" y2="60" stroke="#3b82f6" strokeWidth="1"/>
        <line x1="40" y1="120" x2="320" y2="120" stroke="#3b82f6" strokeWidth="1"/>
        {/* Lignes de profondeur */}
        <line x1="40" y1="120" x2="80" y2="100" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="4 3"/>
        <line x1="320" y1="120" x2="280" y2="100" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="4 3"/>
        <line x1="80" y1="100" x2="280" y2="100" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="4 3"/>
      </svg>

      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <Image
          src="/logo-adp-studio.png"
          alt="ADP Studio"
          width={260}
          height={100}
          className="object-contain"
          priority
        />

        <p className="text-[15px] tracking-wide text-slate-400">
          Assistant IA pour la conception architecturale
        </p>

        {/* Barre de progression */}
        <div className="mt-2 h-[3px] w-52 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-adp-blue transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Copyright */}
      <p className="absolute bottom-6 text-[12px] text-slate-400/70">
        © 2026 Ateliers de Paul
      </p>
    </div>
  )
}
