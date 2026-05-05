/**
 * Exercise categories supported by the backend.
 * The Home Screen uses these values to filter `/api/exercise?type=…`.
 */
export type ExerciseType =
  | "FOCUS"
  | "STRESS"
  | "OVERTHINKING"
  | "ANXIETY"
  | "BURNOUT"
  | "QUICK_CALM";

export interface Exercise {
  id: number;
  /** Legacy / language-agnostic field returned by the current backend. */
  text: string;
  /** Optional English text from a future multilingual backend. */
  textEn?: string;
  /** Optional German text from a future multilingual backend. */
  textDe?: string;
  /**
   * The category returned by the backend. We accept any string here so the
   * frontend keeps working if the backend ever introduces new types or
   * still returns legacy values (e.g. "BREATHING", "REFLECTION").
   */
  type: ExerciseType | string;
}

export type Rating = "GOOD" | "BAD";

export interface FeedbackPayload {
  exerciseId: number;
  rating: Rating;
}

export type AppScreen = "home" | "loading" | "reset" | "completed" | "error";
