import { HealthOverview } from "@/features/health/health-overview";
import { colors } from "@/shared/config/tokens";
import { useQueryRefresh } from "@/shared/lib/use-query-refresh";
import { YScreenHeader } from "@/shared/ui/yoly";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HealthHubPage() {
  const { refreshing, onRefresh } = useQueryRefresh([["health"]]);

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Santé" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.ink3}
            colors={[colors.accent]}
          />
        }
      >
        <HealthOverview />
      </ScrollView>
    </SafeAreaView>
  );
}
