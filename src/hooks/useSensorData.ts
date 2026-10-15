import { useEffect, useState } from 'react'
import type { Apiary } from '../types'
import type { SensorService } from '../services/SensorService'
import { MockSensorService } from '../services/MockSensorService'

const TICK_MS = 3000

/**
 * Suscribe la UI a la fuente de sensores. Cambia la implementación de
 * SensorService para conectar un backend real sin tocar componentes.
 * Con paused=true el flujo en vivo se detiene (los datos quedan congelados).
 */
export function useSensorData(
  service: SensorService = new MockSensorService(),
  paused = false,
): Apiary[] {
  const [apiaries, setApiaries] = useState<Apiary[]>(() => service.getInitialApiaries())

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setApiaries((prev) => service.tick(prev))
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [service, paused])

  return apiaries
}
