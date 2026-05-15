import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import { Body, H1, StepLayout, YPhoneInput, YolyButton } from "@/shared/ui";
import { phoneSchema, type PhoneForm } from "../model/schemas";
import { useRegisterStore } from "../model/use-register-store";

export function PhoneStep() {
  const router = useRouter();
  const { set, phone } = useRegisterStore();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone },
  });

  function onSubmit(values: PhoneForm) {
    set({ phone: values.phone });
    router.push("/(auth)/register/password");
  }

  return (
    <StepLayout
      footer={
        <YolyButton
          label="Continuer"
          withArrow
          fullWidth
          onPress={handleSubmit(onSubmit)}
        />
      }
    >
      <H1>Ton numéro de{"\n"}téléphone ?</H1>
      <Body className="text-neutral-500 mt-2 mb-8">
        Pour sécuriser ton compte et te contacter si besoin.
      </Body>

      <YPhoneInput
        value={watch("phone")}
        onChange={(val) => setValue("phone", val, { shouldValidate: true })}
        error={errors.phone?.message}
      />
    </StepLayout>
  );
}
