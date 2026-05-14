import { useRegisterStore } from "@/features/auth/register";
import { Stack, useSegments } from "expo-router";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const STEPS = ["index", "email", "phone", "otp", "password"];

export default function RegisterLayout() {
  const reset = useRegisterStore((s) => s.reset);
  const segments = useSegments();
  const current = segments[segments.length - 1];
  const stepIndex = STEPS.indexOf(current);
  const progress = stepIndex >= 0 ? (stepIndex + 1) / STEPS.length : 0;

  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 300 });
  }, [progress, progressWidth]);

  const animatedBar = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  useEffect(() => () => reset(), [reset]);

  return (
    <>
      {stepIndex >= 0 && (
        <SafeAreaView edges={["top"]} className="bg-white px-6 pt-3 pb-2">
          <Animated.View
            className="h-1 rounded-full bg-accent"
            style={animatedBar}
          />
        </SafeAreaView>
      )}
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { padding: 0 } }}
      />
    </>
  );
}
