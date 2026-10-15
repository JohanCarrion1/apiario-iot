import { useState } from 'react'
import { Boxes, Droplets, Hexagon, Thermometer } from 'lucide-react'
import { useSensorData } from './hooks/useSensorData'
import { useThresholds } from './hooks/useThresholds'
import Header from './components/Header'
import ApiarySelector from './components/ApiarySelector'
import StatCard from './components/StatCard'
import HiveCard from './components/HiveCard'
import HiveDetail from './components/HiveDetail'
import SensorChart from './components/SensorChart'
import AlertsPanel from './components/AlertsPanel'
import ThresholdSettings from './components/ThresholdSettings'

export default function App() {
  const apiaries = useSensorData()
  const { thresholds, update, reset } = useThresholds()
  const [selectedApiaryId, setSelectedApiaryId] = useState(apiaries[0].id)
  const [chartHiveId, setChartHiveId] = useState(apiaries[0].hives[0].id)
  const [detailHiveId, setDetailHiveId] = useState<string | null>(null)

  const apiary = apiaries.find((a) => a.id === selectedApiaryId) ?? apiaries[0]
  const chartHive = apiary.hives.find((h) => h.id === chartHiveId) ?? apiary.hives[0]
  const detailHive = apiaries.flatMap((a) => a.hives).find((h) => h.id === detailHiveId)
  const detailApiaryName = detailHive
    ? (apiaries.find((a) => a.hives.some((h) => h.id === detailHive.id))?.name ?? '')
    : ''

  const allReadings = apiary.hives.flatMap((h) => h.history.slice(-20))
  const avgTemperature =
    apiary.hives.reduce(
      (sum, h) => sum + h.history[h.history.length - 1].temperature,
      0,
    ) / apiary.hives.length
  const totalWeight = apiary.hives.reduce(
    (sum, h) => sum + h.history[h.history.length - 1].weight,
    0,
  )
  const avgHumidity =
    apiary.hives.reduce((sum, h) => sum + h.history[h.history.length - 1].humidity, 0) /
    apiary.hives.length

  function handleSelectApiary(id: string) {
    setSelectedApiaryId(id)
    const next = apiaries.find((a) => a.id === id)
    if (next && next.hives.length > 0) setChartHiveId(next.hives[0].id)
  }

  return (
    <div className="min-h-screen">
      <Header
        apiaryName={apiary.name}
        location={apiary.location}
        hiveCount={apiary.hives.length}
      />

      <ApiarySelector
        apiaries={apiaries}
        selectedId={apiary.id}
        onSelect={handleSelectApiary}
      />

      <main className="mx-auto max-w-6xl px-6 pb-8">
        <section className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-4">
          <StatCard
            icon={Boxes}
            label="Estaciones IoT"
            value={String(apiaries.reduce((sum, a) => sum + a.hives.length, 0))}
            accent="from-amber-400 to-orange-500"
            sparkColor="#f59e0b"
            readings={allReadings}
            metric="weight"
          />
          <StatCard
            icon={Thermometer}
            label="Temp. media"
            value={avgTemperature.toFixed(1) + '°C'}
            accent="from-red-400 to-orange-500"
            sparkColor="#fb923c"
            readings={allReadings}
            metric="temperature"
          />
          <StatCard
            icon={Droplets}
            label="Humedad media"
            value={avgHumidity.toFixed(0) + '%'}
            accent="from-sky-400 to-cyan-500"
            sparkColor="#38bdf8"
            readings={allReadings}
            metric="humidity"
          />
          <StatCard
            icon={Hexagon}
            label="Peso total"
            value={totalWeight.toFixed(1) + ' kg'}
            accent="from-lime-400 to-emerald-500"
            sparkColor="#a3e635"
            readings={allReadings}
            metric="weight"
          />
        </section>

        <section className="pt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-400">
            Colmenas · {apiary.name}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {apiary.hives.map((hive) => (
              <HiveCard
                key={hive.id}
                hive={hive}
                thresholds={thresholds}
                selected={hive.id === chartHive.id}
                onSelect={() => setChartHiveId(hive.id)}
                onOpenDetail={() => setDetailHiveId(hive.id)}
              />
            ))}
          </div>
        </section>

        <section className="card mt-8 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Historial · {chartHive.name}</h2>
            <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <div className="h-72">
            <SensorChart hive={chartHive} />
          </div>
        </section>

        <section className="mt-4">
          <ThresholdSettings thresholds={thresholds} onChange={update} onReset={reset} />
        </section>

        <section className="mt-4">
          <AlertsPanel apiaries={apiaries} thresholds={thresholds} />
        </section>
      </main>

      <footer className="border-t border-stone-800/60 px-6 py-4 text-center text-xs text-stone-600">
        Apiario IoT · Datos simulados · Conecta tu backend real implementando SensorService
      </footer>

      {detailHive && (
        <HiveDetail
          hive={detailHive}
          apiaryName={detailApiaryName}
          onClose={() => setDetailHiveId(null)}
        />
      )}
    </div>
  )
}
