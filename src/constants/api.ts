// MINDDRIFT API configuration.
//
// The base URL is read from the EXPO_PUBLIC_API_URL environment variable so
// that no machine-specific address (e.g. a local LAN IP) is hardcoded into
// the source tree.
//
// Configure it in a local `.env` file at the project root, for example:
//
//   # Deployed (Cloud Run) backend — used as the default fallback below:
//   EXPO_PUBLIC_API_URL=https://minddrift-backend-876469026451.europe-west1.run.app
//   # Local backend on the same machine (simulator / web):
//   # EXPO_PUBLIC_API_URL=http://localhost:8080
//   # Or, when testing on a physical device on the same Wi-Fi:
//   # EXPO_PUBLIC_API_URL=http://192.168.1.42:8080
//
// Only `EXPO_PUBLIC_*` variables are exposed to the app at runtime, so never
// put real secrets in here — this value ships with the bundle.
const FALLBACK_API_BASE_URL =
  "https://minddrift-backend-876469026451.europe-west1.run.app";

// Strip a trailing slash so callers can safely do `${API_BASE_URL}${endpoint}`
// where endpoints start with a leading "/", without producing "//".
const stripTrailingSlash = (value: string): string =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const RAW_API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? FALLBACK_API_BASE_URL;

export const API_BASE_URL = stripTrailingSlash(RAW_API_BASE_URL);

export const API_ENDPOINTS = {
  exercise: "/api/exercise",
  feedback: "/api/feedback",
};
