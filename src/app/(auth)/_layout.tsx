import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { padding: 24, backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "Se connecter",
          headerBackTitle: "",
        }}
      />
    </Stack>
  );
}
