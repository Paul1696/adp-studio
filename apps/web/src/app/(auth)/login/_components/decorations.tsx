const DOTS = [
  [420, 85], [960, 120], [1100, 75], [1280, 210], [1380, 340],
  [420, 520], [85, 340], [180, 620], [1200, 580], [680, 55],
]

const PLUS = [
  [415, 355], [1275, 78],
]

export function Decorations() {
  return (
    <>
      {DOTS.map(([x, y], i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{ left: x, top: y, width: 5, height: 5, background: '#3b82f6', opacity: 0.22 }}
        />
      ))}
      {PLUS.map(([x, y], i) => (
        <div key={i} className="pointer-events-none absolute select-none" style={{ left: x, top: y, color: '#3b82f6', opacity: 0.3, fontSize: 18, lineHeight: 1 }}>
          +
        </div>
      ))}
    </>
  )
}
