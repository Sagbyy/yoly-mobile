import { Stack } from "expo-router";

// Anchor the stack on the hub so deep-linking into a detail (e.g. from the
// home cards) keeps `index` as the root and the Santé tab opens on the hub.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function HealthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
