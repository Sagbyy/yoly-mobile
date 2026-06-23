import { colors } from "@/shared/config/tokens";
import { Display, H2, Micro } from "@/shared/ui";
import { Text } from "@/shared/ui/primitives/text";
import { YSwitch } from "@/shared/ui/yoly";
import { useState } from "react";
import { Pressable, View } from "react-native";

import { quietModeDefaults } from "../model/data";

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function QuietModeCreate() {
  const [days, setDays] = useState<number[]>(quietModeDefaults.selectedDays);
  const [rules, setRules] = useState(quietModeDefaults.rules);

  const toggleDay = (i: number) =>
    setDays((prev) => (prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]));

  const toggleRule = (id: string) =>
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );

  return (
    <View className="px-5 pt-1">
      <View className="rounded-2xl bg-surface-2 p-3.5">
        <Micro>NOM</Micro>
        <Text className="mt-1.5 font-geist-medium text-[20px] text-ink">
          {quietModeDefaults.name}
        </Text>
      </View>

      <H2 className="mb-2.5 mt-6 text-ink">Jours</H2>
      <View className="flex-row justify-between">
        {quietModeDefaults.dayLabels.map((label, i) => {
          const on = days.includes(i);
          return (
            <Pressable
              key={i}
              onPress={() => toggleDay(i)}
              className="h-11 w-[38px] items-center justify-center rounded-[14px]"
              style={{ backgroundColor: on ? colors.ink : colors.surface }}
            >
              <Text
                className="font-geist-medium text-[14px]"
                style={{ color: on ? "#fff" : colors.ink3 }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <H2 className="mb-2.5 mt-6 text-ink">Plage horaire</H2>
      <View className="rounded-[18px] bg-surface-2 p-[18px]">
        <View className="flex-row items-center justify-between">
          <View>
            <Micro>DE</Micro>
            <Display className="mt-1 text-ink" style={{ fontSize: 36, lineHeight: 38 }}>
              {quietModeDefaults.timeFrom}
            </Display>
          </View>
          <View style={{ width: 24, height: 1, backgroundColor: colors.ink4 }} />
          <View className="items-end">
            <Micro>À</Micro>
            <Display className="mt-1 text-ink" style={{ fontSize: 36, lineHeight: 38 }}>
              {quietModeDefaults.timeTo}
            </Display>
          </View>
        </View>

        <View className="mt-[18px] h-7 justify-center">
          <View className="h-1 rounded-full bg-surface-3" />
          <View
            style={{
              position: "absolute",
              left: "35%",
              right: "38%",
              height: 4,
              borderRadius: 999,
              backgroundColor: colors.ink,
            }}
          />
          {(["35%", "62%"] as const).map((left) => (
            <View
              key={left}
              style={{
                position: "absolute",
                left,
                marginLeft: -9,
                top: 5,
                width: 18,
                height: 18,
                borderRadius: 999,
                backgroundColor: "#fff",
                borderWidth: 3,
                borderColor: colors.ink,
              }}
            />
          ))}
        </View>
        <View className="mt-1.5 flex-row justify-between">
          <Text className="font-geist-mono text-[10px] text-ink-3">00:00</Text>
          <Text className="font-geist-mono text-[10px] text-ink-3">12:00</Text>
          <Text className="font-geist-mono text-[10px] text-ink-3">24:00</Text>
        </View>
      </View>

      <H2 className="mb-2.5 mt-6 text-ink">Règles</H2>
      <View className="rounded-[20px] bg-surface p-1" style={{ boxShadow: CARD_SHADOW }}>
        {rules.map((rule, i) => (
          <View
            key={rule.id}
            className="flex-row items-center px-3.5 py-3"
            style={
              i < rules.length - 1
                ? { borderBottomWidth: 1, borderBottomColor: colors.surface3 }
                : undefined
            }
          >
            <Text className="flex-1 font-geist-medium text-[14px] text-ink">
              {rule.label}
            </Text>
            <YSwitch value={rule.enabled} onValueChange={() => toggleRule(rule.id)} />
          </View>
        ))}
      </View>
    </View>
  );
}
