export function Building() {
  return (
    <svg
      viewBox="0 0 500 600"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.32 }}
    >
      {/* ── Façade principale (face avant) ── */}
      <polygon points="80,500 80,150 340,150 340,500" stroke="#3b82f6" strokeWidth="1.6" />

      {/* ── Toit plat (face avant) ── */}
      <line x1="80" y1="150" x2="340" y2="150" stroke="#3b82f6" strokeWidth="2" />

      {/* ── Face latérale droite ── */}
      <polygon points="340,150 430,100 430,450 340,500" stroke="#3b82f6" strokeWidth="1.4" />

      {/* ── Toit plat côté ── */}
      <line x1="340" y1="150" x2="430" y2="100" stroke="#3b82f6" strokeWidth="2" />
      <line x1="80" y1="150" x2="170" y2="100" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="6 3" />
      <line x1="170" y1="100" x2="430" y2="100" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="6 3" />

      {/* ── Ligne de sol ── */}
      <line x1="60" y1="500" x2="450" y2="500" stroke="#3b82f6" strokeWidth="1.2" />
      <line x1="450" y1="500" x2="450" y2="450" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="4 3" />

      {/* ── Étages façade (5 niveaux) ── */}
      {[220, 290, 360, 430].map(y => (
        <line key={y} x1="80" y1={y} x2="340" y2={y} stroke="#3b82f6" strokeWidth="0.9" />
      ))}
      {/* Étages côté */}
      {[220, 290, 360, 430].map(y => (
        <line key={`s${y}`} x1="340" y1={y} x2="430" y2={y - 50} stroke="#3b82f6" strokeWidth="0.7" />
      ))}

      {/* ── Grille fenêtres façade ── */}
      {[0, 1, 2, 3, 4].map(row => (
        [0, 1, 2, 3].map(col => {
          const x = 105 + col * 60
          const y = 165 + row * 70
          return (
            <rect key={`f${row}${col}`} x={x} y={y} width={44} height={44}
              stroke="#3b82f6" strokeWidth="0.9" />
          )
        })
      ))}

      {/* ── Grille fenêtres côté ── */}
      {[0, 1, 2, 3, 4].map(row => (
        [0, 1].map(col => {
          const x1 = 348 + col * 40
          const y1 = 120 + row * 70 - col * 25 + 45
          return (
            <g key={`sf${row}${col}`}>
              <line x1={x1} y1={y1} x2={x1 + 30} y2={y1 - 17} stroke="#3b82f6" strokeWidth="0.8" />
              <line x1={x1} y1={y1 + 35} x2={x1 + 30} y2={y1 + 18} stroke="#3b82f6" strokeWidth="0.8" />
              <line x1={x1} y1={y1} x2={x1} y2={y1 + 35} stroke="#3b82f6" strokeWidth="0.8" />
              <line x1={x1 + 30} y1={y1 - 17} x2={x1 + 30} y2={y1 + 18} stroke="#3b82f6" strokeWidth="0.8" />
            </g>
          )
        })
      ))}

      {/* ── Colonnes structurelles ── */}
      {[80, 157, 234, 340].map(x => (
        <line key={`c${x}`} x1={x} y1="150" x2={x} y2="500" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="3 3" />
      ))}

      {/* ── Entrée ── */}
      <rect x="170" y="420" width="80" height="80" stroke="#3b82f6" strokeWidth="1.4" />
      <line x1="210" y1="420" x2="210" y2="500" stroke="#3b82f6" strokeWidth="0.8" />
    </svg>
  )
}
