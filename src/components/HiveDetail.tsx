import { Download, X } from 'lucide-react'
import type { Hive } from '../types'
import { summarize } from '../lib/stats'
import { downloadCsv, readingsToCsv } from '../lib/csv'
import SensorChart from './SensorChart'

interface HiveDetailProps {
  hive: Hive
  apiaryName: string
  onClose: () => void
}

function StatRow({
  label,
  stats,
  unit,
}: {
  label: string
  stats: { min: number; max: number; avg: number; last: number }
  unit: string
}) {
  return (
    <tr className="border-t border-stone-800/60">
      <td className="py-2.5 pr-4 text-stone-400">{label}</td>
      <td className="py-2.5 pr-4 font-mono font-semibold">{stats.last.toFixed(1)}{unit}</td>
      <td className="py-2.5 pr-4 font-mono text-stone-400">{stats.min.toFixed(1)}{unit}</td>
      <td className="py-2.5 pr-4 font-mono text-stone-400">{stats.max.toFixed(1)}{unit}</td>
      <td className="py-2.5 font-mono text-stone-400">{stats.avg.toFixed(1)}{unit}</td>
    </tr>
  )
}

export default function HiveDetail({ hive, apiaryName, onClose }: HiveDetailProps) {
  const temp = summarize(hive.history, 'temperature')
  const hum = summarize(hive.history, 'humidity')
  const weight = summarize(hive.history, 'weight')
  const gain = weight.last - weight.min

  function handleExport() {
    downloadCsv(
      hive.name.toLowerCase().replace(/\s+/g, '-') + '-historial.csv',
      readingsToCsv(hive),
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-stone-700/80 bg-stone-900/95 p-6 shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={'Detalle de ' + hive.name}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold">{hive.name}</h2>
            <p className="text-sm text-stone-400">
              {apiaryName} · batería {hive.battery}%
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/25"
            >
              <Download className="h-4 w-4" /> CSV
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-stone-800 px-2.5 py-1.5 text-sm font-medium text-stone-300 hover:bg-stone-700"
              aria-label="Cerrar detalle"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-xl border border-stone-800/60">
          <table className="w-full text-sm">
            <thead className="bg-stone-800/40">
              <tr className="text-left text-xs uppercase tracking-wider text-stone-400">
                <th className="px-4 py-2 pr-4 font-medium">Métrica</th>
                <th className="px-4 py-2 pr-4 font-medium">Actual</th>
                <th className="px-4 py-2 pr-4 font-medium">Mín</th>
                <th className="px-4 py-2 pr-4 font-medium">Máx</th>
                <th className="px-4 py-2 font-medium">Prom</th>
              </tr>
            </thead>
            <tbody>
              <StatRow label="🌡️ Temperatura" stats={temp} unit="°C" />
              <StatRow label="💧 Humedad" stats={hum} unit="%" />
              <StatRow label="⚖️ Peso" stats={weight} unit=" kg" />
            </tbody>
          </table>
        </div>

        <p className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-sm text-stone-300">
          🍯 Ganancia de peso estimada en la ventana actual:{' '}
          <span className="font-mono font-bold text-amber-400">+{gain.toFixed(2)} kg</span>
        </p>

        <h3 className="mb-2 text-sm font-semibold text-stone-300">Historial en tiempo real</h3>
        <div className="h-64">
          <SensorChart hive={hive} />
        </div>
      </div>
    </div>
  )
}
