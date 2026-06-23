import { Stack } from "expo-router";

// Anchors the stack on the live map so deep-linking keeps `index` as the root.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function MapLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
