import type { Apiary } from '../types'
import type { Thresholds } from '../lib/thresholds'
import { collectAlerts } from '../lib/alerts'

interface AlertsPanelProps {
  apiaries: Apiary[]
  thresholds: Thresholds
}

export default function AlertsPanel({ apiaries, thresholds }: AlertsPanelProps) {
  const alerts = collectAlerts(apiaries, thresholds)
  return (
    <section className="rounded-xl border border-stone-800 bg-stone-900 p-4">
      <h2 className="mb-3 font-semibold">Alertas activas ({alerts.length})</h2>
      {alerts.length === 0 ? (
        <p className="text-sm text-stone-400">Todo en orden. Sin alertas en ningún apiario. ✅</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert, i) => (
            <li
              key={alert.hiveId + '-' + i}
              className={
                'rounded-lg border px-3 py-2 text-sm ' +
                (alert.level === 'danger'
                  ? 'border-red-500/40 bg-red-500/10 text-red-300'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-300')
              }
            >
              <span className="font-semibold">{alert.hiveName}</span> · {alert.apiaryName}
              <p>{alert.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
