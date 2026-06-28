import { DropIcon, MoonIcon, PulseIcon, StepsIcon, type IconProps } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YErrorState, YLoadingState, YSpark } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import type { ComponentType } from "react";
import { Pressable, View } from "react-native";

import { useHealthMetrics } from "../model/use-health-metrics";
import type { HealthMetric, MetricIcon } from "../model/types";

const ICONS: Record<MetricIcon, ComponentType<IconProps>> = {
  pulse: PulseIcon,
  steps: StepsIcon,
  moon: MoonIcon,
  drop: DropIcon,
};

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

function MetricCard({ metric }: { metric: HealthMetric }) {
  const router = useRouter();
  const Icon = ICONS[metric.icon];

  return (
    <Pressable
      onPress={() => router.push(metric.route)}
      className="mb-3 w-[48%] rounded-[20px] bg-surface p-4"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="font-geist-medium text-[10px] uppercase tracking-[0.6px]"
          style={{ color: metric.color }}
        >
          {metric.label}
        </Text>
        <Icon size={16} color={metric.color} />
      </View>

      {metric.spark ? (
        <View className="mt-2 flex-row items-end justify-between">
          <View>
            <Text className="font-geist-medium text-[28px] leading-none text-ink">
              {metric.value}
            </Text>
            {metric.caption && (
              <Text className="mt-1 text-[13px] text-ink-3">{metric.caption}</Text>
            )}
          </View>
          <YSpark points={metric.spark} color={metric.color} w={70} h={32} fill />
        </View>
      ) : (
        <View className="mt-2">
          <Text className="font-geist-medium text-[28px] leading-none text-ink">
            {metric.value}
          </Text>
          {metric.caption && (
            <Text className="mt-1 text-[13px] text-ink-3">{metric.caption}</Text>
          )}
        </View>
      )}

      {metric.progress !== undefined && (
        <View className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
          <View
            className="h-full rounded-full"
            style={{ width: `${metric.progress * 100}%`, backgroundColor: metric.color }}
          />
        </View>
      )}
    </Pressable>
  );
}

export function HealthMetricsGrid() {
  const { data, isPending, isError, refetch } = useHealthMetrics();

  if (isPending) return <YLoadingState />;
  if (isError || !data) return <YErrorState onRetry={() => refetch()} />;

  return (
    <View className="flex-row flex-wrap justify-between">
      {data.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </View>
  );
}
