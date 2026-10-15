import type { Apiary, Hive } from '../types'

const LF = String.fromCharCode(10)

function csvEscape(value: string | number): string {
  const s = String(value)
  return s.includes(',') || s.includes('"') || s.includes(LF)
    ? '"' + s.replace(/"/g, '""') + '"'
    : s
}

export function toCsv(rows: Array<Array<string | number>>): string {
  return rows.map((row) => row.map(csvEscape).join(',')).join(LF)
}

const HEADER: Array<string> = [
  'apiary',
  'hive',
  'timestamp_iso',
  'temperature_c',
  'humidity_pct',
  'weight_kg',
  'battery_pct',
]

function dataRows(apiaryName: string, hive: Hive): Array<Array<string | number>> {
  return hive.history.map((r) => [
    apiaryName,
    hive.name,
    new Date(r.ts).toISOString(),
    r.temperature.toFixed(2),
    r.humidity.toFixed(1),
    r.weight.toFixed(2),
    String(hive.battery),
  ])
}

/** CSV de una sola colmena (la columna apiary queda vacia). */
export function readingsToCsv(hive: Hive): string {
  return toCsv([HEADER, ...dataRows('', hive)])
}

/** CSV de todas las colmenas de un apiario, con una sola cabecera. */
export function apiaryToCsv(apiary: Apiary): string {
  const rows: Array<Array<string | number>> = [HEADER]
  for (const hive of apiary.hives) {
    rows.push(...dataRows(apiary.name, hive))
  }
  return toCsv(rows)
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
