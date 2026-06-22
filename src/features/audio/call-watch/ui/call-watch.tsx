import { colors } from "@/shared/config/tokens";
import { AudioIcon, MicIcon, PhoneIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import { YAvatar } from "@/shared/ui/yoly";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";

import { callTarget } from "../model/data";
import { PulseRings } from "./pulse-rings";

function ControlButton({
  label,
  active,
  onPress,
  children,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  return (
    <View className="items-center">
      <Pressable
        onPress={onPress}
        className="h-[60px] w-[60px] items-center justify-center rounded-full"
        style={{ backgroundColor: active ? "#fff" : "rgba(255,255,255,0.08)" }}
      >
        {children}
      </Pressable>
      <Text className="mt-2 text-[13px] text-white/60">{label}</Text>
    </View>
  );
}

export function CallWatch() {
  const router = useRouter();
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  return (
    <View className="flex-1 items-center px-6 pb-6">
      <Text className="mt-8 font-geist-medium text-[13px] text-white/60">
        {callTarget.device}
      </Text>

      {/* Avatar with pulse */}
      <View className="mt-10 items-center justify-center" style={{ width: 200, height: 200 }}>
        <PulseRings size={200} />
        <YAvatar initials={callTarget.initials} size={140} tone="rose" />
      </View>

      <Text className="mt-9 font-geist-medium text-[34px] tracking-[-0.5px] text-white">
        {callTarget.name}
      </Text>
      <Text className="mt-1.5 font-geist-medium text-[13px] text-white/50">
        {callTarget.elapsed} · {callTarget.status}
      </Text>

      {/* Connection strip */}
      <View className="mt-8 w-full flex-row items-center rounded-[18px] bg-white/[0.04] p-3">
        <View className="flex-1 flex-row items-center justify-center gap-1.5">
          <View style={{ width: 4, height: 4, borderRadius: 999, backgroundColor: colors.liveDot }} />
          <Text className="text-[13px] text-white/70">{callTarget.online}</Text>
        </View>
        <View style={{ width: 1, height: 14, backgroundColor: "rgba(255,255,255,0.1)" }} />
        <View className="flex-1 flex-row items-center justify-center">
          <Text className="text-[13px] text-white/70">{callTarget.signal}</Text>
        </View>
      </View>

      <View className="flex-1" />

      {/* Controls */}
      <View className="flex-row items-center justify-center gap-8">
        <ControlButton label="Muet" active={muted} onPress={() => setMuted((m) => !m)}>
          <MicIcon size={22} color={muted ? colors.ink : "#fff"} />
        </ControlButton>

        <View className="items-center">
          <Pressable
            onPress={() => router.back()}
            className="h-[76px] w-[76px] items-center justify-center rounded-full"
            style={{ backgroundColor: colors.alert }}
          >
            <View style={{ transform: [{ rotate: "135deg" }] }}>
              <PhoneIcon size={28} color="#fff" />
            </View>
          </Pressable>
          <Text className="mt-2 text-[13px] text-white/60">Raccrocher</Text>
        </View>

        <ControlButton label="Haut-parleur" active={speaker} onPress={() => setSpeaker((s) => !s)}>
          <AudioIcon size={22} color={speaker ? colors.ink : "#fff"} />
        </ControlButton>
      </View>
    </View>
  );
}
