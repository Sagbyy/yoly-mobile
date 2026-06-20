import { colors } from "@/shared/config/tokens";
import { YRing } from "@/shared/ui/charts";
import { Body, Caption, Display, Micro, Title } from "@/shared/ui";
import { YPill, YSegmented, type SegmentOption } from "@/shared/ui/yoly";
import { useState } from "react";
import { View } from "react-native";

import { healthOverview } from "../model/data";
import { HealthMetricRowCard } from "./health-metric-row";

type Period = "day" | "week" | "month";

const PERIODS: SegmentOption<Period>[] = [
  { value: "day", label: "J" },
  { value: "week", label: "S" },
  { value: "month", label: "M" },
];

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function HealthOverview() {
  const [period, setPeriod] = useState<Period>("day");

  return (
    <View className="px-5 pt-1">
      {/* Title + period */}
      <View className="flex-row items-center justify-between">
        <View>
          <Caption className="text-ink-3">{healthOverview.caption}</Caption>
          <Title className="text-ink">{healthOverview.headline}</Title>
        </View>
        <YSegmented options={PERIODS} value={period} onChange={setPeriod} />
      </View>

      {/* Score hero */}
      <View
        className="mt-4 flex-row items-center justify-between rounded-[20px] bg-surface p-[22px]"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <View className="flex-1 pr-3">
          <Micro>SCORE DU JOUR</Micro>
          <View className="mt-1.5 flex-row items-center gap-2.5">
            <Display className="text-ink" style={{ fontSize: 48, lineHeight: 50 }}>
              {healthOverview.score}
            </Display>
            <YPill
              label={healthOverview.scoreDelta}
              dotColor={colors.health}
              className="bg-health-soft"
              textClassName="text-health"
            />
          </View>
          <Body className="mt-2 text-ink-2">{healthOverview.scoreNote}</Body>
        </View>
        <YRing pct={healthOverview.score} size={108} color={colors.health} />
      </View>

      {/* Metric rows */}
      <View className="mt-4 gap-3">
        {healthOverview.rows.map((row) => (
          <HealthMetricRowCard key={row.id} row={row} />
        ))}
      </View>
    </View>
  );
}
