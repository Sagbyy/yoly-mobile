import { cn } from "@/shared/lib/utils";
import { Caption } from "@/shared/ui/typography";
import { forwardRef } from "react";
import { TextInput, View, type TextInputProps } from "react-native";

interface YInputProps extends TextInputProps {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const YInput = forwardRef<TextInput, YInputProps>(
  ({ label, error, className, rightElement, ...props }, ref) => {
    return (
      <View className="gap-1.5">
        <Caption className="text-neutral-600 font-geist-medium">
          {label}
        </Caption>
        <View
          className={cn(
            "flex-row items-center border border-neutral-200 rounded-full px-5 bg-white",
            error && "border-health-alert",
          )}
        >
          <TextInput
            ref={ref}
            placeholderTextColor="#A3A8C3"
            className={cn(
              "flex-1 py-4 font-geist-regular text-body text-ink bg-white",
              className,
            )}
            {...props}
          />
          {rightElement}
        </View>
        {error && <Caption className="text-health-alert pl-2">{error}</Caption>}
      </View>
    );
  },
);

YInput.displayName = "YInput";
