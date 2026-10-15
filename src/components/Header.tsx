import { MapPin, Radio } from 'lucide-react'
import Menu from './Menu'

interface HeaderProps {
  apiaryName: string
  location: string
  hiveCount: number
  paused: boolean
  onTogglePause: () => void
  onExportApiary: () => void
  onGoToThresholds: () => void
}

export default function Header({
  apiaryName,
  location,
  hiveCount,
  paused,
  onTogglePause,
  onExportApiary,
  onGoToThresholds,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/60 bg-stone-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-2xl shadow-lg shadow-amber-500/20">
            🐝
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Apiario<span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> IoT</span>
            </h1>
            <p className="text-xs text-stone-400">Monitoreo de colmenas en tiempo real</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={
              'hidden items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium sm:flex ' +
              (paused
                ? 'border-stone-600/40 bg-stone-700/20 text-stone-400'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400')
            }
          >
            <span
              className={
                'h-2 w-2 rounded-full ' +
                (paused ? 'bg-stone-500' : 'live-dot bg-emerald-400')
              }
            />
            {paused ? 'PAUSADO' : 'EN VIVO'}
          </span>
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold">{apiaryName}</p>
            <p className="flex items-center justify-end gap-1 text-xs text-stone-400">
              <MapPin className="h-3 w-3" /> {location}
              <span className="mx-1 text-stone-600">·</span>
              <Radio className="h-3 w-3" /> {hiveCount} estaciones
            </p>
          </div>
          <Menu
            paused={paused}
            onTogglePause={onTogglePause}
            onExportApiary={onExportApiary}
            onGoToThresholds={onGoToThresholds}
          />
        </div>
      </div>
    </header>
  )
}
