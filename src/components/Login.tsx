import { useState } from 'react'
import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { DEMO_EMAIL, DEMO_PASSWORD } from '../auth/demoAuth'
import Logo from './Logo'
import BeeBackground from './BeeBackground'

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
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <BeeBackground />
      <div className="fade-up w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#4d3b21] bg-gradient-to-br from-[#221a10] to-[#1b140c] shadow-xl shadow-black/40">
            <Logo size={64} />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight text-[#f3e9d4]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Gestión Apícola <span className="text-[#ffa90a]">Pro</span>
          </h1>
          <p className="mt-1 text-sm text-[#b19a68]">
            Monitoreo de colmenas en tiempo real
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6">
          <label className="mb-4 block text-sm">
            <span className="mb-1.5 block font-medium text-[#f3e9d4]">Correo</span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b19a68]" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearError()
                }}
                className="w-full rounded-lg border border-[#392c19] bg-[#1b140c] py-2.5 pl-10 pr-3 text-sm text-[#f3e9d4] transition-colors focus:border-[#ffa90a] focus:outline-none"
                placeholder="tu@correo.com"
              />
            </div>
          </label>

          <label className="mb-2 block text-sm">
            <span className="mb-1.5 block font-medium text-[#f3e9d4]">Contraseña</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b19a68]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearError()
                }}
                className="w-full rounded-lg border border-[#392c19] bg-[#1b140c] py-2.5 pl-10 pr-10 text-sm text-[#f3e9d4] transition-colors focus:border-[#ffa90a] focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b19a68] hover:text-[#f3e9d4]"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          {error && (
            <p className="mb-4 rounded-lg border border-[#f4552b]/40 bg-[#f4552b]/10 px-3 py-2 text-xs text-[#f4552b]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ffa90a] to-[#c98508] py-2.5 text-sm font-semibold text-[#131009] shadow-lg shadow-[#ffa90a]/20 transition-all hover:brightness-110 disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {submitting ? 'Ingresando…' : 'Ingresar'}
          </button>

          <div className="my-4 flex items-center gap-3 text-xs text-[#4d3b21]">
            <span className="h-px flex-1 bg-[#392c19]" />
            o
            <span className="h-px flex-1 bg-[#392c19]" />
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={submitting}
            className="w-full rounded-lg border border-[#ffa90a]/40 bg-[#ffa90a]/10 py-2.5 text-sm font-medium text-[#ffd061] transition-colors hover:bg-[#ffa90a]/20 disabled:opacity-60"
          >
            🐝 Entrar con cuenta demo
          </button>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-[#b19a68]">
            Cuenta demo: <span className="font-mono text-[#f3e9d4]">{DEMO_EMAIL}</span>
            <br />
            Contraseña: <span className="font-mono text-[#f3e9d4]">{DEMO_PASSWORD}</span>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-[#4d3b21]">
          Autenticación demo · Lista para conectar Firebase/Supabase
        </p>
      </div>
    </div>
  )
}
