import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  FIREBASE_ERRORS,
  LoginForm,
  loginSchema,
  useAuthStore,
} from "@/features/auth/login";
import {
  Body,
  Caption,
  H1,
  YEyeToggle,
  YInput,
  YLogo,
  YolyButton,
} from "@/shared/ui";
import { createLogger } from "@/shared/lib/logger";

const log = createLogger("auth");

export function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { bottom } = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit({ email, password }: LoginForm) {
    setApiError(null);
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        log.error("sign-in failed", { code: err.code, message: err.message });
        setApiError(FIREBASE_ERRORS[err.code] ?? "Une erreur est survenue.");
      } else {
        log.error("sign-in failed (non-firebase)", err);
        setApiError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right"]}
    >
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

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <YInput
                label="Mot de passe"
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                rightElement={
                  <YEyeToggle
                    visible={showPassword}
                    onToggle={() => setShowPassword((v) => !v)}
                  />
                }
              />
            )}
          />

          <Pressable
            className="self-end"
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Caption className="text-accent">Mot de passe oublié ?</Caption>
          </Pressable>

          {apiError && <Body className="text-red-500 text-sm">{apiError}</Body>}
        </View>
      </KeyboardAwareScrollView>

      <KeyboardStickyView offset={{ closed: -bottom, opened: 0 }}>
        <View className="pt-8 gap-3">
          <YolyButton
            label="Se connecter"
            withArrow
            fullWidth
            loading={loading}
            onPress={handleSubmit(onSubmit)}
          />

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
