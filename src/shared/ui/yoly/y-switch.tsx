import { colors } from "@/shared/config/tokens";
import { Pressable, View } from "react-native";

interface YSwitchProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
}

export function YSwitch({ value, onValueChange, disabled }: YSwitchProps) {
  return (
    <Pressable
      disabled={disabled || !onValueChange}
      onPress={() => onValueChange?.(!value)}
      hitSlop={8}
      style={{
        width: 38,
        height: 24,
        borderRadius: 999,
        backgroundColor: value ? colors.ink : colors.surface3,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 2,
          left: value ? 16 : 2,
          width: 20,
          height: 20,
          borderRadius: 999,
          backgroundColor: "#fff",
        }}
      />
    </Pressable>
  );
}
