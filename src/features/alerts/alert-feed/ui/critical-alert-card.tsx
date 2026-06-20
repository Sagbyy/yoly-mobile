import { colors } from "@/shared/config/tokens";
import { Text } from "@/shared/ui/primitives/text";
import { Pressable, View } from "react-native";

import type { CriticalAlert } from "../model/types";

interface CriticalAlertCardProps {
  alert: CriticalAlert;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

export function CriticalAlertCard({
  alert,
  onPrimary,
  onSecondary,
}: CriticalAlertCardProps) {
  return (
    <View
      className="overflow-hidden rounded-[22px] p-4"
      style={{
        backgroundColor: colors.alertSoft,
        borderWidth: 1,
        borderColor: "rgba(208,74,74,0.18)",
      }}
    >
      <View className="flex-row items-center justify-between">
        <View
          className="h-6 flex-row items-center gap-1.5 rounded-full px-2.5"
          style={{ backgroundColor: "rgba(208,74,74,0.14)" }}
        >
          <View
            style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: colors.alert }}
          />
          <Text className="font-geist-medium text-[11px] text-health-alert">
            {alert.tag}
          </Text>
        </View>
        <Text className="text-[13px] text-ink-2">{alert.timeAgo}</Text>
      </View>

      <Text className="mt-3 font-geist-medium text-[20px] tracking-[-0.3px] text-ink">
        {alert.headline}
      </Text>
      <Text className="mt-1 text-[15px] leading-[22px] text-ink-2">
        {alert.description}
      </Text>

      <View className="mt-3.5 flex-row gap-2">
        <Pressable
          onPress={onPrimary}
          className="h-[38px] items-center justify-center rounded-full px-3.5"
          style={{ backgroundColor: colors.alert }}
        >
          <Text className="font-geist-medium text-[14px] text-white">
            {alert.primaryAction}
          </Text>
        </Pressable>
        <Pressable
          onPress={onSecondary}
          className="h-[38px] items-center justify-center rounded-full bg-surface-3 px-3.5"
        >
          <Text className="font-geist-medium text-[14px] text-ink">
            {alert.secondaryAction}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
