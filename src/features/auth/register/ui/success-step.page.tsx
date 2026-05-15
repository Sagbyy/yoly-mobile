import { useRouter } from "expo-router";
import { sendEmailVerification } from "firebase/auth";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Linking, View } from "react-native";

import { auth } from "@/shared/lib/firebase";
import { Body, H1, StepLayout, YolyButton } from "@/shared/ui";
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

  function handleOpenMail() {
    Linking.openURL("message://").catch(() => Linking.openURL("mailto:"));
  }

  function handleGoToLogin() {
    reset();
    router.replace("/(auth)/login");
  }

  return (
    <StepLayout
      showBack={false}
      footer={
        <View className="gap-3">
          <YolyButton
            label="Ouvrir ma boîte mail"
            withArrow
            fullWidth
            onPress={handleOpenMail}
          />
          <YolyButton
            label="Renvoyer l'email"
            variant="white"
            fullWidth
            loading={resending}
            onPress={handleResend}
          />
          <YolyButton
            label="Aller à la connexion"
            variant="white"
            fullWidth
            onPress={handleGoToLogin}
          />
        </View>
      }
    >
      <View className="px-6 items-center">
        <LottieView
          source={require("../../../../../assets/animations/success-circle-check.json")}
          autoPlay
          loop={false}
          style={{ width: 140, height: 140 }}
        />
        <H1 className="text-center mt-4">Bienvenue {firstName} !</H1>
        <Body className="text-center text-neutral-500 mt-3">
          Un lien de vérification a été envoyé à{" "}
          <Body className="font-semibold text-neutral-700">{email}</Body>.
          {"\n\n"}
          Clique sur le lien pour activer ton compte, puis connecte-toi.
        </Body>
        {resent && (
          <Body className="text-accent mt-4 text-center">Email renvoyé !</Body>
        )}
      </View>
    </StepLayout>
  );
}
