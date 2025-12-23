// src/auth/useAuth.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithCustomToken, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        try {
          await signInWithCustomToken(auth, __initial_auth_token);
        } catch (e) {
          console.error('Custom token auth failed', e);
        }
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error('Login failed', e);
      if (e.code !== 'auth/popup-closed-by-user') {
        alert('Login failed: ' + e.message);
      }
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  return { user, loading, login, logout };
};
