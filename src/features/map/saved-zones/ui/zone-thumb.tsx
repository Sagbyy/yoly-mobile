import { colors } from "@/shared/config/tokens";
import { Text } from "@/shared/ui/primitives/text";
import { View } from "react-native";
import { Circle, Path, Rect, Svg } from "react-native-svg";

/** Tiny stylized map thumbnail with a colored zone blob + emoji. */
export function ZoneThumb({ color, emoji }: { color: string; emoji: string }) {
  return (
    <View style={{ width: 56, height: 56 }}>
      <Svg width={56} height={56} viewBox="0 0 56 56">
        <Rect width={56} height={56} fill={colors.mapBg} />
        <Path d="M-5 30 L 60 35" stroke="#fff" strokeWidth={6} />
        <Path d="M20 -5 L 30 60" stroke="#fff" strokeWidth={4} />
        <Circle cx={28} cy={28} r={14} fill={color} opacity={0.18} />
      </Svg>
      <View style={{ position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </View>
    </View>
  );
}
