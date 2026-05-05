// MINDDRIFT API configuration.
//
// The base URL is read from the EXPO_PUBLIC_API_URL environment variable so
// that no machine-specific address (e.g. a local LAN IP) is hardcoded into
// the source tree.
//
// Configure it in a local `.env` file at the project root, for example:
//
//   EXPO_PUBLIC_API_URL=http://localhost:8080
//   # or, when testing on a physical device on the same Wi-Fi:
//   # EXPO_PUBLIC_API_URL=http://192.168.1.42:8080
//
// Only `EXPO_PUBLIC_*` variables are exposed to the app at runtime, so never
// put real secrets in here — this value ships with the bundle.
const FALLBACK_API_BASE_URL = "http://localhost:8080";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? FALLBACK_API_BASE_URL;

export const API_ENDPOINTS = {
  exercise: "/api/exercise",
  feedback: "/api/feedback",
};
