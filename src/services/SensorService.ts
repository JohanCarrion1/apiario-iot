import type { Apiary } from '../types'

/**
 * Abstracción de la fuente de datos de sensores.
 * Implementa MockSensorService para simulación; crea otra implementación
 * (REST, MQTT-over-WebSocket, Firebase...) para sensores reales.
 */
export interface SensorService {
  /** Estado inicial de apiarios y colmenas con historial. */
  getInitialApiaries(): Apiary[]
  /** Avanza el estado un tick y devuelve el nuevo array de apiarios. */
  tick(apiaries: Apiary[]): Apiary[]
}
