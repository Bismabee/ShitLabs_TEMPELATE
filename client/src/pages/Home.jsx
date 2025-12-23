import { Link } from 'react-router-dom'
import { ArrowRight, Home as HomeIcon, Rocket } from 'lucide-react'

const Home = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
          <HomeIcon size={18} />
        </div>
        <h1 className="text-3xl font-semibold">Home</h1>
      </div>
      <p className="text-slate-600 max-w-2xl">
        Welcome to SuperWaitlist! This project now uses proper routing and
        separated pages. Use the links below to explore the Landing page or the Dashboard.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to="/landing" className="inline-flex items-center gap-2 rounded border-2 border-black px-4 py-2 font-semibold hover:bg-black hover:text-white transition">
          <Rocket size={16} /> Landing <ArrowRight size={16} />
        </Link>
        <Link to="/dashboard" className="inline-flex items-center gap-2 rounded border-2 border-black px-4 py-2 font-semibold hover:bg-black hover:text-white transition">
          Dashboard <ArrowRight size={16} />
        </Link>
      </div>
      <div className="text-sm text-slate-500">Want to share a public waitlist? Try a URL like <span className="font-mono bg-slate-100 px-1 rounded">/w/your-slug</span>.</div>
    </section>
  )
}

export default Home