import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { Body, H1, StepLayout, YEyeToggle, YInput, YolyButton } from "@/shared/ui";
import { registerWithEmail } from "../api/register";
import { passwordSchema, type PasswordForm } from "../model/schemas";
import { useRegisterStore } from "../model/use-register-store";

const FIREBASE_ERRORS: Record<string, string> = {
  "auth/email-already-in-use": "Cet email est déjà utilisé.",
  "auth/invalid-email": "Email invalide.",
  "auth/weak-password": "Mot de passe trop faible.",
  "auth/network-request-failed": "Erreur réseau. Réessaie.",
};


export function PasswordStep() {
  const router = useRouter();
  const { email, firstName, lastName } = useRegisterStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  async function onSubmit({ password }: PasswordForm) {
    setApiError(null);
    setLoading(true);
    try {
      await registerWithEmail(email, password, firstName, lastName);
      router.push("/(auth)/register/success");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setApiError(FIREBASE_ERRORS[err.code] ?? "Une erreur est survenue.");
      } else {
        setApiError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepLayout footer={
      <YolyButton
        label="Créer mon compte"
        withArrow
        fullWidth
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    }>
      <H1>Crée ton{"\n"}mot de passe</H1>
      <Body className="text-neutral-500 mt-2 mb-8">
        8 caractères minimum, une majuscule, un chiffre, un caractère spécial.
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
              secureTextEntry={!showPassword}
              error={errors.password?.message}
              rightElement={
                <YEyeToggle visible={showPassword} onToggle={() => setShowPassword(v => !v)} />
              }
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
              secureTextEntry={!showConfirm}
              error={errors.confirm?.message}
              rightElement={
                <YEyeToggle visible={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
              }
            />
          )}
        />
        {apiError && (
          <Body className="text-red-500 text-sm">{apiError}</Body>
        )}
      </View>
    </StepLayout>
  );
}
