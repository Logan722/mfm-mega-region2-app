# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project**
3. Name: `mfm-mega-region2`
4. Disable Google Analytics (not needed for V1)
5. Click **Create Project**

## Step 2: Enable Authentication

1. In Firebase Console → **Authentication** → **Get Started**
2. Click **Email/Password** → Enable → Save
3. Go to **Users** tab → **Add User**
4. Enter YOUR email and a strong password
5. This is your admin login — save these credentials

## Step 3: Create Firestore Database

1. Firebase Console → **Firestore Database** → **Create Database**
2. Select **Start in production mode**
3. Choose region: `us-central1` (closest to Texas)
4. Click **Enable**

## Step 4: Set Firestore Security Rules

Go to **Firestore → Rules** and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Anyone can READ all content (app users)
    match /announcements/{doc} { allow read: if true; allow write: if request.auth != null; }
    match /events/{doc} { allow read: if true; allow write: if request.auth != null; }
    match /devotionals/{doc} { allow read: if true; allow write: if request.auth != null; }
    match /branches/{doc} { allow read: if true; allow write: if request.auth != null; }
    match /weeklyServices/{doc} { allow read: if true; allow write: if request.auth != null; }
    match /livestreamSources/{doc} { allow read: if true; allow write: if request.auth != null; }
    match /livestreamSchedule/{doc} { allow read: if true; allow write: if request.auth != null; }

    // Prayer requests: anyone can read and CREATE, only admin can delete
    match /prayerRequests/{doc} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
      allow delete: if request.auth != null;
    }

    // App config (year declaration, etc)
    match /config/{doc} { allow read: if true; allow write: if request.auth != null; }
  }
}
```

## Step 5: Get Firebase Config

1. Firebase Console → **Project Settings** (gear icon)
2. Under **Your apps** → Click **Web** (`</>` icon)
3. Register app name: `mfm-admin`
4. Copy the `firebaseConfig` object — you'll need it for both the admin panel and the mobile app

It looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "mfm-mega-region2.firebaseapp.com",
  projectId: "mfm-mega-region2",
  storageBucket: "mfm-mega-region2.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 6: Register a Second App for Mobile

1. Still in Project Settings → **Add app** → Click **Web** again
2. Register app name: `mfm-mobile`
3. You can use the same config for both (or separate if preferred)

## Step 7: Seed Initial Data

After setting up the admin panel, log in and use the "Seed Data" button to populate Firestore with all the initial branch data, services, and livestream sources. Or import manually via the Firebase Console.

---

## Firestore Collections Structure

```
firestore/
├── config/
│   └── app                    # { yearDeclaration, yearTheme, yearVerse }
├── announcements/
│   └── {id}                   # { title, body, date, priority, author, createdAt }
├── events/
│   └── {id}                   # { title, date, time, description, location, type, color, isGlobal, recurring }
├── devotionals/
│   └── {id}                   # { date, title, bibleReading, verseOfDay, reflection, prayerPoints[], category }
├── branches/
│   └── {id}                   # { name, city, state, phone, address, email, isHQ }
├── weeklyServices/
│   └── {id}                   # { title, day, dayNum, time, description, icon, color }
├── prayerRequests/
│   └── {id}                   # { request, date, prayerCount, category, createdAt }
├── livestreamSources/
│   └── {id}                   # { name, description, youtubeUrl, isPrimary, type }
└── livestreamSchedule/
    └── {id}                   # { day, program, time, source }
```
