import { SavedZones } from "@/features/map/saved-zones";
import { YScreenHeader } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SavedZonesPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Zones enregistrées" onBack={() => router.back()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <SavedZones />
      </ScrollView>
    </SafeAreaView>
  );
}
