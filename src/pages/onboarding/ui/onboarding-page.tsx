import {
  Body,
  Display,
  images,
  YLogo,
  YolyButton,
  YolyFloatingImage,
} from "@/shared/ui";
import { useRouter } from "expo-router";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export function OnboardingPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Animated.View
          entering={FadeInDown.delay(0).duration(500)}
          className="pb-14"
        >
          <YLogo />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).duration(500)}>
          <Display className="dark:text-white">Leur univers.</Display>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(250).duration(500)}
          className="pb-8"
        >
          <Display className="text-neutral-500">Votre tranquillité.</Display>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(350).duration(500)}>
          <Body className="dark:text-white">
            Parce qu&apos;un simple coup d&apos;œil devrait suffire à savoir que
            tout va bien. Suivi en temps réel pour toute la famille.
          </Body>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(500)}
        className="flex-1 items-center justify-center"
      >
        <YolyFloatingImage source={images.smartwatch} />
      </Animated.View>

      <View className="gap-3 pb-4">
        <Animated.View entering={FadeInDown.delay(450).duration(500)}>
          <YolyButton
            label="Commencer"
            withArrow
            fullWidth
            onPress={() => router.push("/(auth)/register")}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(500)}>
          <YolyButton
            label="J'ai déjà un compte"
            variant="white"
            fullWidth
            onPress={() => router.push("/(auth)/login")}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
