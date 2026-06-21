import { QuietModeList } from "@/features/quiet-modes/quiet-mode-list";
import { colors } from "@/shared/config/tokens";
import { routes } from "@/shared/config/routes";
import { PlusIcon } from "@/shared/ui/icons";
import { YScreenHeader } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function QuietModesPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader
        title="Modes calmes"
        onBack={() => router.back()}
        action={
          <Pressable
            onPress={() => router.push(routes.profile.quietModeNew)}
            hitSlop={8}
            className="h-[38px] w-[38px] items-center justify-center rounded-full bg-surface-3"
          >
            <PlusIcon size={18} color={colors.ink} />
          </Pressable>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <QuietModeList />
      </ScrollView>
    </SafeAreaView>
  );
}
