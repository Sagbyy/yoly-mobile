import { View } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { Text } from "@/shared/ui/primitives/text";

interface YLogoProps {
  size?: number;
  light?: boolean;
}

export function YLogo({ size = 28, light = false }: YLogoProps) {
  const color = light ? "#FFFFFF" : "#0B0B0D";
  const fontSize = Math.round(size * 0.66);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <Circle cx="20" cy="20" r="18" stroke={color} strokeWidth="2.4" />
        <Path
          d="M11 13l9 11 9-11M20 24v6"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <Text
        style={{
          fontSize,
          fontFamily: "Geist-Medium",
          letterSpacing: fontSize * -0.04,
          color,
        }}
      >
        YOLY
      </Text>
    </View>
  );
}
