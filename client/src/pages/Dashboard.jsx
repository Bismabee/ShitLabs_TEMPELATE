// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Plus, ArrowRight, Copy, LogOut, Terminal } from 'lucide-react';
import { subscribeToUserWaitlists } from '../services/waitlists';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import CreateWaitlist from './CreateWaitlist';
import WaitlistDetails from './WaitlistDetails';

const Dashboard = ({ user, onLogin, onLogout }) => {
  const [view, setView] = useState('list');
  const [waitlists, setWaitlists] = useState([]);
  const [selectedWaitlist, setSelectedWaitlist] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToUserWaitlists(user.uid, setWaitlists);
    return () => unsubscribe();
  }, [user]);

  const copyLink = (slug) => {
    const url = `${window.location.origin}${window.location.pathname}?w=${slug}`;
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <header className="border-b-2 border-black p-4 flex justify-between items-center sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-2">
            <Terminal size={20} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">SuperWaitlist<span className="text-xs align-top">_beta</span></span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden md:inline text-xs font-mono bg-neutral-100 px-2 py-1 border border-black">{user.uid.substring(0,6)}...</span>
              <Button variant="ghost" onClick={onLogout} className="!px-2">
                <LogOut size={16} />
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={onLogin} className="text-xs">
              Sign in with Google
            </Button>
          )}
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-5xl mx-auto">{view === 'list' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-black uppercase">Your Projects</h1>
                <p className="text-neutral-500 font-mono text-sm mt-1">Manage your lists and view emails.</p>
              </div>
              <Button onClick={() => {
                if (!user) {
                  if (confirm('Please sign in with Google to create and save your waitlist. Sign in now?')) {
                    onLogin();
                  }
                } else {
                  setView('create');
                }
              }}>+ New Waitlist</Button>
            </div>

            {waitlists.length === 0 ? (
              <div className="border-2 border-dashed border-neutral-300 p-12 text-center rounded-lg">
                <p className="text-neutral-400 font-bold">No projects yet. Start shipping.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {waitlists.map((w) => (
                  <Card key={w.id} className="hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                    <div onClick={() => { setSelectedWaitlist(w); setView('details') }}>
                      <div className="flex justify-between items-start mb-4">
                        <Badge>/{w.slug}</Badge>
                        <ArrowRight size={20} className="text-neutral-400" />
                      </div>
                      <h3 className="font-bold text-xl mb-1 truncate">{w.title}</h3>
                      <p className="text-sm text-neutral-500 line-clamp-2 h-10">{w.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t-2 border-neutral-100 flex justify-between items-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); copyLink(w.slug) }}
                        className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-neutral-100 px-2 py-1 -ml-2 rounded"
                      >
                        <Copy size={12} /> Copy Link
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'create' && (
          <CreateWaitlist 
            user={user}
            onBack={() => setView('list')}
            onCreated={() => setView('list')}
          />
        )}

        {view === 'details' && selectedWaitlist && (
          <WaitlistDetails 
            waitlist={selectedWaitlist}
            onBack={() => { setView('list'); setSelectedWaitlist(null); }}
          />
        )}
      </main>
    </div>
  )
}

export default Dashboard
