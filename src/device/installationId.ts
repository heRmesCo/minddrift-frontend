import * as SecureStore from "expo-secure-store";
import uuid from "react-native-uuid";

const INSTALLATION_ID_KEY = "minddrift_installation_id";

/**
 * Returns a persistent anonymous installation ID.
 *
 * - On first launch a new UUID v4 is generated and stored in SecureStore.
 * - On subsequent launches the stored value is returned.
 *
 * This is NOT a hardware device ID and does NOT require any permissions.
 */
export async function getInstallationId(): Promise<string> {
  try {
    const existing = await SecureStore.getItemAsync(INSTALLATION_ID_KEY);

    if (existing) {
      if (__DEV__) {
        console.log("MINDDRIFT installationId:", existing);
      }
      return existing;
    }

    const created = uuid.v4().toString();
    await SecureStore.setItemAsync(INSTALLATION_ID_KEY, created);

    if (__DEV__) {
      console.log("MINDDRIFT installationId (new):", created);
    }

    return created;
  } catch (error) {
    console.error("Failed to get/create installationId:", error);
    // Return a transient fallback so the app doesn't hang
    const fallback = uuid.v4().toString();
    if (__DEV__) {
      console.log("MINDDRIFT installationId (fallback):", fallback);
    }
    return fallback;
  }
}