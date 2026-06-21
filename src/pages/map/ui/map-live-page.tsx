import { LiveMap } from "@/features/map/live-map";
import { View } from "react-native";

export function MapLivePage() {
  // Full-bleed map — the overlay chrome handles its own safe-area insets.
  return (
    <View className="flex-1 bg-bg">
      <LiveMap />
    </View>
  );
}
