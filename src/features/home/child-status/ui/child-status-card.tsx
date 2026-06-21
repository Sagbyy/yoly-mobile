import { colors } from "@/shared/config/tokens";
import { routes } from "@/shared/config/routes";
import { MicIcon, MoonIcon, PhoneIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YAvatar, YPill } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Circle, Defs, RadialGradient, Stop, Svg } from "react-native-svg";

import type { ChildStatus } from "../model/types";

interface ChildStatusCardProps {
  child: ChildStatus;
}

function DarkIconButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      className="h-[38px] w-[38px] items-center justify-center rounded-full bg-white/10"
    >
      {children}
    </Pressable>
  );
}

export function ChildStatusCard({ child }: ChildStatusCardProps) {
  const router = useRouter();

  return (
    <View className="overflow-hidden rounded-[28px] bg-ink p-5">
      {/* Accent glow */}
      <Svg width={200} height={200} style={{ position: "absolute", top: -40, right: -50 }}>
        <Defs>
          <RadialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.accent} stopOpacity={0.35} />
            <Stop offset="0.7" stopColor={colors.accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={100} cy={100} r={100} fill="url(#hero-glow)" />
      </Svg>

      {/* Identity row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <YAvatar initials={child.avatarInitials} size={44} tone={child.avatarTone} />
          <View>
            <Text className="font-geist-medium text-[15px] text-white">
              {child.name} · {child.age}
            </Text>
            <Text className="text-[13px] text-white/55">
              à {child.location} · {child.distance}
            </Text>
          </View>
        </View>
        {child.isLive && (
          <YPill
            label="En direct"
            dotColor={colors.liveDot}
            className="bg-white/10"
            textClassName="text-white"
          />
        )}
      </View>

      {/* Watch row */}
      <View className="mt-[22px] flex-row items-end justify-between">
        <View>
          <Text className="text-[11px] uppercase tracking-[0.6px] text-white/50">
            Montre
          </Text>
          <View className="mt-1.5 flex-row items-center gap-2.5">
            <Text className="font-geist-medium text-[28px] leading-none text-white">
              {child.watchBattery}
              <Text className="text-[13px] text-white/50">%</Text>
            </Text>
            <Text className="text-[13px] text-white/65">
              {child.watchHoursLeft}h restantes
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          <DarkIconButton>
            <PhoneIcon size={18} color="#fff" />
          </DarkIconButton>
          <DarkIconButton>
            <MicIcon size={18} color="#fff" />
          </DarkIconButton>
          <DarkIconButton onPress={() => router.push(routes.profile.quietModes)}>
            <MoonIcon size={18} color="#fff" />
          </DarkIconButton>
        </View>
      </View>
    </View>
  );
}
