import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { Providers } from "@/entities/providers";
import { useAuthStore } from "@/features/auth/login/model/use-auth-store";
import { installGlobalErrorHandlers } from "@/shared/lib";
import { useEffect } from "react";

installGlobalErrorHandlers();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const { user, isLoading, init, watchSync } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => init(), [init]);

  useEffect(() => {
    if (isLoading) return;

    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === "(auth)";
    const inSync = segments[0] === "sync";

    if (!user) {
      if (!inAuthGroup) router.replace("/(auth)");
      return;
    }

    if (watchSync === "unsynced") {
      if (!inSync) router.replace("/sync");
      return;
    }

    if (watchSync === "synced" && (inAuthGroup || inSync)) {
      router.replace("/home");
    }
  }, [user, isLoading, watchSync, segments, router]);

  if (isLoading) return null;

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </Providers>
  );
}
