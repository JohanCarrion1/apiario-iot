export interface Thresholds {
  tempMin: number
  tempMax: number
  humidityMax: number
  batteryMin: number
}

export const DEFAULT_THRESHOLDS: Thresholds = {
  tempMin: 10,
  tempMax: 38,
  humidityMax: 80,
  batteryMin: 20,
}
