import { FloatingTabBar } from "@/shared/ui/FloatingTabBar";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarLabel: "Carte",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          tabBarLabel: "Santé",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="pulse" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="audio"
        options={{
          tabBarLabel: "Audio",
          tabBarIcon: ({ color, size }) => (
            <Feather name="music" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="person" color={color} size={size} />
          ),
        }}
      />
      {/* Pushed screen (opened from the home bell) — hidden from the tab bar. */}
      <Tabs.Screen name="alerts" options={{ href: null }} />
    </Tabs>
  );
}
