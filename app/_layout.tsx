import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { Slot, Stack } from "expo-router";
import { SWRConfig } from "swr";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const fonts = {
  regular: {
    fontFamily: "Poppins_400Regular",
    fontWeight: "400",
  },
  medium: {
    fontFamily: "Poppins_500Medium",
    fontWeight: "400",
  },
  bold: {
    fontFamily: "Poppins_700Bold",
    fontWeight: "400",
  },
  heavy: {
    fontFamily: "Poppins_900Black",
    fontWeight: "400",
  },
} satisfies Theme["fonts"];

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_900Black,
  });

  const paperTheme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
            ...NavigationDarkTheme,
            colors: { ...NavigationDarkTheme.colors, ...theme.dark },
            fonts,
          }
        : {
            ...NavigationDefaultTheme,
            colors: { ...NavigationDefaultTheme.colors, ...theme.light },
            fonts,
          },
    [colorScheme, theme]
  );

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || error) {
    return null;
  }

  return (
    <ThemeProvider value={paperTheme}>
      <SWRConfig value={{ suspense: true }}>
        <Slot />
      </SWRConfig>
    </ThemeProvider>
  );
}
