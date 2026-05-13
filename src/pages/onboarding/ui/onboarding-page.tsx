import { Body, Display, YLogo } from "@/shared/ui";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function OnboardingPage() {
  return (
    <SafeAreaView>
      <View>
        <YLogo />
        <Display>Leur univers.</Display>
        <Display className="text-neutral-500">
          Votre tranquillité d&apos;esprit.
        </Display>
        <Body>
          Parce qu’un simple coup d’œil devrait suffire à savoir que tout va
          bien, position, rythme cardiaque et audio réunis en temps réel pour
          toute la famille.
        </Body>
      </View>
    </SafeAreaView>
  );
}
