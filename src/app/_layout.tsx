import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { Providers } from "@/entities/providers";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Providers>
      <Slot />
      <View>
        <Text className="text-2xl">Test de texte </Text>
      </View>
      <StatusBar style="auto" />
    </Providers>
  );
}
