import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { Body, H1, StepLayout, YInput, YolyButton } from "@/shared/ui";
import { nameSchema, type NameForm } from "../model/schemas";
import { useRegisterStore } from "../model/use-register-store";

export function NameStep() {
  const router = useRouter();
  const { set, firstName, lastName } = useRegisterStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    defaultValues: { firstName, lastName },
  });

  function onSubmit(values: NameForm) {
    set(values);
    router.push("/(auth)/register/email");
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
      <H1>Comment tu{"\n"}t&apos;appelles ?</H1>
      <Body className="text-neutral-500 mt-2 mb-8">
        Ces informations resteront privées.
      </Body>

      <View className="gap-4">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <YInput
              label="Prénom"
              placeholder="Maya"
              value={value}
              onChangeText={onChange}
              autoCapitalize="words"
              error={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <YInput
              label="Nom"
              placeholder="Dupont"
              value={value}
              onChangeText={onChange}
              autoCapitalize="words"
              error={errors.lastName?.message}
            />
          )}
        />
      </View>
    </StepLayout>
  );
}
