import type { Alert, Apiary, Hive } from '../types'
import type { Thresholds } from './thresholds'

export function evaluateHive(
  hive: Hive,
  apiaryName: string,
  thresholds: Thresholds,
): Alert[] {
  const last = hive.history[hive.history.length - 1]
  const alerts: Alert[] = []
  const base = { hiveId: hive.id, hiveName: hive.name, apiaryName }

  if (last.temperature < thresholds.tempMin) {
    alerts.push({
      ...base,
      level: 'danger',
      message: 'Temperatura baja: ' + last.temperature.toFixed(1) + '°C',
    })
  } else if (last.temperature > thresholds.tempMax) {
    alerts.push({
      ...base,
      level: 'danger',
      message: 'Temperatura alta: ' + last.temperature.toFixed(1) + '°C',
    })
  }
  if (last.humidity > thresholds.humidityMax) {
    alerts.push({
      ...base,
      level: 'warning',
      message: 'Humedad elevada: ' + last.humidity.toFixed(0) + '%',
    })
  }
  if (hive.battery < thresholds.batteryMin) {
    alerts.push({
      ...base,
      level: 'warning',
      message: 'Batería de estación baja: ' + hive.battery + '%',
    })
  }
  return alerts
}

export function collectAlerts(apiaries: Apiary[], thresholds: Thresholds): Alert[] {
  return apiaries.flatMap((apiary) =>
    apiary.hives.flatMap((hive) => evaluateHive(hive, apiary.name, thresholds)),
  )
}
