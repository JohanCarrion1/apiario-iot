import type { Apiary, Alert } from '../types'

interface AlertsPanelProps {
  apiaries: Apiary[]
}

function collectAlerts(apiaries: Apiary[]): Alert[] {
  const alerts: Alert[] = []
  for (const apiary of apiaries) {
    for (const hive of apiary.hives) {
      const last = hive.history[hive.history.length - 1]
      if (last.temperature < 10) {
        alerts.push({ hiveId: hive.id, hiveName: hive.name, apiaryName: apiary.name, level: 'danger', message: 'Temperatura baja: ' + last.temperature.toFixed(1) + '°C' })
      } else if (last.temperature > 38) {
        alerts.push({ hiveId: hive.id, hiveName: hive.name, apiaryName: apiary.name, level: 'danger', message: 'Temperatura alta: ' + last.temperature.toFixed(1) + '°C' })
      }
      if (last.humidity > 80) {
        alerts.push({ hiveId: hive.id, hiveName: hive.name, apiaryName: apiary.name, level: 'warning', message: 'Humedad elevada: ' + last.humidity.toFixed(0) + '%' })
      }
      if (hive.battery < 20) {
        alerts.push({ hiveId: hive.id, hiveName: hive.name, apiaryName: apiary.name, level: 'warning', message: 'Batería de estación baja: ' + hive.battery + '%' })
      }
    }
  }
  return alerts
}

export default function AlertsPanel({ apiaries }: AlertsPanelProps) {
  const alerts = collectAlerts(apiaries)
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
