import { useEffect, useRef, useState } from 'react'
import {
  Download,
  Info,
  LogOut,
  Menu as MenuIcon,
  Pause,
  Play,
  SlidersHorizontal,
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
      icon: Download,
      label: 'Exportar apiario (CSV)',
      hint: 'Historial de todas las colmenas del apiario actual',
      action: () => {
        onExportApiary()
        setOpen(false)
      },
    },
    {
      icon: SlidersHorizontal,
      label: 'Umbrales de alerta',
      hint: 'Configurar límites de temperatura, humedad y batería',
      action: () => {
        onGoToThresholds()
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
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-700/60 bg-stone-800/60 text-stone-300 transition-colors hover:bg-stone-700 hover:text-stone-100"
      >
        {open ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
      </button>

      {open && (
        <div className="fade-up absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-xl border border-stone-700/80 bg-stone-900/95 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="border-b border-stone-800/60 px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Opciones
            </p>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.label}>
                <button
                  onClick={item.action}
                  className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-stone-800/70"
                >
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>
                    <span className="block text-sm font-medium text-stone-100">{item.label}</span>
                    <span className="block text-xs text-stone-400">{item.hint}</span>
                  </span>
                </button>
              </li>
            ))}
            <li className="border-t border-stone-800/60">
              <button
                onClick={() => {
                  setOpen(false)
                  onLogout()
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 shrink-0 text-red-400" />
                <span className="text-sm font-medium text-red-400">Cerrar sesión</span>
              </button>
            </li>
          </ul>
          <div className="border-t border-stone-800/60 px-4 py-2">
            <p className="text-[11px] text-stone-500">Apiario IoT · v0.5</p>
          </div>
        </div>
      )}

      {about && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm"
          onClick={() => setAbout(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-stone-700/80 bg-stone-900/95 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Acerca de Apiario IoT"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-2xl shadow-lg shadow-amber-500/20">
                🐝
              </div>
              <div>
                <h3 className="font-bold">Apiario IoT</h3>
                <p className="text-xs text-stone-400">v0.5 · Datos simulados</p>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-stone-300">
              Dashboard de monitoreo apícola con estaciones IoT por colmena: temperatura,
              humedad, peso y batería, con alertas configurables y exportación de datos.
            </p>
            <p className="mb-5 text-xs text-stone-500">
              Construido con React 18 + Vite + TypeScript + Tailwind CSS 4 y Recharts.
              Arquitectura lista para conectar sensores reales mediante la interfaz SensorService.
            </p>
            <button
              onClick={() => setAbout(false)}
              className="w-full rounded-lg bg-amber-500/15 border border-amber-500/30 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/25"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
