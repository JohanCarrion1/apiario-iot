import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Hive } from '../types'

interface SensorChartProps {
  hive: Hive
}

function formatTime(ts: number): string {
  const d = new Date(ts)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return h + ':' + m + ':' + s
}

export default function SensorChart({ hive }: SensorChartProps) {
  const data = hive.history.map((r) => ({
    time: formatTime(r.ts),
    Temperatura: Number(r.temperature.toFixed(1)),
    Humedad: Number(r.humidity.toFixed(0)),
    Peso: Number(r.weight.toFixed(2)),
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
        <defs>
          <linearGradient id="gTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gHum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gWeight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a3e635" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#a3e635" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#292524" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="time" stroke="#78716c" tick={{ fontSize: 11 }} minTickGap={48} />
        <YAxis yAxisId="temp" stroke="#78716c" tick={{ fontSize: 11 }} domain={[0, 45]} />
        <YAxis
          yAxisId="peso"
          stroke="#78716c"
          tick={{ fontSize: 11 }}
          orientation="right"
          domain={[0, 60]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1c1917ee',
            border: '1px solid #44403c',
            borderRadius: 12,
            fontSize: 12,
            backdropFilter: 'blur(8px)',
          }}
          labelStyle={{ color: '#a8a29e', fontWeight: 600 }}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Area
          yAxisId="temp"
          type="monotone"
          dataKey="Temperatura"
          unit="°C"
          stroke="#f59e0b"
          strokeWidth={2}
          fill="url(#gTemp)"
        />
        <Area
          yAxisId="temp"
          type="monotone"
          dataKey="Humedad"
          unit="%"
          stroke="#38bdf8"
          strokeWidth={2}
          fill="url(#gHum)"
        />
        <Area
          yAxisId="peso"
          type="monotone"
          dataKey="Peso"
          unit=" kg"
          stroke="#a3e635"
          strokeWidth={2}
          fill="url(#gWeight)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
