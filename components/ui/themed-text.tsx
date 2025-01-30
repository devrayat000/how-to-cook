import { useTheme } from "@/hooks/useThemeColor";
import { Text, TextProps } from "react-native";

export default function ThemedText(props: TextProps) {
  const theme = useTheme();

  return (
    <Text
      {...props}
      style={[theme.fonts.regular, { color: theme.colors.text }, props.style]}
    />
  );
}
