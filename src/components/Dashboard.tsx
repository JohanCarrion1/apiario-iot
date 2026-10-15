import { useState } from 'react'
import { Boxes, Droplets, Hexagon, Thermometer } from 'lucide-react'
import { useSensorData } from '../hooks/useSensorData'
import { useThresholds } from '../hooks/useThresholds'
import { apiaryToCsv, downloadCsv } from '../lib/csv'
import Header, { type TabId } from './Header'
import ApiarySelector from './ApiarySelector'
import StatCard from './StatCard'
import HiveCard from './HiveCard'
import HiveDetail from './HiveDetail'
import SensorChart from './SensorChart'
import AlertsPanel from './AlertsPanel'
import ThresholdSettings from './ThresholdSettings'
import BeeBackground from './BeeBackground'

interface DashboardProps {
  userName: string
  onLogout: () => void
}

export default function Dashboard({ userName, onLogout }: DashboardProps) {
  const apiaries = useSensorData()
  const [paused, setPaused] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('panel')
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

  function handleExportApiary() {
    downloadCsv(
      apiary.name.toLowerCase().replace(/\s+/g, '-') + '-completo.csv',
      apiaryToCsv(apiary),
    )
  }

  return (
    <div className="relative min-h-screen">
      <BeeBackground />
      <Header
        apiaryName={apiary.name}
        location={apiary.location}
        hiveCount={apiary.hives.length}
        userName={userName}
        paused={paused}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onTogglePause={() => setPaused((p) => !p)}
        onExportApiary={handleExportApiary}
        onLogout={onLogout}
      />

      <ApiarySelector
        apiaries={apiaries}
        selectedId={apiary.id}
        onSelect={handleSelectApiary}
      />

      <main className="mx-auto max-w-6xl px-6 pb-8">
        {activeTab === 'panel' && (
          <div className="fade-up">
            <section className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-4">
              <StatCard
                icon={Boxes}
                label="Estaciones IoT"
                value={String(apiaries.reduce((sum, a) => sum + a.hives.length, 0))}
                accent="from-[#ffd061] to-[#ffa90a]"
                sparkColor="#ffa90a"
                readings={allReadings}
                metric="weight"
              />
              <StatCard
                icon={Thermometer}
                label="Temp. media"
                value={avgTemperature.toFixed(1) + '°C'}
                accent="from-[#f4552b] to-[#ffa90a]"
                sparkColor="#f4552b"
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
                accent="from-[#93cc68] to-emerald-500"
                sparkColor="#93cc68"
                readings={allReadings}
                metric="weight"
              />
            </section>

            <section className="card mt-8 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-[#f3e9d4]">Historial · {chartHive.name}</h2>
                <span
                  className={
                    'h-2 w-2 rounded-full ' + (paused ? 'bg-[#4d3b21]' : 'live-dot bg-[#93cc68]')
                  }
                />
              </div>
              <div className="h-72">
                <SensorChart hive={chartHive} />
              </div>
            </section>
          </div>
        )}

        {activeTab === 'colmenas' && (
          <section className="fade-up pt-6">
            <h2
              className="mb-3 text-lg font-semibold text-[#f3e9d4]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
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
            <section className="card mt-6 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-[#f3e9d4]">Historial · {chartHive.name}</h2>
                <span
                  className={
                    'h-2 w-2 rounded-full ' + (paused ? 'bg-[#4d3b21]' : 'live-dot bg-[#93cc68]')
                  }
                />
              </div>
              <div className="h-72">
                <SensorChart hive={chartHive} />
              </div>
            </section>
          </section>
        )}

        {activeTab === 'alertas' && (
          <section className="fade-up pt-6">
            <AlertsPanel apiaries={apiaries} thresholds={thresholds} />
          </section>
        )}

        {activeTab === 'ajustes' && (
          <section className="fade-up max-w-2xl pt-6">
            <ThresholdSettings thresholds={thresholds} onChange={update} onReset={reset} />
          </section>
        )}
      </main>

      <footer className="border-t border-[#392c19] px-6 py-4 text-center text-xs text-[#4d3b21]">
        Gestión Apícola Pro · Datos simulados · Conecta tu backend real implementando SensorService
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
