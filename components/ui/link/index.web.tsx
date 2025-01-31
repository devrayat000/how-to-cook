import { View } from "react-native";
import { Children, Fragment } from "react";
import { Link, LinkProps } from "expo-router";
import { A } from "@expo/html-elements";

export default function ThemedLink({ children, ...props }: LinkProps) {
  const isChildrenArray = Children.count(children) > 1;
  const Wrapper = isChildrenArray ? View : Fragment;
  const innerProps = !isChildrenArray ? {} : { className: "w-full" };

  return (
    <Link {...props} asChild>
      <A>
        <Wrapper {...innerProps}>{children}</Wrapper>
      </A>
    </Link>
  );
}
