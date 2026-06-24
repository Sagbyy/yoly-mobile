import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { ApiError } from "@/shared/api/client";
import { confirmPairing } from "@/shared/api/pairing";
import { Caption, YCodeInput, YolyButton } from "@/shared/ui";

import { pairingSchema, type PairingForm } from "../model/schemas";

function messageFor(error: unknown): string {
  if (error instanceof ApiError && error.status === 404) {
    return "Code invalide ou expiré. Vérifiez le code sur la montre.";
  }
  return "Une erreur est survenue. Réessayez.";
}

export function WatchSyncForm({ onConfirmed }: { onConfirmed: () => void }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PairingForm>({
    resolver: zodResolver(pairingSchema),
    defaultValues: { code: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: PairingForm) => confirmPairing(values.code),
    onSuccess: onConfirmed,
  });

  const code = watch("code");
  const errorText = errors.code?.message ?? (mutation.isError ? messageFor(mutation.error) : null);

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="code"
        render={({ field: { value, onChange } }) => (
          <YCodeInput value={value} onChangeText={onChange} hasError={!!errorText} />
        )}
      />

      {errorText && <Caption className="text-health-alert">{errorText}</Caption>}

      <YolyButton
        label="Synchroniser"
        withArrow
        fullWidth
        loading={mutation.isPending}
        disabled={code.length !== 6}
        onPress={handleSubmit((values) => mutation.mutate(values))}
      />
    </View>
  );
}
