import { useState } from 'react'
import { useSensorData } from './hooks/useSensorData'
import { useThresholds } from './hooks/useThresholds'
import Header from './components/Header'
import ApiarySelector from './components/ApiarySelector'
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
    ? apiaries.find((a) => a.hives.some((h) => h.id === detailHive.id))?.name ?? ''
    : ''

  const avgTemperature =
    apiary.hives.reduce(
      (sum, h) => sum + h.history[h.history.length - 1].temperature,
      0,
    ) / apiary.hives.length
  const totalWeight = apiary.hives.reduce(
    (sum, h) => sum + h.history[h.history.length - 1].weight,
    0,
  )

  function handleSelectApiary(id: string) {
    setSelectedApiaryId(id)
    const next = apiaries.find((a) => a.id === id)
    if (next && next.hives.length > 0) setChartHiveId(next.hives[0].id)
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl">
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

      <section className="grid grid-cols-2 gap-4 px-6 pt-4 md:grid-cols-4">
        <div className="rounded-xl border border-stone-800 bg-stone-900 p-4">
          <p className="text-xs text-stone-400">Apiarios</p>
          <p className="font-mono text-2xl font-bold text-amber-400">{apiaries.length}</p>
        </div>
        <div className="rounded-xl border border-stone-800 bg-stone-900 p-4">
          <p className="text-xs text-stone-400">Colmenas conectadas</p>
          <p className="font-mono text-2xl font-bold text-amber-400">
            {apiaries.reduce((sum, a) => sum + a.hives.length, 0)}
          </p>
        </div>
        <div className="rounded-xl border border-stone-800 bg-stone-900 p-4">
          <p className="text-xs text-stone-400">Temp. media {apiary.name}</p>
          <p className="font-mono text-2xl font-bold text-amber-400">
            {avgTemperature.toFixed(1)}°C
          </p>
        </div>
        <div className="rounded-xl border border-stone-800 bg-stone-900 p-4">
          <p className="text-xs text-stone-400">Peso total {apiary.name}</p>
          <p className="font-mono text-2xl font-bold text-amber-400">
            {totalWeight.toFixed(1)} kg
          </p>
        </div>
      </section>

      <section className="px-6 pt-4">
        <h2 className="mb-3 font-semibold">Colmenas · {apiary.name}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {apiary.hives.map((hive) => (
            <div key={hive.id} className="flex flex-col gap-1">
              <HiveCard
                hive={hive}
                thresholds={thresholds}
                selected={hive.id === chartHive.id}
                onSelect={() => setChartHiveId(hive.id)}
              />
              <button
                onClick={() => setDetailHiveId(hive.id)}
                className="text-xs text-stone-400 underline hover:text-amber-400"
              >
                Ver detalle y exportar
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pt-4">
        <SensorChart hive={chartHive} />
      </section>

      <section className="px-6 pt-4">
        <ThresholdSettings thresholds={thresholds} onChange={update} onReset={reset} />
      </section>

      <section className="px-6 py-4">
        <AlertsPanel apiaries={apiaries} thresholds={thresholds} />
      </section>

      <footer className="border-t border-stone-800 px-6 py-4 text-center text-xs text-stone-500">
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
