import { colors } from "@/shared/config/tokens";
import { Micro, Title } from "@/shared/ui";
import { ChevronIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YPill, YSegmented, type SegmentOption } from "@/shared/ui/yoly";
import { useMemo, useState } from "react";
import { View } from "react-native";

import { routeSummary, routeTrips } from "../model/data";
import { RouteThumb } from "./route-thumb";

type Period = "day" | "week" | "month";

const PERIODS: SegmentOption<Period>[] = [
  { value: "day", label: "Jour" },
  { value: "week", label: "Semaine" },
  { value: "month", label: "Mois" },
];

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function RouteHistory() {
  const [period, setPeriod] = useState<Period>("week");

  const maxBar = useMemo(() => Math.max(...routeSummary.weekBars), []);

  return (
    <View className="px-5 pt-1">
      <View className="mb-3.5 flex-row items-center justify-between">
        <Title className="text-ink">Cette semaine</Title>
        <YSegmented options={PERIODS} value={period} onChange={setPeriod} />
      </View>

      <View
        className="rounded-[20px] bg-surface p-[18px]"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <View className="flex-row">
          {routeSummary.stats.map((s) => (
            <View key={s.label} className="flex-1">
              <Micro>{s.label}</Micro>
              <Text className="mt-1.5 font-geist-medium text-[28px] leading-none text-ink">
                {s.value}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-[18px] h-[60px] flex-row items-end gap-2">
          {routeSummary.weekBars.map((h, i) => (
            <View key={i} className="flex-1 items-center gap-1.5">
              <View
                style={{
                  height: (h / maxBar) * 54,
                  width: "100%",
                  borderRadius: 6,
                  backgroundColor:
                    i === routeSummary.weekHighlight ? colors.ink : colors.surface3,
                }}
              />
              <Text className="font-geist-medium text-[10px] text-ink-3">
                {routeSummary.weekLabels[i]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Micro className="mb-2.5 mt-[18px]">Trajets récents</Micro>
      <View className="gap-3">
        {routeTrips.map((trip) => (
          <View
            key={trip.id}
            className="flex-row gap-3 rounded-[20px] bg-surface p-3.5"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <RouteThumb color={trip.color} />
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-geist-medium text-[14px] text-ink">{trip.title}</Text>
                <ChevronIcon size={14} color={colors.ink3} />
              </View>
              <Text className="mt-0.5 text-[13px] text-ink-3">
                {trip.date} · {trip.time}
              </Text>
              <View className="mt-2 flex-row gap-1.5">
                <YPill label={trip.duration} />
                <YPill label="Sûr" className="bg-health-soft" textClassName="text-health" />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
