import { SleepDetail } from "@/features/health/sleep-detail";
import { YScreenHeader } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SleepDetailPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Sommeil" subtitle="Nuit dernière" onBack={() => router.back()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <SleepDetail />
      </ScrollView>
    </SafeAreaView>
  );
}
