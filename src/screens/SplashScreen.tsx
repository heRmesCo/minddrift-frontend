import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { styles } from "../styles/app.styles";

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // 2 Sekunden Splash anzeigen

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={[styles.centeredContainer, { backgroundColor: "#F8F6F1" }]}>
      <Image
        source={require("../../assets/splash-icon.png")}
        style={{ width: 260, height: 260 }}
        resizeMode="contain"
      />
    </View>
  );
}
