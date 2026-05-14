import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable } from "react-native";

import { H1, Body, Caption, StepLayout, YInput, YolyButton } from "@/shared/ui";
import { sendOTP, verifyOTP } from "../api/register";
import { otpSchema, type OTPForm } from "../model/schemas";
import { useRegisterStore } from "../model/use-register-store";

export function OTPStep() {
  const router = useRouter();
  const { phone, confirmation, set } = useRegisterStore();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { control, handleSubmit, formState: { errors } } = useForm<OTPForm>({
    resolver: zodResolver(otpSchema),
  });

  async function onSubmit({ code }: OTPForm) {
    if (!confirmation) return;
    setLoading(true);
    setApiError("");
    try {
      await verifyOTP(confirmation, code);
      router.push("/(auth)/register/password");
    } catch {
      setApiError("Code incorrect. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      const newConfirmation = await sendOTP(phone);
      set({ confirmation: newConfirmation });
    } catch {
      setApiError("Impossible de renvoyer le code.");
    }
  }

  return (
    <StepLayout footer={
      <YolyButton
        label={loading ? "Vérification..." : "Vérifier"}
        withArrow
        fullWidth
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
      />
    }>
      <H1>Entre le code{"\n"}reçu par SMS</H1>
      <Body className="text-neutral-500 mt-2 mb-8">
        Code envoyé au {phone}
      </Body>

      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value } }) => (
          <YInput
            label="Code de vérification"
            placeholder="000000"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            maxLength={6}
            error={errors.code?.message ?? apiError}
          />
        )}
      />

      <Pressable onPress={handleResend} className="mt-4">
        <Caption className="text-accent">Renvoyer le code</Caption>
      </Pressable>
    </StepLayout>
  );
}
