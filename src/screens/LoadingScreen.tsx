import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { useTranslation } from "../i18n";
import { styles } from "../styles/app.styles";

export function LoadingScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.centeredContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>{t("loading.preparing")}</Text>
    </View>
  );
}
