import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

function Ring({ size, delay }: { size: number; delay: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration: 2400, easing: Easing.out(Easing.ease) }), -1, false),
    );
  }, [progress, delay]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 0.7 + progress.value * 0.6 }],
    opacity: 0.5 * (1 - progress.value),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1.5,
          borderColor: "rgba(255,255,255,0.6)",
        },
        style,
      ]}
    />
  );
}

export function PulseRings({ size = 200 }: { size?: number }) {
  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", width: size, height: size, alignItems: "center", justifyContent: "center" }}
    >
      <Ring size={size} delay={0} />
      <Ring size={size} delay={500} />
      <Ring size={size} delay={1000} />
    </View>
  );
}
