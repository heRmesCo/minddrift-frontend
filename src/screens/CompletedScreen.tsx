import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../i18n";

interface CompletedScreenProps {
  // `onAnotherReset` is intentionally unused now: the secondary action button
  // ("DO ANOTHER RESET") was removed to keep the screen calm and minimal.
  // We keep the prop in the interface to preserve the existing call-site contract.
  onAnotherReset?: () => void;
  onGoHome: () => void;
}

const palette = {
  background: "#FDF9F2",
  primary: "#364046",
};

export function CompletedScreen({ onGoHome }: CompletedScreenProps) {
  // `t` is locale-aware and gets a fresh identity whenever the locale
  // changes — required so the React Compiler re-evaluates translated JSX.
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={onGoHome}
          activeOpacity={0.6}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>{t("completed.title")}</Text>
        {/* Spacer for visual balance */}
        <View style={styles.backButton} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Icon area: thin circle outline + minimal checkmark */}
        <View style={styles.iconCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>{t("completed.resetSaved")}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        <Text style={styles.description}>{t("completed.thankYou")}</Text>
        <Text style={[styles.description, styles.descriptionSecondary]}>
          {t("completed.learn")}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onGoHome}
          activeOpacity={0.6}
        >
          <Text style={styles.actionText}>{t("completed.backHome")}</Text>
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

  // ── Body (icon + headline + divider + description) ──────
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
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
    marginBottom: 36,
  },
  checkMark: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 38,
    lineHeight: 42,
    color: palette.primary,
    fontWeight: "300",
  },
  headline: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 28,
    color: palette.primary,
    fontWeight: "300",
    letterSpacing: 7,
    lineHeight: 38,
    textAlign: "center",
    textTransform: "uppercase",
  },
  divider: {
    width: 48,
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.primary,
    opacity: 0.25,
    marginVertical: 28,
  },
  description: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 12,
    color: palette.primary,
    fontWeight: "300",
    letterSpacing: 3,
    lineHeight: 20,
    textAlign: "center",
    textTransform: "uppercase",
    opacity: 0.7,
  },
  descriptionSecondary: {
    marginTop: 14,
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
