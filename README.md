# MINDDRIFT

A small, calm React Native / Expo app that delivers short "mind reset"
exercises on demand. The app talks to the MINDDRIFT backend over HTTP
and uses an anonymous, on-device installation ID — no account, no PII.

## Tech stack

- [Expo](https://expo.dev/) (SDK 54) + [Expo Router](https://docs.expo.dev/router/introduction/)
- React Native 0.81 / React 19
- TypeScript
- `expo-secure-store` for the anonymous installation ID
- `i18n-js` + `expo-localization` for English / German

## Project layout

```
app/                  Expo Router entry (app/index.tsx is the root screen)
src/api/              HTTP calls to the MINDDRIFT backend
src/constants/        Static config (API base URL, colors)
src/device/           Anonymous installation ID handling
src/hooks/            App-wide React hooks
src/i18n/             Translations (en, de)
src/screens/          Top-level screen components
src/styles/           Shared style sheets
src/types/            Shared TypeScript types
src/utils/            Small helpers
assets/               Icons, splash, fonts
```

## Prerequisites

- Node.js 20+ and npm
- A running MINDDRIFT backend reachable from your dev machine / device
- For native runs: Android Studio (Android) and/or Xcode (iOS)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file from the template:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and point `EXPO_PUBLIC_API_URL` at your backend.
   See the **Environment variables** section below.

4. Start the dev server:

   ```bash
   npm run start
   ```

   Then open the app in:
   - the Android emulator (`npm run android`)
   - the iOS simulator (`npm run ios`)
   - the web (`npm run web`)
   - [Expo Go](https://expo.dev/go) on a physical device (scan the QR code)

## Environment variables

All runtime configuration is supplied via environment variables, loaded
from a `.env` file at the project root by Expo at build/start time.

| Variable                | Required | Description                                  |
| ----------------------- | -------- | -------------------------------------------- |
| `EXPO_PUBLIC_API_URL`   | yes      | Base URL of the MINDDRIFT backend API.       |

### Example `.env`

```env
# Local backend on the same machine (simulator / web)
EXPO_PUBLIC_API_URL=http://localhost:8080

# Or, when running on a physical device on the same Wi-Fi:
# EXPO_PUBLIC_API_URL=http://192.168.1.42:8080

# Or a deployed backend:
# EXPO_PUBLIC_API_URL=https://api.your-domain.example
```

> ⚠️ **Security note**
>
> Only variables prefixed with `EXPO_PUBLIC_` are exposed to the app
> bundle at runtime. **Never** put real secrets (API keys, tokens,
> passwords, …) into any `EXPO_PUBLIC_*` variable — they ship with the
> compiled JS and can be read by anyone who has the build.
>
> Your local `.env` file is git-ignored. **It must never be committed.**
> Only `.env.example`, which contains placeholder values, is tracked.

## Scripts

| Command                  | What it does                                  |
| ------------------------ | --------------------------------------------- |
| `npm run start`          | Start the Expo dev server                     |
| `npm run android`        | Build & run on Android (native)               |
| `npm run ios`            | Build & run on iOS (native)                   |
| `npm run web`            | Start Expo for web                            |
| `npm run lint`           | Run ESLint via `expo lint`                    |
| `npm run reset-project`  | Move starter code aside and start fresh       |

## License

Proprietary — all rights reserved (until specified otherwise).
