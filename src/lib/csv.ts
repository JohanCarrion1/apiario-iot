import type { Hive } from '../types'

function csvEscape(value: string | number): string {
  const s = String(value)
  return /[",
]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
}

export function toCsv(rows: Array<Array<string | number>>): string {
  return rows.map((row) => row.map(csvEscape).join(',')).join('
')
}

export function readingsToCsv(hive: Hive): string {
  const rows: Array<Array<string | number>> = [
    ['timestamp_iso', 'timestamp_ms', 'temperature_c', 'humidity_pct', 'weight_kg'],
  ]
  for (const r of hive.history) {
    rows.push([new Date(r.ts).toISOString(), r.ts, r.temperature.toFixed(2), r.humidity.toFixed(1), r.weight.toFixed(2)])
  }
  return toCsv(rows)
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
