import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { H1, Body, StepLayout, YInput, YolyButton } from "@/shared/ui";
import { emailSchema, type EmailForm } from "../model/schemas";
import { useRegisterStore } from "../model/use-register-store";

export function EmailStep() {
  const router = useRouter();
  const { set, email } = useRegisterStore();

  const { control, handleSubmit, formState: { errors } } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
  });

  function onSubmit(values: EmailForm) {
    set(values);
    router.push("/(auth)/register/phone");
  }

  return (
    <StepLayout footer={
      <YolyButton label="Continuer" withArrow fullWidth onPress={handleSubmit(onSubmit)} />
    }>
      <H1>Ton adresse{"\n"}email ?</H1>
      <Body className="text-neutral-500 mt-2 mb-8">
        Pour te connecter et recevoir tes notifications.
      </Body>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <YInput
            label="Email"
            placeholder="maya@exemple.com"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email?.message}
          />
        )}
      />
    </StepLayout>
  );
}
