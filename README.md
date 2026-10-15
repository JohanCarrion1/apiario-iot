# 🐝 Apiario IoT

Dashboard web profesional para monitoreo de apiarios con sensores IoT en cada colmena: **temperatura interna**, **humedad**, **peso** (producción de miel) y **batería** de cada estación.

## Stack

- React 18 + Vite + TypeScript (modo estricto)
- Tailwind CSS 4
- Recharts para gráficas en tiempo real
- Vitest para pruebas unitarias
- ESLint 9 + Prettier
- GitHub Actions CI (lint, formato, tipos, tests y build en cada push/PR)

## Funcionalidades

- Selector de múltiples apiarios con estaciones IoT por colmena.
- Tarjetas por colmena con lecturas actuales y estado (OK / alerta / crítico).
- Gráfica de historial de temperatura, humedad y peso en tiempo real (tick cada 3 s).
- **Vista de detalle por colmena**: estadísticas (mín/máx/promedio), ganancia de peso estimada y gráfica.
- **Exportación CSV** del historial de lecturas por colmena.
- **Umbrales configurables** (temp. mín/máx, humedad, batería) con persistencia en localStorage.
- Panel global de alertas calculado con la lógica pura y testeada de `src/lib`.

## Puesta en marcha

```bash
npm install
npm run dev
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Typecheck + build de producción |
| `npm test` | Pruebas unitarias (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Formatear con Prettier |

## Arquitectura

```
src/
├── services/      # SensorService (interfaz) + MockSensorService
├── hooks/         # useSensorData (suscripción al servicio), useThresholds
├── lib/           # Lógica pura testeable: alerts, stats, csv, thresholds
├── components/    # UI (Header, HiveCard, HiveDetail, SensorChart, ...)
├── data/          # Semillas y generador de datos simulados
└── types.ts       # Modelos compartidos
```

### Conectar sensores reales

Crea una clase que implemente `SensorService` (REST, MQTT sobre WebSocket, Firebase, etc.) y pásala a `useSensorData`. Ningún componente necesita cambiar.

```ts
class RestSensorService implements SensorService {
  async getInitialApiaries() { /* GET /apiaries */ }
  async tick(apiaries) { /* polling o dejar que useSensorData escuche un WebSocket */ }
}
```

## Roadmap

- [ ] Conexión a backend real (MQTT / REST / Firebase)
- [ ] Mapa de apiarios (Leaflet)
- [ ] Notificaciones push de alertas
- [ ] Historial persistente y exportación multi-colmena
