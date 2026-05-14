import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Body, H1, StepLayout, YPhoneInput, YolyButton } from "@/shared/ui";
import { sendOTP } from "../api/register";
import { phoneSchema, type PhoneForm } from "../model/schemas";
import { useRegisterStore } from "../model/use-register-store";

export function PhoneStep() {
  const router = useRouter();
  const { set, phone } = useRegisterStore();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone },
  });

  async function onSubmit(values: PhoneForm) {
    setLoading(true);
    setApiError("");
    try {
      const confirmation = await sendOTP(values.phone);
      set({ phone: values.phone, confirmation });
      router.push("/(auth)/register/otp");
    } catch {
      setApiError("Impossible d'envoyer le SMS. Vérifie le numéro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <StepLayout
      footer={
        <YolyButton
          label={loading ? "Envoi..." : "Recevoir le code"}
          withArrow
          fullWidth
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        />
      }
    >
      <H1>Ton numéro de{"\n"}téléphone ?</H1>
      <Body className="text-neutral-500 mt-2 mb-8">
        Un code de vérification te sera envoyé par SMS.
      </Body>

      <YPhoneInput
        value={watch("phone")}
        onChange={(val) => setValue("phone", val, { shouldValidate: true })}
        error={errors.phone?.message ?? apiError}
      />
    </StepLayout>
  );
}
