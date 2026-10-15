/** Fondo vivo con abejas volando y polen (copiado del estilo de Gestión Apícola Pro). */
export default function BeeBackground() {
  const flyers = [
    { top: '18%', dur: '38s', delay: '0s', scale: 1 },
    { top: '48%', dur: '52s', delay: '-18s', scale: 0.8 },
    { top: '72%', dur: '44s', delay: '-30s', scale: 0.6 },
    { top: '32%', dur: '60s', delay: '-42s', scale: 0.5 },
  ]
  return (
    <div
      className="honeycomb-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    >
      {/* abejas grandes cruzando la pantalla */}
      {flyers.map((f, i) => (
        <span
          key={i}
          className="bee-fly absolute"
          style={{ top: f.top, animationDuration: f.dur, animationDelay: f.delay }}
        >
          <span className="bee-bob block" style={{ transform: 'scale(' + f.scale + ')' }}>
            <BeeGlyph />
          </span>
        </span>
      ))}

      {/* abejas flotantes */}
      <span className="bee bee-1">🐝</span>
      <span className="bee bee-2">🐝</span>
      <span className="bee bee-3">🐝</span>

      {/* polen */}
      <span className="particle particle-1" />
      <span className="particle particle-2" />
      <span className="particle particle-3" />
      <span className="particle particle-4" />
      <span className="particle particle-5" />

      {/* viñeta suave para legibilidad */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 30%, transparent 0%, rgba(19,16,9,0.55) 70%, rgba(19,16,9,0.85) 100%)',
        }}
      />
    </div>
  )
}

function BeeGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 64 64" fill="none" style={{ opacity: 0.45 }}>
      <ellipse cx="34" cy="40" rx="15" ry="11" fill="#ffd061" />
      <rect x="29" y="38" width="10" height="6" rx="2" fill="#131009" />
      <rect x="26" y="46" width="16" height="4" rx="2" fill="#131009" />
      <path d="M49 40l6 2-6 2z" fill="#ffd061" />
      <g className="bee-wing">
        <ellipse cx="26" cy="26" rx="8" ry="12" fill="#f3e9d4" opacity="0.85" transform="rotate(-25 26 26)" />
      </g>
      <g className="bee-wing" style={{ animationDelay: '-0.07s' }}>
        <ellipse cx="38" cy="25" rx="8" ry="12" fill="#f3e9d4" opacity="0.7" transform="rotate(20 38 25)" />
      </g>
    </svg>
  )
}
