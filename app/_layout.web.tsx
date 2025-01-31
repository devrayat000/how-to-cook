// Import your global CSS file
import { SWRConfig } from "swr";
import "../global.css";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Slot } from "expo-router";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native-web";
import { useMemo } from "react";

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
    fontWeight: "700",
  },
  heavy: {
    fontFamily: "Poppins_900Black",
    fontWeight: "400",
  },
} satisfies Theme["fonts"];

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_900Black,
  });

  if (!loaded || error) {
    return null;
  }

  return (
    <ThemeProvider
      value={{
        ...NavigationDefaultTheme,
        fonts,
      }}
    >
      <SWRConfig value={{ suspense: true }}>
        <Slot />
      </SWRConfig>
    </ThemeProvider>
  );
}
