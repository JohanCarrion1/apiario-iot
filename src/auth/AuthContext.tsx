import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { DemoUser } from './demoAuth'
import {
  authenticate,
  clearSession,
  getStoredSession,
  storeSession,
} from './demoAuth'

interface AuthContextType {
  user: DemoUser | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restaurar sesion persistida al recargar
  useEffect(() => {
    setUser(getStoredSession())
    setLoading(false)
  }, [])

  async function login(email: string, password: string) {
    setError(null)
    try {
      const authenticated = await authenticate(email, password)
      storeSession(authenticated)
      setUser(authenticated)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error de autenticacion.'
      setError(message)
      throw err
    }
  }

  function logout() {
    clearSession()
    setUser(null)
    setError(null)
  }

  function clearError() {
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
