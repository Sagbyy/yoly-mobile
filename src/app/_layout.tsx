import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { Providers } from "@/entities/providers";

export default function RootLayout() {
  return (
    <Providers>
      <Slot />
      <StatusBar style="auto" />
    </Providers>
  );
}
