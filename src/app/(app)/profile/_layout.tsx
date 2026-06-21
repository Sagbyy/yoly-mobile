import { Stack } from "expo-router";

// Anchor the stack on the profile root so deep-linking into a sub-screen
// (e.g. from the home shortcut) keeps `index` as the root.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function ProfileLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
