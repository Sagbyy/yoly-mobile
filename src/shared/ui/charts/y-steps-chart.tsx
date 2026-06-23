import { colors } from "@/shared/config/tokens";
import { Line, Rect, Svg, Text as SvgText } from "react-native-svg";

interface YStepsChartProps {
  data: number[];
  days: string[];
  goal?: number;
  max?: number;
  w?: number;
  h?: number;
}

export function YStepsChart({
  data,
  days,
  goal = 10000,
  max = 12000,
  w = 300,
  h = 120,
}: YStepsChartProps) {
  const bw = w / data.length;
  const goalY = h - (goal / max) * h;

  return (
    <Svg width={w} height={h + 18} viewBox={`0 0 ${w} ${h + 18}`}>
      <Line
        x1={0}
        x2={w}
        y1={goalY}
        y2={goalY}
        stroke={colors.ink4}
        strokeDasharray="3 4"
        strokeWidth={1}
      />
      {data.map((v, i) => {
        const bh = (v / max) * h;
        const col = v >= goal ? colors.ink : colors.ink4;
        return (
          <Rect
            key={i}
            x={i * bw + bw * 0.18}
            y={h - bh}
            width={bw * 0.64}
            height={bh}
            rx={6}
            fill={col}
          />
        );
      })}
      {days.map((d, i) => (
        <SvgText
          key={i}
          x={i * bw + bw * 0.5}
          y={h + 14}
          fontSize={10}
          fill={colors.ink3}
          fontFamily="Geist-Regular"
          textAnchor="middle"
        >
          {d}
        </SvgText>
      ))}
    </Svg>
  );
}
