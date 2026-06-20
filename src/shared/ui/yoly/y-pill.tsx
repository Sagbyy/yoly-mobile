import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/primitives/text";
import { View } from "react-native";

interface YPillProps {
  label: string;
  dotColor?: string;
  className?: string;
  textClassName?: string;
}

export function YPill({ label, dotColor, className, textClassName }: YPillProps) {
  return (
    <View
      className={cn(
        "h-6 flex-row items-center gap-1.5 rounded-full bg-surface-3 px-2.5",
        className,
      )}
    >
      {dotColor && (
        <View
          style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: dotColor }}
        />
      )}
      <Text className={cn("font-geist-medium text-[11px] text-ink-2", textClassName)}>
        {label}
      </Text>
    </View>
  );
}
