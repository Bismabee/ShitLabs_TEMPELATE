// src/app/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import PublicWaitlist from '../pages/PublicWaitlist';
import Loader from '../components/Loader';

function App() {
  const { user, loading, login, logout } = useAuth();
  const [publicSlug, setPublicSlug] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('w');
    if (slug) {
      setPublicSlug(slug);
    }
  }, []);

  if (loading) return <Loader text="Booting..." />;

  if (publicSlug) {
    return <PublicWaitlist slug={publicSlug} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard user={user} onLogin={login} onLogout={logout} />} />
        <Route path="/w/:slug" element={<PublicWaitlist />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
