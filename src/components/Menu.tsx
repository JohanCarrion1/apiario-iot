import { useEffect, useRef, useState } from 'react'
import {
  Download,
  Info,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  Pause,
  Play,
  X,
} from 'lucide-react'

interface MenuProps {
  paused: boolean
  onTogglePause: () => void
  onExportApiary: () => void
  onGoToThresholds: () => void
  onLogout: () => void
}

export default function Menu({
  paused,
  onTogglePause,
  onExportApiary,
  onGoToThresholds,
  onLogout,
}: MenuProps) {
  const [open, setOpen] = useState(false)
  const [about, setAbout] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const items = [
    {
      icon: paused ? Play : Pause,
      label: paused ? 'Reanudar flujo en vivo' : 'Pausar flujo en vivo',
      hint: 'Congela o reactiva las lecturas',
      action: () => {
        onTogglePause()
        setOpen(false)
      },
    },
    {
      icon: LayoutDashboard,
      label: 'Ver panel general',
      hint: 'Métricas del apiario en tiempo real',
      action: () => {
        onGoToThresholds()
        setOpen(false)
      },
    },
    {
      icon: Download,
      label: 'Exportar apiario (CSV)',
      hint: 'Historial de todas las colmenas del apiario actual',
      action: () => {
        onExportApiary()
        setOpen(false)
      },
    },
    {
      icon: Info,
      label: 'Acerca de',
      hint: 'Información de la aplicación',
      action: () => {
        setAbout(true)
        setOpen(false)
      },
    },
  ]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menú"
        aria-expanded={open}
        className="menu-btn"
      >
        {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fade-up absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-xl border border-[#4d3b21] bg-[#1b140c]/95 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="border-b border-[#392c19] px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b19a68]">
              Opciones
            </p>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.label}>
                <button
                  onClick={item.action}
                  className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#221a10]"
                >
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#ffa90a]" />
                  <span>
                    <span className="block text-sm font-medium text-[#f3e9d4]">{item.label}</span>
                    <span className="block text-xs text-[#b19a68]">{item.hint}</span>
                  </span>
                </button>
              </li>
            ))}
            <li className="border-t border-[#392c19]">
              <button
                onClick={() => {
                  setOpen(false)
                  onLogout()
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#f4552b]/10"
              >
                <LogOut className="h-4 w-4 shrink-0 text-[#f4552b]" />
                <span className="text-sm font-medium text-[#f4552b]">Cerrar sesión</span>
              </button>
            </li>
          </ul>
          <div className="border-t border-[#392c19] px-4 py-2">
            <p className="text-[11px] text-[#4d3b21]">Gestión Apícola Pro · v0.6</p>
          </div>
        </div>
      )}

      {about && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#131009]/80 p-4 backdrop-blur-sm"
          onClick={() => setAbout(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-[#4d3b21] bg-[#1b140c]/95 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Acerca de Gestión Apícola Pro"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffd061] to-[#ffa90a] text-2xl shadow-lg shadow-[#ffa90a]/20">
                🐝
              </div>
              <div>
                <h3 className="font-bold text-[#f3e9d4]">Gestión Apícola Pro</h3>
                <p className="text-xs text-[#b19a68]">v0.6 · Datos simulados</p>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-[#f3e9d4]/90">
              Dashboard de monitoreo apícola con estaciones IoT por colmena: temperatura,
              humedad, peso y batería, con alertas configurables y exportación de datos.
            </p>
            <p className="mb-5 text-xs text-[#b19a68]">
              Construido con React 18 + Vite + TypeScript + Tailwind CSS 4 y Recharts.
              Arquitectura lista para conectar sensores reales mediante la interfaz SensorService.
            </p>
            <button
              onClick={() => setAbout(false)}
              className="w-full rounded-lg border border-[#ffa90a]/40 bg-[#ffa90a]/15 py-2 text-sm font-medium text-[#ffd061] transition-colors hover:bg-[#ffa90a]/25"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
