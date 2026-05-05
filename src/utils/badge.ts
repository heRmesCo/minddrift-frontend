import { ExerciseType } from "../types/exercise";
import { colors } from "../constants/colors";

export interface BadgeStyle {
  bg: string;
  text: string;
}

export function getBadgeStyle(type: ExerciseType): BadgeStyle {
  switch (type) {
    case "BREATHING":
      return {
        bg: colors.badgeBreathing,
        text: colors.badgeBreathingText,
      };
    case "FOCUS":
      return {
        bg: colors.badgeFocus,
        text: colors.badgeFocusText,
      };
    case "REFLECTION":
      return {
        bg: colors.badgeReflection,
        text: colors.badgeReflectionText,
      };
    default:
      return {
        bg: colors.border,
        text: colors.textSecondary,
      };
  }
}
