import type { SensorReading } from '../types'

interface SparklineProps {
  readings: SensorReading[]
  metric: 'temperature' | 'humidity' | 'weight'
  stroke: string
  width?: number
  height?: number
}

export default function Sparkline({
  readings,
  metric,
  stroke,
  width = 96,
  height = 28,
}: SparklineProps) {
  const values = readings.map((r) => r[metric])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = width / Math.max(values.length - 1, 1)
  const points = values
    .map((v, i) => (i * step).toFixed(1) + ',' + (height - ((v - min) / range) * (height - 4) - 2).toFixed(1))
    .join(' ')
  const last = values[values.length - 1]
  const first = values[0]
  const trendUp = last >= first

  return (
    <svg width={width} height={height} viewBox={'0 0 ' + width + ' ' + height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={trendUp ? 1 : 0.85}
      />
      <circle
        cx={width}
        cy={height - ((last - min) / range) * (height - 4) - 2}
        r="2.5"
        fill={stroke}
      />
    </svg>
  )
}
