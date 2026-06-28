import type { HealthPeriod } from "@/shared/api/health";
import { colors } from "@/shared/config/tokens";
import { YRing, YStressChart } from "@/shared/ui/charts";
import { Body, Display, H2, Micro } from "@/shared/ui";
import { DropIcon, ShieldIcon, type IconProps } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import {
  YErrorState,
  YLoadingState,
  YPill,
  YSegmented,
  type SegmentOption,
} from "@/shared/ui/yoly";
import type { ComponentType } from "react";
import { useState } from "react";
import { View } from "react-native";

import type { StressInsightIcon } from "../model/map";
import { useStress } from "../model/use-stress";

const INSIGHT_ICONS: Record<StressInsightIcon, ComponentType<IconProps>> = {
  drop: DropIcon,
  shield: ShieldIcon,
};

const PERIODS: SegmentOption<HealthPeriod>[] = [
  { value: "day", label: "J" },
  { value: "week", label: "S" },
  { value: "month", label: "M" },
];

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function StressDetail() {
  const [period, setPeriod] = useState<HealthPeriod>("day");
  const { data, isPending, isError, refetch } = useStress(period);

  return (
    <View className="px-5 pt-1">
      <View className="mb-3 flex-row justify-end">
        <YSegmented options={PERIODS} value={period} onChange={setPeriod} />
      </View>

      {isPending ? (
        <YLoadingState />
      ) : isError || !data ? (
        <YErrorState onRetry={() => refetch()} />
      ) : (
        <>
          <View
            className="flex-row items-center justify-between rounded-[20px] bg-surface p-[22px]"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <View className="flex-1 pr-3">
              <Micro style={{ color: colors.stress }}>NIVEAU DE STRESS</Micro>
              <Display className="mt-1.5 text-ink" style={{ fontSize: 48, lineHeight: 50 }}>
                {data.level}
              </Display>
              <YPill
                label={data.levelLabel}
                dotColor={data.levelColor}
                className="mt-1.5 self-start"
                textClassName="text-ink-2"
              />
              <Body className="mt-3 text-ink-2">{data.note}</Body>
            </View>
            <View style={{ width: 110, height: 110 }}>
              <YRing pct={data.level} size={110} color={colors.stress} />
              <View
                style={{ position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}
              >
                <Text className="font-geist-medium text-[28px] leading-none text-ink">
                  {data.levelWord}
                </Text>
                <Micro className="mt-1.5 text-ink-3">{data.level} / 100</Micro>
              </View>
            </View>
          </View>

          <View
            className="mt-4 rounded-[20px] bg-surface p-[18px]"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <View className="mb-3.5 flex-row items-center justify-between">
              <H2 className="text-ink">Courbe</H2>
            </View>
            <YStressChart data={data.curve} ticks={data.curveTicks} w={300} h={130} />
            <View className="mt-3 flex-row justify-center gap-3.5">
              {data.legend.map((item) => (
                <View key={item.label} className="flex-row items-center gap-1.5">
                  <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: item.color }} />
                  <Text className="text-[13px] text-ink-2">{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <H2 className="mb-2.5 mt-[22px] text-ink">Analyses</H2>
          <View className="gap-3">
            {data.insights.map((insight, index) => {
              const Icon = INSIGHT_ICONS[insight.icon];
              return (
                <View
                  key={`${insight.title}-${index}`}
                  className="flex-row gap-3 rounded-[18px] bg-surface-2 p-3.5"
                >
                  <View
                    className="h-[38px] w-[38px] items-center justify-center rounded-[10px]"
                    style={{ backgroundColor: insight.color }}
                  >
                    <Icon size={18} color="#fff" />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-geist-medium text-[14px] text-ink">
                        {insight.title}
                      </Text>
                      {insight.meta && (
                        <Text className="text-[13px] text-ink-3">{insight.meta}</Text>
                      )}
                    </View>
                    <Text className="mt-1 text-[13px] text-ink-2">{insight.text}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}
