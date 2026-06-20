import { Polyline, Svg } from "react-native-svg";

interface YSparkProps {
  points: number[];
  color?: string;
  w?: number;
  h?: number;
  fill?: boolean;
}

export function YSpark({
  points,
  color = "#0B0B0D",
  w = 120,
  h = 36,
  fill = false,
}: YSparkProps) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const step = w / (points.length - 1);
  const pts = points
    .map((p, i) => `${i * step},${h - ((p - min) / range) * h}`)
    .join(" ");

  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {fill && (
        <Polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} fillOpacity={0.1} />
      )}
      <Polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
