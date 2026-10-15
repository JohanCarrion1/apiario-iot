import type { SensorReading } from '../types'

export interface ReadingStats {
  min: number
  max: number
  avg: number
  last: number
}

export function summarize(readings: SensorReading[], key: 'temperature' | 'humidity' | 'weight'): ReadingStats {
  const values = readings.map((r) => r[key])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length
  return { min, max, avg, last: values[values.length - 1] }
}
