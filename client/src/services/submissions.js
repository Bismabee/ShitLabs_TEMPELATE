// src/services/submissions.js
import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from 'firebase/firestore';
import { db, appId } from '../lib/firebase';

export const submitToWaitlist = async (slug, email, ownerId) => {
  await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'submissions'), {
    waitlistSlug: slug,
    email: email,
    submittedAt: serverTimestamp(),
    ownerId: ownerId
  });
};

export const subscribeToSubmissions = (slug, callback) => {
  const q = query(
    collection(db, 'artifacts', appId, 'public', 'data', 'submissions'),
    where('waitlistSlug', '==', slug)
  );

  return onSnapshot(q, (snapshot) => {
    const subs = [];
    snapshot.forEach(doc => subs.push({ id: doc.id, ...doc.data() }));
    callback(subs);
  }, (error) => {
    console.error('Error fetching submissions:', error);
  });
};
