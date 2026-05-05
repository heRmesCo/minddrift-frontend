import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation, toggleLocale } from "../i18n";
import { ExerciseType } from "../types/exercise";

interface HomeScreenProps {
  /**
   * Called when the user picks a category, or starts a random reset
   * via the "NOT SURE?" footer.
   * Pass `undefined` for a random exercise.
   */
  onStart: (type?: ExerciseType) => void;
}

// Each grid item carries the backend `ExerciseType` it should request.
const categoryData: {
  id: string;
  type: ExerciseType;
  labelKey: string;
  icon: number;
}[] = [
  { id: "stress", type: "STRESS", labelKey: "categories.stress", icon: require("../../assets/images/stress-logo.png") },
  { id: "focus", type: "FOCUS", labelKey: "categories.focus", icon: require("../../assets/images/focus-logo.png") },
  { id: "overthinking", type: "OVERTHINKING", labelKey: "categories.overthinking", icon: require("../../assets/images/overthinking-logo.png") },
  { id: "anxiety", type: "ANXIETY", labelKey: "categories.anxiety", icon: require("../../assets/images/anxiety-logo.png") },
  { id: "burnout", type: "BURNOUT", labelKey: "categories.burnout", icon: require("../../assets/images/burnout-logo.png") },
  { id: "quickcalm", type: "QUICK_CALM", labelKey: "categories.quickCalm", icon: require("../../assets/images/quickcalm-logo.png") },
];

export function HomeScreen({ onStart }: HomeScreenProps) {
  const { t, locale } = useTranslation();

  const colors = {
    background: "#FDF9F2",
    primary: "#364046",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 8,
    },

    header: {
      flex: 0.07,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 0,
    },
    logoMark: {
      width: 36,
      height: 36,
    },
    headerTitle: {
      fontFamily: "Inter_18pt-Light",
      fontSize: 13,
      color: colors.primary,
      letterSpacing: 3.2,
      fontWeight: "300",
    },
    // Spacer that pushes the MINDDRIFT title all the way to the right.
    headerSpacer: {
      flex: 1,
    },
    languageButton: {
      width: 40,
      height: 36,
      alignItems: "flex-start",
      justifyContent: "center",
      marginLeft: 12,
    },
    languageButtonText: {
      fontFamily: "Inter_18pt-Light",
      fontSize: 12,
      color: colors.primary,
      letterSpacing: 2.4,
      fontWeight: "300",
    },
    headline: {
      flex: 0.22,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 0,
    },
    mainText: {
      fontFamily: "Inter_18pt-Light",
      fontSize: 26,
      color: colors.primary,
      letterSpacing: 2.6,
      textAlign: "center",
      fontWeight: "300",
      lineHeight: 32,
      marginBottom: 8,
    },
    subText: {
      fontFamily: "Inter_18pt-Light",
      fontSize: 11,
      color: colors.primary,
      letterSpacing: 1.6,
      textAlign: "center",
      fontWeight: "300",
    },
    gridContainer: {
      flex: 0.73,
      paddingHorizontal: 38,
      paddingTop: 16,
      paddingBottom: 0,
      justifyContent: "flex-start",
      gap: 14,
    },
    gridRow: {
      flexDirection: "row",
      marginVertical: 0,
      gap: 28,
    },
    categoryButton: {
      flex: 1,
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 150,
      borderWidth: 1.8,
      borderColor: colors.primary,
      backgroundColor: "transparent",
    },
    categoryIcon: {
      width: "41%",
      height: "41%",
      marginBottom: 2,
    },
    categoryLabel: {
      fontFamily: "Inter_18pt-Light",
      fontSize: 10.5,
      color: colors.primary,
      letterSpacing: 0.15,
      textAlign: "center",
      fontWeight: "300",
    },
    footer: {
      paddingHorizontal: 16,
      paddingBottom: 56,
      paddingTop: 4,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: "#D6D2C8",
      marginBottom: 36,
      width: "85%",
      alignSelf: "center",
    },
    notSureRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    notSureContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    notSureIcon: {
      width: 22,
      height: 22,
      marginRight: 10,
    },
    notSureText: {
      fontFamily: "Inter_18pt-Light",
      fontSize: 11,
      color: colors.primary,
      letterSpacing: 1.6,
      fontWeight: "300",
      textAlign: "center",
    },
    chevron: {
      fontFamily: "Inter_18pt-Light",
      fontSize: 18,
      color: colors.primary,
      marginLeft: 8,
      fontWeight: "300",
      lineHeight: 18,
    },
  });

  const renderCategoryRow = (startIndex: number) => {
    const items = categoryData.slice(startIndex, startIndex + 2);
    return (
      <View key={startIndex} style={styles.gridRow}>
        {items.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => onStart(category.type)}
            activeOpacity={0.65}
          >
            <Image
              source={category.icon}
              style={styles.categoryIcon}
              resizeMode="contain"
            />
            <Text style={styles.categoryLabel}>{t(category.labelKey)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {/* Header: logo · language toggle · spacer · MINDDRIFT (right) */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.logoMark}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.languageButton}
          onPress={toggleLocale}
          activeOpacity={0.6}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel="Toggle language"
        >
          <Text style={styles.languageButtonText}>
            {locale.toUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>MINDDRIFT</Text>
      </View>

      {/* Headline */}
      <View style={styles.headline}>
        <Text style={styles.mainText}>{t("home.feeling")}</Text>
        <Text style={styles.subText}>{t("home.choose")}</Text>
      </View>

      {/* Category Grid */}
      <View style={styles.gridContainer}>
        {renderCategoryRow(0)}
        {renderCategoryRow(2)}
        {renderCategoryRow(4)}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.notSureRow}
          onPress={() => onStart()}
          activeOpacity={0.65}
        >
          <View style={styles.notSureContent}>
            <Image
              source={require("../../assets/images/cube-logo.png")}
              style={styles.notSureIcon}
              resizeMode="contain"
            />
            <Text style={styles.notSureText}>{t("home.notSure")}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
