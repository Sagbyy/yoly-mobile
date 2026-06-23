import { colors } from "@/shared/config/tokens";
import { Circle, Path, Rect, Svg } from "react-native-svg";

export function RouteThumb({ color }: { color: string }) {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80">
      <Rect width={80} height={80} rx={14} fill={colors.mapBg} />
      <Path d="M-5 50 L 90 45" stroke="#fff" strokeWidth={8} />
      <Path d="M30 -5 L 25 90" stroke="#fff" strokeWidth={5} />
      <Path
        d="M 12 60 Q 30 50 40 40 T 65 20"
        stroke={color}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx={12} cy={60} r={3} fill="#fff" stroke={color} strokeWidth={1.5} />
      <Circle cx={65} cy={20} r={3} fill={color} />
    </Svg>
  );
}
