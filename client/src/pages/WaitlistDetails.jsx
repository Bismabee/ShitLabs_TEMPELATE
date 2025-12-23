// src/pages/WaitlistDetails.jsx
import { useState, useEffect } from 'react';
import { Users, Copy } from 'lucide-react';
import { subscribeToSubmissions } from '../services/submissions';
import Button from '../components/Button';
import Card from '../components/Card';

const WaitlistDetails = ({ waitlist, onBack }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (!waitlist) return;
    const unsubscribe = subscribeToSubmissions(waitlist.slug, setSubmissions);
    return () => unsubscribe();
  }, [waitlist]);

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
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="pl-0 text-neutral-500">
          ← Back
        </Button>
        <h1 className="text-2xl font-black uppercase truncate border-l-2 border-black pl-4">
          {waitlist.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-black text-white border-black md:col-span-1">
          <p className="text-xs font-mono opacity-60 uppercase mb-2">Total Signups</p>
          <div className="text-5xl font-black flex items-center gap-3">
            {submissions.length}
            <Users className="opacity-50" size={24}/>
          </div>
        </Card>
        <Card className="md:col-span-2 flex flex-col justify-center gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Public Link</p>
          <div className="flex gap-2">
            <code className="flex-1 bg-neutral-100 p-3 border-2 border-neutral-200 font-mono text-sm truncate rounded-none">
              {window.location.origin}{window.location.pathname}?w={waitlist.slug}
            </code>
            <Button onClick={() => copyLink(waitlist.slug)} variant="secondary">
              <Copy size={16} />
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg uppercase border-b-2 border-black pb-2">Submissions</h3>
        {submissions.length === 0 ? (
          <p className="text-neutral-400 italic">No submissions yet. Share your link!</p>
        ) : (
          <div className="bg-white border-2 border-black">
            <div className="grid grid-cols-1 divide-y-2 divide-black">
              {submissions.map((sub, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center hover:bg-neutral-50 transition-colors">
                  <span className="font-mono font-bold text-sm md:text-base">{sub.email}</span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {sub.submittedAt && sub.submittedAt.seconds ? new Date(sub.submittedAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistDetails;
