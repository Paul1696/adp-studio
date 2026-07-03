export function FloorPlan() {
  return (
    <svg
      viewBox="0 0 500 600"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.38 }}
    >
      {/* ── Fond grille ── */}
      {Array.from({ length: 20 }, (_, i) => (
        <line key={`gh${i}`} x1="0" y1={i * 30} x2="500" y2={i * 30} stroke="#3b82f6" strokeWidth="0.4" />
      ))}
      {Array.from({ length: 18 }, (_, i) => (
        <line key={`gv${i}`} x1={i * 30} y1="0" x2={i * 30} y2="600" stroke="#3b82f6" strokeWidth="0.4" />
      ))}

      {/* ── Ligne de cote principale (19000) ── */}
      <line x1="70" y1="68" x2="420" y2="68" stroke="#3b82f6" strokeWidth="0.9" />
      <line x1="70" y1="63" x2="70" y2="73" stroke="#3b82f6" strokeWidth="0.9" />
      <line x1="420" y1="63" x2="420" y2="73" stroke="#3b82f6" strokeWidth="0.9" />
      <text x="245" y="62" textAnchor="middle" fontSize="10" fill="#3b82f6" fontFamily="sans-serif">19000</text>

      {/* Sous-cotes A-B / B-C / C-D */}
      <line x1="70" y1="78" x2="187" y2="78" stroke="#3b82f6" strokeWidth="0.7" />
      <text x="128" y="90" textAnchor="middle" fontSize="9" fill="#3b82f6" fontFamily="sans-serif">6000</text>
      <line x1="187" y1="78" x2="303" y2="78" stroke="#3b82f6" strokeWidth="0.7" />
      <text x="245" y="90" textAnchor="middle" fontSize="9" fill="#3b82f6" fontFamily="sans-serif">4000</text>
      <line x1="303" y1="78" x2="420" y2="78" stroke="#3b82f6" strokeWidth="0.7" />
      <text x="361" y="90" textAnchor="middle" fontSize="9" fill="#3b82f6" fontFamily="sans-serif">6000</text>

      {/* ── Labels colonnes A B C D ── */}
      {[['A', 70], ['B', 187], ['C', 303], ['D', 420]].map(([l, x]) => (
        <g key={String(l)}>
          <circle cx={Number(x)} cy={105} r={11} stroke="#3b82f6" strokeWidth="0.9" />
          <text x={Number(x)} y={109} textAnchor="middle" fontSize="10" fill="#3b82f6" fontFamily="sans-serif" fontWeight="600">{l}</text>
        </g>
      ))}

      {/* ── Labels rangées 1 2 3 ── */}
      {[[1, 180], [2, 310], [3, 430]].map(([n, y]) => (
        <g key={String(n)}>
          <circle cx={45} cy={Number(y)} r={11} stroke="#3b82f6" strokeWidth="0.9" />
          <text x={45} y={Number(y) + 4} textAnchor="middle" fontSize="10" fill="#3b82f6" fontFamily="sans-serif" fontWeight="600">{n}</text>
        </g>
      ))}

      {/* ── Murs extérieurs ── */}
      <rect x="70" y="120" width="350" height="340" stroke="#3b82f6" strokeWidth="2.2" />

      {/* ── Murs intérieurs ── */}
      {/* Séparation verticale B */}
      <line x1="187" y1="120" x2="187" y2="460" stroke="#3b82f6" strokeWidth="1.4" />
      {/* Séparation verticale C */}
      <line x1="303" y1="120" x2="303" y2="460" stroke="#3b82f6" strokeWidth="1.4" />
      {/* Séparation horizontale rangée 2 */}
      <line x1="70" y1="290" x2="420" y2="290" stroke="#3b82f6" strokeWidth="1.4" />
      {/* Couloir rangée 1-2 */}
      <line x1="70" y1="200" x2="303" y2="200" stroke="#3b82f6" strokeWidth="1" />

      {/* ── Ouvertures portes ── */}
      <line x1="187" y1="200" x2="187" y2="230" stroke="#eef1f6" strokeWidth="3" />
      <path d="M187 200 Q207 200 207 220" stroke="#3b82f6" strokeWidth="0.8" fill="none" />
      <line x1="303" y1="290" x2="303" y2="320" stroke="#eef1f6" strokeWidth="3" />
      <path d="M303 290 Q323 290 323 310" stroke="#3b82f6" strokeWidth="0.8" fill="none" />

      {/* ── Escalier (coin bas-gauche) ── */}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`s${i}`} x1="70" y1={300 + i * 20} x2="130" y2={300 + i * 20} stroke="#3b82f6" strokeWidth="0.8" />
      ))}
      <line x1="130" y1="300" x2="130" y2="420" stroke="#3b82f6" strokeWidth="0.8" />

      {/* ── Annotations dimensions intérieures ── */}
      <text x="128" y="260" textAnchor="middle" fontSize="8" fill="#3b82f6" fontFamily="sans-serif">Bureau</text>
      <text x="245" y="170" textAnchor="middle" fontSize="8" fill="#3b82f6" fontFamily="sans-serif">Salle réunion</text>
      <text x="361" y="200" textAnchor="middle" fontSize="8" fill="#3b82f6" fontFamily="sans-serif">Open space</text>
      <text x="245" y="380" textAnchor="middle" fontSize="8" fill="#3b82f6" fontFamily="sans-serif">Atelier</text>
    </svg>
  )
}
