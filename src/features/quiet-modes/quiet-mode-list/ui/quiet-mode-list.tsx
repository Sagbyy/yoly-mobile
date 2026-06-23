import { colors } from "@/shared/config/tokens";
import { Body, Micro, Title } from "@/shared/ui";
import {
  AudioIcon,
  MoonIcon,
  ShieldIcon,
  StepsIcon,
  type IconProps,
} from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YPill, YSwitch } from "@/shared/ui/yoly";
import type { ComponentType } from "react";
import { useState } from "react";
import { View } from "react-native";
import { Circle, Defs, RadialGradient, Stop, Svg } from "react-native-svg";

import { activeQuietMode, quietModes } from "../model/data";
import type { QuietModeIcon } from "../model/types";

const ICONS: Record<QuietModeIcon, ComponentType<IconProps>> = {
  moon: MoonIcon,
  steps: StepsIcon,
  audio: AudioIcon,
  shield: ShieldIcon,
};

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function QuietModeList() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(quietModes.map((m) => [m.id, m.enabled])),
  );

  return (
    <View className="px-5 pt-1">
      <Title className="text-ink">Quand la montre doit rester calme</Title>
      <Body className="mt-2 text-ink-2">
        Planifiez des plages calmes, le temps d&apos;école et les séances de sport.
      </Body>

      <View className="mt-[22px] overflow-hidden rounded-[22px] bg-ink p-[18px]">
        <Svg width={180} height={180} style={{ position: "absolute", top: -40, right: -40 }}>
          <Defs>
            <RadialGradient id="dnd-glow" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colors.sleep} stopOpacity={0.4} />
              <Stop offset="0.7" stopColor={colors.sleep} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={90} cy={90} r={90} fill="url(#dnd-glow)" />
        </Svg>

        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <YPill
              label="Actif maintenant"
              dotColor={colors.liveDot}
              className="self-start bg-white/10"
              textClassName="text-white"
            />
            <Text className="mt-3 font-geist-medium text-[26px] tracking-[-0.3px] text-white">
              {activeQuietMode.name}
            </Text>
            <Text className="mt-1 text-[15px] text-white/70">
              {activeQuietMode.summary}
            </Text>
          </View>
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <MoonIcon size={28} color="#fff" />
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between border-t border-white/10 pt-3.5">
          <Text className="font-geist-mono text-[12px] text-white/70">
            {activeQuietMode.time}
          </Text>
          <Text className="font-geist-mono text-[12px] text-white/50">
            {activeQuietMode.days}
          </Text>
        </View>
      </View>

      <Micro className="mb-2.5 mt-6">Modes</Micro>
      <View className="gap-3">
        {quietModes.map((mode) => {
          const Icon = ICONS[mode.icon];
          return (
            <View
              key={mode.id}
              className="flex-row items-center gap-3 rounded-[20px] bg-surface p-3.5"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <View
                className="h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: mode.color }}
              >
                <Icon size={20} color="#fff" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="font-geist-medium text-[14px] text-ink">
                    {mode.name}
                  </Text>
                  <YSwitch
                    value={enabled[mode.id]}
                    onValueChange={(v) =>
                      setEnabled((prev) => ({ ...prev, [mode.id]: v }))
                    }
                  />
                </View>
                <Text className="mt-0.5 text-[13px] text-ink-3">
                  {mode.schedule} · {mode.time}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
