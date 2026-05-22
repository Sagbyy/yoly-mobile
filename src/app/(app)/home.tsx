import { useAuthStore } from "@/features/auth/login/model/use-auth-store";
import { H1, YolyButton } from "@/shared/ui";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const { signOut } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center gap-6">
        <H1>Home</H1>
        <YolyButton label="Se déconnecter" onPress={signOut} fullWidth />
      </View>
    </SafeAreaView>
  );
}
