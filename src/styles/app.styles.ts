import { Platform, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },

  // ── Home ──────────────────────────────────────────────────────

  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },

  brandSection: {
    alignItems: "center",
    marginBottom: 40,
  },

  appName: {
    fontSize: 36,
    fontFamily: "Inter_18pt-Bold",
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: 5,
  },

  tagline: {
    fontSize: 16,
    fontFamily: "Inter_18pt-Light",
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },

  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: "100%",
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  heroIconContainer: {
    marginBottom: 16,
  },

  heroIcon: {
    fontSize: 40,
  },

  heroTitle: {
    fontSize: 22,
    fontFamily: "Inter_18pt-SemiBold",
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 10,
  },

  heroDescription: {
    fontSize: 15,
    fontFamily: "Inter_18pt-Light",
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Inter_18pt-SemiBold",
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  subtleText: {
    fontSize: 14,
    fontFamily: "Inter_18pt-Light",
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 4,
  },

  // ── Loading ───────────────────────────────────────────────────

  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  loadingLogo: {
    width: 96,
    height: 96,
    marginBottom: 24,
  },

  loadingText: {
    fontSize: 16,
    fontFamily: "Inter_18pt-Light",
    color: colors.textSecondary,
    marginTop: 20,
  },

  // ── Error ─────────────────────────────────────────────────────

  errorCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  errorEmoji: {
    fontSize: 40,
    marginBottom: 16,
  },

  errorTitle: {
    fontSize: 22,
    fontFamily: "Inter_18pt-SemiBold",
    fontWeight: "600",
    color: colors.error,
    marginBottom: 10,
  },

  errorDescription: {
    fontSize: 15,
    fontFamily: "Inter_18pt-Light",
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },

  textButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  textButtonText: {
    fontSize: 15,
    fontFamily: "Inter_18pt-Medium",
    color: colors.textSecondary,
    fontWeight: "500",
  },

  // ── Reset ─────────────────────────────────────────────────────

  resetContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
  },

  screenHeader: {
    fontSize: 28,
    fontFamily: "Inter_18pt-Bold",
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 20,
    letterSpacing: -0.3,
  },

  badge: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  badgeText: {
    fontSize: 12,
    fontFamily: "Inter_18pt-Bold",
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  exerciseCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 28,
    width: "100%",
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  exerciseText: {
    fontSize: 19,
    fontFamily: "Inter_18pt-Light",
    color: colors.textPrimary,
    lineHeight: 30,
    textAlign: "center",
    fontWeight: "400",
  },

  helperText: {
    fontSize: 14,
    fontFamily: "Inter_18pt-Light",
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 36,
    lineHeight: 20,
  },

  feedbackRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  feedbackButtonPositive: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  feedbackButtonPositiveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_18pt-SemiBold",
    fontWeight: "600",
  },

  feedbackButtonNeutral: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
  },

  feedbackButtonNeutralText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontFamily: "Inter_18pt-SemiBold",
    fontWeight: "600",
  },

  // ── Completed ─────────────────────────────────────────────────

  completedCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  completedEmoji: {
    fontSize: 36,
    color: colors.primary,
    fontFamily: "Inter_18pt-Bold",
    fontWeight: "700",
    marginBottom: 16,
  },

  completedTitle: {
    fontSize: 24,
    fontFamily: "Inter_18pt-Bold",
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10,
  },

  completedDescription: {
    fontSize: 15,
    fontFamily: "Inter_18pt-Light",
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
});
