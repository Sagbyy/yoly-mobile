import { cn } from "@/shared/lib/utils";
import { Caption } from "@/shared/ui/typography";
import { forwardRef } from "react";
import { TextInput, View, type TextInputProps } from "react-native";

interface YInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const YInput = forwardRef<TextInput, YInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <View className="gap-1.5">
        <Caption className="text-neutral-600 font-geist-medium">{label}</Caption>
        <TextInput
          ref={ref}
          placeholderTextColor="#A3A8C3"
          className={cn(
            "border border-neutral-200 rounded-full px-5 py-4",
            "font-geist-regular text-body text-ink",
            "bg-white",
            error && "border-health-alert",
            className,
          )}
          {...props}
        />
        {error && (
          <Caption className="text-health-alert pl-2">{error}</Caption>
        )}
      </View>
    );
  },
);

YInput.displayName = "YInput";
