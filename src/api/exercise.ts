import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";
import { getInstallationId } from "../device/installationId";
import { getCurrentLocale } from "../i18n";
import { Exercise, ExerciseType, FeedbackPayload } from "../types/exercise";

/**
 * Build the default headers for any backend call.
 * Includes the installation id and an `Accept-Language` header so the
 * backend can (now or in the future) return locale-specific content.
 */
function buildHeaders(installationId: string, extra?: Record<string, string>) {
  return {
    "X-Installation-Id": installationId,
    "Accept-Language": getCurrentLocale(),
    ...(extra ?? {}),
  };
}

/**
 * Fetch a single exercise from the backend.
 *
 * @param type Optional category filter. When provided, the request becomes
 *             `GET /api/exercise?type=<TYPE>`. When omitted the backend
 *             returns a random exercise (existing behaviour).
 */
export async function fetchExercise(type?: ExerciseType): Promise<Exercise> {
  const installationId = await getInstallationId();
  const url = type
    ? `${API_BASE_URL}${API_ENDPOINTS.exercise}?type=${encodeURIComponent(type)}`
    : `${API_BASE_URL}${API_ENDPOINTS.exercise}`;
  const response = await fetch(url, {
    headers: buildHeaders(installationId),
  });
  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }
  return response.json();
}

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  const installationId = await getInstallationId();
  await fetch(`${API_BASE_URL}${API_ENDPOINTS.feedback}`, {
    method: "POST",
    headers: buildHeaders(installationId, {
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(payload),
  });
}
