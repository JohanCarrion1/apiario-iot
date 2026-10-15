import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react'
import type { Apiary } from '../types'
import type { Thresholds } from '../lib/thresholds'
import { collectAlerts } from '../lib/alerts'

interface AlertsPanelProps {
  apiaries: Apiary[]
  thresholds: Thresholds
}

export default function AlertsPanel({ apiaries, thresholds }: AlertsPanelProps) {
  const alerts = collectAlerts(apiaries, thresholds)
  const dangers = alerts.filter((a) => a.level === 'danger').length

  return (
    <section className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className={'h-5 w-5 ' + (alerts.length > 0 ? 'text-amber-400' : 'text-emerald-400')} />
          <h2 className="font-semibold">Alertas activas</h2>
        </div>
        <span
          className={
            'rounded-full border px-2.5 py-0.5 text-xs font-semibold ' +
            (dangers > 0
              ? 'border-red-500/40 bg-red-500/10 text-red-400'
              : alerts.length > 0
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400')
          }
        >
          {dangers > 0 ? dangers + ' críticas · ' : ''}
          {alerts.length} totales
        </span>
      </div>

      {alerts.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-stone-400">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          Todo en orden. Sin alertas en ningún apiario.
        </p>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {alerts.map((alert, i) => (
            <li
              key={alert.hiveId + '-' + i}
              className={
                'flex items-start gap-3 rounded-xl border px-3.5 py-2.5 text-sm ' +
                (alert.level === 'danger'
                  ? 'border-red-500/40 bg-red-500/10'
                  : 'border-amber-500/30 bg-amber-500/10')
              }
            >
              <AlertTriangle
                className={
                  'mt-0.5 h-4 w-4 shrink-0 ' +
                  (alert.level === 'danger' ? 'text-red-400' : 'text-amber-400')
                }
              />
              <div>
                <p className="font-semibold text-stone-100">
                  {alert.hiveName}
                  <span className="ml-1.5 font-normal text-xs text-stone-400">{alert.apiaryName}</span>
                </p>
                <p className={alert.level === 'danger' ? 'text-red-300' : 'text-amber-300'}>
                  {alert.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
