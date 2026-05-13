import { Text } from "@/shared/ui/primitives/text";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function OnboardingPage() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View>
        <Text>Mon texte</Text>
      </View>
    </SafeAreaView>
  );
}
