import { Text } from "@/shared/ui/primitives/text";
import { Pressable, View } from "react-native";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface YSegmentedProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const SEG_SHADOW =
  "0 1px 2px rgba(15,26,51,.04), 0 0 0 1px rgba(15,26,51,.04)";

export function YSegmented<T extends string>({
  options,
  value,
  onChange,
}: YSegmentedProps<T>) {
  return (
    <View className="flex-row rounded-full bg-surface-3 p-1">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className="h-8 justify-center rounded-full px-3.5"
            style={isActive ? { backgroundColor: "#fff", boxShadow: SEG_SHADOW } : undefined}
          >
            <Text
              className={
                isActive
                  ? "font-geist-medium text-[13px] text-ink"
                  : "font-geist-medium text-[13px] text-ink-2"
              }
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
