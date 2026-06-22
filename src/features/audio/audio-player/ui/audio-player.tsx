import { routes } from "@/shared/config/routes";
import { colors } from "@/shared/config/tokens";
import { YWaveform } from "@/shared/ui/audio";
import { BackIcon, NextIcon, PauseIcon, PinIcon, PlayIcon, PrevIcon, ShareIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";

import type { Recording } from "@/features/audio/recordings-list";

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

export function AudioPlayer({ recording }: { recording: Recording }) {
  const router = useRouter();
  const [playing, setPlaying] = useState(true);

  return (
    <View className="flex-1 px-5">
      {/* Top bar */}
      <View className="flex-row items-center justify-between pt-1.5">
        <DarkIconButton onPress={() => router.back()}>
          <BackIcon size={18} color="#fff" />
        </DarkIconButton>
        <Text className="font-geist-medium text-[13px] text-white/60">Lecture en cours</Text>
        <DarkIconButton>
          <ShareIcon size={16} color="#fff" />
        </DarkIconButton>
      </View>

      {/* Artwork */}
      <View className="mt-10 items-center">
        <View style={{ width: 240, height: 240, borderRadius: 32, overflow: "hidden" }}>
          <Svg width={240} height={240} style={{ position: "absolute" }}>
            <Defs>
              <RadialGradient id="art" cx="50%" cy="35%" r="70%">
                <Stop offset="0" stopColor={colors.accent} stopOpacity={0.45} />
                <Stop offset="0.7" stopColor="#0F1424" stopOpacity={1} />
              </RadialGradient>
            </Defs>
            <Rect width={240} height={240} fill="#0F1424" />
            <Rect width={240} height={240} fill="url(#art)" />
          </Svg>
          <View className="flex-1 items-center justify-center">
            <YWaveform w={180} h={120} bars={28} color="#FFFFFF" playedPct={100} />
          </View>
        </View>
      </View>

      {/* Title */}
      <View className="mt-8 items-center">
        <Text className="font-geist-medium text-[32px] tracking-[-0.5px] text-white">
          {recording.place}
        </Text>
        <Text className="mt-1.5 text-[15px] text-white/55">
          Aujourd&apos;hui · {recording.time} · {recording.duration}
        </Text>
      </View>

      {/* Progress */}
      <View className="mt-7">
        <View className="h-1 rounded-full bg-white/10">
          <View className="h-1 rounded-full bg-white" style={{ width: "38%" }} />
          <View
            style={{
              position: "absolute",
              left: "38%",
              top: -4,
              marginLeft: -6,
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#fff",
            }}
          />
        </View>
        <View className="mt-2 flex-row justify-between">
          <Text className="font-geist-mono text-[11px] text-white/50">0:28</Text>
          <Text className="font-geist-mono text-[11px] text-white/50">-0:46</Text>
        </View>
      </View>

      {/* Controls */}
      <View className="mt-7 flex-row items-center justify-center gap-6">
        <View className="h-[50px] w-[50px] items-center justify-center rounded-full bg-white/[0.08]">
          <PrevIcon size={22} color="#fff" />
        </View>
        <Pressable
          onPress={() => setPlaying((p) => !p)}
          className="h-[76px] w-[76px] items-center justify-center rounded-full bg-white"
        >
          {playing ? (
            <PauseIcon size={30} color={colors.ink} />
          ) : (
            <PlayIcon size={30} color={colors.ink} />
          )}
        </Pressable>
        <View className="h-[50px] w-[50px] items-center justify-center rounded-full bg-white/[0.08]">
          <NextIcon size={22} color="#fff" />
        </View>
      </View>

      {/* Location strip */}
      <Pressable
        onPress={() => router.push(routes.map.live)}
        className="mt-8 flex-row items-center justify-between rounded-[18px] bg-white/[0.04] p-3.5"
      >
        <View className="flex-row items-center gap-2.5">
          <PinIcon size={18} color="rgba(255,255,255,0.6)" />
          <View>
            <Text className="font-geist-medium text-[13px] text-white">{recording.location}</Text>
            <Text className="text-[13px] text-white/50">Zone {recording.tag.toLowerCase()}</Text>
          </View>
        </View>
        <Text className="text-[11px] text-white/50">Voir sur la carte ↗</Text>
      </Pressable>
    </View>
  );
}
