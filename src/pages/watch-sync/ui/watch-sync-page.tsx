import { useAuthStore } from "@/features/auth/login";
import { WatchSyncForm } from "@/features/watch-sync";
import { Body, H1, YLogo } from "@/shared/ui";
import { Text } from "@/shared/ui/primitives/text";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export function WatchSyncPage() {
  const router = useRouter();
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top", "bottom"]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center">
          <YLogo size={28} />

          <H1 className="mt-8 text-ink">Reliez une montre</H1>
          <Body className="mt-3 text-ink-2">
            Entrez le code à 6 chiffres affiché sur la montre de votre enfant
            pour la relier à votre compte. C&apos;est nécessaire pour accéder à
            l&apos;application.
          </Body>

          <View className="mt-8">
            <WatchSyncForm onConfirmed={() => router.push("/sync/success")} />
          </View>
        </View>

        <Pressable onPress={signOut} hitSlop={8} className="items-center py-4">
          <Text className="text-[13px] text-ink-3">
            Ce n&apos;est pas vous ? Se déconnecter
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
