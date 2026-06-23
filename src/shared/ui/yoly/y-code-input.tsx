import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/primitives/text";
import { useRef } from "react";
import { Pressable, TextInput, View } from "react-native";

interface YCodeInputProps {
  value: string;
  onChangeText: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
  hasError?: boolean;
}

export function YCodeInput({
  value,
  onChangeText,
  length = 6,
  autoFocus = true,
  hasError = false,
}: YCodeInputProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()} className="flex-row gap-2">
      {Array.from({ length }).map((_, i) => {
        const char = value[i] ?? "";
        const isCursor = i === value.length;
        return (
          <View
            key={i}
            className={cn(
              "h-14 flex-1 items-center justify-center rounded-2xl border bg-surface",
              hasError
                ? "border-health-alert"
                : isCursor
                  ? "border-ink"
                  : "border-ink-4",
            )}
          >
            <Text className="font-geist-medium text-[22px] text-ink">{char}</Text>
          </View>
        );
      })}

      {/* Invisible field capturing the real input. */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChangeText(t.replace(/\D/g, "").slice(0, length))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        maxLength={length}
        autoFocus={autoFocus}
        caretHidden
        style={{ position: "absolute", width: "100%", height: "100%", opacity: 0 }}
      />
    </Pressable>
  );
}
