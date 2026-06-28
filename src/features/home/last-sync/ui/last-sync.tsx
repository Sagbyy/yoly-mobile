import { colors } from "@/shared/config/tokens";
import { Caption } from "@/shared/ui";
import { useEffect, useReducer } from "react";
import { View } from "react-native";

import { lastSyncText } from "../model/map";
import { useLastSync } from "../model/use-last-sync";

const TICK_INTERVAL_MS = 30_000;

export function LastSync() {
  const { data, isPending, isError } = useLastSync();
  const [, tick] = useReducer((count: number) => count + 1, 0);

  useEffect(() => {
    const id = setInterval(tick, TICK_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  if (isError) return null;

  const text = isPending ? "Synchronisation…" : lastSyncText(data);

  return (
    <View className="mt-1.5 flex-row items-center gap-1.5">
      <View
        style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: colors.liveDot }}
      />
      <Caption className="text-ink-3">{text}</Caption>
    </View>
  );
}
