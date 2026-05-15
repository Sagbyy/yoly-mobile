import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H1 } from "@/shared/ui";

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <H1>Home</H1>
      </View>
    </SafeAreaView>
  );
}
