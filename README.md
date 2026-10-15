# 🐝 Gestión Apícola Pro — Dashboard IoT

Dashboard web para monitoreo de apiarios con sensores IoT en cada colmena: **temperatura interna**, **humedad**, **peso** y **batería** de cada estación.

## Stack

- React 18 + Vite + TypeScript (modo estricto)
- Tailwind CSS 4 · Fraunces + Instrument Sans + Spline Sans Mono
- Recharts para gráficas en tiempo real
- Vitest · ESLint 9 · GitHub Actions CI

## Funcionalidades

- **Login demo** (`demo@apiario.dev` / `demo1234`) con sesión persistente.
- Secciones separadas en pestañas: **Panel · Colmenas · Alertas · Ajustes**.
- Fondo vivo con abejas volando y partículas de polen (estilo Gestión Apícola).
- Tarjetas por colmena con lecturas, sparklines y estados (Óptimo / Alerta / Crítico).
- Vista de detalle por colmena con estadísticas y **exportación CSV**.
- **Umbrales de alerta configurables** con persistencia en localStorage.
- Menú hamburguesa: pausar flujo en vivo, exportar apiario, ajustes, acerca de, cerrar sesión.

## Puesta en marcha

```bash
npm install
npm run dev
```

## Arquitectura

```
src/
├── auth/          # AuthContext + autenticación demo (fácil de sustituir por Firebase/Supabase)
├── services/      # SensorService (interfaz) + MockSensorService
├── hooks/         # useSensorData, useThresholds
├── lib/           # Lógica pura testeable: alerts, stats, csv, thresholds
├── components/    # UI (Header con pestañas, HiveCard, Login, Menu, ...)
├── data/          # Semillas y generador de datos simulados
└── types.ts       # Modelos compartidos
```

### Conectar sensores reales

Crea una clase que implemente `SensorService` (REST, MQTT sobre WebSocket, Firebase…) y pásala a `useSensorData`. Ningún componente necesita cambiar.

## Roadmap

- [ ] Conexión a backend real (MQTT / REST / Firebase)
- [ ] Mapa de apiarios (Leaflet)
- [ ] Notificaciones push de alertas
- [ ] Historial persistente y exportación multi-colmena
