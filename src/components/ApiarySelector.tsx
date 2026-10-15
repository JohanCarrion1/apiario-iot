import type { Apiary } from '../types'

interface ApiarySelectorProps {
  apiaries: Apiary[]
  selectedId: string
  onSelect: (id: string) => void
}

export default function ApiarySelector({ apiaries, selectedId, onSelect }: ApiarySelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-6 pt-4">
      {apiaries.map((apiary) => {
        const active = apiary.id === selectedId
        return (
          <button
            key={apiary.id}
            onClick={() => onSelect(apiary.id)}
            className={
              'shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ' +
              (active
                ? 'bg-amber-500 text-stone-950'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700')
            }
          >
            {apiary.name}
            <span className={active ? 'ml-2 text-stone-800' : 'ml-2 text-stone-500'}>
              {apiary.hives.length} 📡
            </span>
          </button>
        )
      })}
    </div>
  )
}
