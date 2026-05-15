import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  Body,
  Caption,
  H1,
  YEyeToggle,
  YInput,
  YLogo,
  YolyButton,
} from "@/shared/ui";

export function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <View className="pt-2 pb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center active:bg-neutral-200"
        >
          <ArrowLeft size={18} color="#0B0B0D" strokeWidth={2} />
        </Pressable>
      </View>

      <KeyboardAwareScrollView
        bottomOffset={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-2">
          <YLogo />
        </View>

        <View className="mb-8">
          <H1 className="mb-1">Bon retour !</H1>
          <Body className="text-neutral-500">
            Connecte-toi pour accéder à ton espace.
          </Body>
        </View>

        <View className="gap-4">
          <YInput
            label="Email"
            placeholder="maya@exemple.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <YInput
            label="Mot de passe"
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            rightElement={
              <YEyeToggle
                visible={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
            }
          />

          <Pressable className="self-end">
            <Caption className="text-accent">Mot de passe oublié ?</Caption>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>

      <KeyboardStickyView offset={{ closed: -bottom, opened: 0 }}>
        <View className="pt-8 gap-3">
          <YolyButton label="Se connecter" withArrow fullWidth />

          <View className="flex-row items-center justify-center gap-1">
            <Caption className="text-neutral-500">
              Pas encore de compte ?
            </Caption>
            <Pressable onPress={() => router.push("/(auth)/register")}>
              <Caption className="text-accent font-geist-medium">
                S&apos;inscrire
              </Caption>
            </Pressable>
          </View>
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
}
