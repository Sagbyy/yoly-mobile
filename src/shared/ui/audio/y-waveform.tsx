import { colors } from "@/shared/config/tokens";
import { Rect, Svg } from "react-native-svg";

interface YWaveformProps {
  bars?: number;
  color?: string;
  trackColor?: string;
  playedPct?: number;
  w?: number;
  h?: number;
}

export function YWaveform({
  bars = 50,
  color = colors.ink,
  trackColor = colors.ink4,
  playedPct = 100,
  w = 220,
  h = 26,
}: YWaveformProps) {
  const amps = Array.from({ length: bars }, (_, i) => {
    const s =
      Math.sin(i * 0.5) * 0.5 + Math.cos(i * 1.3) * 0.4 + Math.sin(i * 0.21) * 0.3;
    return Math.max(0.15, Math.min(1, (s + 1.4) / 2.4));
  });

  const barW = (w / bars) * 0.6;
  const gap = (w / bars) * 0.4;

  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {amps.map((a, i) => {
        const x = i * (barW + gap);
        const bh = a * h;
        const played = (i / bars) * 100 < playedPct;
        return (
          <Rect
            key={i}
            x={x}
            y={(h - bh) / 2}
            width={barW}
            height={bh}
            rx={barW / 2}
            fill={played ? color : trackColor}
          />
        );
      })}
    </Svg>
  );
}
