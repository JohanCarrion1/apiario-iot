import type { Hive } from '../types'
import { summarize } from '../lib/stats'
import { downloadCsv, readingsToCsv } from '../lib/csv'
import SensorChart from './SensorChart'

interface HiveDetailProps {
  hive: Hive
  apiaryName: string
  onClose: () => void
}

function StatRow({ label, stats, unit }: { label: string; stats: { min: number; max: number; avg: number; last: number }; unit: string }) {
  return (
    <tr className="border-t border-stone-800">
      <td className="py-2 pr-4 text-stone-400">{label}</td>
      <td className="py-2 pr-4 font-mono">{stats.last.toFixed(1)}{unit}</td>
      <td className="py-2 pr-4 font-mono">{stats.min.toFixed(1)}{unit}</td>
      <td className="py-2 pr-4 font-mono">{stats.max.toFixed(1)}{unit}</td>
      <td className="py-2 font-mono">{stats.avg.toFixed(1)}{unit}</td>
    </tr>
  )
}

export default function HiveDetail({ hive, apiaryName, onClose }: HiveDetailProps) {
  const temp = summarize(hive.history, 'temperature')
  const hum = summarize(hive.history, 'humidity')
  const weight = summarize(hive.history, 'weight')
  const gain = weight.last - weight.min

  function handleExport() {
    downloadCsv(hive.name.toLowerCase().replace(/s+/g, '-') + '-historial.csv', readingsToCsv(hive))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900 p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={'Detalle de ' + hive.name}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold">{hive.name}</h2>
            <p className="text-sm text-stone-400">{apiaryName} · batería {hive.battery}%</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-stone-200 hover:bg-stone-700"
            >
              ⬇ Exportar CSV
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-stone-200 hover:bg-stone-700"
              aria-label="Cerrar detalle"
            >
              ✕
            </button>
          </div>
        </div>

        <table className="mb-4 w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-stone-400">
              <th className="pb-2 pr-4">Métrica</th>
              <th className="pb-2 pr-4">Actual</th>
              <th className="pb-2 pr-4">Mín</th>
              <th className="pb-2 pr-4">Máx</th>
              <th className="pb-2">Prom</th>
            </tr>
          </thead>
          <tbody>
            <StatRow label="Temperatura" stats={temp} unit="°C" />
            <StatRow label="Humedad" stats={hum} unit="%" />
            <StatRow label="Peso" stats={weight} unit=" kg" />
          </tbody>
        </table>

        <p className="mb-4 text-sm text-stone-400">
          🍯 Ganancia de peso estimada en la ventana actual:{' '}
          <span className="font-mono text-amber-400">+{gain.toFixed(2)} kg</span>
        </p>

        <SensorChart hive={hive} />
      </div>
    </div>
  )
}
