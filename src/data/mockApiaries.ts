import type { Apiary, Hive, SensorReading } from '../types'

const HISTORY_LENGTH = 40

interface HiveSeed {
  name: string
  temperature: number
  humidity: number
  weight: number
  battery: number
}

interface ApiarySeed {
  id: string
  name: string
  location: string
  hives: HiveSeed[]
}

const APIARY_SEEDS: ApiarySeed[] = [
  {
    id: 'apiary-1',
    name: 'Apiario La Vega',
    location: 'Cajamarca',
    hives: [
      { name: 'Colmena A1', temperature: 34.5, humidity: 55, weight: 28.2, battery: 87 },
      { name: 'Colmena A2', temperature: 35.1, humidity: 58, weight: 31.7, battery: 64 },
      { name: 'Colmena A3', temperature: 36.2, humidity: 61, weight: 22.4, battery: 18 },
      { name: 'Colmena A4', temperature: 33.8, humidity: 52, weight: 35.0, battery: 92 },
    ],
  },
  {
    id: 'apiary-2',
    name: 'Apiario El Bosque',
    location: 'Amazonas',
    hives: [
      { name: 'Colmena B1', temperature: 35.6, humidity: 72, weight: 24.9, battery: 55 },
      { name: 'Colmena B2', temperature: 41.0, humidity: 83, weight: 19.3, battery: 31 },
      { name: 'Colmena B3', temperature: 34.9, humidity: 66, weight: 29.8, battery: 78 },
    ],
  },
]

function jitter(value: number, amount: number): number {
  const delta = (Math.random() - 0.5) * 2 * amount
  return value + delta
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function nextReading(prev: SensorReading): SensorReading {
  const temperature = clamp(jitter(prev.temperature, 0.4), 5, 45)
  const humidity = clamp(jitter(prev.humidity, 1.5), 20, 95)
  const weight = clamp(jitter(prev.weight, 0.15), 5, 60)
  return { ts: Date.now(), temperature, humidity, weight }
}

function buildHistory(seed: HiveSeed): SensorReading[] {
  const history: SensorReading[] = []
  const now = Date.now()
  let base: SensorReading = {
    ts: now - HISTORY_LENGTH * 3000,
    temperature: seed.temperature,
    humidity: seed.humidity,
    weight: seed.weight,
  }
  for (let i = 0; i < HISTORY_LENGTH; i++) {
    base = nextReading(base)
    history.push({ ...base, ts: now - (HISTORY_LENGTH - i) * 3000 })
  }
  return history
}

export function createInitialApiaries(): Apiary[] {
  return APIARY_SEEDS.map((apiarySeed) => ({
    id: apiarySeed.id,
    name: apiarySeed.name,
    location: apiarySeed.location,
    hives: apiarySeed.hives.map((hiveSeed, index): Hive => ({
      id: apiarySeed.id + '-hive-' + (index + 1),
      name: hiveSeed.name,
      battery: hiveSeed.battery,
      history: buildHistory(hiveSeed),
    })),
  }))
}
