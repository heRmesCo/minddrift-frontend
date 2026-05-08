import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { useTranslation } from "../i18n";
import { styles } from "../styles/app.styles";

export function LoadingScreen() {
  const { t } = useTranslation();

  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.08],
  });

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <View style={styles.centeredContainer}>
      <Animated.Image
        source={require("../../assets/icon.png")}
        style={[
          styles.loadingLogo,
          { opacity, transform: [{ scale }] },
        ]}
        resizeMode="contain"
      />
      <Text style={styles.loadingText}>{t("loading.preparing")}</Text>
    </View>
  );
}
