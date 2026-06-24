import { Body, H1, StepLayout, YolyButton } from "@/shared/ui";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export function WatchSyncSuccess({ onContinue }: { onContinue: () => void }) {
  return (
    <StepLayout
      showBack={false}
      footer={
        <YolyButton label="Continuer" withArrow fullWidth onPress={onContinue} />
      }
    >
      <View className="items-center px-6">
        <LottieView
          source={require("~/assets/animations/success-circle-check.json")}
          autoPlay
          loop={false}
          style={{ width: 140, height: 140 }}
        />
        <H1 className="mt-4 text-center">Montre associée !</H1>
        <Body className="mt-3 text-center text-neutral-500">
          La montre est maintenant reliée à votre compte. Vous pouvez suivre sa
          localisation, sa santé et ses appels.
        </Body>
      </View>
    </StepLayout>
  );
}
