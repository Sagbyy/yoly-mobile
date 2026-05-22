import { Eye, EyeOff } from "lucide-react-native";
import { Pressable } from "react-native";

interface YEyeToggleProps {
  visible: boolean;
  onToggle: () => void;
  testID?: string;
}

export function YEyeToggle({ visible, onToggle, testID }: YEyeToggleProps) {
  return (
    <Pressable
      onPress={onToggle}
      testID={testID ?? 'eye-toggle'}
      className="pl-3 py-4"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      {visible ? <EyeOff size={18} color="#A3A8C3" /> : <Eye size={18} color="#A3A8C3" />}
    </Pressable>
  );
}
