import { Image as ExpoImage, ImageProps as ExpoImageProps } from "expo-image";
import { forwardRef } from "react";
import Animated from "react-native-reanimated";

const Image = forwardRef<ExpoImage, ExpoImageProps>(
  ({ style, ...props }, ref) => {
    return <ExpoImage style={style} {...props} ref={ref} />;
  }
);
Image.displayName = "Image";

export const AnimatedImage = Animated.createAnimatedComponent(Image);

export default Image;
