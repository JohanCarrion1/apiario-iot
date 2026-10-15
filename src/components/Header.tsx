import { MapPin, Radio } from 'lucide-react'
import Logo from './Logo'
import Menu from './Menu'

export type TabId = 'panel' | 'colmenas' | 'alertas' | 'ajustes'

interface HeaderProps {
  apiaryName: string
  location: string
  hiveCount: number
  userName: string
  paused: boolean
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  onTogglePause: () => void
  onExportApiary: () => void
  onLogout: () => void
}

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'panel', label: 'Panel' },
  { id: 'colmenas', label: 'Colmenas' },
  { id: 'alertas', label: 'Alertas' },
  { id: 'ajustes', label: 'Ajustes' },
]

export default function Header({
  apiaryName,
  location,
  hiveCount,
  userName,
  paused,
  activeTab,
  onTabChange,
  onTogglePause,
  onExportApiary,
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#392c19] bg-[#131009]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#4d3b21] bg-gradient-to-br from-[#221a10] to-[#1b140c]">
            <Logo size={38} />
          </div>
          <div>
            <h1
              className="text-xl font-bold tracking-tight text-[#f3e9d4]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Gestión Apícola{' '}
              <span className="text-[#ffa90a]">Pro</span>
            </h1>
            <p className="text-xs text-[#b19a68]">Monitoreo de colmenas en tiempo real</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={
              'hidden items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium sm:flex ' +
              (paused
                ? 'border-[#4d3b21] bg-[#221a10] text-[#b19a68]'
                : 'border-[#93cc68]/40 bg-[#93cc68]/10 text-[#93cc68]')
            }
          >
            <span
              className={
                'h-2 w-2 rounded-full ' + (paused ? 'bg-[#b19a68]' : 'live-dot bg-[#93cc68]')
              }
            />
            {paused ? 'PAUSADO' : 'EN VIVO'}
          </span>
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-[#f3e9d4]">{apiaryName}</p>
            <p className="flex items-center justify-end gap-1 text-xs text-[#b19a68]">
              <MapPin className="h-3 w-3" /> {location}
              <span className="mx-1 text-[#4d3b21]">·</span>
              <Radio className="h-3 w-3" /> {hiveCount} estaciones
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#4d3b21] bg-[#221a10] px-3 py-1.5 lg:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd061] to-[#ffa90a] text-[11px] font-bold text-[#131009]">
              {userName.slice(0, 1).toUpperCase()}
            </span>
            <span className="text-xs font-medium text-[#f3e9d4]">{userName}</span>
          </div>
          <Menu
            paused={paused}
            onTogglePause={onTogglePause}
            onExportApiary={onExportApiary}
            onGoToThresholds={() => onTabChange('ajustes')}
            onLogout={onLogout}
          />
        </div>
      </div>

      {/* pestañas separadas, como las secciones de Gestión Apícola Pro */}
      <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6" aria-label="Secciones">
        {TABS.map((tab) => {
          const active = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={
                'shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ' +
                (active
                  ? 'border-[#ffa90a] text-[#ffa90a]'
                  : 'border-transparent text-[#b19a68] hover:text-[#f3e9d4]')
              }
              aria-current={active ? 'page' : undefined}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
