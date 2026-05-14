import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Body, H1, YolyButton } from "@/shared/ui";
import { useRegisterStore } from "../model/use-register-store";

export function SuccessStep() {
  const router = useRouter();
  const { firstName, reset } = useRegisterStore();

  function handleContinue() {
    reset();
    router.replace("/(app)/home");
  }

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      edges={["bottom"]}
    >
      <View className="flex-1 items-center justify-center px-6">
        <H1 className="text-center">Bienvenue {firstName} !</H1>
        <Body className="text-center text-neutral-500 mt-4">
          Ton compte Yoly est créé. Maya est prête à t&apos;accompagner.
        </Body>
      </View>

      <View className="w-full px-6 pb-4">
        <YolyButton
          label="Découvrir Yoly"
          withArrow
          fullWidth
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}
