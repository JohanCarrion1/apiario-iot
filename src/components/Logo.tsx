interface LogoProps {
  size?: number
}

/** Abeja de la marca (estilo Gestión Apícola Pro) con alas aleteando. */
export default function Logo({ size = 44 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-label="Gestión Apícola Pro"
      role="img"
    >
      {/* cuerpo */}
      <ellipse cx="34" cy="40" rx="15" ry="11" fill="#ffd061" />
      <path d="M26 34c5-3 11-3 16 0l-2 6H28z" fill="#131009" />
      <path d="M22 42h24c0 3-2 6-5 6H27c-3 0-5-3-5-6z" fill="#131009" opacity="0" />
      <rect x="29" y="38" width="10" height="6" rx="2" fill="#131009" />
      <rect x="26" y="46" width="16" height="4" rx="2" fill="#131009" />
      {/* aguijón */}
      <path d="M49 40l6 2-6 2z" fill="#ffd061" />
      {/* antenas */}
      <path d="M28 30c-2-4-5-5-7-5M31 29c-1-4-3-6-5-7" stroke="#ffd061" strokeWidth="2" strokeLinecap="round" />
      {/* alas aleteando */}
      <g className="bee-wing">
        <ellipse cx="26" cy="26" rx="8" ry="12" fill="#f3e9d4" opacity="0.85" transform="rotate(-25 26 26)" />
      </g>
      <g className="bee-wing" style={{ animationDelay: '-0.07s' }}>
        <ellipse cx="38" cy="25" rx="8" ry="12" fill="#f3e9d4" opacity="0.7" transform="rotate(20 38 25)" />
      </g>
    </svg>
  )
}
