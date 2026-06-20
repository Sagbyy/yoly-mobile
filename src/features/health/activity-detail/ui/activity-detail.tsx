import { colors } from "@/shared/config/tokens";
import { YRing, YStepsChart } from "@/shared/ui/charts";
import { Body, Display, H2, Micro } from "@/shared/ui";
import { Text } from "@/shared/ui/primitives/text";
import { View } from "react-native";

import { activityDetail } from "../model/data";

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function ActivityDetail() {
  return (
    <View className="px-5 pt-1">
      {/* Hero */}
      <View
        className="rounded-[20px] bg-surface p-[22px]"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Micro style={{ color: colors.health }}>{"PAS · AUJOURD'HUI"}</Micro>
            <Display className="mt-2 text-ink" style={{ fontSize: 56, lineHeight: 58 }}>
              {activityDetail.steps}
            </Display>
            <Body className="mt-1 text-ink-2">{activityDetail.goalNote}</Body>
          </View>
          <YRing
            pct={activityDetail.ringPct}
            size={110}
            color={colors.health}
            label={`${activityDetail.ringPct}%`}
            sub="objectif"
          />
        </View>
        <View className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-3">
          <View
            className="h-full rounded-full"
            style={{ width: `${activityDetail.ringPct}%`, backgroundColor: colors.health }}
          />
        </View>
      </View>

      {/* Week chart */}
      <View
        className="mt-4 rounded-[20px] bg-surface p-[18px]"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <View className="mb-3 flex-row items-center justify-between">
          <H2 className="text-ink">Cette semaine</H2>
          <Text className="text-[13px] text-ink-3">{activityDetail.weekAvg}</Text>
        </View>
        <YStepsChart
          data={activityDetail.week}
          days={activityDetail.weekDays}
          goal={activityDetail.weekGoal}
          max={activityDetail.weekMax}
          w={300}
          h={120}
        />
      </View>

      {/* Stats grid */}
      <View className="mt-4 flex-row flex-wrap justify-between">
        {activityDetail.stats.map((stat) => (
          <View
            key={stat.label}
            className="mb-3 w-[48%] rounded-[20px] bg-surface p-4"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <Micro>{stat.label}</Micro>
            <Text className="mt-2 font-geist-medium text-[28px] leading-none text-ink">
              {stat.value}
              {stat.unit && <Text className="text-[14px] text-ink-3"> {stat.unit}</Text>}
            </Text>
            <Text className="mt-1 text-[13px] text-ink-3">{stat.note}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
