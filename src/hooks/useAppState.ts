import { useState } from "react";
import { AppScreen, Exercise, ExerciseType, Rating } from "../types/exercise";
import { fetchExercise, submitFeedback } from "../api/exercise";

export function useAppState() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [exercise, setExercise] = useState<Exercise | null>(null);
  // Remember the last requested type so "Do another reset" can re-use it.
  const [lastType, setLastType] = useState<ExerciseType | undefined>(undefined);

  const handleStartReset = async (type?: ExerciseType) => {
    setLastType(type);
    setScreen("loading");
    try {
      const data = await fetchExercise(type);
      setExercise(data);
      setScreen("reset");
    } catch {
      setScreen("error");
    }
  };

  const handleFeedback = async (rating: Rating) => {
    if (exercise) {
      try {
        await submitFeedback({ exerciseId: exercise.id, rating });
      } catch {
        // Silently handle feedback submission failure
      }
    }
    setScreen("completed");
  };

  const handleGoHome = () => {
    setExercise(null);
    setScreen("home");
  };

  const handleAnotherReset = () => {
    handleStartReset(lastType);
  };

  return {
    screen,
    exercise,
    handleStartReset,
    handleFeedback,
    handleGoHome,
    handleAnotherReset,
  };
}
