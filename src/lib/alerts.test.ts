import { describe, expect, it } from 'vitest'
import { collectAlerts, evaluateHive } from './alerts'
import { DEFAULT_THRESHOLDS } from './thresholds'
import type { Hive } from '../types'

function makeHive(overrides: Partial<Hive> = {}): Hive {
  return {
    id: 'h1',
    name: 'Colmena 1',
    battery: 80,
    history: [{ ts: 1, temperature: 34, humidity: 55, weight: 25 }],
    ...overrides,
  }
}

describe('evaluateHive', () => {
  it('no genera alertas cuando todo está en rango', () => {
    expect(evaluateHive(makeHive(), 'Apiario', DEFAULT_THRESHOLDS)).toEqual([])
  })

  it('alerta de peligro por temperatura alta', () => {
    const hive = makeHive({ history: [{ ts: 1, temperature: 41, humidity: 55, weight: 25 }] })
    const alerts = evaluateHive(hive, 'Apiario', DEFAULT_THRESHOLDS)
    expect(alerts).toHaveLength(1)
    expect(alerts[0].level).toBe('danger')
    expect(alerts[0].message).toContain('41.0')
  })

  it('alerta de peligro por temperatura baja', () => {
    const hive = makeHive({ history: [{ ts: 1, temperature: 8, humidity: 55, weight: 25 }] })
    const alerts = evaluateHive(hive, 'Apiario', DEFAULT_THRESHOLDS)
    expect(alerts[0].level).toBe('danger')
    expect(alerts[0].message).toContain('8.0')
  })

  it('alerta de aviso por humedad elevada', () => {
    const hive = makeHive({ history: [{ ts: 1, temperature: 34, humidity: 85, weight: 25 }] })
    const alerts = evaluateHive(hive, 'Apiario', DEFAULT_THRESHOLDS)
    expect(alerts[0].level).toBe('warning')
    expect(alerts[0].message).toContain('85')
  })

  it('alerta de aviso por batería baja', () => {
    const alerts = evaluateHive(makeHive({ battery: 15 }), 'Apiario', DEFAULT_THRESHOLDS)
    expect(alerts[0].level).toBe('warning')
    expect(alerts[0].message).toContain('15')
  })

  it('acumula múltiples alertas de una misma colmena', () => {
    const hive = makeHive({
      battery: 10,
      history: [{ ts: 1, temperature: 42, humidity: 90, weight: 25 }],
    })
    expect(evaluateHive(hive, 'Apiario', DEFAULT_THRESHOLDS)).toHaveLength(3)
  })
})

describe('collectAlerts', () => {
  it('agrupa alertas de todos los apiarios', () => {
    const apiaries = [
      {
        id: 'a1',
        name: 'A',
        location: 'x',
        hives: [makeHive({ id: 'h1', battery: 5 })],
      },
      {
        id: 'a2',
        name: 'B',
        location: 'y',
        hives: [
          makeHive({ id: 'h2', history: [{ ts: 1, temperature: 45, humidity: 55, weight: 25 }] }),
        ],
      },
    ]
    const alerts = collectAlerts(apiaries, DEFAULT_THRESHOLDS)
    expect(alerts).toHaveLength(2)
    expect(alerts.map((a) => a.apiaryName)).toEqual(['A', 'B'])
  })
})
