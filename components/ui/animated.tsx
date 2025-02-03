import { Div } from "@expo/html-elements";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";

export const AnimatedImage = Animated.createAnimatedComponent(Image);

export const Universal = Object.freeze({
  Div: Animated.createAnimatedComponent(Div),
});
