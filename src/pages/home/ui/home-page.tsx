import { ActivityTimeline } from "@/features/home/activity-timeline";
import { ChildStatusCard, childStatus } from "@/features/home/child-status";
import { HealthMetricsGrid } from "@/features/home/health-metrics";
import { HomeHeader, useHomeUser } from "@/features/home/home-header";
import { LastSync } from "@/features/home/last-sync";
import { colors } from "@/shared/config/tokens";
import { useQueryRefresh } from "@/shared/lib/use-query-refresh";
import { Body, Title } from "@/shared/ui";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomePage() {
  const homeUser = useHomeUser();
  const { refreshing, onRefresh } = useQueryRefresh([["health"], ["pairing"]]);

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <HomeHeader user={homeUser} />

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
        <View className="px-5 pt-1">
          <Body className="text-ink-3">Bonjour, {homeUser.greetingName}</Body>
          <Title className="mt-0.5 text-ink">{childStatus.statusHeadline}</Title>
          <LastSync />
        </View>

        <View className="mt-[18px] px-5">
          <ChildStatusCard child={childStatus} />
        </View>

        <View className="mt-4 px-5">
          <HealthMetricsGrid />
        </View>

        <View className="mt-5 px-5">
          <ActivityTimeline />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
