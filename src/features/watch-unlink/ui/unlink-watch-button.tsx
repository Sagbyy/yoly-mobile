import { useAuthStore } from "@/features/auth/login";
import { unlinkWatch } from "@/shared/api/pairing";
import { colors } from "@/shared/config/tokens";
import { Text } from "@/shared/ui/primitives/text";
import { useMutation } from "@tanstack/react-query";
import { ActivityIndicator, Alert, Pressable } from "react-native";

export function UnlinkWatchButton() {
  const markWatchUnsynced = useAuthStore((s) => s.markWatchUnsynced);

  const mutation = useMutation({
    mutationFn: unlinkWatch,
    onSuccess: markWatchUnsynced,
    onError: () =>
      Alert.alert("Échec", "Impossible de délier la montre. Réessayez."),
  });

  const confirm = () =>
    Alert.alert(
      "Délier la montre",
      "Vous ne recevrez plus les données de la montre tant qu'elle n'est pas reliée à nouveau.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Délier",
          style: "destructive",
          onPress: () => mutation.mutate(),
        },
      ],
    );

  return (
    <Pressable
      onPress={confirm}
      disabled={mutation.isPending}
      className="h-14 flex-row items-center justify-center rounded-full"
      style={{ borderWidth: 1, borderColor: colors.alert, opacity: mutation.isPending ? 0.6 : 1 }}
    >
      {mutation.isPending ? (
        <ActivityIndicator size="small" color={colors.alert} />
      ) : (
        <Text className="font-geist-medium text-body text-health-alert">
          Délier la montre
        </Text>
      )}
    </Pressable>
  );
}
