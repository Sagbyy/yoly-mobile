import { routes } from "@/shared/config/routes";
import { colors } from "@/shared/config/tokens";
import { PhoneIcon } from "@/shared/ui/icons";
import { Body, Micro, Title } from "@/shared/ui";
import { Text } from "@/shared/ui/primitives/text";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { callHistory, callHistoryMeta } from "../model/data";
import type { CallDirection, CallEntry } from "../model/data";

const DIRECTION: Record<CallDirection, { label: string; color: string; soft: string }> = {
  outgoing: { label: "Appel sortant", color: colors.accent, soft: colors.accentSoft },
  incoming: { label: "Appel entrant", color: colors.health, soft: colors.healthSoft },
  missed: { label: "Appel manqué", color: colors.alert, soft: colors.alertSoft },
};

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

function CallRow({ entry }: { entry: CallEntry }) {
  const router = useRouter();
  const meta = DIRECTION[entry.direction];

  return (
    <View
      className="flex-row items-center gap-3 rounded-[18px] bg-surface p-3.5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: meta.soft }}
      >
        <PhoneIcon size={18} color={meta.color} />
      </View>
      <View className="flex-1">
        <Text
          className="font-geist-medium text-[14px]"
          style={{ color: entry.direction === "missed" ? colors.alert : colors.ink }}
        >
          {meta.label}
        </Text>
        <Text className="mt-0.5 text-[13px] text-ink-3">
          {entry.time}
          {entry.duration ? ` · ${entry.duration}` : ""}
        </Text>
      </View>
      <Pressable
        onPress={() => router.push(routes.audio.call)}
        hitSlop={6}
        className="h-9 w-9 items-center justify-center rounded-full bg-ink"
      >
        <PhoneIcon size={16} color="#fff" />
      </Pressable>
    </View>
  );
}

export function CallHistory() {
  return (
    <View className="px-5 pt-1">
      <Title className="text-ink">{callHistoryMeta.subtitle}</Title>
      <Body className="mt-1.5 text-ink-2">{callHistoryMeta.summary}</Body>

      {callHistory.map((section) => (
        <View key={section.title} className="mt-5">
          <Micro className="mb-2.5">{section.title}</Micro>
          <View className="gap-2">
            {section.items.map((entry) => (
              <CallRow key={entry.id} entry={entry} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
