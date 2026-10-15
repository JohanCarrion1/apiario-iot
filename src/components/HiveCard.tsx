import { BatteryCharging, Droplets, Scale, Thermometer } from 'lucide-react'
import type { Hive } from '../types'
import type { Thresholds } from '../lib/thresholds'
import { evaluateHive } from '../lib/alerts'
import Sparkline from './Sparkline'

interface HiveCardProps {
  hive: Hive
  selected: boolean
  thresholds: Thresholds
  onSelect: () => void
  onOpenDetail: () => void
}

export default function HiveCard({
  hive,
  selected,
  thresholds,
  onSelect,
  onOpenDetail,
}: HiveCardProps) {
  const last = hive.history[hive.history.length - 1]
  const alerts = evaluateHive(hive, '', thresholds)
  const danger = alerts.some((a) => a.level === 'danger')
  const warn = alerts.length > 0
  const statusColor = danger ? 'text-red-400' : warn ? 'text-amber-400' : 'text-emerald-400'
  const statusText = danger ? 'Crítico' : warn ? 'Alerta' : 'Óptimo'
  const statusBg = danger
    ? 'border-red-500/40 bg-red-500/10'
    : warn
      ? 'border-amber-500/40 bg-amber-500/10'
      : 'border-emerald-500/30 bg-emerald-500/10'

  return (
    <div
      className={
        'card fade-up flex flex-col overflow-hidden transition-all duration-200 ' +
        (selected ? 'border-amber-500/60 ring-1 ring-amber-500/30' : 'card-hover cursor-pointer')
      }
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">{hive.name}</h3>
          <span
            className={'rounded-full border px-2 py-0.5 text-[11px] font-semibold ' + statusBg + ' ' + statusColor}
          >
            {danger ? '⚠' : warn ? '⚠' : '●'} {statusText}
          </span>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          <div>
            <dt className="flex items-center gap-1 text-[11px] text-stone-400">
              <Thermometer className="h-3 w-3" /> Temp
            </dt>
            <dd className="mt-0.5 font-mono text-lg font-semibold">{last.temperature.toFixed(1)}°</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[11px] text-stone-400">
              <Droplets className="h-3 w-3" /> Humedad
            </dt>
            <dd className="mt-0.5 font-mono text-lg font-semibold">{last.humidity.toFixed(0)}%</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[11px] text-stone-400">
              <Scale className="h-3 w-3" /> Peso
            </dt>
            <dd className="mt-0.5 font-mono text-lg font-semibold">{last.weight.toFixed(1)}</dd>
          </div>
        </dl>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
            <BatteryCharging className="h-3 w-3" />
            {hive.battery}%
          </div>
          <Sparkline readings={hive.history.slice(-20)} metric="temperature" stroke="#f59e0b" width={80} height={24} />
        </div>

        <div className="mt-2 h-1 overflow-hidden rounded-full bg-stone-800">
          <div
            className={
              'h-full rounded-full transition-all duration-500 ' +
              (hive.battery < thresholds.batteryMin
                ? 'bg-gradient-to-r from-red-600 to-red-400'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-400')
            }
            style={{ width: hive.battery + '%' }}
          />
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onOpenDetail()
        }}
        className="border-t border-stone-800/80 bg-stone-900/40 py-2 text-xs font-medium text-stone-400 transition-colors hover:bg-amber-500/10 hover:text-amber-400"
      >
        Ver detalle · Exportar CSV
      </button>
    </div>
  )
}
