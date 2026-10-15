import { useState } from 'react'
import { useSensorData } from './hooks/useSensorData'
import Header from './components/Header'
import ApiarySelector from './components/ApiarySelector'
import HiveCard from './components/HiveCard'
import SensorChart from './components/SensorChart'
import AlertsPanel from './components/AlertsPanel'

export default function App() {
  const apiaries = useSensorData()
  const [selectedApiaryId, setSelectedApiaryId] = useState(apiaries[0].id)
  const [chartHiveId, setChartHiveId] = useState(apiaries[0].hives[0].id)

  const apiary =
    apiaries.find((a) => a.id === selectedApiaryId) ?? apiaries[0]
  const chartHive = apiary.hives.find((h) => h.id === chartHiveId) ?? apiary.hives[0]

  const avgTemperature =
    apiary.hives.reduce((sum, h) => sum + h.history[h.history.length - 1].temperature, 0) /
    apiary.hives.length
  const totalWeight =
    apiary.hives.reduce((sum, h) => sum + h.history[h.history.length - 1].weight, 0)

  function handleSelectApiary(id: string) {
    setSelectedApiaryId(id)
    const next = apiaries.find((a) => a.id === id)
    if (next && next.hives.length > 0) setChartHiveId(next.hives[0].id)
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl">
      <Header apiaryName={apiary.name} location={apiary.location} hiveCount={apiary.hives.length} />

      <ApiarySelector apiaries={apiaries} selectedId={apiary.id} onSelect={handleSelectApiary} />

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
          <p className="font-mono text-2xl font-bold text-amber-400">{avgTemperature.toFixed(1)}°C</p>
        </div>
        <div className="rounded-xl border border-stone-800 bg-stone-900 p-4">
          <p className="text-xs text-stone-400">Peso total {apiary.name}</p>
          <p className="font-mono text-2xl font-bold text-amber-400">{totalWeight.toFixed(1)} kg</p>
        </div>
      </section>

      <section className="px-6 pt-4">
        <h2 className="mb-3 font-semibold">Colmenas · {apiary.name}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {apiary.hives.map((hive) => (
            <HiveCard
              key={hive.id}
              hive={hive}
              selected={hive.id === chartHive.id}
              onSelect={() => setChartHiveId(hive.id)}
            />
          ))}
        </div>
      </section>

      <section className="px-6 pt-4">
        <SensorChart hive={chartHive} />
      </section>

      <section className="px-6 py-4">
        <AlertsPanel apiaries={apiaries} />
      </section>

      <footer className="border-t border-stone-800 px-6 py-4 text-center text-xs text-stone-500">
        Apiario IoT · Datos simulados · Listo para conectar tu backend de sensores reales
      </footer>
    </div>
  )
}
