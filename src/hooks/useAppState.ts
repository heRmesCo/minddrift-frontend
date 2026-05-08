import { useState } from "react";
import { fetchExercise, submitFeedback } from "../api/exercise";
import { AppScreen, Exercise, ExerciseType, Rating } from "../types/exercise";

const MIN_LOADING_MS = 4000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useAppState() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [lastType, setLastType] = useState<ExerciseType | undefined>(undefined);

  const handleStartReset = async (type?: ExerciseType) => {
    setLastType(type);
    setScreen("loading");
    try {
      const [data] = await Promise.all([
        fetchExercise(type),
        wait(MIN_LOADING_MS),
      ]);
      setExercise(data);
      setScreen("reset");
    } catch {
      await wait(MIN_LOADING_MS);
      setScreen("error");
    }
  };

  const handleExerciseDone = () => {
    setScreen("completed");
  };

  const handleFeedback = async (rating: Rating) => {
    if (exercise) {
      try {
        await submitFeedback({ exerciseId: exercise.id, rating });
      } catch {
        /* ignore */
      }
    }
    setExercise(null);
    setScreen("home");
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
    handleExerciseDone,
    handleFeedback,
    handleGoHome,
    handleAnotherReset,
  };
}
