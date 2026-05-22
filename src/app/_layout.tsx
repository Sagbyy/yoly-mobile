import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { Providers } from "@/entities/providers";
import { useAuthStore } from "@/features/auth/login/model/use-auth-store";
import { useEffect } from "react";

export default function RootLayout() {
  const { user, isLoading, init } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => init(), [init]);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) router.replace("/(auth)");
    else if (user && inAuthGroup) router.replace("/(app)/home");

    return () => {};
  }, [user, isLoading, segments, router]);

  if (isLoading) return null;

  return (
    <Providers>
      <Slot />
      <StatusBar style="auto" />
    </Providers>
  );
}
