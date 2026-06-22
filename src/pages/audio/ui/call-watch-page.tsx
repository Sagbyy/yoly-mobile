import { CallWatch } from "@/features/audio/call-watch";
import { SafeAreaView } from "react-native-safe-area-context";

export function CallWatchPage() {
  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]} style={{ backgroundColor: "#0B0B0D" }}>
      <CallWatch />
    </SafeAreaView>
  );
}
