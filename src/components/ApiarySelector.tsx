import { MapPin } from 'lucide-react'
import type { Apiary } from '../types'

interface ApiarySelectorProps {
  apiaries: Apiary[]
  selectedId: string
  onSelect: (id: string) => void
}

export default function ApiarySelector({ apiaries, selectedId, onSelect }: ApiarySelectorProps) {
  return (
    <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 pt-6">
      {apiaries.map((apiary) => {
        const active = apiary.id === selectedId
        return (
          <button
            key={apiary.id}
            onClick={() => onSelect(apiary.id)}
            className={
              'group shrink-0 rounded-xl border px-4 py-2.5 text-left transition-all duration-200 ' +
              (active
                ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/15 to-amber-500/5 shadow-lg shadow-amber-500/10'
                : 'border-stone-800 bg-stone-900/50 hover:border-stone-600 hover:bg-stone-900')
            }
          >
            <p className={'text-sm font-semibold ' + (active ? 'text-amber-300' : 'text-stone-200')}>
              {apiary.name}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-400">
              <MapPin className="h-3 w-3" />
              {apiary.location} · {apiary.hives.length} colmenas
            </p>
          </button>
        )
      })}
    </div>
  )
}
