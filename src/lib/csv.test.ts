import { describe, expect, it } from 'vitest'
import { readingsToCsv, toCsv } from './csv'
import type { Hive } from '../types'

describe('toCsv', () => {
  it('escapa comas y comillas correctamente', () => {
    expect(toCsv([['a', 'b,c'], ['d"e', 1]])).toBe('a,"b,c"
"d""e",1')
  })
})

describe('readingsToCsv', () => {
  it('genera cabecera y filas por lectura', () => {
    const hive: Hive = {
      id: 'h1',
      name: 'Colmena A1',
      battery: 90,
      history: [
        { ts: 1700000000000, temperature: 34.5, humidity: 55, weight: 28.2 },
        { ts: 1700000003000, temperature: 34.9, humidity: 56, weight: 28.3 },
      ],
    }
    const csv = readingsToCsv(hive)
    const lines = csv.split('
')
    expect(lines[0]).toBe('timestamp_iso,timestamp_ms,temperature_c,humidity_pct,weight_kg')
    expect(lines).toHaveLength(3)
    expect(lines[1]).toContain('34.50')
    expect(lines[2]).toContain('28.30')
  })
})
