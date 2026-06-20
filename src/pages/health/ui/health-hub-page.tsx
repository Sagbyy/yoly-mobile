import { HealthOverview } from "@/features/health/health-overview";
import { YScreenHeader } from "@/shared/ui/yoly";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HealthHubPage() {
  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Santé" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <HealthOverview />
      </ScrollView>
    </SafeAreaView>
  );
}
