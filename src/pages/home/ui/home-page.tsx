import { ActivityTimeline } from "@/features/home/activity-timeline";
import { ChildStatusCard, childStatus } from "@/features/home/child-status";
import { HealthMetricsGrid } from "@/features/home/health-metrics";
import { HomeHeader, useHomeUser } from "@/features/home/home-header";
import { Body, Title } from "@/shared/ui";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomePage() {
  const homeUser = useHomeUser();

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <HomeHeader user={homeUser} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Greeting */}
        <View className="px-5 pt-1">
          <Body className="text-ink-3">Bonjour, {homeUser.greetingName}</Body>
          <Title className="mt-0.5 text-ink">{childStatus.statusHeadline}</Title>
        </View>

        {/* Hero status card */}
        <View className="mt-[18px] px-5">
          <ChildStatusCard child={childStatus} />
        </View>

        {/* Quick metrics */}
        <View className="mt-4 px-5">
          <HealthMetricsGrid />
        </View>

        {/* Today timeline */}
        <View className="mt-5 px-5">
          <ActivityTimeline />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
