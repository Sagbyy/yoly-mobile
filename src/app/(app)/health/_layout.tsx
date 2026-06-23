import { Stack } from "expo-router";

// Anchors the stack on the hub so deep-linking keeps `index` as the root.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function HealthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
