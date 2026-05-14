import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { type PropsWithChildren } from "react";

import { queryClient } from "@/shared/lib/query-client";
import { useColorScheme } from "@/shared/lib/use-color-scheme";
import { useLoadFonts } from "@/shared/lib/fonts";

export function Providers({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useLoadFonts();

  if (!fontsLoaded && !fontError) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <KeyboardProvider>
          {children}
        </KeyboardProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
