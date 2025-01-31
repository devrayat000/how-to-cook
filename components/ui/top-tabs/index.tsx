import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext, Href } from "expo-router";
import { remapProps } from "nativewind";
import { TabNavigationState, ParamListBase } from "@react-navigation/native";

const TopTabsNavigator = createMaterialTopTabNavigator();

const RawTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions & { href?: Href | null },
  typeof TopTabsNavigator.Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(TopTabsNavigator.Navigator, (screens) => {
  // Support the `href` shortcut prop.
  return screens.map((screen) => {
    if (
      typeof screen.options !== "function" &&
      screen.options?.href !== undefined
    ) {
      const { href, ...options } = screen.options;

      //   if (options.tabBarButton) {
      //     throw new Error("Cannot use `href` and `tabBarButton` together.");
      //   }
      return {
        ...screen,
        options: {
          ...options,
          tabBarItemStyle:
            href == null ? { display: "none" } : options.tabBarItemStyle,
          //   tabBarButton: (props) => {
          //     if (href == null) {
          //       return null;
          //     }
          //     const children =
          //       Platform.OS === "web" ? (
          //         props.children
          //       ) : (
          //         <Pressable>{props.children}</Pressable>
          //       );
          //     // TODO: React Navigation types these props as Animated.WithAnimatedValue<StyleProp<ViewStyle>>
          //     //       While Link expects a TextStyle. We need to reconcile these types.
          //     return (
          //       <Link
          //         {...props}
          //         style={[{ display: "flex" }, props.style]}
          //         href={href}
          //         replace
          //         asChild={Platform.OS !== "web"}
          //         children={children}
          //       />
          //     );
          //   },
        },
      };
    }
    return screen;
  });
});
// @ts-ignore
RawTopTabs.Screen = TopTabsNavigator.Screen;

const TopTabs = remapProps(RawTopTabs, {
  sceneClassName: "screenOptions.sceneStyle",
});

TopTabs.Screen = remapProps(RawTopTabs.Screen, {});

export default RawTopTabs;
