import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { Slot } from "expo-router";
import { SWRConfig } from "swr";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
            ...NavigationDarkTheme,
            colors: { ...NavigationDarkTheme.colors, ...theme.dark },
          }
        : {
            ...NavigationDefaultTheme,
            colors: { ...NavigationDefaultTheme.colors, ...theme.light },
          },
    [colorScheme, theme]
  );

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={paperTheme}>
      <SWRConfig value={{ suspense: true }}>
        <Slot />
      </SWRConfig>
    </ThemeProvider>
  );
}
