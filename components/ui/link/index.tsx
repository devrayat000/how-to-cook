import { View, Pressable, PressableProps, StyleSheet } from "react-native";
import { Children, Fragment } from "react";
import { Link, LinkProps } from "expo-router";
import { useTheme } from "@/hooks/useThemeColor";

export default function ThemedLink({ children, ...props }: LinkProps) {
  const theme = useTheme();
  const isChildrenArray = Children.count(children) > 1;
  const Wrapper = isChildrenArray ? View : Fragment;

  return (
    <View className="rounded-xl overflow-hidden">
      <Link {...props} asChild>
        <Pressable android_ripple={{ color: theme.colors.surfaceDisabled }}>
          <Wrapper>{children}</Wrapper>
        </Pressable>
      </Link>
    </View>
  );
}
