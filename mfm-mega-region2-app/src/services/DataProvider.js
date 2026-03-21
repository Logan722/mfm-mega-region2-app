/**
 * MFM Data Provider
 * 
 * Wraps the entire app. Provides real-time Firestore data to all screens.
 * Falls back to mockData.js if Firebase isn't configured yet.
 * 
 * Usage in any screen:
 *   import { useAppData } from '../services/DataProvider';
 *   const { announcements, events, devotionals, branches, ... } = useAppData();
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  subscribeAnnouncements,
  subscribeEvents,
  subscribeDevotionals,
  subscribeBranches,
  subscribePrayerRequests,
  getWeeklyServices,
  getLivestreamSources,
  getLivestreamSchedule,
  getAppConfig,
  submitPrayerRequest as fbSubmitPrayer,
  incrementPrayerCount as fbIncrementPrayer,
} from './firebase';

// Fallback mock data (used when Firebase isn't configured)
import {
  announcements as mockAnnouncements,
  specialEvents as mockEvents,
  devotionals as mockDevotionals,
  branches as mockBranches,
  samplePrayerRequests as mockPrayers,
  weeklyServices as mockServices,
  livestreamSources as mockLivestreamSources,
  livestreamSchedule as mockLivestreamSchedule,
} from '../data/mockData';

const DataContext = createContext(null);

// Check if Firebase is configured (not placeholder keys)
const isFirebaseConfigured = () => {
  try {
    const config = require('./firebaseConfig').default;
    return config.apiKey && !config.apiKey.includes('YOUR_');
  } catch {
    return false;
  }
};

export function DataProvider({ children }) {
  const [useFirebase, setUseFirebase] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data state
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [events, setEvents] = useState(mockEvents);
  const [devotionals, setDevotionals] = useState(mockDevotionals);
  const [branches, setBranches] = useState(mockBranches);
  const [prayerRequests, setPrayerRequests] = useState(mockPrayers);
  const [weeklyServices, setWeeklyServices] = useState(mockServices);
  const [livestreamSources, setLivestreamSources] = useState(mockLivestreamSources);
  const [livestreamSchedule, setLivestreamSchedule] = useState(mockLivestreamSchedule);
  const [appConfig, setAppConfig] = useState({
    yearDeclaration: 'My Year of Great Deliverance and Fresh Glory',
    yearVerse: 'Genesis 45:7',
    yearTheme: '2026',
  });

  useEffect(() => {
    const firebaseReady = isFirebaseConfigured();
    setUseFirebase(firebaseReady);

    if (!firebaseReady) {
      // Use mock data — already set as defaults
      console.log('[MFM Data] Using mock data (Firebase not configured)');
      setLoading(false);
      return;
    }

    console.log('[MFM Data] Connecting to Firebase...');

    // Set up real-time listeners
    const unsubscribers = [];

    // Announcements — real-time
    unsubscribers.push(
      subscribeAnnouncements((data) => {
        setAnnouncements(data);
      })
    );

    // Events — real-time
    unsubscribers.push(
      subscribeEvents((data) => {
        setEvents(data);
      })
    );

    // Devotionals — real-time
    unsubscribers.push(
      subscribeDevotionals((data) => {
        setDevotionals(data);
      })
    );

    // Branches — real-time
    unsubscribers.push(
      subscribeBranches((data) => {
        setBranches(data);
      })
    );

    // Prayer Requests — real-time
    unsubscribers.push(
      subscribePrayerRequests((data) => {
        setPrayerRequests(data);
      })
    );

    // One-time fetches for less-frequently-changed data
    const fetchStatic = async () => {
      try {
        const [services, sources, schedule, config] = await Promise.all([
          getWeeklyServices(),
          getLivestreamSources(),
          getLivestreamSchedule(),
          getAppConfig(),
        ]);
        if (services.length) setWeeklyServices(services);
        if (sources.length) setLivestreamSources(sources);
        if (schedule.length) setLivestreamSchedule(schedule);
        if (config) setAppConfig(config);
      } catch (err) {
        console.warn('[MFM Data] Error fetching static data, using defaults:', err);
      }
      setLoading(false);
    };

    fetchStatic();

    // Cleanup listeners on unmount
    return () => {
      unsubscribers.forEach(unsub => {
        if (typeof unsub === 'function') unsub();
      });
    };
  }, []);

  // Actions
  const submitPrayerRequest = async (request, category) => {
    if (useFirebase) {
      return await fbSubmitPrayer(request, category);
    } else {
      // Mock: add locally
      const newReq = {
        id: 'pr' + Date.now(),
        request,
        category: category || 'general',
        date: new Date().toISOString().split('T')[0],
        prayerCount: 0,
      };
      setPrayerRequests(prev => [newReq, ...prev]);
      return newReq.id;
    }
  };

  const incrementPrayerCount = async (requestId) => {
    if (useFirebase) {
      await fbIncrementPrayer(requestId);
    } else {
      // Mock: increment locally
      setPrayerRequests(prev =>
        prev.map(r => r.id === requestId ? { ...r, prayerCount: r.prayerCount + 1 } : r)
      );
    }
  };

  // Today's devotional helper
  const todayDevotional = (() => {
    const today = new Date().toISOString().split('T')[0];
    return devotionals.find(d => d.date === today) || devotionals[0] || null;
  })();

  // Today's service helper
  const todayService = (() => {
    const dayNum = new Date().getDay();
    return weeklyServices.find(s => s.dayNum === dayNum) || null;
  })();

  const value = {
    // Data
    announcements,
    events,
    devotionals,
    branches,
    prayerRequests,
    weeklyServices,
    livestreamSources,
    livestreamSchedule,
    appConfig,

    // Computed
    todayDevotional,
    todayService,

    // Actions
    submitPrayerRequest,
    incrementPrayerCount,

    // Meta
    loading,
    useFirebase,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useAppData must be used within a DataProvider');
  }
  return context;
}

export default DataProvider;
