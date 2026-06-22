import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Micro } from "@/shared/ui/typography";
import { cn } from "../lib";

// Immersive dark screens that should hide the floating tab bar entirely.
const HIDDEN_ON = ["audio-player", "audio-call"];

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const focusedName = state.routes[state.index]?.name;
  if (HIDDEN_ON.includes(focusedName)) return null;

  return (
    <View
      className="absolute left-4 right-4 flex-row rounded-[30px] bg-white p-5"
      style={{
        bottom: insets.bottom,
        boxShadow:
          "0 20px 50px -10px rgba(15,26,51,.18), 0 4px 10px rgba(15,26,51,.06)",
        elevation: 8,
      }}
    >
      {state.routes
        .filter((route) => descriptors[route.key].options.tabBarIcon)
        .map((route) => {
        const { options } = descriptors[route.key];
        const isFocused = state.routes[state.index]?.key === route.key;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center justify-center gap-1"
          >
            {options.tabBarIcon?.({
              focused: isFocused,
              color: isFocused ? "#000" : "#9ca3af",
              size: 18,
            })}
            <Micro
              className={cn(
                isFocused ? "text-black" : "text-gray-400",
                "normal-case text-center",
              )}
            >
              {options.tabBarLabel as string}
            </Micro>
          </Pressable>
        );
      })}
    </View>
  );
}
