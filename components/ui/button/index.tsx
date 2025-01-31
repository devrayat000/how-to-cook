import { View, Pressable, PressableProps } from "react-native";
import { Children, Fragment } from "react";
import { useTheme } from "@/hooks/useThemeColor";

export default function ThemedButton({ children, ...props }: PressableProps) {
  const theme = useTheme();
  const isChildrenArray = Children.count(children) > 1;
  const Wrapper = isChildrenArray ? View : Fragment;

  return (
    <View>
      <Pressable
        android_ripple={{ color: theme.colors.surfaceDisabled }}
        {...props}
      >
        <Wrapper>{children}</Wrapper>
      </Pressable>
    </View>
  );
}
