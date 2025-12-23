// src/pages/CreateWaitlist.jsx
import { useState } from 'react';
import { validateSlug } from '../utils/slugify';
import { createWaitlist } from '../services/waitlists';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const CreateWaitlist = ({ user, onBack, onCreated }) => {
  const [formData, setFormData] = useState({ title: '', description: '', slug: '' });
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateSlug(formData.slug)) {
      alert('Slug must be lowercase, numbers, and hyphens only.');
      return;
    }
    setCreating(true);
    
    try {
      await createWaitlist(formData, user.uid);
      setFormData({ title: '', description: '', slug: '' });
      onCreated();
    } catch (err) {
      if (err.message === 'Slug already taken') {
        alert('This slug is already taken. Try another.');
      } else {
        console.error(err);
        alert('Error creating waitlist.');
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4 pl-0 gap-1 text-neutral-500 hover:text-black">
        ← Back
      </Button>
      <Card>
        <h2 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-4">New Project</h2>
        <form onSubmit={handleCreate} className="space-y-6">
          <Input 
            label="Project Name" 
            placeholder="e.g. Acme Corp" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
          />
          <Input 
            label="Tagline / Description" 
            placeholder="e.g. The best widget for X" 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
          />
          <div>
            <Input 
              label="URL Slug" 
              placeholder="acme-corp" 
              value={formData.slug} 
              onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase()})}
              required
            />
            <p className="text-xs text-neutral-400 mt-1 font-mono">Only lowercase letters, numbers, and hyphens.</p>
          </div>
          <div className="pt-4">
            <Button type="submit" variant="primary" className="w-full" disabled={creating}>
              {creating ? "Deploying..." : "Launch Waitlist"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateWaitlist;
