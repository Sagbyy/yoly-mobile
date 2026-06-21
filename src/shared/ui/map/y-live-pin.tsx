import { colors } from "@/shared/config/tokens";
import { Text } from "@/shared/ui/primitives/text";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface YLivePinProps {
  initials: string;
  color?: string;
  size?: number;
}

/** Live location marker with a gently pulsing halo. */
export function YLivePin({ initials, color = colors.navy, size = 60 }: YLivePinProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.out(Easing.ease) }),
      -1,
      false,
    );
  }, [progress]);

  const haloStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.4 + progress.value * 0.6 }],
    opacity: 0.25 * (1 - progress.value),
  }));

  const core = size * 0.52;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
          haloStyle,
        ]}
      />
      <View
        style={{
          width: core,
          height: core,
          borderRadius: core / 2,
          backgroundColor: color,
          borderWidth: 3,
          borderColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#0F1A33",
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 6 },
        }}
      >
        <Text className="font-geist-medium text-[13px] text-white">{initials}</Text>
      </View>
    </View>
  );
}
