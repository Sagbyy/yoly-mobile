import {
  ChevronIcon,
  DropIcon,
  MoonIcon,
  PulseIcon,
  StepsIcon,
  type IconProps,
} from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YRing } from "@/shared/ui/charts";
import { YSpark } from "@/shared/ui/yoly";
import { colors } from "@/shared/config/tokens";
import { useRouter } from "expo-router";
import type { ComponentType } from "react";
import { Pressable, View } from "react-native";

import type { HealthMetricIcon, HealthMetricRow } from "../model/types";

const ICONS: Record<HealthMetricIcon, ComponentType<IconProps>> = {
  pulse: PulseIcon,
  drop: DropIcon,
  moon: MoonIcon,
  steps: StepsIcon,
};

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function HealthMetricRowCard({ row }: { row: HealthMetricRow }) {
  const router = useRouter();
  const Icon = ICONS[row.icon];

  return (
    <Pressable
      onPress={() => router.push(row.route)}
      className="rounded-[20px] bg-surface p-4"
      style={{ boxShadow: CARD_SHADOW }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View
            className="h-8 w-8 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: row.soft }}
          >
            <Icon size={16} color={row.color} />
          </View>
          <View>
            <Text
              className="font-geist-medium text-[10px] uppercase tracking-[0.6px]"
              style={{ color: row.color }}
            >
              {row.label}
            </Text>
            <Text className="mt-0.5 font-geist-medium text-[13px] text-ink">
              {row.subtitle}
            </Text>
          </View>
        </View>
        <ChevronIcon size={14} color={colors.ink3} />
      </View>

      {/* Body */}
      <View className="mt-3.5 flex-row items-end justify-between">
        <View>
          <Text className="font-geist-regular text-[44px] leading-none text-ink">
            {row.value}
            {row.unit && <Text className="text-[14px] text-ink-3"> {row.unit}</Text>}
          </Text>
          <Text className="mt-1 text-[13px] text-ink-3">{row.detail}</Text>
        </View>

        {row.spark && (
          <YSpark points={row.spark} color={row.color} w={120} h={44} fill />
        )}
        {row.ring !== undefined && (
          <YRing pct={row.ring} size={56} stroke={6} color={row.color} />
        )}
      </View>

      {row.progress !== undefined && (
        <View className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
          <View
            className="h-full rounded-full"
            style={{ width: `${row.progress * 100}%`, backgroundColor: row.color }}
          />
        </View>
      )}
    </Pressable>
  );
}
