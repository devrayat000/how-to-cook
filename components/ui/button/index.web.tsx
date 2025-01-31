import { View, Pressable, PressableProps } from "react-native";
import { Children, Fragment } from "react";

export default function ThemedButton({ children, ...props }: PressableProps) {
  const isChildrenArray = Children.count(children) > 1;
  const Wrapper = isChildrenArray ? View : Fragment;

  return (
    <View>
      <Pressable role="button" {...props}>
        <Wrapper>{children}</Wrapper>
      </Pressable>
    </View>
  );
}
