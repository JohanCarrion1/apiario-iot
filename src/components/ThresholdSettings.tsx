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

export default function ThresholdSettings({ thresholds, onChange, onReset }: ThresholdSettingsProps) {
  return (
    <section className="rounded-xl border border-stone-800 bg-stone-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">Umbrales de alerta</h2>
        <button
          onClick={onReset}
          className="text-xs text-stone-400 underline hover:text-stone-200"
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
              onChange={(e) => onChange({ [field.key]: Number(e.target.value) } as Partial<Thresholds>)}
              className="w-full rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 font-mono text-sm text-stone-100 focus:border-amber-500 focus:outline-none"
            />
          </label>
        ))}
      </div>
      <p className="mt-2 text-xs text-stone-500">
        Los umbrales se guardan en tu navegador y aplican a todos los apiarios.
      </p>
    </section>
  )
}
