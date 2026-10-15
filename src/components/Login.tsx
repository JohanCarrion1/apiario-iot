import { useState } from 'react'
import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { DEMO_EMAIL, DEMO_PASSWORD } from '../auth/demoAuth'

export default function Login() {
  const { login, error, clearError } = useAuth()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      await login(email, password)
    } catch {
      // el error se muestra desde el contexto
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDemoLogin() {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    clearError()
    setSubmitting(true)
    try {
      await login(DEMO_EMAIL, DEMO_PASSWORD)
    } catch {
      // ignorar
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="fade-up w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-4xl shadow-xl shadow-amber-500/25">
            🐝
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Apiario
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {' '}IoT
            </span>
          </h1>
          <p className="mt-1 text-sm text-stone-400">
            Monitoreo de colmenas en tiempo real
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6">
          <label className="mb-4 block text-sm">
            <span className="mb-1.5 block font-medium text-stone-300">Correo</span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearError()
                }}
                className="w-full rounded-lg border border-stone-700/80 bg-stone-800/60 py-2.5 pl-10 pr-3 text-sm text-stone-100 transition-colors focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                placeholder="tu@correo.com"
              />
            </div>
          </label>

          <label className="mb-2 block text-sm">
            <span className="mb-1.5 block font-medium text-stone-300">Contraseña</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearError()
                }}
                className="w-full rounded-lg border border-stone-700/80 bg-stone-800/60 py-2.5 pl-10 pr-10 text-sm text-stone-100 transition-colors focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          {error && (
            <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition-all hover:brightness-110 disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {submitting ? 'Ingresando…' : 'Ingresar'}
          </button>

          <div className="my-4 flex items-center gap-3 text-xs text-stone-600">
            <span className="h-px flex-1 bg-stone-800" />
            o
            <span className="h-px flex-1 bg-stone-800" />
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={submitting}
            className="w-full rounded-lg border border-amber-500/30 bg-amber-500/10 py-2.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/20 disabled:opacity-60"
          >
            🐝 Entrar con cuenta demo
          </button>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-stone-500">
            Cuenta demo: <span className="font-mono text-stone-400">{DEMO_EMAIL}</span>
            <br />
            Contraseña: <span className="font-mono text-stone-400">{DEMO_PASSWORD}</span>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-stone-600">
          Autenticación demo · Lista para conectar Firebase/Supabase
        </p>
      </div>
    </div>
  )
}
