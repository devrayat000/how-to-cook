import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Animated as RNAnimated,
  useAnimatedValue,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedTransition,
  SharedTransitionType,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Header } from "@expo/html-elements";
import {
  MaterialTopTabBarProps,
  useTabAnimation,
} from "@react-navigation/material-top-tabs";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { useLinkBuilder } from "@react-navigation/native";
import ThemedLink from "./link";
import { ThemedP } from "./themed-text";
import { useEffect, useLayoutEffect } from "react";

const transition = SharedTransition.duration(1000);

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  position: scrollPosition,
  layout,
}: MaterialTopTabBarProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const { buildHref } = useLinkBuilder();
  const { width } = layout;
  const scrollXValue = useSharedValue(0);

  useEffect(() => {
    const listenerId = scrollPosition.addListener(({ value }) => {
      console.log("positions", value);
      //   scrollXValue.value = value; // Update SharedValue
    });
    console.log("listenrs", scrollPosition.hasListeners());

    return () => {
      scrollPosition.removeListener(listenerId);
    };
  }, []);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      width: width / 3,
      transform: [
        {
          translateX: interpolate(
            scrollXValue.value,
            [0, width, 2 * width],
            [0, width, 2 * width],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  }, [width]);

  return (
    <Animated.View className="flex-row relative rounded-full bg-orange-100">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <ThemedLink
            // @ts-ignore
            key={buildHref(route.name, route.params)}
            href={buildHref(route.name, route.params)}
            accessibilityRole={Platform.OS === "web" ? "link" : "button"}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 py-2.5"
          >
            <ThemedP
              className="text-center z-10"
              style={{ color: colors.text }}
            >
              {label}
            </ThemedP>
          </ThemedLink>
        );
      })}
      <Animated.View
        className="bg-red-200 m-1 rounded-full"
        style={[StyleSheet.absoluteFill, indicatorStyle]}
        sharedTransitionTag="tab-indicator"
        sharedTransitionStyle={transition}
      />
    </Animated.View>
  );
}
