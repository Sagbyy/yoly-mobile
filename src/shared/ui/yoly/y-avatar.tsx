import { Text } from "@/shared/ui/primitives/text";
import { View } from "react-native";
import { Defs, LinearGradient, Stop, Svg, Circle } from "react-native-svg";

export type AvatarTone = "navy" | "rose" | "olive" | "sand" | "accent";

const TONES: Record<AvatarTone, [string, string]> = {
  navy: ["#3D4A6F", "#0F1A33"],
  rose: ["#E2A0BD", "#C76A8E"],
  olive: ["#B7C09A", "#7A8866"],
  sand: ["#E0CFB4", "#B59A78"],
  accent: ["#7C92FF", "#3D5AFE"],
};

interface YAvatarProps {
  initials: string;
  size?: number;
  tone?: AvatarTone;
}

export function YAvatar({ initials, size = 44, tone = "navy" }: YAvatarProps) {
  const [from, to] = TONES[tone];
  const gradientId = `avatar-${tone}`;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={from} />
            <Stop offset="1" stopColor={to} />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${gradientId})`} />
      </Svg>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: "#fff",
            fontFamily: "Geist-Medium",
            fontSize: Math.round(size * 0.36),
            letterSpacing: size * 0.36 * -0.01,
          }}
        >
          {initials}
        </Text>
      </View>
    </View>
  );
}
