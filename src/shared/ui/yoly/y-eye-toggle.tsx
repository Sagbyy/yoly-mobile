import { Eye, EyeOff } from "lucide-react-native";
import { Pressable } from "react-native";

interface YEyeToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export function YEyeToggle({ visible, onToggle }: YEyeToggleProps) {
  return (
    <Pressable
      onPress={onToggle}
      className="pl-3 py-4"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      {visible ? <EyeOff size={18} color="#A3A8C3" /> : <Eye size={18} color="#A3A8C3" />}
    </Pressable>
  );
}
