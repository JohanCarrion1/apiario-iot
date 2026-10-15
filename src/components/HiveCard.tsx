import type { Hive } from '../types'
import type { Thresholds } from '../lib/thresholds'
import { evaluateHive } from '../lib/alerts'

interface HiveCardProps {
  hive: Hive
  selected: boolean
  thresholds: Thresholds
  onSelect: () => void
}

export default function HiveCard({ hive, selected, thresholds, onSelect }: HiveCardProps) {
  const last = hive.history[hive.history.length - 1]
  const alerts = evaluateHive(hive, '', thresholds)
  const danger = alerts.some((a) => a.level === 'danger')

  return (
    <button
      onClick={onSelect}
      className={
        'w-full rounded-xl border p-4 text-left transition ' +
        (selected
          ? 'border-amber-500 bg-stone-800'
          : 'border-stone-800 bg-stone-900 hover:border-stone-600')
      }
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{hive.name}</h3>
        <span
          className={
            'rounded-full px-2 py-0.5 text-xs font-semibold ' +
            (danger
              ? 'bg-red-500/20 text-red-400'
              : alerts.length > 0
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-emerald-500/20 text-emerald-400')
          }
        >
          {danger ? '⚠ Crítico' : alerts.length > 0 ? '⚠ Alerta' : '● OK'}
        </span>
      </div>
      <dl className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <dt className="text-xs text-stone-400">Temperatura</dt>
          <dd className="font-mono text-lg">{last.temperature.toFixed(1)}°C</dd>
        </div>
        <div>
          <dt className="text-xs text-stone-400">Humedad</dt>
          <dd className="font-mono text-lg">{last.humidity.toFixed(0)}%</dd>
        </div>
        <div>
          <dt className="text-xs text-stone-400">Peso</dt>
          <dd className="font-mono text-lg">{last.weight.toFixed(1)} kg</dd>
        </div>
      </dl>
      <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
        <span>🔋 Batería {hive.battery}%</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-700">
          <div
            className={
              hive.battery < thresholds.batteryMin ? 'h-full bg-red-500' : 'h-full bg-emerald-500'
            }
            style={{ width: hive.battery + '%' }}
          />
        </div>
      </div>
    </button>
  )
}
