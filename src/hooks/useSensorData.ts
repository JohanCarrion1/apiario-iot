import { useEffect, useState } from 'react'
import type { Apiary } from '../types'
import { createInitialApiaries, nextReading } from '../data/mockApiaries'

const TICK_MS = 3000

/**
 * Simula estaciones IoT enviando lecturas cada TICK_MS.
 * Para conectar sensores reales, reemplaza el interval por un
 * fetch/polling a tu backend manteniendo la misma forma de estado.
 */
export function useSensorData(): Apiary[] {
  const [apiaries, setApiaries] = useState<Apiary[]>(() => createInitialApiaries())

  useEffect(() => {
    const timer = setInterval(() => {
      setApiaries((prev) =>
        prev.map((apiary) => ({
          ...apiary,
          hives: apiary.hives.map((hive) => {
            const history = [...hive.history, nextReading(hive.history[hive.history.length - 1])]
            if (history.length > 40) history.shift()
            const battery = Math.max(0, hive.battery - (Math.random() < 0.08 ? 1 : 0))
            return { ...hive, battery, history }
          }),
        })),
      )
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [])

  return apiaries
}
