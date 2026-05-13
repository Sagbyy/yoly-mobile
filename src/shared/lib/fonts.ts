import * as Font from "expo-font";

export function useLoadFonts() {
  return Font.useFonts({
    "Geist-Regular":    require("../../../assets/fonts/Geist-Regular.ttf"),
    "Geist-Medium":     require("../../../assets/fonts/Geist-Medium.ttf"),
    "Geist-SemiBold":   require("../../../assets/fonts/Geist-SemiBold.ttf"),
    "Geist-Bold":       require("../../../assets/fonts/Geist-Bold.ttf"),
    "GeistMono-Regular":require("../../../assets/fonts/GeistMono-Regular.ttf"),
    "GeistMono-Medium": require("../../../assets/fonts/GeistMono-Medium.ttf"),
  });
}
