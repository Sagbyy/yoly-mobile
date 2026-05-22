import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View, type ViewProps } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface StepLayoutProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  showBack?: boolean;
  contentStyle?: ViewProps["style"];
}

export function StepLayout({
  children,
  footer,
  showBack = true,
  contentStyle,
}: StepLayoutProps) {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right"]}
    >
      <View className="pb-4">
        {showBack && (
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center active:bg-neutral-200"
          >
            <ArrowLeft size={18} color="#0B0B0D" strokeWidth={2} />
          </Pressable>
        )}
      </View>

      <KeyboardAwareScrollView
        bottomOffset={16}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={contentStyle}>{children}</View>
      </KeyboardAwareScrollView>

      <KeyboardStickyView offset={{ closed: -bottom, opened: 0 }}>
        <View className="pt-8">{footer}</View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
}
