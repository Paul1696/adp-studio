import type { Metadata } from 'next'
import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'

export const metadata: Metadata = { title: 'Connexion — ADP Studio' }

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4" style={{ background: '#f0f4f8' }}>

      {/* Grille plans — haut gauche */}
      <svg className="pointer-events-none absolute left-0 top-0" width="480" height="380" viewBox="0 0 480 380" fill="none" style={{ opacity: 0.18 }}>
        {[0,40,80,120,160,200,240,280,320,360].map(y => <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} stroke="#3b82f6" strokeWidth="0.7"/>)}
        {[0,40,80,120,160,200,240,280,320,360,400,440,480].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="380" stroke="#3b82f6" strokeWidth="0.7"/>)}
        <rect x="80" y="80" width="200" height="140" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
        <rect x="120" y="120" width="60" height="50" stroke="#3b82f6" strokeWidth="1.2" fill="none"/>
        <rect x="200" y="120" width="50" height="50" stroke="#3b82f6" strokeWidth="1.2" fill="none"/>
        <line x1="80" y1="155" x2="280" y2="155" stroke="#3b82f6" strokeWidth="0.8"/>
      </svg>

      {/* Points décoratifs */}
      {[[90,85],[1350,75],[85,630],[1310,490],[1110,210],[65,410]].map(([x,y],i) => (
        <div key={i} className="pointer-events-none absolute rounded-full" style={{ left: x, top: y, width: 6, height: 6, background: '#3b82f6', opacity: 0.25 }}/>
      ))}

      {/* Bâtiment fil de fer — bas droite */}
      <svg className="pointer-events-none absolute bottom-0 right-0" width="400" height="340" viewBox="0 0 400 340" fill="none" style={{ opacity: 0.18 }}>
        <polyline points="30,310 30,130 200,55 370,130 370,310" stroke="#3b82f6" strokeWidth="1.4" fill="none"/>
        <line x1="30" y1="310" x2="370" y2="310" stroke="#3b82f6" strokeWidth="1.4"/>
        <rect x="155" y="200" width="90" height="110" stroke="#3b82f6" strokeWidth="1.2" fill="none"/>
        {[60,110,230,280,330].map(x=>[150,200].map(y=>(
          <rect key={`w${x}${y}`} x={x} y={y} width="26" height="22" stroke="#3b82f6" strokeWidth="0.9" fill="none"/>
        )))}
        <line x1="30" y1="130" x2="75" y2="108" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="5 3"/>
        <line x1="370" y1="130" x2="325" y2="108" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="5 3"/>
        <line x1="75" y1="108" x2="325" y2="108" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="5 3"/>
      </svg>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <Image src="/logo-adp-studio.png" alt="ADP Studio" width={220} height={84} className="object-contain" priority/>
        <SignIn />
        <p style={{ fontSize: 12, color: '#94a3b8' }}>© 2026 Ateliers de Paul</p>
      </div>
    </div>
  )
}
