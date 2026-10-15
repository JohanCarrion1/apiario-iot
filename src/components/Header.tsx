interface HeaderProps {
  apiaryName: string
  location: string
  hiveCount: number
}

export default function Header({ apiaryName, location, hiveCount }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-stone-800 px-6 py-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden>🐝</span>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Apiario IoT</h1>
          <p className="text-sm text-stone-400">Monitoreo de colmenas en tiempo real</p>
        </div>
      </div>
      <div className="text-right text-sm text-stone-400">
        <p className="font-semibold text-stone-200">{apiaryName}</p>
        <p>{location} · {hiveCount} colmenas conectadas</p>
      </div>
    </header>
  )
}
