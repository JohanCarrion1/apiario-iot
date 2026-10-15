import type { Apiary } from '../types'
import type { SensorService } from './SensorService'
import { createInitialApiaries, nextReading } from '../data/mockApiaries'

const MAX_HISTORY = 40

export class MockSensorService implements SensorService {
  getInitialApiaries(): Apiary[] {
    return createInitialApiaries()
  }

  tick(apiaries: Apiary[]): Apiary[] {
    return apiaries.map((apiary) => ({
      ...apiary,
      hives: apiary.hives.map((hive) => {
        const last = hive.history[hive.history.length - 1]
        const history = [...hive.history, nextReading(last)]
        if (history.length > MAX_HISTORY) history.shift()
        // Descarga lenta de batería para simular consumo del sensor
        const battery = Math.max(0, hive.battery - (Math.random() < 0.08 ? 1 : 0))
        return { ...hive, battery, history }
      }),
    }))
  }
}
