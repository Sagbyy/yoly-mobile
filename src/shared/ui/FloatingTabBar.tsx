import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Micro } from "@/shared/ui/typography";

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute left-4 right-4 flex-row rounded-2xl bg-white px-2 py-3"
      style={{
        bottom: insets.bottom + 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

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
              color: isFocused ? "#3b82f6" : "#9ca3af",
              size: 22,
            })}
            <Micro className={isFocused ? "text-accent" : "text-gray-400"}>
              {options.tabBarLabel as string}
            </Micro>
          </Pressable>
        );
      })}
    </View>
  );
}
