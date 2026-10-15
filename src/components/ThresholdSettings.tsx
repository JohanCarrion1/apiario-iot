import { SlidersHorizontal } from 'lucide-react'
import type { Thresholds } from '../lib/thresholds'

interface ThresholdSettingsProps {
  thresholds: Thresholds
  onChange: (patch: Partial<Thresholds>) => void
  onReset: () => void
}

interface Field {
  key: keyof Thresholds
  label: string
  suffix: string
}

const FIELDS: Field[] = [
  { key: 'tempMin', label: 'Temp. mínima', suffix: '°C' },
  { key: 'tempMax', label: 'Temp. máxima', suffix: '°C' },
  { key: 'humidityMax', label: 'Humedad máx.', suffix: '%' },
  { key: 'batteryMin', label: 'Batería mín.', suffix: '%' },
]

export default function ThresholdSettings({
  thresholds,
  onChange,
  onReset,
}: ThresholdSettingsProps) {
  return (
    <section className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-stone-400" />
          <h2 className="font-semibold">Umbrales de alerta</h2>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-stone-400 underline-offset-2 hover:text-amber-400 hover:underline"
        >
          Restaurar valores
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {FIELDS.map((field) => (
          <label key={field.key} className="text-sm">
            <span className="mb-1 block text-xs text-stone-400">
              {field.label} ({field.suffix})
            </span>
            <input
              type="number"
              value={thresholds[field.key]}
              onChange={(e) =>
                onChange({ [field.key]: Number(e.target.value) } as Partial<Thresholds>)
              }
              className="w-full rounded-lg border border-stone-700/80 bg-stone-800/60 px-3 py-2 font-mono text-sm text-stone-100 transition-colors focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
          </label>
        ))}
      </div>
      <p className="mt-3 text-xs text-stone-500">
        Se guardan en tu navegador y aplican a todos los apiarios.
      </p>
    </section>
  )
}
