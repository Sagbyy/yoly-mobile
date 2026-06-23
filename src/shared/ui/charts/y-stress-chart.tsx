import { colors } from "@/shared/config/tokens";
import { G, Line, Rect, Svg, Text as SvgText } from "react-native-svg";

interface YStressChartProps {
  data: number[];
  ticks?: string[];
  w?: number;
  h?: number;
}

export function YStressChart({
  data,
  ticks = [],
  w = 300,
  h = 130,
}: YStressChartProps) {
  const max = 100;
  const bw = w / data.length;

  return (
    <Svg width={w} height={h + 14} viewBox={`0 0 ${w} ${h + 14}`}>
      {[0, 1, 2, 3].map((i) => (
        <Line
          key={i}
          x1={0}
          x2={w}
          y1={h * (i / 3) + 4}
          y2={h * (i / 3) + 4}
          stroke={colors.surface3}
        />
      ))}
      {data.map((v, i) => {
        const bh = (v / max) * h;
        const col = v > 70 ? colors.stress : v > 45 ? colors.warn : colors.health;
        return (
          <Rect
            key={i}
            x={i * bw + bw * 0.18}
            y={h - bh + 4}
            width={bw * 0.64}
            height={bh}
            rx={bw * 0.32}
            fill={col}
          />
        );
      })}
      <G>
        {ticks.map((t, i) => (
          <SvgText
            key={t}
            x={(w / (ticks.length - 1)) * i}
            y={h + 12}
            fontSize={9}
            fill={colors.ink3}
            fontFamily="Geist-Regular"
            textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"}
          >
            {t}
          </SvgText>
        ))}
      </G>
    </Svg>
  );
}
