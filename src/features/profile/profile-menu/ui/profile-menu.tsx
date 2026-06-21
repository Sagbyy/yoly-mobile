import { colors } from "@/shared/config/tokens";
import { ChevronIcon, MoonIcon, type IconProps } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { useRouter } from "expo-router";
import type { ComponentType } from "react";
import { Pressable, View } from "react-native";

import { profileMenu } from "../model/data";
import type { ProfileMenuIcon } from "../model/data";

const ICONS: Record<ProfileMenuIcon, ComponentType<IconProps>> = {
  moon: MoonIcon,
};

const CARD_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function ProfileMenu() {
  const router = useRouter();

  return (
    <View className="gap-3">
      {profileMenu.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <Pressable
            key={item.id}
            onPress={() => router.push(item.route)}
            className="flex-row items-center gap-3 rounded-[20px] bg-surface p-3.5"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-surface-3">
              <Icon size={20} color={colors.ink} />
            </View>
            <View className="flex-1">
              <Text className="font-geist-medium text-[14px] text-ink">{item.label}</Text>
              <Text className="mt-0.5 text-[13px] text-ink-3">{item.hint}</Text>
            </View>
            <ChevronIcon size={14} color={colors.ink3} />
          </Pressable>
        );
      })}
    </View>
  );
}
