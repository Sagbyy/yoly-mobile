import type { HealthPeriod } from "@/shared/api/health";
import { colors } from "@/shared/config/tokens";
import { YRing, YSleepStages } from "@/shared/ui/charts";
import { H2, Micro } from "@/shared/ui";
import { MoonIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import {
  YErrorState,
  YLoadingState,
  YSegmented,
  type SegmentOption,
} from "@/shared/ui/yoly";
import { useState } from "react";
import { View } from "react-native";
import { Circle, Defs, RadialGradient, Stop, Svg } from "react-native-svg";

import { useSleep } from "../model/use-sleep";

const PERIODS: SegmentOption<HealthPeriod>[] = [
  { value: "day", label: "J" },
  { value: "week", label: "S" },
  { value: "month", label: "M" },
];

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function SleepDetail() {
  const [period, setPeriod] = useState<HealthPeriod>("day");
  const { data, isPending, isError, refetch } = useSleep(period);

  const maxNight = data?.recentNights.length
    ? Math.max(...data.recentNights.map((night) => night.score))
    : 0;

  return (
    <View className="px-5 pt-1">
      <View className="mb-3 flex-row justify-end">
        <YSegmented options={PERIODS} value={period} onChange={setPeriod} />
      </View>

      {isPending ? (
        <YLoadingState />
      ) : isError || !data ? (
        <YErrorState onRetry={() => refetch()} />
      ) : !data.hasData ? (
        <YErrorState label="Aucune donnée de sommeil pour cette période." />
      ) : (
        <>
          <View className="overflow-hidden rounded-[28px] bg-navy p-6">
            <Svg width={240} height={240} style={{ position: "absolute", top: -60, right: -40 }}>
              <Defs>
                <RadialGradient id="sleep-glow" cx="50%" cy="50%" r="50%">
                  <Stop offset="0" stopColor={colors.sleep} stopOpacity={0.4} />
                  <Stop offset="0.65" stopColor={colors.sleep} stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Circle cx={120} cy={120} r={120} fill="url(#sleep-glow)" />
            </Svg>

            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-[10px] uppercase tracking-[0.6px] text-white/60">
                  SCORE DE SOMMEIL
                </Text>
                <Text className="mt-2 font-geist-regular text-[56px] leading-[58px] text-white">
                  {data.score}
                </Text>
                <Text className="mt-1 text-[15px] text-white/75">{data.scoreLabel}</Text>
              </View>
              <YRing
                pct={data.score}
                size={110}
                stroke={8}
                color="#A4B3DC"
                track="rgba(255,255,255,0.10)"
                label={data.duration}
                sub="heures"
              />
            </View>

            <View className="my-4 h-px bg-white/10" />

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2.5">
                <MoonIcon size={16} color="#fff" />
                <Text className="font-geist-medium text-[13px] text-white/85">
                  Endormie {data.asleepRange}
                </Text>
              </View>
              <View className="h-6 items-center justify-center rounded-full bg-white/10 px-2.5">
                <Text className="font-geist-medium text-[11px] text-white">
                  {data.awakenings}
                </Text>
              </View>
            </View>
          </View>

          <View
            className="mt-4 rounded-[20px] bg-surface p-[18px]"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <View className="mb-2.5 flex-row items-center justify-between">
              <H2 className="text-ink">Stades</H2>
              <Text className="text-[13px] text-ink-3">{data.asleepRange}</Text>
            </View>
            <YSleepStages segments={data.segments} ticks={data.stageTicks} w={300} h={110} />
            <View className="mt-4 flex-row flex-wrap justify-between">
              {data.breakdown.map((stage) => (
                <View
                  key={stage.label}
                  className="w-[48%] flex-row items-center justify-between border-b border-bg-soft py-2"
                >
                  <View className="flex-row items-center gap-2">
                    <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: stage.color }} />
                    <Text className="font-geist-medium text-[13px] text-ink">{stage.label}</Text>
                  </View>
                  <Text className="font-geist-mono text-[13px] text-ink">{stage.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {data.recentNights.length > 0 && (
            <>
              <H2 className="mb-2.5 mt-[22px] text-ink">Nuits récentes</H2>
              <View
                className="rounded-[20px] bg-surface p-[18px]"
                style={{ boxShadow: CARD_SHADOW }}
              >
                <View className="h-[110px] flex-row items-end gap-2.5">
                  {data.recentNights.map((night, index) => {
                    const isLast = index === data.recentNights.length - 1;
                    return (
                      <View key={`${night.day}-${index}`} className="flex-1 items-center gap-2">
                        <Text className="font-geist-mono text-[10px] text-ink-3">{night.score}</Text>
                        <View
                          style={{
                            width: "100%",
                            height: (night.score / (maxNight || 1)) * 78,
                            borderRadius: 8,
                            backgroundColor: isLast ? colors.sleep : colors.surface3,
                          }}
                        />
                        <Micro className="text-ink-3">{night.day}</Micro>
                      </View>
                    );
                  })}
                </View>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
}
