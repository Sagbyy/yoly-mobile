import { AudioIcon, DropIcon, PinIcon, ShieldIcon, type IconProps } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import type { ComponentType } from "react";
import { View } from "react-native";

import { timelineEvents } from "../model/data";
import type { TimelineEvent, TimelineIcon } from "../model/types";

const ICONS: Record<TimelineIcon, ComponentType<IconProps>> = {
  pin: PinIcon,
  shield: ShieldIcon,
  drop: DropIcon,
  audio: AudioIcon,
};

const CHIP_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

function EventRow({ event }: { event: TimelineEvent }) {
  const Icon = ICONS[event.icon];

  return (
    <View className="flex-row items-center gap-3 rounded-[20px] bg-surface-2 p-3.5">
      <Text className="w-10 font-geist-mono text-[12px] text-ink-3">{event.time}</Text>
      <View
        className="h-9 w-9 items-center justify-center rounded-[10px] bg-surface"
        style={{ boxShadow: CHIP_SHADOW }}
      >
        <Icon size={18} color={event.color} />
      </View>
      <View className="flex-1">
        <Text className="font-geist-medium text-[13px] text-ink">{event.title}</Text>
        <Text className="text-[13px] text-ink-3">{event.subtitle}</Text>
      </View>
    </View>
  );
}

export function ActivityTimeline() {
  return (
    <View>
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-geist-medium text-[17px] tracking-[-0.2px] text-ink">
          {"Aujourd'hui"}
        </Text>
        <Text className="text-[13px] text-ink-3">Tout voir</Text>
      </View>
      <View className="gap-2">
        {timelineEvents.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </View>
    </View>
  );
}
