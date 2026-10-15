import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
  return h + ':' + m
}

export default function SensorChart({ hive }: SensorChartProps) {
  const data = hive.history.map((r) => ({
    time: formatTime(r.ts),
    temperature: Number(r.temperature.toFixed(1)),
    humidity: Number(r.humidity.toFixed(0)),
    weight: Number(r.weight.toFixed(2)),
  }))

  return (
    <section className="rounded-xl border border-stone-800 bg-stone-900 p-4">
      <h2 className="mb-3 font-semibold">Historial · {hive.name}</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#44403c" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#a8a29e" minTickGap={40} />
            <YAxis stroke="#a8a29e" yAxisId="temp" domain={[0, 45]} />
            <YAxis stroke="#a8a29e" yAxisId="peso" orientation="right" domain={[0, 60]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1c1917',
                border: '1px solid #57534e',
                borderRadius: 8,
              }}
            />
            <Legend />
            <Line yAxisId="temp" type="monotone" dataKey="temperature" name="Temperatura (°C)" stroke="#f59e0b" dot={false} strokeWidth={2} />
            <Line yAxisId="temp" type="monotone" dataKey="humidity" name="Humedad (%)" stroke="#38bdf8" dot={false} strokeWidth={2} />
            <Line yAxisId="peso" type="monotone" dataKey="weight" name="Peso (kg)" stroke="#a3e635" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
