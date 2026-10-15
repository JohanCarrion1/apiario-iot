import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_THRESHOLDS, type Thresholds } from '../lib/thresholds'

const STORAGE_KEY = 'apiario-iot:thresholds'

function load(): Thresholds {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_THRESHOLDS
    return { ...DEFAULT_THRESHOLDS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_THRESHOLDS
  }
}

export function useThresholds() {
  const [thresholds, setThresholds] = useState<Thresholds>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(thresholds))
    } catch {
      // almacenamiento no disponible; se mantienen en memoria
    }
  }, [thresholds])

  const update = useCallback((patch: Partial<Thresholds>) => {
    setThresholds((prev) => ({ ...prev, ...patch }))
  }, [])

  const reset = useCallback(() => setThresholds(DEFAULT_THRESHOLDS), [])

  return { thresholds, update, reset }
}
