import { Body, H1, YolyButton } from "@/shared/ui";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function WatchSyncSuccess({ onContinue }: { onContinue: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-bg-soft" style={{ paddingTop: insets.top }}>
      <View className="flex-1 items-center justify-center px-6">
        <LottieView
          source={require("~/assets/animations/success-circle-check.json")}
          autoPlay
          loop={false}
          style={{ width: 140, height: 140 }}
        />
        <H1 className="mt-4 text-center text-ink">Montre associée !</H1>
        <Body className="mt-3 text-center text-ink-2">
          La montre est maintenant reliée à votre compte. Vous pouvez suivre sa
          localisation, sa santé et ses appels.
        </Body>
      </View>

      <View className="px-5" style={{ paddingBottom: insets.bottom + 16 }}>
        <YolyButton label="Continuer" withArrow fullWidth onPress={onContinue} />
      </View>
    </View>
  );
}
