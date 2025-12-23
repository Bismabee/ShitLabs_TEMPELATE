// src/pages/PublicWaitlist.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { signInAnonymously } from 'firebase/auth';
import { Check, Loader2, Zap } from 'lucide-react';
import { auth } from '../lib/firebase';
import { getWaitlist } from '../services/waitlists';
import { submitToWaitlist } from '../services/submissions';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const PublicWaitlist = () => {
  const params = useParams()
  const [slug, setSlug] = useState(params.slug)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Also support old ?w=slug format for compatibility
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('w')
    if (!params.slug && s) setSlug(s)
  }, [params.slug])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const waitlist = await getWaitlist(slug);
        if (waitlist) {
          setData(waitlist);
        } else {
          setError('Waitlist not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load waitlist.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitting(true);

    try {
      await submitToWaitlist(slug, email, data.ownerId);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono animate-pulse">LOADING_ASSETS...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center font-bold text-red-600 font-mono">{error}</div>

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center p-4 font-sans text-black">
      <div className="max-w-md w-full">
        <Card className="text-center py-12 px-8">
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
              <Zap size={24} />
            </div>
          </div>

          <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter leading-none">{data.title}</h1>
          <p className="text-neutral-600 mb-8 font-medium leading-relaxed">{data.description}</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
              <Button type="submit" disabled={submitting} variant="primary" className="w-full justify-center">
                {submitting ? <Loader2 className="animate-spin" size={16} /> : 'Join the Waitlist'}
              </Button>
              <p className="text-xs text-neutral-400 mt-2 font-mono">No spam. Unsubscribe anytime.</p>
            </form>
          ) : (
            <div className="bg-green-100 border-2 border-black p-4 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-black text-white p-1 rounded-none"><Check size={16} /></div>
                <span className="font-bold text-lg">You're in!</span>
              </div>
              <p className="text-sm font-medium">We've added {email} to the list. We'll be in touch soon.</p>
            </div>
          )}
        </Card>
        <div className="text-center mt-8">
          <a href={window.location.pathname} className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
            Powered by SuperWaitlist
          </a>
        </div>
      </div>
    </div>
  )
}

export default PublicWaitlist
