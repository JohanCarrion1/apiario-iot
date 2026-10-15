import { describe, expect, it } from 'vitest'
import { summarize } from './stats'
import type { SensorReading } from '../types'

function reading(ts: number, temperature: number, weight: number): SensorReading {
  return { ts, temperature, humidity: 50, weight }
}

describe('summarize', () => {
  it('calcula min, max, promedio y último', () => {
    const history = [reading(1, 30, 20), reading(2, 36, 24), reading(3, 33, 22)]
    const stats = summarize(history, 'temperature')
    expect(stats.min).toBe(30)
    expect(stats.max).toBe(36)
    expect(stats.avg).toBeCloseTo(33, 5)
    expect(stats.last).toBe(33)
  })
})
