import {
  BatteryIcon,
  DropIcon,
  PinIcon,
  SignalIcon,
  StepsIcon,
  type IconProps,
} from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import type { ComponentType } from "react";
import { View } from "react-native";

import { TONE_STYLES } from "../model/tones";
import type { Alert, AlertIcon } from "../model/types";

const ICONS: Record<AlertIcon, ComponentType<IconProps>> = {
  drop: DropIcon,
  battery: BatteryIcon,
  pin: PinIcon,
  steps: StepsIcon,
  signal: SignalIcon,
};

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function AlertRow({ alert }: { alert: Alert }) {
  const Icon = ICONS[alert.icon];
  const { color, soft } = TONE_STYLES[alert.tone];

  return (
    <View
      className="flex-row items-start gap-3 rounded-[18px] bg-surface p-3.5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <View
        className="h-9 w-9 items-center justify-center rounded-[10px]"
        style={{ backgroundColor: soft }}
      >
        <Icon size={18} color={color} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-start justify-between">
          <Text className="flex-1 font-geist-medium text-[14px] text-ink">
            {alert.title}
          </Text>
          <Text className="ml-2 text-[13px] text-ink-3">{alert.timeAgo}</Text>
        </View>
        <Text className="mt-0.5 text-[13px] text-ink-2">{alert.detail}</Text>
      </View>
    </View>
  );
}
