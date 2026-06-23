import { Stack } from "expo-router";

// Anchors the stack on the profile root so deep-linking keeps `index` as the root.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function ProfileLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
