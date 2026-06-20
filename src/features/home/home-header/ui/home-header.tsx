import { colors } from "@/shared/config/tokens";
import { BellIcon } from "@/shared/ui/icons";
import { YAvatar, YLogo } from "@/shared/ui/yoly";
import { View } from "react-native";

import type { HomeUser } from "../model/types";

interface HomeHeaderProps {
  user: HomeUser;
}

export function HomeHeader({ user }: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5 pb-3.5 pt-1.5">
      <YLogo size={22} />

      <View className="flex-row items-center gap-2">
        <View className="h-[38px] w-[38px] items-center justify-center rounded-full bg-surface-3">
          <BellIcon size={20} color={colors.ink} />
          {user.hasNotifications && (
            <View
              className="absolute right-2 top-1.5 h-2 w-2 rounded-full border-2 border-bg-soft bg-health-alert"
            />
          )}
        </View>
        <YAvatar initials={user.initials} size={38} tone="navy" />
      </View>
    </View>
  );
}
