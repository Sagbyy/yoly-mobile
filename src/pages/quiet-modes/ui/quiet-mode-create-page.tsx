import { QuietModeCreate } from "@/features/quiet-modes/quiet-mode-create";
import { YScreenHeader } from "@/shared/ui/yoly";
import { Text } from "@/shared/ui/primitives/text";
import { useRouter } from "expo-router";
import { Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function QuietModeCreatePage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader
        title="Nouveau mode"
        onBack={() => router.back()}
        action={
          <Pressable onPress={() => router.back()} hitSlop={8} className="px-1">
            <Text className="font-geist-medium text-[14px] text-accent">Enregistrer</Text>
          </Pressable>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <QuietModeCreate />
      </ScrollView>
    </SafeAreaView>
  );
}
