import { View } from "react-native";
import { Children, cloneElement, Fragment } from "react";
import { Link, LinkProps } from "expo-router";
import { A } from "@expo/html-elements";
import { useTheme } from "@/hooks/useThemeColor";

export default function ThemedLink({ children, ...props }: LinkProps) {
  const isChildrenArray = Children.count(children) > 1;
  const Wrapper = isChildrenArray
    ? cloneElement(View, {
        className: "w-full web:block",
      })
    : Fragment;
  const theme = useTheme();

  return (
    <Link {...props} asChild>
      <A>
        <Wrapper>{children}</Wrapper>
      </A>
    </Link>
  );
}
