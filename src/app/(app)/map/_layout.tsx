import { Stack } from "expo-router";

// Anchor the stack on the live map so deep-linking into a sub-screen keeps
// `index` as the root and the Carte tab opens on the live map.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function MapLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
