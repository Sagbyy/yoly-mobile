import { colors } from "@/shared/config/tokens";
import { Rect, Svg, Text as SvgText } from "react-native-svg";

/** 0 = Awake, 1 = REM, 2 = Light, 3 = Deep. */
export interface SleepSegment {
  stage: 0 | 1 | 2 | 3;
  minutes: number;
}

interface YSleepStagesProps {
  segments: SleepSegment[];
  ticks?: string[];
  w?: number;
  h?: number;
}

const STAGE_LABELS = ["Éveil", "REM", "Léger", "Profond"];

export function YSleepStages({
  segments,
  ticks = [],
  w = 300,
  h = 110,
}: YSleepStagesProps) {
  const totalMin = segments.reduce((sum, s) => sum + s.minutes, 0);
  const stageY = [0, h * 0.25, h * 0.5, h * 0.75];
  const stageColor = [colors.warn, colors.stress, colors.sleep, colors.navy];
  const stageH = h * 0.22;

  let cx = 0;

  return (
    <Svg width={w} height={h + 18} viewBox={`0 0 ${w} ${h + 18}`}>
      {segments.map((seg, i) => {
        const bw = (seg.minutes / totalMin) * w;
        const rect = (
          <Rect
            key={i}
            x={cx + 1}
            y={stageY[seg.stage]}
            width={Math.max(2, bw - 2)}
            height={stageH}
            rx={3}
            fill={stageColor[seg.stage]}
          />
        );
        cx += bw;
        return rect;
      })}
      {STAGE_LABELS.map((label, i) => (
        <SvgText
          key={label}
          x={0}
          y={stageY[i] + stageH * 0.7}
          fontSize={9}
          fill={colors.ink3}
          fontFamily="Geist-Regular"
        >
          {label}
        </SvgText>
      ))}
      {ticks.map((t, i) => (
        <SvgText
          key={t}
          x={(w / (ticks.length - 1)) * i}
          y={h + 14}
          fontSize={9}
          fill={colors.ink3}
          fontFamily="Geist-Regular"
          textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"}
        >
          {t}
        </SvgText>
      ))}
    </Svg>
  );
}
