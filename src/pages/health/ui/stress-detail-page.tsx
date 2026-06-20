import { StressDetail } from "@/features/health/stress-detail";
import { YScreenHeader } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function StressDetailPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Stress" subtitle="Aujourd'hui" onBack={() => router.back()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <StressDetail />
      </ScrollView>
    </SafeAreaView>
  );
}
