import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { forgotPasswordSchema, type ForgotPasswordForm } from "@/features/auth/login";
import { auth } from "@/shared/lib/firebase";
import { Body, Caption, H1, StepLayout, YInput, YolyButton } from "@/shared/ui";

interface Props {
  onSuccess: () => void;
}

export function ForgotPasswordForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit({ email }: ForgotPasswordForm) {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepLayout
      footer={
        <YolyButton
          label="Envoyer le lien"
          withArrow
          fullWidth
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      }
    >
      <H1>Mot de passe{"\n"}oublié ?</H1>
      <Body className="text-neutral-500 mt-2 mb-8">
        Saisis ton adresse email et on t&apos;envoie un lien pour réinitialiser
        ton mot de passe.
      </Body>

      <View className="gap-2">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <YInput
              label="Email"
              placeholder="maya@exemple.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />
        <Caption className="text-neutral-400 pl-2">
          Pense à vérifier tes spams.
        </Caption>
      </View>
    </StepLayout>
  );
}
