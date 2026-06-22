import { RecordingsList } from "@/features/audio/recordings-list";
import { YScreenHeader } from "@/shared/ui/yoly";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function RecordingsPage() {
  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Audio" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <RecordingsList />
      </ScrollView>
    </SafeAreaView>
  );
}
