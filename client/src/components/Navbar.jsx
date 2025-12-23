import { Link } from 'react-router-dom'
import { LogOut, Terminal } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import Button from './ui/Button'

const Navbar = ({ user, onLogin, variant = 'default' }) => {
  const handleLogout = () => {
    signOut(auth)
  }

  // Brutalist variant for Dashboard
  if (variant === 'brutalist') {
    return (
      <header className="border-b-2 border-black p-4 flex justify-between items-center sticky top-0 bg-white z-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-black text-white p-2">
            <Terminal size={20} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">
            SuperWaitlist<span className="text-xs align-top">_beta</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="hidden md:inline text-xs font-mono bg-neutral-100 px-2 py-1 border border-black">
                {user.uid.substring(0, 6)}...
              </span>
              <Button variant="ghost" onClick={handleLogout} className="px-2!">
                <LogOut size={16} />
              </Button>
            </>
          )}
        </div>
      </header>
    )
  }

  // Minimal variant for Landing Page
  if (variant === 'minimal') {
    return (
      <header className="p-6 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black" />
          <span className="font-black text-xl tracking-tighter uppercase">SuperWaitlist</span>
        </Link>
        {onLogin && (
          <Button variant="outline" onClick={onLogin} className="hidden md:flex">
            Login
          </Button>
        )}
      </header>
    )
  }

  // Default variant for general pages
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          SuperWaitlist
        </Link>
        <nav className="flex gap-1 text-sm font-medium text-slate-700">
          <Link className="rounded px-3 py-2 hover:bg-slate-100" to="/">
            Home
          </Link>
          <Link className="rounded px-3 py-2 hover:bg-slate-100" to="/landing">
            Landing
          </Link>
          <Link className="rounded px-3 py-2 hover:bg-slate-100" to="/dashboard">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
