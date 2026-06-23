import { routes } from "@/shared/config/routes";
import { colors } from "@/shared/config/tokens";
import { YWaveform } from "@/shared/ui/audio";
import { PhoneIcon, PlayIcon, SearchIcon } from "@/shared/ui/icons";
import { Body, Micro, Title } from "@/shared/ui";
import { Text } from "@/shared/ui/primitives/text";
import { YPill } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { recordingSections, recordingsMeta } from "../model/data";
import type { Recording } from "../model/data";

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

function RecordingRow({ recording }: { recording: Recording }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: routes.audio.player, params: { id: recording.id } })
      }
      className="flex-row items-center gap-3 rounded-[18px] bg-surface p-3.5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <View className="h-11 w-11 items-center justify-center rounded-full bg-surface-3">
        <PlayIcon size={18} color={colors.ink} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-geist-medium text-[14px] text-ink">{recording.place}</Text>
          <Text className="font-geist-mono text-[12px] text-ink-3">{recording.time}</Text>
        </View>
        <View className="mt-2">
          <YWaveform w={220} h={26} bars={50} color={recording.color} playedPct={100} />
        </View>
        <View className="mt-1.5 flex-row items-center justify-between">
          <Text className="text-[13px] text-ink-3">{recording.duration}</Text>
          <YPill label={recording.tag} className="h-[18px] px-2" />
        </View>
      </View>
    </Pressable>
  );
}

export function RecordingsList() {
  const router = useRouter();

  return (
    <View className="px-5 pt-1">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Title className="text-ink">{recordingsMeta.subtitle}</Title>
          <Body className="mt-1.5 text-ink-2">{recordingsMeta.summary}</Body>
        </View>
        <Pressable onPress={() => router.push(routes.audio.callHistory)} hitSlop={6}>
          <Text className="mt-1.5 text-[13px] text-accent">Historique</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => router.push(routes.audio.call)}
        className="mt-4 h-[52px] flex-row items-center justify-center gap-2 rounded-full bg-ink"
      >
        <PhoneIcon size={18} color="#fff" />
        <Text className="font-geist-medium text-[16px] text-white">Appeler la montre</Text>
      </Pressable>

      <View
        className="mt-3 flex-row items-center gap-2 rounded-[14px] bg-surface px-3.5 py-2.5"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <SearchIcon size={18} color={colors.ink3} />
        <Text className="text-[15px] text-ink-3">Rechercher un enregistrement ou lieu</Text>
      </View>

      {recordingSections.map((section) => (
        <View key={section.title} className="mt-5">
          <Micro className="mb-2.5">{section.title}</Micro>
          <View className="gap-2">
            {section.items.map((rec) => (
              <RecordingRow key={rec.id} recording={rec} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
