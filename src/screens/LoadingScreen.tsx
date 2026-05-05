import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { colors } from "../constants/colors";
import { styles } from "../styles/app.styles";

export function LoadingScreen() {
  return (
    <View style={styles.centeredContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>Preparing your reset…</Text>
    </View>
  );
}
