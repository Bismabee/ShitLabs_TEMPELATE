import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth'
import { auth } from '../lib/firebase'
import Dashboard from './Dashboard'
import LandingPage from './LandingPage'

const DashboardGate = () => {
  const [user, setUser] = useState(null)
  const [init, setInit] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token)
        }
      } finally {
        // noop
      }
    }
    initAuth()

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setInit(false)
    })
    return () => unsub()
  }, [])

  const handleLogin = async () => {
    try {
      await signInAnonymously(auth)
    } catch (e) {
      console.error('Login failed', e)
    }
  }

  if (init) return <div className="min-h-screen flex items-center justify-center font-mono font-bold text-xl uppercase tracking-widest">Booting...</div>
  return user ? <Dashboard user={user} /> : <LandingPage onLogin={handleLogin} />
}

export default DashboardGate
