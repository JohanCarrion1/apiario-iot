# 🐝 Apiario IoT

Dashboard web para monitoreo de apiarios con sensores IoT en cada colmena: **temperatura interna**, **humedad** y **peso** (producción de miel), además del nivel de batería de cada estación de sensor.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS 4
- Recharts para gráficas en tiempo real

## Funcionalidades

- Selector de apiarios con múltiples estaciones IoT.
- Tarjetas por colmena con lecturas actuales y estado (OK / alerta).
- Gráfica de historial de temperatura, humedad y peso por colmena.
- Panel de alertas: temperatura fuera de rango (10-38 °C), humedad > 80%, batería < 20%.
- Datos simulados en tiempo real (tick cada 3 s) con arquitectura lista para conectar una API real de sensores.

## Puesta en marcha

```bash
npm install
npm run dev
```

## Conectar sensores reales

Todo el estado de sensores vive en `src/hooks/useSensorData.ts`, alimentado por `src/data/mockApiaries.ts`. Para usar datos reales, reemplaza el generador simulado por un `fetch` a tu backend IoT (MQTT bridge, Firebase, API REST, etc.) manteniendo la interfaz `SensorReading`.

## Roadmap

- [ ] Conexión a backend real (MQTT / REST)
- [ ] Mapa de apiarios (Leaflet)
- [ ] Notificaciones push de alertas
- [ ] Historial histórico y exportación CSV
