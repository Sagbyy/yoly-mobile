import { colors } from "@/shared/config/tokens";
import {
  Circle,
  Defs,
  LinearGradient,
  Line,
  Polyline,
  Stop,
  Svg,
} from "react-native-svg";

interface YHeartRateGraphProps {
  /** BPM samples over the window. */
  data: number[];
  min?: number;
  max?: number;
  color?: string;
  w?: number;
  h?: number;
}

export function YHeartRateGraph({
  data,
  min = 60,
  max = 130,
  color = colors.heart,
  w = 300,
  h = 140,
}: YHeartRateGraphProps) {
  const step = w / (data.length - 1);
  const y = (p: number) => h - ((p - min) / (max - min)) * h * 0.9 - h * 0.05;
  const points = data.map((p, i) => `${i * step},${y(p)}`);
  const line = points.join(" ");

  // Highlight the highest sample.
  const peakIdx = data.indexOf(Math.max(...data));

  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <Defs>
        <LinearGradient id="hr-grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={0.22} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      {[0, 1, 2, 3].map((i) => (
        <Line
          key={i}
          x1={0}
          x2={w}
          y1={h * (i / 3 + 0.1)}
          y2={h * (i / 3 + 0.1)}
          stroke={colors.surface3}
          strokeWidth={1}
        />
      ))}
      <Polyline points={`0,${h} ${line} ${w},${h}`} fill="url(#hr-grad)" />
      <Polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {peakIdx >= 0 && (
        <Circle
          cx={peakIdx * step}
          cy={y(data[peakIdx])}
          r={4}
          fill="#fff"
          stroke={color}
          strokeWidth={2}
        />
      )}
    </Svg>
  );
}
