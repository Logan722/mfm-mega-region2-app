# GitHub Setup Guide — Step by Step

## Pushing This Project to GitHub

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name**: `mfm-mega-region2-app`
   - **Description**: `Official MFM Mega Region 2 USA mobile app — React Native (Expo) for iOS & Android`
   - **Visibility**: Public (for open source) or Private
   - **DO NOT** initialize with README (we already have one)
3. Click **Create repository**

### Step 2: Initialize Git Locally

Open your terminal in the project folder:

```bash
cd mfm-mega-region2-app

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: MFM Mega Region 2 USA app v1.0

- 10 screens: Home, Livestream, Prayer Wall, Directory, Events,
  Devotionals, Announcements, Profile, Event Detail, Devotional Detail
- Anonymous prayer wall (privacy by design)
- YouTube livestream integration (@mfmmegaregion2usa)
- Branch directory with location, phone, email
- MFM branded with official logo and colors
- Ready for Google Play Store and Apple App Store via EAS"
```

### Step 3: Connect to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/mfm-mega-region2-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Verify on GitHub

1. Go to `https://github.com/YOUR_USERNAME/mfm-mega-region2-app`
2. You should see all your files, the README rendered nicely, and the MFM logo
3. Check that the badges show up in the README

---

## Setting Up GitHub Topics (for discoverability)

On your repo page, click the gear icon next to "About" and add these topics:

```
react-native, expo, church-app, mobile-app, mfm, 
mountain-of-fire, prayer, ios, android, open-source,
church-tech, non-profit, ministry
```

---

## Setting Up GitHub Actions (Optional — CI/CD)

Create `.github/workflows/ci.yml` for automated checks:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm install
      - run: npx expo doctor
```

---

## Protecting the Main Branch (Recommended)

1. Go to **Settings → Branches → Add rule**
2. Branch name pattern: `main`
3. Enable:
   - Require pull request reviews before merging
   - Require status checks to pass
4. Save changes

---

## Creating a Release

When you're ready to tag a version:

```bash
# Tag the release
git tag -a v1.0.0 -m "V1.0.0 - Initial release

Features:
- Home dashboard with MFM branding
- YouTube livestream integration
- Anonymous prayer wall
- Branch directory
- Daily devotionals with prayer points
- Events and PMCH tracking
- Announcements
- Profile and settings"

# Push the tag
git push origin v1.0.0
```

Then on GitHub:
1. Go to **Releases → Draft a new release**
2. Choose tag `v1.0.0`
3. Title: `V1.0.0 — MFM Mega Region 2 USA App`
4. Attach the APK (from EAS preview build) if available
5. Publish

---

## Recommended GitHub Settings

### Repository Description
```
Official MFM Mega Region 2 USA mobile app — Livestream, Prayer Wall, Devotionals, Events, Directory. React Native (Expo) for iOS & Android. Free and open source.
```

### Website URL
```
https://www.youtube.com/@mfmmegaregion2usa
```

### Social Preview Image
Upload a 1280×640 image showing the app screens with MFM branding. This appears when people share your repo link on social media.

---

## Daily Git Workflow

As you continue building:

```bash
# Start your work
git checkout -b feature/admin-panel

# Make changes...

# Stage and commit
git add .
git commit -m "Add: Firebase admin panel foundation"

# Push
git push origin feature/admin-panel

# Then create a Pull Request on GitHub
# After review, merge to main
```

---

*"Commit your works to the Lord, and your thoughts will be established."* — Proverbs 16:3
