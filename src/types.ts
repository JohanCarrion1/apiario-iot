export interface SensorReading {
  ts: number
  temperature: number
  humidity: number
  weight: number
}

export interface Hive {
  id: string
  name: string
  battery: number
  history: SensorReading[]
}

export interface Apiary {
  id: string
  name: string
  location: string
  hives: Hive[]
}

export interface Alert {
  hiveId: string
  hiveName: string
  apiaryName: string
  level: 'warning' | 'danger'
  message: string
}
