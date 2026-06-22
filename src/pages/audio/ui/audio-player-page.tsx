import { AudioPlayer } from "@/features/audio/audio-player";
import { findRecording } from "@/features/audio/recordings-list";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export function AudioPlayerPage() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const recording = findRecording(id);

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]} style={{ backgroundColor: "#0B0B0D" }}>
      <AudioPlayer recording={recording} />
    </SafeAreaView>
  );
}
