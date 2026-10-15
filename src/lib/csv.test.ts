import { describe, expect, it } from 'vitest'
import { apiaryToCsv, readingsToCsv, toCsv } from './csv'
import type { Apiary, Hive } from '../types'

const HEADER =
  'apiary,hive,timestamp_iso,temperature_c,humidity_pct,weight_kg,battery_pct'

function makeHive(id: string, name: string): Hive {
  return {
    id,
    name,
    battery: 90,
    history: [
      { ts: 1700000000000, temperature: 34.5, humidity: 55, weight: 28.2 },
      { ts: 1700000003000, temperature: 34.9, humidity: 56, weight: 28.3 },
    ],
  }
}

describe('toCsv', () => {
  it('escapa comas y comillas correctamente', () => {
    expect(toCsv([['a', 'b,c'], ['d"e', 1]])).toBe('a,"b,c"' + String.fromCharCode(10) + '"d""e",1')
  })
})

describe('readingsToCsv', () => {
  it('genera una cabecera y una fila por lectura', () => {
    const csv = readingsToCsv(makeHive('h1', 'Colmena A1'))
    const lines = csv.split(String.fromCharCode(10))
    expect(lines[0]).toBe(HEADER)
    expect(lines).toHaveLength(3)
    expect(lines[1]).toContain('Colmena A1')
    expect(lines[1]).toContain('34.50')
    expect(lines[2]).toContain('28.30')
  })
})

describe('apiaryToCsv', () => {
  it('incluye todas las colmenas con una sola cabecera y nombre de apiario', () => {
    const apiary: Apiary = {
      id: 'a1',
      name: 'Apiario La Vega',
      location: 'Cajamarca',
      hives: [makeHive('h1', 'Colmena A1'), makeHive('h2', 'Colmena A2')],
    }
    const csv = apiaryToCsv(apiary)
    const lines = csv.split(String.fromCharCode(10))
    expect(lines[0]).toBe(HEADER)
    expect(lines).toHaveLength(5)
    expect(lines[1]).toContain('Apiario La Vega')
    expect(lines[1]).toContain('Colmena A1')
    expect(lines[3]).toContain('Colmena A2')
  })
})
