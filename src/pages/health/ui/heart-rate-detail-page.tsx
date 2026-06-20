import { HeartRateDetail } from "@/features/health/heart-rate-detail";
import { YScreenHeader } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HeartRateDetailPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader
        title="Fréquence cardiaque"
        subtitle="Aujourd'hui"
        onBack={() => router.back()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <HeartRateDetail />
      </ScrollView>
    </SafeAreaView>
  );
}
