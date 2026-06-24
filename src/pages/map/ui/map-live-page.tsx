import { LiveMap } from "@/features/map/live-map";
import { View } from "react-native";

export function MapLivePage() {
  return (
    <View className="flex-1 bg-bg">
      <LiveMap />
    </View>
  );
}
