import { Circle, Path, Rect, Svg } from "react-native-svg";

export interface IconProps {
  size?: number;
  color?: string;
}

const INK = "#0B0B0D";

export function BellIcon({ size = 20, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 16V11a6 6 0 0112 0v5l1.5 2H4.5L6 16zM10 21h4"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PulseIcon({ size = 22, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12h4l2.5-6 5 12L17 12h4"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function StepsIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 4c-1.5 2-2 5 0 7s1 5-1 7M14 6c-1.5 2-2 5 0 7s1 5-1 7M17 4l1 2M20 8l1 2M3 13l1 2M6 17l1 2"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MoonIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 14A8 8 0 1110 4a6.5 6.5 0 0010 10z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DropIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3s6 7 6 11.5a6 6 0 01-12 0C6 10 12 3 12 3z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PinIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={9} r={2.5} stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

export function ShieldIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AudioIcon({ size = 22, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18V8l11-3v10"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Circle cx={6} cy={18} r={3} stroke={color} strokeWidth={1.6} />
      <Circle cx={17} cy={15} r={3} stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

export function PhoneIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4h4l2 5-3 2c1 2.5 3 4.5 5.5 5.5l2-3 5 2v4a2 2 0 01-2 2C9 21 3 15 3 6a2 2 0 012-2z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BatteryIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 14" fill="none">
      <Rect x={0.8} y={0.8} width={20.4} height={12.4} rx={3} stroke={color} strokeWidth={1.4} />
      <Rect x={3} y={3} width={13} height={8} rx={1.5} fill={color} />
      <Rect x={22} y={5} width={1.6} height={4} rx={0.5} fill={color} />
    </Svg>
  );
}

export function SignalIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 16" fill="none">
      <Rect x={0} y={11} width={4} height={5} rx={1} fill={color} />
      <Rect x={6} y={8} width={4} height={8} rx={1} fill={color} />
      <Rect x={12} y={4} width={4} height={12} rx={1} fill={color} />
      <Rect x={18} y={0} width={4} height={16} rx={1} fill={color} />
    </Svg>
  );
}

export function BackIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 6l-6 6 6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function FilterIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5h16l-6 8v6l-4-2v-4L4 5z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LocIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} fill={color} />
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.6} opacity={0.3} />
    </Svg>
  );
}

export function PlusIcon({ size = 18, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ChevronIcon({ size = 14, color = INK }: IconProps) {
  return (
    <Svg width={size / 2} height={size} viewBox="0 0 8 14" fill="none">
      <Path
        d="M1 1l6 6-6 6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowDownIcon({ size = 12, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M6 13l6 6 6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function MicIcon({ size = 22, color = INK }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={9} y={3} width={6} height={12} rx={3} stroke={color} strokeWidth={1.6} />
      <Path
        d="M5 11a7 7 0 0014 0M12 18v3"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}
