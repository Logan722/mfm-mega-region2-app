/**
 * Firebase Service Layer for MFM Mega Region 2 App
 * 
 * This module handles all communication between the app and Firebase Firestore.
 * Install: npx expo install firebase
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, doc, getDocs, getDoc, addDoc,
  updateDoc, deleteDoc, query, orderBy, limit, where,
  onSnapshot, serverTimestamp, increment,
} from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── COLLECTION REFERENCES ──────────────────────────────────────

const COLLECTIONS = {
  announcements: 'announcements',
  events: 'events',
  devotionals: 'devotionals',
  branches: 'branches',
  weeklyServices: 'weeklyServices',
  prayerRequests: 'prayerRequests',
  livestreamSources: 'livestreamSources',
  livestreamSchedule: 'livestreamSchedule',
  config: 'config',
};

// ─── GENERIC HELPERS ────────────────────────────────────────────

const getCollection = async (name, orderField = null, orderDir = 'desc', maxResults = 50) => {
  try {
    let q = collection(db, name);
    if (orderField) {
      q = query(q, orderBy(orderField, orderDir), limit(maxResults));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching ${name}:`, error);
    return [];
  }
};

const subscribeToCollection = (name, callback, orderField = null, orderDir = 'desc') => {
  let q = collection(db, name);
  if (orderField) {
    q = query(q, orderBy(orderField, orderDir));
  }
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

// ─── ANNOUNCEMENTS ──────────────────────────────────────────────

export const getAnnouncements = () => getCollection(COLLECTIONS.announcements, 'date', 'desc');

export const subscribeAnnouncements = (callback) =>
  subscribeToCollection(COLLECTIONS.announcements, callback, 'date', 'desc');

// ─── EVENTS ─────────────────────────────────────────────────────

export const getEvents = () => getCollection(COLLECTIONS.events, 'date', 'asc');

export const subscribeEvents = (callback) =>
  subscribeToCollection(COLLECTIONS.events, callback, 'date', 'asc');

// ─── DEVOTIONALS ────────────────────────────────────────────────

export const getDevotionals = () => getCollection(COLLECTIONS.devotionals, 'date', 'desc', 30);

export const getTodayDevotional = async () => {
  const today = new Date().toISOString().split('T')[0];
  const q = query(
    collection(db, COLLECTIONS.devotionals),
    where('date', '==', today),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  // Fallback: get most recent
  const fallback = await getCollection(COLLECTIONS.devotionals, 'date', 'desc', 1);
  return fallback[0] || null;
};

export const subscribeDevotionals = (callback) =>
  subscribeToCollection(COLLECTIONS.devotionals, callback, 'date', 'desc');

// ─── BRANCHES ───────────────────────────────────────────────────

export const getBranches = () => getCollection(COLLECTIONS.branches, 'name', 'asc', 100);

export const subscribeBranches = (callback) =>
  subscribeToCollection(COLLECTIONS.branches, callback, 'name', 'asc');

// ─── WEEKLY SERVICES ────────────────────────────────────────────

export const getWeeklyServices = () => getCollection(COLLECTIONS.weeklyServices, 'dayNum', 'asc');

// ─── PRAYER REQUESTS ────────────────────────────────────────────

export const getPrayerRequests = () =>
  getCollection(COLLECTIONS.prayerRequests, 'createdAt', 'desc', 100);

export const subscribePrayerRequests = (callback) =>
  subscribeToCollection(COLLECTIONS.prayerRequests, callback, 'createdAt', 'desc');

export const submitPrayerRequest = async (request, category = 'general') => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.prayerRequests), {
      request,
      category,
      date: new Date().toISOString().split('T')[0],
      prayerCount: 0,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting prayer request:', error);
    throw error;
  }
};

export const incrementPrayerCount = async (requestId) => {
  try {
    const ref = doc(db, COLLECTIONS.prayerRequests, requestId);
    await updateDoc(ref, { prayerCount: increment(1) });
  } catch (error) {
    console.error('Error incrementing prayer count:', error);
  }
};

// ─── LIVESTREAM ─────────────────────────────────────────────────

export const getLivestreamSources = () => getCollection(COLLECTIONS.livestreamSources);
export const getLivestreamSchedule = () => getCollection(COLLECTIONS.livestreamSchedule, 'sortOrder', 'asc');

// ─── APP CONFIG ─────────────────────────────────────────────────

export const getAppConfig = async () => {
  try {
    const docRef = doc(db, COLLECTIONS.config, 'app');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return {
      yearDeclaration: 'My Year of Great Deliverance and Fresh Glory',
      yearVerse: 'Genesis 45:7',
      yearTheme: '2026',
    };
  } catch (error) {
    console.error('Error fetching app config:', error);
    return null;
  }
};

// ─── EXPORT DB INSTANCE (for admin use) ─────────────────────────

export { db, COLLECTIONS };
export default db;
