import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ headerShown: true, title: 'Se connecter', headerBackTitle: '' }} />
      <Stack.Screen name="register" options={{ headerShown: true, title: "S'inscrire", headerBackTitle: '' }} />
    </Stack>
  );
}
