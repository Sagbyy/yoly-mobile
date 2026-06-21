import { colors } from "@/shared/config/tokens";
import { Body, Title } from "@/shared/ui";
import { PlusIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YPill, YSwitch } from "@/shared/ui/yoly";
import { useState } from "react";
import { Pressable, View } from "react-native";

import { savedZones } from "../model/data";
import { ZoneThumb } from "./zone-thumb";

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function SavedZones() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(savedZones.map((z) => [z.id, z.enabled])),
  );

  return (
    <View className="px-5 pt-2">
      <Title className="text-ink">Lieux qui comptent</Title>
      <Body className="mt-2 text-ink-2">
        Soyez prévenu quand Maya arrive ou quitte un lieu.
      </Body>

      <View className="mt-6 gap-3">
        {savedZones.map((zone) => {
          const on = enabled[zone.id];
          return (
            <View
              key={zone.id}
              className="flex-row items-center gap-3.5 rounded-[20px] bg-surface p-3.5"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <ZoneThumb color={zone.color} emoji={zone.emoji} />
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="font-geist-medium text-[15px] text-ink">{zone.name}</Text>
                  <YSwitch
                    value={on}
                    onValueChange={(v) => setEnabled((prev) => ({ ...prev, [zone.id]: v }))}
                  />
                </View>
                <Text className="mt-0.5 text-[13px] text-ink-3">{zone.address}</Text>
                <View className="mt-1.5 flex-row gap-1.5">
                  <YPill label={zone.schedule} />
                  <YPill label={on ? "Entrée & sortie" : "Désactivé"} />
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <Pressable
        className="mt-[18px] h-[52px] flex-row items-center justify-center gap-2 rounded-full"
        style={{ borderWidth: 1, borderColor: colors.ink4 }}
      >
        <PlusIcon size={16} color={colors.ink} />
        <Text className="font-geist-medium text-[16px] text-ink">Ajouter une zone</Text>
      </Pressable>
    </View>
  );
}
