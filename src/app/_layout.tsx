import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { Providers } from "@/entities/providers";
import { useAuthStore } from "@/features/auth/login/model/use-auth-store";
import { useEffect } from "react";

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

    // Not authenticated → auth flow.
    if (!user) {
      if (!inAuthGroup) router.replace("/(auth)");
      return;
    }

    // Authenticated but no paired watch → force the sync flow.
    if (watchSync === "unsynced") {
      if (!inSync) router.replace("/sync");
      return;
    }

    // Authenticated with a paired watch → into the app.
    if (watchSync === "synced" && (inAuthGroup || inSync)) {
      router.replace("/(app)/home");
    }
    // watchSync === "unknown" → still resolving, wait.
  }, [user, isLoading, watchSync, segments, router]);

  if (isLoading) return null;

  return (
    <Providers>
      <Slot />
      <StatusBar style="dark" />
    </Providers>
  );
}
