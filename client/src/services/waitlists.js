// src/services/waitlists.js
import { collection, doc, getDoc, setDoc, onSnapshot, query, where, serverTimestamp } from 'firebase/firestore';
import { db, appId } from '../lib/firebase';

export const getWaitlist = async (slug) => {
  const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'waitlists', slug);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export const createWaitlist = async (data, userId) => {
  const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'waitlists', data.slug);
  const exists = await getDoc(docRef);
  
  if (exists.exists()) {
    throw new Error('Slug already taken');
  }

  await setDoc(docRef, {
    title: data.title,
    description: data.description,
    slug: data.slug,
    ownerId: userId,
    createdAt: serverTimestamp()
  });
};

export const subscribeToUserWaitlists = (userId, callback) => {
  const q = query(
    collection(db, 'artifacts', appId, 'public', 'data', 'waitlists'),
    where('ownerId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const lists = [];
    snapshot.forEach(doc => {
      lists.push({ id: doc.id, ...doc.data() });
    });
    callback(lists);
  }, (error) => {
    console.error('Error fetching waitlists:', error);
  });
};
