import { colors } from "@/shared/config/tokens";
import { Text } from "@/shared/ui/primitives/text";
import { View } from "react-native";
import { Circle, G, Svg } from "react-native-svg";

interface YRingProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  label?: string;
  sub?: string;
}

export function YRing({
  pct,
  size = 120,
  stroke = 10,
  color = colors.ink,
  track = colors.surface3,
  label,
  sub,
}: YRingProps) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (circumference * pct) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={track}
            strokeWidth={stroke}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={offset}
          />
        </G>
      </Svg>
      {(label !== undefined || sub) && (
        <View
          style={{ position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}
        >
          {label !== undefined && (
            <Text
              className="font-geist-regular text-ink"
              style={{ fontSize: size * 0.26, letterSpacing: -0.5 }}
            >
              {label}
            </Text>
          )}
          {sub && (
            <Text className="mt-0.5 text-[10px] uppercase tracking-[0.6px] text-ink-3">
              {sub}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
