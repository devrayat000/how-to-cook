import { useTheme } from "@/hooks/useThemeColor";
import { Text, TextProps } from "react-native";
import { H1, H2, H3, H4, H5, H6, P } from "@expo/html-elements";
import { cn } from "@/lib/utils";

export default function ThemedText(props: TextProps) {
  const theme = useTheme();

  return (
    <Text
      {...props}
      style={[theme.fonts.regular, { color: theme.colors.text }, props.style]}
    />
  );
}

function platformAwareText<Props extends TextProps>(
  Component: React.ComponentType<Props>
) {
  if (process.env.EXPO_OS === "web") {
    return function WebText(props: Props) {
      const theme = useTheme();
      return (
        <Component
          {...props}
          className={cn("web:block my-0", props.className)}
          style={[theme.fonts.regular, props.style]}
        />
      );
    };
  } else {
    return function NativeText(props: Props) {
      const theme = useTheme();
      return (
        <Component
          {...props}
          style={[
            theme.fonts.regular,
            { color: theme.colors.text },
            props.style,
          ]}
        />
      );
    };
  }
}

export const ThemedH1 = platformAwareText(H1);
export const ThemedH2 = platformAwareText(H2);
export const ThemedH3 = platformAwareText(H3);
export const ThemedH4 = platformAwareText(H4);
export const ThemedH5 = platformAwareText(H5);
export const ThemedH6 = platformAwareText(H6);
export const ThemedP = platformAwareText(P);
