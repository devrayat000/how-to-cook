import { View } from "react-native";
import { Children, Fragment } from "react";
import { Link, LinkProps } from "expo-router";
import { A } from "@expo/html-elements";
import { useTheme } from "@/hooks/useThemeColor";

export default function ThemedLink({ children, ...props }: LinkProps) {
  const isChildrenArray = Children.count(children) > 1;
  const Wrapper = isChildrenArray ? View : Fragment;
  const theme = useTheme();
  console.log(theme);

  return (
    <Link {...props} asChild>
      <A>
        <Wrapper className="w-full web:block">{children}</Wrapper>
      </A>
    </Link>
  );
}
