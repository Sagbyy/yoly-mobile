import { useAuthStore } from "@/features/auth/login";
import { ProfileMenu } from "@/features/profile/profile-menu";
import { getUserDisplay } from "@/shared/lib/user";
import { Body, H2, YolyButton } from "@/shared/ui";
import { Text } from "@/shared/ui/primitives/text";
import { YAvatar, YScreenHeader } from "@/shared/ui/yoly";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const { fullName, initials } = getUserDisplay(user);

  return (
    <SafeAreaView className="flex-1 bg-bg-soft" edges={["top"]}>
      <YScreenHeader title="Profil" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="px-5 pt-1">
          <View className="flex-row items-center gap-3.5">
            <YAvatar initials={initials} size={64} tone="navy" />
            <View className="flex-1">
              <Text className="font-geist-medium text-[20px] text-ink">
                {fullName || "Mon compte"}
              </Text>
              {user?.email && (
                <Body className="text-ink-3">{user.email}</Body>
              )}
            </View>
          </View>

          <H2 className="mb-2.5 mt-7 text-ink">Réglages</H2>
          <ProfileMenu />

          <View className="mt-8">
            <YolyButton label="Se déconnecter" onPress={signOut} fullWidth />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
