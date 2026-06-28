import { ActivityDetail } from "@/features/health/activity-detail";
import { colors } from "@/shared/config/tokens";
import { useQueryRefresh } from "@/shared/lib/use-query-refresh";
import { YScreenHeader } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ActivityDetailPage() {
  const router = useRouter();
  const { refreshing, onRefresh } = useQueryRefresh([["health"]]);

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Activité" subtitle="Cette semaine" onBack={() => router.back()} />
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
        <ActivityDetail />
      </ScrollView>
    </SafeAreaView>
  );
}
