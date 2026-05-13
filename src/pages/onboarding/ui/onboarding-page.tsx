import { Display, Text, YLogo } from "@/shared/ui";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function OnboardingPage() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View>
        <YLogo />
        <Display>Leur univers.</Display>
        <Text>Votre tranquillité d&apos;esprit.</Text>
      </View>
    </SafeAreaView>
  );
}
