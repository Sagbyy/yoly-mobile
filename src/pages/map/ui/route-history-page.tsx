import { RouteHistory } from "@/features/map/route-history";
import { YScreenHeader } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function RouteHistoryPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Historique des trajets" onBack={() => router.back()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <RouteHistory />
      </ScrollView>
    </SafeAreaView>
  );
}
