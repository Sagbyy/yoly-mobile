import { colors } from "@/shared/config/tokens";
import { BackIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/primitives/text";
import type { ReactNode } from "react";
import { Pressable, View } from "react-native";

interface YScreenHeaderProps {
  title: string;
  subtitle?: string;
  /** Shows the back chevron when an onBack handler is provided. */
  onBack?: () => void;
  /** Optional trailing action (right side). */
  action?: ReactNode;
}

export function YScreenHeader({ title, subtitle, onBack, action }: YScreenHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5 pb-3.5 pt-1.5">
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={8}
          className="h-[38px] w-[38px] items-center justify-center rounded-full bg-surface-3"
        >
          <BackIcon size={18} color={colors.ink} />
        </Pressable>
      ) : (
        <View className="w-[38px]" />
      )}

      <View className="flex-1 items-center">
        <Text className="font-geist-medium text-[15px] tracking-[-0.01px] text-ink">
          {title}
        </Text>
        {subtitle && (
          <Text className="mt-0.5 text-[11px] text-ink-3">{subtitle}</Text>
        )}
      </View>

      {action ?? <View className="w-[38px]" />}
    </View>
  );
}
