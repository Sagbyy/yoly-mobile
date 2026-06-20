import { colors } from "@/shared/config/tokens";
import { YHeartRateGraph } from "@/shared/ui/charts";
import { Display, H2 } from "@/shared/ui";
import { ArrowDownIcon, ChevronIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YSegmented, type SegmentOption } from "@/shared/ui/yoly";
import { useState } from "react";
import { View } from "react-native";
import { Circle, Defs, RadialGradient, Stop, Svg } from "react-native-svg";

import { heartRateDetail } from "../model/data";

type Window = "day" | "24h" | "week";

const WINDOWS: SegmentOption<Window>[] = [
  { value: "day", label: "J" },
  { value: "24h", label: "24h" },
  { value: "week", label: "S" },
];

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function HeartRateDetail() {
  const [window, setWindow] = useState<Window>("24h");

  return (
    <View className="px-5 pt-1">
      {/* Hero */}
      <View className="overflow-hidden rounded-[20px] bg-ink p-[22px]">
        <Svg width={160} height={160} style={{ position: "absolute", top: -30, right: -30 }}>
          <Defs>
            <RadialGradient id="hr-glow" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colors.heart} stopOpacity={0.35} />
              <Stop offset="0.7" stopColor={colors.heart} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={80} cy={80} r={80} fill="url(#hr-glow)" />
        </Svg>

        <Text className="text-[10px] uppercase tracking-[0.6px] text-white/60">
          FRÉQUENCE AU REPOS
        </Text>
        <View className="mt-2 flex-row items-center gap-3.5">
          <Display className="text-white" style={{ fontSize: 56, lineHeight: 58 }}>
            {heartRateDetail.resting}
          </Display>
          <View>
            <Text className="font-geist-medium text-[14px] text-white">bpm</Text>
            <Text className="text-[13px] text-white/60">{heartRateDetail.ageNote}</Text>
          </View>
        </View>
        <View className="mt-3.5 flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <ArrowDownIcon size={10} color={colors.liveDot} />
            <Text className="font-geist-medium text-[12px] text-white">
              {heartRateDetail.deltaText}
            </Text>
          </View>
          <View style={{ width: 1, height: 12, backgroundColor: "rgba(255,255,255,0.2)" }} />
          <Text className="text-[13px] text-white/70">{heartRateDetail.rangeText}</Text>
        </View>
      </View>

      {/* Graph */}
      <View
        className="mt-4 rounded-[20px] bg-surface p-[18px]"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <View className="mb-3 flex-row items-center justify-between">
          <H2 className="text-ink">Dernières 24 heures</H2>
          <YSegmented options={WINDOWS} value={window} onChange={setWindow} />
        </View>
        <YHeartRateGraph
          data={heartRateDetail.graph}
          min={heartRateDetail.graphMin}
          max={heartRateDetail.graphMax}
          w={300}
          h={140}
        />
        <View className="mt-3 flex-row justify-between">
          {heartRateDetail.timeTicks.map((t) => (
            <Text key={t} className="font-geist-mono text-[10px] text-ink-3">
              {t}
            </Text>
          ))}
        </View>
      </View>

      {/* Detections */}
      <H2 className="mb-2.5 mt-[22px] text-ink">Détections</H2>
      <View className="gap-2">
        {heartRateDetail.detections.map((d) => (
          <View key={d.time} className="flex-row items-center gap-3 rounded-[18px] bg-surface-2 p-3.5">
            <Text className="w-[42px] font-geist-mono text-[12px] text-ink-3">{d.time}</Text>
            <View style={{ width: 8, height: 40, borderRadius: 4, backgroundColor: d.color }} />
            <View className="flex-1">
              <Text className="font-geist-medium text-[14px] text-ink">{d.title}</Text>
              <Text className="text-[13px] text-ink-3">{d.detail}</Text>
            </View>
            <ChevronIcon size={14} color={colors.ink3} />
          </View>
        ))}
      </View>
    </View>
  );
}
