# Contributing to MFM Mega Region 2 App

Thank you for your interest in contributing to the MFM Mega Region 2 app! This project serves the body of Christ, and every contribution helps churches connect better with their members.

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists in [Issues](../../issues)
2. If not, create a new issue with:
   - Clear title describing the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Device/OS info (e.g., iPhone 15, iOS 17)
   - Screenshots if applicable

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and why it would help MFM members
3. Include mockups or examples if possible

### Submitting Code

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/mfm-mega-region2-app.git`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** — follow the code style below
5. **Test** on both iOS and Android (or at least Expo Go)
6. **Commit**: `git commit -m 'Add: description of your change'`
7. **Push**: `git push origin feature/your-feature-name`
8. **Open a Pull Request** against `main`

## Code Style

- Use functional components with React hooks
- Follow the existing file structure (screens in `src/screens/`, etc.)
- Use the theme colors from `src/theme/colors.js` — never hardcode colors
- Use the spacing/radius constants from `src/theme/typography.js`
- Keep components small and focused
- Use descriptive variable names

## Commit Message Format

```
Add: new feature description
Fix: bug description
Update: what was changed
Remove: what was removed
Docs: documentation changes
```

## Branch Naming

```
feature/description    — New features
fix/description        — Bug fixes
docs/description       — Documentation
refactor/description   — Code refactoring
```

## Priority Areas

These are the features we'd love help with:

1. **Firebase integration** — Moving from mockData.js to Firestore
2. **Push notifications** — Expo Notifications setup
3. **Online giving** — Stripe/PayPal integration
4. **In-app YouTube player** — Embedded livestream viewing
5. **Accessibility** — Screen reader support, font scaling
6. **Testing** — Unit tests and E2E tests

## Code of Conduct

- Be respectful and constructive
- Remember this app serves a church community
- No profanity, inappropriate content, or disrespectful language
- Keep discussions focused on the project

---

*"For we are God's handiwork, created in Christ Jesus to do good works"* — Ephesians 2:10
