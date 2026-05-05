import React, { useState, useEffect } from "react";
import { AppState, BackHandler, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useAppState } from "../src/hooks/useAppState";
import { colors } from "../src/constants/colors";
import { styles } from "../src/styles/app.styles";
import { HomeScreen } from "../src/screens/HomeScreen";
import { LoadingScreen } from "../src/screens/LoadingScreen";
import { ErrorScreen } from "../src/screens/ErrorScreen";
import { ExerciseScreen } from "../src/screens/ExerciseScreen";
import { CompletedScreen } from "../src/screens/CompletedScreen";
import { SplashScreen } from "../src/screens/SplashScreen";
import { useLocale } from "../src/i18n";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const {
    screen,
    exercise,
    handleStartReset,
    handleFeedback,
    handleGoHome,
    handleAnotherReset,
  } = useAppState();

  // Active app locale. We use it as a `key` on the screen subtree below so
  // that a runtime locale switch fully remounts the current screen — this
  // sidesteps the React Compiler's aggressive memoisation of translated JSX.
  const locale = useLocale();

  // Hide Android Navigation Bar (immersive mode).
  //
  // The system shows the navigation bar again whenever Android takes focus
  // away from the app (lock screen, app switcher, notification shade…),
  // and on resume it stays visible until we explicitly hide it again.
  // We therefore re-hide it on every transition back to the "active" state.
  //
  // Note: `setBehaviorAsync` is not supported when `edgeToEdgeEnabled: true`,
  // so we only call `setVisibilityAsync` to avoid the runtime warning.
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const hideNavBar = () =>
      NavigationBar.setVisibilityAsync("hidden").catch(() => {});

    hideNavBar(); // initial mount

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") hideNavBar();
    });

    return () => subscription.remove();
  }, []);

  // Handle Android Back Button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (screen !== "home") {
          handleGoHome();
          return true; // Prevent default behavior
        }
        return false; // Allow default behavior (exit app)
      }
    );

    return () => backHandler.remove();
  }, [screen, handleGoHome]);

  if (showSplash) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* `style="dark"` = dark icons/text on the status bar, readable
            against MINDDRIFT's light cream background. */}
        <StatusBar style="dark" backgroundColor={colors.background} />
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </SafeAreaView>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen onStart={handleStartReset} />;
      case "loading":
        return <LoadingScreen />;
      case "error":
        return <ErrorScreen onRetry={handleStartReset} onGoHome={handleGoHome} />;
      case "reset":
        return exercise ? (
          <ExerciseScreen
            exercise={exercise}
            onFeedback={handleFeedback}
            onBack={handleGoHome}
          />
        ) : null;
      case "completed":
        return (
          <CompletedScreen
            onAnotherReset={handleAnotherReset}
            onGoHome={handleGoHome}
          />
        );
      default:
        return <HomeScreen onStart={handleStartReset} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Dark icons/text on the status bar so the time, battery, etc. stay
          legible against the cream background while the app is active. */}
      <StatusBar style="dark" backgroundColor={colors.background} />
      {/*
        `key={locale}` forces a full remount of the active screen whenever
        the user toggles the language, guaranteeing every translated text
        is re-rendered (compiler-proof).
      */}
      <React.Fragment key={locale}>{renderScreen()}</React.Fragment>
    </SafeAreaView>
  );
}
