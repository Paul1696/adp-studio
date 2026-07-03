export function Building() {
  return (
    <svg viewBox="0 0 520 620" className="h-full w-full" fill="none" style={{ opacity: 0.32 }}>
      {/* Face avant — légère teinte */}
      <polygon points="160,520 160,160 360,80 360,440" fill="#3b82f6" fillOpacity="0.06" stroke="#3b82f6" strokeWidth="1.6" />
      {/* Face droite — teinte plus sombre */}
      <polygon points="360,80 480,140 480,500 360,440" fill="#3b82f6" fillOpacity="0.10" stroke="#3b82f6" strokeWidth="1.4" />
      {/* Toit */}
      <polygon points="160,160 360,80 480,140 280,220" fill="#3b82f6" fillOpacity="0.08" stroke="#3b82f6" strokeWidth="1.6" />

      {/* Étages façade avant */}
      {[1,2,3,4,5].map(i => {
        const y = 160 + i * 60
        const xRight = 360 - (i / 5.5) * 0
        return <line key={i} x1="160" y1={y} x2="360" y2={y - 80 * (i / 5.5)} stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.6"/>
      })}

      {/* Fenêtres façade avant — 4 colonnes × 6 rangées */}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => {
          const x = 178 + col * 43
          const yBase = 178 + row * 54
          const skew = row * 7.5
          const lit = (row + col) % 3 !== 0
          return (
            <g key={`${row}-${col}`}>
              <rect
                x={x} y={yBase - skew} width={32} height={34}
                fill={lit ? "#3b82f6" : "none"} fillOpacity={lit ? 0.12 : 0}
                stroke="#3b82f6" strokeWidth="0.9"
              />
              <line x1={x + 16} y1={yBase - skew} x2={x + 16} y2={yBase - skew + 34} stroke="#3b82f6" strokeWidth="0.35"/>
              <line x1={x} y1={yBase - skew + 17} x2={x + 32} y2={yBase - skew + 17} stroke="#3b82f6" strokeWidth="0.35"/>
            </g>
          )
        })
      )}

      {/* Fenêtres face droite — 3 col × 6 rangées */}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => {
          const x = 372 + col * 32
          const y = 108 + row * 57 - col * 19 + row * 8
          const lit = (row * 3 + col) % 4 !== 1
          return (
            <rect key={`r${row}-${col}`}
              x={x} y={y} width={22} height={30}
              fill={lit ? "#3b82f6" : "none"} fillOpacity={lit ? 0.15 : 0}
              stroke="#3b82f6" strokeWidth="0.8"
              transform={`skewY(26)`}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          )
        })
      )}

      {/* Colonnes structurelles façade */}
      {[160, 204, 248, 292, 336, 360].map(x => (
        <line key={x} x1={x} y1={160 - (x - 160) * 0.4} x2={x} y2={520 - (x - 160) * 0.4}
          stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.5"/>
      ))}

      {/* Sol */}
      <line x1="100" y1="520" x2="480" y2="520" stroke="#3b82f6" strokeWidth="1.2"/>
      <line x1="480" y1="500" x2="480" y2="520" stroke="#3b82f6" strokeWidth="1.2"/>

      {/* Entrée */}
      <rect x="228" y="458" width="64" height="62" fill="#3b82f6" fillOpacity="0.08" stroke="#3b82f6" strokeWidth="1.4"/>
      <line x1="260" y1="458" x2="260" y2="520" stroke="#3b82f6" strokeWidth="0.7"/>
      {/* Arc entrée */}
      <path d="M228 458 Q260 440 292 458" stroke="#3b82f6" strokeWidth="0.8" fill="none"/>

      {/* Ombre portée */}
      <line x1="160" y1="520" x2="100" y2="548" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="5 3" strokeOpacity="0.5"/>
      <line x1="480" y1="520" x2="420" y2="548" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="5 3" strokeOpacity="0.5"/>
      <line x1="100" y1="548" x2="420" y2="548" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="5 3" strokeOpacity="0.5"/>

      {/* Arête arrière toit */}
      <line x1="280" y1="220" x2="160" y2="160" stroke="#3b82f6" strokeWidth="0.7" strokeDasharray="6 3" strokeOpacity="0.5"/>
    </svg>
  )
}
