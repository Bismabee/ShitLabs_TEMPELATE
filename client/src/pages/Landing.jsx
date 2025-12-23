// src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Badge from '../components/Badge';

const Landing = () => (
  <div className="min-h-screen bg-white text-black font-sans flex flex-col relative overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

    <header className="p-6 flex justify-between items-center relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black"></div>
        <span className="font-black text-xl tracking-tighter uppercase">SuperWaitlist</span>
      </div>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
      <div className="max-w-3xl space-y-8">
        <Badge>Beta v1.0</Badge>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
          Ship Fast.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-neutral-500">Collect Emails.</span>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 max-w-xl mx-auto font-medium">
          The brutalist, no-nonsense waitlist builder for makers who just want to validate their idea.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
          <Link to="/dashboard">
            <Button className="w-full md:w-auto text-lg px-10 py-4">
              Make Waitlist Page
            </Button>
          </Link>
        </div>
      </div>
    </main>

    <footer className="p-6 text-center border-t-2 border-black bg-black text-white mt-auto relative z-10">
      <p className="font-mono text-xs uppercase tracking-widest">© 2025 SuperWaitlist Inc.</p>
    </footer>
  </div>
);

export default Landing;
