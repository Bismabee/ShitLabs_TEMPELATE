import Navbar from '../components/Navbar'
import Badge from '../components/ui/Badge'

const LandingPage = ({ onLogin }) => (
	<div className="min-h-screen bg-white text-black font-sans flex flex-col relative overflow-hidden">
		<div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

		<Navbar onLogin={onLogin} variant="minimal" />

		<main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
			<div className="max-w-3xl space-y-8">
				<Badge>Beta v1.0</Badge>
				<h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
					Ship Fast.<br />
					  <span className="text-transparent bg-clip-text bg-linear-to-r from-black to-neutral-500">Collect Emails.</span>
				</h1>
				<p className="text-xl md:text-2xl text-neutral-600 max-w-xl mx-auto font-medium">
					The brutalist, no-nonsense waitlist builder for makers who just want to validate their idea.
				</p>
				{onLogin && (
					<div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
						<Button onClick={onLogin} className="w-full md:w-auto text-lg px-10 py-4">Start Building Now</Button>
					</div>
				)}
			</div>
			<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full max-w-4xl">
				<div className="border-l-4 border-black pl-4">
					<h3 className="font-bold text-lg mb-2">Zero Config</h3>
					<p className="text-sm text-neutral-500">No database setup. No API keys. Just a simple form that works.</p>
				</div>
				<div className="border-l-4 border-black pl-4">
					<h3 className="font-bold text-lg mb-2">Brutalist Design</h3>
					<p className="text-sm text-neutral-500">Stand out with a clean, raw aesthetic that screams "shipping".</p>
				</div>
				<div className="border-l-4 border-black pl-4">
					<h3 className="font-bold text-lg mb-2">Instant Links</h3>
					<p className="text-sm text-neutral-500">Get a shareable URL instantly. Copy, paste, validate.</p>
				</div>
			</div>
		</main>

		<footer className="p-6 text-center border-t-2 border-black bg-black text-white mt-auto relative z-10">
			<p className="font-mono text-xs uppercase tracking-widest">© 2025 SuperWaitlist Inc.</p>
		</footer>
	</div>
)

export default LandingPage

