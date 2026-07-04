export function Building() {
  return (
    <svg viewBox="0 0 520 620" className="h-full w-full" fill="none" style={{ opacity: 0.38 }}>
      {/* Face avant */}
      <polygon points="160,520 160,160 360,80 360,440" fill="#3b82f6" fillOpacity="0.07" stroke="#3b82f6" strokeWidth="1.8"/>
      {/* Face droite */}
      <polygon points="360,80 480,140 480,500 360,440" fill="#3b82f6" fillOpacity="0.13" stroke="#3b82f6" strokeWidth="1.5"/>
      {/* Toit */}
      <polygon points="160,160 360,80 480,140 280,220" fill="#3b82f6" fillOpacity="0.10" stroke="#3b82f6" strokeWidth="1.6"/>
      {/* Arête arrière toit */}
      <line x1="280" y1="220" x2="160" y2="160" stroke="#3b82f6" strokeWidth="0.7" strokeDasharray="6 3" strokeOpacity="0.5"/>

      {/* Étages façade avant — 5 lignes */}
      {[1,2,3,4,5].map(i => (
        <line key={i}
          x1="160" y1={160 + i * 60}
          x2="360" y2={160 + i * 60 - 80 * (i / 5.5)}
          stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.5"
        />
      ))}

      {/* Fenêtres façade avant — 4×6 */}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => {
          const x = 178 + col * 43
          const y = 175 + row * 54 - row * 7.5
          const lit = (row + col) % 3 !== 0
          return (
            <g key={`f${row}-${col}`}>
              <rect x={x} y={y} width={32} height={34}
                fill={lit ? "#3b82f6" : "none"} fillOpacity={lit ? 0.14 : 0}
                stroke="#3b82f6" strokeWidth="0.9"/>
              <line x1={x+16} y1={y} x2={x+16} y2={y+34} stroke="#3b82f6" strokeWidth="0.35"/>
              <line x1={x} y1={y+17} x2={x+32} y2={y+17} stroke="#3b82f6" strokeWidth="0.35"/>
            </g>
          )
        })
      )}

      {/* Colonnes structurelles façade */}
      {[160,204,248,292,336,360].map(x => (
        <line key={x}
          x1={x} y1={160 - (x-160)*0.4}
          x2={x} y2={520 - (x-160)*0.4}
          stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.45"
        />
      ))}

      {/* Fenêtres face droite — 3×5 rangées, skew isométrique */}
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => {
          const x = 370 + col * 34
          const y = 115 + row * 65 + col * 20
          const lit = (row + col) % 2 === 0
          return (
            <g key={`r${row}-${col}`} transform={`skewY(26)`} style={{ transformOrigin: `${x}px ${y}px` }}>
              <rect x={x} y={y} width={24} height={32}
                fill={lit ? "#3b82f6" : "none"} fillOpacity={lit ? 0.18 : 0}
                stroke="#3b82f6" strokeWidth="0.8"
              />
            </g>
          )
        })
      )}

      {/* Sol */}
      <line x1="100" y1="520" x2="480" y2="520" stroke="#3b82f6" strokeWidth="1.3"/>
      <line x1="480" y1="500" x2="480" y2="520" stroke="#3b82f6" strokeWidth="1.3"/>

      {/* Entrée */}
      <rect x="228" y="456" width="64" height="64" fill="#3b82f6" fillOpacity="0.09" stroke="#3b82f6" strokeWidth="1.4"/>
      <line x1="260" y1="456" x2="260" y2="520" stroke="#3b82f6" strokeWidth="0.8"/>
      <path d="M228 456 Q260 436 292 456" stroke="#3b82f6" strokeWidth="1" fill="none"/>

      {/* Ombre portée */}
      <line x1="160" y1="520" x2="100" y2="548" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="5 3" strokeOpacity="0.45"/>
      <line x1="480" y1="520" x2="420" y2="548" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="5 3" strokeOpacity="0.45"/>
      <line x1="100" y1="548" x2="420" y2="548" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="5 3" strokeOpacity="0.45"/>
    </svg>
  )
}
