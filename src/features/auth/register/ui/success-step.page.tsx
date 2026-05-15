import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Body, H1, YolyButton } from "@/shared/ui";
import { auth } from "@/shared/lib/firebase";
import { useRegisterStore } from "../model/use-register-store";

export function SuccessStep() {
  const router = useRouter();
  const { email, firstName, reset } = useRegisterStore();
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleResend() {
    if (!auth.currentUser) return;
    setResending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      setResent(true);
    } finally {
      setResending(false);
    }
  }

  function handleGoToLogin() {
    reset();
    router.replace("/(auth)/login");
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center" edges={["bottom"]}>
      <View className="flex-1 items-center justify-center px-6">
        <H1 className="text-center">Vérifie ton{"\n"}email {firstName} !</H1>
        <Body className="text-center text-neutral-500 mt-4">
          Un lien de vérification a été envoyé à{" "}
          <Body className="font-semibold text-neutral-700">{email}</Body>.
          {"\n\n"}
          Clique sur le lien dans l&apos;email pour activer ton compte, puis connecte-toi.
        </Body>
        {resent && (
          <Body className="text-accent mt-4 text-center">Email renvoyé !</Body>
        )}
      </View>

      <View className="w-full px-6 pb-4 gap-3">
        <YolyButton
          label="Aller à la connexion"
          withArrow
          fullWidth
          onPress={handleGoToLogin}
        />
        <YolyButton
          label="Renvoyer l'email"
          variant="white"
          fullWidth
          loading={resending}
          onPress={handleResend}
        />
      </View>
    </SafeAreaView>
  );
}
