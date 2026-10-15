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

function hiveRows(hive: Hive, apiaryName: string): Array<Array<string | number>> {
  const rows: Array<Array<string | number>> = [
    [apiaryName, hive.name, 'timestamp_iso', 'temperature_c', 'humidity_pct', 'weight_kg', 'battery_pct'],
  ]
  const last = hive.history[hive.history.length - 1]
  const lastTs = last ? last.ts : 0
  for (const r of hive.history) {
    rows.push([
      apiaryName,
      hive.name,
      new Date(r.ts).toISOString(),
      r.temperature.toFixed(2),
      r.humidity.toFixed(1),
      r.weight.toFixed(2),
      r.ts === lastTs ? String(hive.battery) : '',
    ])
  }
  return rows
}

export function readingsToCsv(hive: Hive): string {
  return toCsv(hiveRows(hive, ''))
}

export function apiaryToCsv(apiary: Apiary): string {
  const allRows: Array<Array<string | number>> = []
  for (const hive of apiary.hives) {
    allRows.push(...hiveRows(hive, apiary.name))
  }
  return toCsv(allRows)
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
