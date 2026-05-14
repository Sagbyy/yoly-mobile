import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { H1, Body, StepLayout, YInput, YolyButton } from "@/shared/ui";
import { createAccount, updateDisplayName } from "../api/register";
import { passwordSchema, type PasswordForm } from "../model/schemas";
import { useRegisterStore } from "../model/use-register-store";

export function PasswordStep() {
  const router = useRouter();
  const { email, firstName, lastName } = useRegisterStore();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { control, handleSubmit, formState: { errors } } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  async function onSubmit({ password }: PasswordForm) {
    setLoading(true);
    setApiError("");
    try {
      await createAccount(email, password);
      await updateDisplayName(`${firstName} ${lastName}`);
      router.push("/(auth)/register/success");
    } catch {
      setApiError("Impossible de créer le compte. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepLayout footer={
      <YolyButton
        label={loading ? "Création..." : "Créer mon compte"}
        withArrow
        fullWidth
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
      />
    }>
      <H1>Crée ton{"\n"}mot de passe</H1>
      <Body className="text-neutral-500 mt-2 mb-8">
        Minimum 8 caractères.
      </Body>

      <View className="gap-4">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <YInput
              label="Mot de passe"
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirm"
          render={({ field: { onChange, value } }) => (
            <YInput
              label="Confirmer"
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.confirm?.message ?? apiError}
            />
          )}
        />
      </View>
    </StepLayout>
  );
}
