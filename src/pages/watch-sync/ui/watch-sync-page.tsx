import { useAuthStore } from "@/features/auth/login";
import { WatchSyncForm, WatchSyncSuccess } from "@/features/watch-sync";
import { Body, H1, YLogo } from "@/shared/ui";
import { Text } from "@/shared/ui/primitives/text";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export function WatchSyncPage() {
  const markWatchSynced = useAuthStore((s) => s.markWatchSynced);
  const signOut = useAuthStore((s) => s.signOut);
  const [confirmed, setConfirmed] = useState(false);

  // Marking synced flips the root guard, which then redirects to the app.
  if (confirmed) return <WatchSyncSuccess onContinue={markWatchSynced} />;

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
            <WatchSyncForm onConfirmed={() => setConfirmed(true)} />
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
