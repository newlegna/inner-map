# Inner Map - Mobile App (React Native + Expo)

A native mobile app for Inner Map that combines Astrology, Human Design, MBTI, and Enneagram into one unified self-insight experience.

## Features

- ✅ **Authentication** - Email/password sign up and login with Supabase
- ✅ **Onboarding Flow** - 2-step simplified onboarding
- ✅ **Dashboard** - View your profile with clarity progress and all four systems
- ✅ **Life Purpose Map** - Rule-based synthesis of your complete profile
- ✅ **AI Coach** - Chat interface (note: full AI requires web version API integration)
- ✅ **Native Mobile UI** - Beautiful, responsive design for iOS and Android

## Tech Stack

- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Supabase** for backend and auth (same as web version)
- **Shared Logic** - Reuses astrology, human design, and life purpose helpers from web

## Setup

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator, or Expo Go app on your phone

### Installation

1. **Navigate to mobile directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create `.env.local`:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://jpwnwedjcevuaixzwbmv.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Run on a device:**
   - Press `i` for iOS simulator (Mac only)
   - Press `a` for Android emulator
   - Or scan the QR code with Expo Go app on your phone

## Project Structure

```
mobile/
├── screens/
│   ├── WelcomeScreen.tsx        # Landing screen
│   ├── LoginScreen.tsx          # Login
│   ├── SignupScreen.tsx         # Sign up
│   ├── OnboardingScreen.tsx     # 2-step onboarding
│   ├── MainTabs.tsx             # Bottom tab navigation
│   ├── DashboardScreen.tsx      # Main dashboard
│   ├── PurposeMapScreen.tsx     # Life purpose map
│   └── CoachScreen.tsx          # AI coach chat
├── lib/
│   ├── supabase.ts              # Supabase client (with AsyncStorage)
│   ├── astrology.ts             # Sun sign calculator
│   ├── humanDesign.ts           # HD type calculator
│   └── lifePurpose.ts           # Purpose map generator
├── types/
│   └── index.ts                 # TypeScript types
├── App.tsx                      # Root component with navigation
├── app.json                     # Expo configuration
└── package.json                 # Dependencies
```

## Key Differences from Web Version

### What's the Same:
- ✅ Authentication with Supabase
- ✅ Same database and user profiles
- ✅ Astrology calculations (sun sign)
- ✅ Human Design type calculation
- ✅ Life Purpose Map synthesis logic
- ✅ MBTI and Enneagram type storage

### What's Different:
- 📱 Native mobile UI components (React Native instead of HTML/Tailwind)
- 📱 Bottom tab navigation instead of header navigation
- 📱 Touch-optimized interactions
- ⚠️ **AI Coach is simplified** - Full OpenAI integration requires API calls to web backend
- ⚠️ **Life Purpose Map shows rule-based version only** - AI enhancement requires web API

## Extending the App

### Adding Full AI Features

To add full AI features, you'll need to:

1. **Option A: Call Web API**
   - Make HTTP requests from the mobile app to your deployed web backend
   - Web backend handles OpenAI API calls

2. **Option B: Direct OpenAI Integration**
   - Add OpenAI SDK to mobile app
   - Store API key securely
   - Make direct calls (note: be careful with API key security)

Example for Option A:
```typescript
// In CoachScreen.tsx
const response = await fetch('https://your-web-app.com/api/coach', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages, profile }),
});
const data = await response.json();
```

## Building for Production

### iOS

```bash
expo build:ios
```

### Android

```bash
expo build:android
```

### Using EAS Build (Recommended)

```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## Testing

- **iOS Simulator**: Press `i` in Expo dev tools (Mac only)
- **Android Emulator**: Press `a` in Expo dev tools
- **Physical Device**: Install Expo Go app and scan QR code

## Screenshots

(Add screenshots here after testing)

## Known Limitations

- AI Coach shows acknowledgment messages only (not full AI conversation)
- Life Purpose Map uses rule-based generation (no OpenAI enhancement)
- Chat history is not persisted (resets on app restart)
- No push notifications yet
- No offline mode yet

## Future Enhancements

- [ ] Full AI Coach with OpenAI integration
- [ ] Push notifications for daily insights
- [ ] Offline mode with local storage
- [ ] Profile editing
- [ ] Assessment tests for MBTI and Enneagram
- [ ] Social features (sharing insights)
- [ ] Widgets for home screen
- [ ] Apple Watch / Android Wear companion app

## Troubleshooting

### "Module not found" errors

```bash
cd mobile
rm -rf node_modules
npm install
```

### Supabase connection issues

- Check `.env.local` has correct credentials
- Ensure you're using `EXPO_PUBLIC_` prefix (not `NEXT_PUBLIC_`)

### iOS build fails

- Make sure you're on a Mac
- Update Xcode to latest version
- Run `expo doctor` to check setup

## Support

For issues specific to the mobile app, check:
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [Supabase React Native Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)

---

Built with ❤️ for mobile self-insight and personal growth.
