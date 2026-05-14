import { useRegisterStore } from "@/features/auth/register";
import { Stack, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const STEPS = ["index", "email", "phone", "otp", "password"];

function StepBar({ filled }: { filled: boolean }) {
  const width = useSharedValue(filled ? 100 : 0);

  useEffect(() => {
    width.value = withTiming(filled ? 100 : 0, { duration: 300 });
  }, [filled, width]);

  const style = useAnimatedStyle(() => ({ width: `${width.value}%` }));

  return (
    <View className="flex-1 h-1 rounded-full bg-neutral-200 overflow-hidden">
      <Animated.View className="h-full bg-accent" style={style} />
    </View>
  );
}

export default function RegisterLayout() {
  const reset = useRegisterStore((s) => s.reset);
  const segments = useSegments();
  const last = segments[segments.length - 1];
  const stepIndex = STEPS.indexOf(last === "register" ? "index" : last);

  useEffect(() => () => reset(), [reset]);

  return (
    <>
      <SafeAreaView edges={["top"]} className="bg-white pt-3">
        <View className="flex-row gap-1.5">
          {STEPS.map((_, i) => (
            <StepBar key={i} filled={i <= stepIndex} />
          ))}
        </View>
      </SafeAreaView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { padding: 0 },
          animation: "slide_from_bottom",
        }}
      />
    </>
  );
}
