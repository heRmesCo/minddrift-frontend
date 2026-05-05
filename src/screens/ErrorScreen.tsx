import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../i18n";

interface ErrorScreenProps {
  onRetry: () => void;
  onGoHome: () => void;
}

const palette = {
  background: "#FDF9F2",
  primary: "#364046",
};

// `onRetry` is intentionally unused in the redesigned calm-style error screen.
// We keep the prop in the interface to preserve the existing call-site contract.
export function ErrorScreen({ onGoHome }: ErrorScreenProps) {
  // `t` is locale-aware and gets a fresh identity whenever the locale
  // changes — required so the React Compiler re-evaluates translated JSX.
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Image
            source={require("../../assets/images/cloud-logo.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.headline}>{t("error.title")}</Text>

        <View style={styles.divider} />

        <Text style={styles.description}>
          {t("error.message1")}
          {"\n"}
          {t("error.message2")}
        </Text>

        <TouchableOpacity
          onPress={onGoHome}
          activeOpacity={0.6}
          style={styles.actionWrapper}
        >
          <Text style={styles.actionText}>{t("error.backHome")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 132,
    height: 132,
    borderRadius: 150,
    borderWidth: 1.8,
    borderColor: palette.primary,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
  },
  icon: {
    width: "41%",
    height: "41%",
  },
  headline: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 26,
    color: palette.primary,
    fontWeight: "300",
    letterSpacing: 5,
    textAlign: "center",
    lineHeight: 34,
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
    opacity: 0.7,
    fontWeight: "300",
    letterSpacing: 2.4,
    textAlign: "center",
    lineHeight: 20,
    textTransform: "uppercase",
    marginBottom: 48,
  },
  actionWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 13,
    color: palette.primary,
    fontWeight: "300",
    letterSpacing: 3.6,
    textAlign: "center",
    textTransform: "uppercase",
    textDecorationLine: "underline",
    textDecorationColor: palette.primary,
  },
});
