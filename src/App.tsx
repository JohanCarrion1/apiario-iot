import { AuthProvider, useAuth } from './auth/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function AppWithAuth() {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="live-dot h-3 w-3 rounded-full bg-emerald-400" />
      </div>
    )
  }

  if (!user) return <Login />

  return <Dashboard userName={user.name} onLogout={logout} />
}

export default function App() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  )
}
