/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme as useNativeTheme, Theme } from "@react-navigation/native";
import { Material3Scheme } from "@pchmn/expo-material3-theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export type CustomTheme = Theme & {
  colors: Material3Scheme;
};

export function useTheme(): CustomTheme {
  return useNativeTheme() as any;
}
