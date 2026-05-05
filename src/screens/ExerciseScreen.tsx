import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Exercise, Rating } from "../types/exercise";
import { getCurrentLocale, useTranslation } from "../i18n";

interface ExerciseScreenProps {
  exercise: Exercise;
  onFeedback: (rating: Rating) => void;
  onBack?: () => void;
}

const palette = {
  background: "#FDF9F2",
  primary: "#364046",
};

// Map every backend exercise `type` (current + legacy) to:
//   - the image asset (logo)
//   - the i18n key for the human-readable label shown under the logo
const categoryAssets: Record<
  string,
  { icon: ImageSourcePropType; labelKey: string }
> = {
  // Current backend types
  FOCUS: {
    icon: require("../../assets/images/focus-logo.png"),
    labelKey: "categories.focus",
  },
  STRESS: {
    icon: require("../../assets/images/stress-logo.png"),
    labelKey: "categories.stress",
  },
  OVERTHINKING: {
    icon: require("../../assets/images/overthinking-logo.png"),
    labelKey: "categories.overthinking",
  },
  ANXIETY: {
    icon: require("../../assets/images/anxiety-logo.png"),
    labelKey: "categories.anxiety",
  },
  BURNOUT: {
    icon: require("../../assets/images/burnout-logo.png"),
    labelKey: "categories.burnout",
  },
  QUICK_CALM: {
    icon: require("../../assets/images/quickcalm-logo.png"),
    labelKey: "categories.quickCalm",
  },
  // Tolerated alias without underscore
  QUICKCALM: {
    icon: require("../../assets/images/quickcalm-logo.png"),
    labelKey: "categories.quickCalm",
  },
  // Legacy backend types — kept for backwards compatibility
  BREATHING: {
    icon: require("../../assets/images/quickcalm-logo.png"),
    labelKey: "categories.quickCalm",
  },
  REFLECTION: {
    icon: require("../../assets/images/overthinking-logo.png"),
    labelKey: "categories.overthinking",
  },
};

const fallbackCategory = categoryAssets.FOCUS;

function resolveCategory(type: string) {
  // Normalise: uppercase, strip spaces / dashes, but KEEP underscores so
  // "QUICK_CALM" stays distinct.
  const key = type.toUpperCase().replace(/[\s-]/g, "");
  return categoryAssets[key] ?? fallbackCategory;
}

/**
 * Pick the best available exercise text for the current locale.
 * Backend may already return language-specific fields (`textDe`, `textEn`).
 * We always fall back to the legacy `text` field so the current backend
 * keeps working unchanged.
 */
function pickExerciseText(exercise: Exercise): string {
  const locale = getCurrentLocale();
  if (locale === "de" && exercise.textDe) return exercise.textDe;
  if (exercise.textEn) return exercise.textEn;
  return exercise.text;
}

export function ExerciseScreen({ exercise, onFeedback, onBack }: ExerciseScreenProps) {
  // `t` is locale-aware and gets a fresh identity whenever the locale
  // changes — required so the React Compiler re-evaluates translated JSX.
  const { t } = useTranslation();
  const category = resolveCategory(exercise.type);
  const exerciseText = pickExerciseText(exercise);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.6}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}
        <Text style={styles.topTitle}>{t("exercise.title")}</Text>
        {/* Spacer to balance the back button on the right */}
        <View style={styles.backButton} />
      </View>

      {/* Exercise type header */}
      <View style={styles.typeHeader}>
        <View style={styles.iconCircle}>
          <Image
            source={category.icon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.categoryLabel}>{t(category.labelKey)}</Text>
        <View style={styles.divider} />
      </View>

      {/* Exercise area */}
      <View style={styles.exerciseArea}>
        <View style={styles.exerciseFrame}>
          <Text style={styles.exerciseText}>{exerciseText}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onFeedback("GOOD")}
          activeOpacity={0.6}
        >
          <Text style={styles.actionText}>{t("exercise.helped")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onFeedback("BAD")}
          activeOpacity={0.6}
        >
          <Text style={styles.actionText}>{t("exercise.notToday")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingTop: 8,
  },

  // ── Top bar ──────────────────────────────────────────────
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backArrow: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 28,
    lineHeight: 28,
    color: palette.primary,
    fontWeight: "300",
  },
  topTitle: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 13,
    color: palette.primary,
    fontWeight: "300",
    letterSpacing: 4.5,
    textAlign: "center",
    textTransform: "uppercase",
  },

  // ── Type header ─────────────────────────────────────────
  typeHeader: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 150,
    borderWidth: 1.8,
    borderColor: palette.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 18,
  },
  icon: {
    width: "41%",
    height: "41%",
  },
  categoryLabel: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 14,
    color: palette.primary,
    fontWeight: "300",
    letterSpacing: 5.5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  divider: {
    width: 48,
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.primary,
    opacity: 0.25,
    marginTop: 16,
  },

  // ── Exercise area ───────────────────────────────────────
  exerciseArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: "center",
  },
  exerciseFrame: {
    flexShrink: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.primary,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    // Soft border via opacity on the colour itself isn't supported,
    // so we keep the border subtle by using hairlineWidth + low-contrast tone.
    opacity: 0.95,
  },
  exerciseText: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 18,
    color: palette.primary,
    fontWeight: "300",
    letterSpacing: 0.6,
    lineHeight: 28,
    textAlign: "center",
  },

  // ── Actions ─────────────────────────────────────────────
  actions: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 12,
  },
  actionButton: {
    borderWidth: 1.4,
    borderColor: palette.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  actionText: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 13,
    color: palette.primary,
    fontWeight: "300",
    letterSpacing: 4,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
