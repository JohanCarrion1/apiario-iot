import type { LucideIcon } from 'lucide-react'
import type { SensorReading } from '../types'
import Sparkline from './Sparkline'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  accent: string
  sparkColor: string
  readings: SensorReading[]
  metric: 'temperature' | 'humidity' | 'weight'
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  accent,
  sparkColor,
  readings,
  metric,
}: StatCardProps) {
  return (
    <div className="card card-hover fade-up relative overflow-hidden p-5">
      <div className={'absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-15 blur-xl ' + accent} />
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-stone-400" />
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">{label}</p>
          </div>
          <p className="mt-2 font-mono text-3xl font-bold">{value}</p>
        </div>
        <Sparkline readings={readings} metric={metric} stroke={sparkColor} />
      </div>
    </div>
  )
}
