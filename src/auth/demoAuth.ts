export interface DemoUser {
  email: string
  name: string
  apiaryName: string
}

/** Credenciales demo de la aplicacion (sin backend real). */
export const DEMO_EMAIL = 'demo@apiario.dev'
export const DEMO_PASSWORD = 'demo1234'

export const DEMO_USER: DemoUser = {
  email: DEMO_EMAIL,
  name: 'Johan (Demo)',
  apiaryName: 'Apiario Demo',
}

const SESSION_KEY = 'apiario-iot:session'

export function getStoredSession(): DemoUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as DemoUser) : null
  } catch {
    return null
  }
}

export function storeSession(user: DemoUser): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } catch {
    // sin almacenamiento: la sesion solo vive en memoria
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // ignorar
  }
}

/**
 * Valida credenciales. Simula latencia de red para un login realista.
 * Acepta la cuenta demo o cualquier correo con contrasena de 6+ caracteres
 * en modo invitado.
 */
export async function authenticate(
  email: string,
  password: string,
): Promise<DemoUser> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const normalized = email.trim().toLowerCase()
  if (normalized === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return DEMO_USER
  }

  if (normalized === DEMO_EMAIL) {
    throw new Error(
      'Contrasena incorrecta para la cuenta demo. Usa demo1234.',
    )
  }

  if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(normalized)) {
    throw new Error('Ingresa un correo valido.')
  }
  if (password.length < 6) {
    throw new Error('La contrasena debe tener al menos 6 caracteres.')
  }

  // Modo invitado: cualquier otra cuenta valida entra con datos demo.
  return {
    email: normalized,
    name: normalized.split('@')[0],
    apiaryName: 'Apiario Demo',
  }
}
