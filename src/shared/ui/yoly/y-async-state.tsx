import { colors } from "@/shared/config/tokens";
import { Text } from "@/shared/ui/primitives/text";
import { ActivityIndicator, Pressable, View } from "react-native";

export function YLoadingState({ label = "Chargement…" }: { label?: string }) {
  return (
    <View className="items-center justify-center py-16">
      <ActivityIndicator color={colors.accent} />
      <Text className="mt-3 text-[13px] text-ink-3">{label}</Text>
    </View>
  );
}

export function YErrorState({
  label = "Données indisponibles pour le moment.",
  onRetry,
}: {
  label?: string;
  onRetry?: () => void;
}) {
  return (
    <View className="items-center justify-center gap-3 px-8 py-16">
      <Text className="text-center font-geist-medium text-[14px] text-ink">
        {label}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="rounded-full bg-surface-2 px-4 py-2"
        >
          <Text className="font-geist-medium text-[13px] text-accent">
            Réessayer
          </Text>
        </Pressable>
      )}
    </View>
  );
}
