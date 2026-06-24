import { useAuthStore } from "@/features/auth/login";
import { WatchSyncSuccess } from "@/features/watch-sync";

export function WatchSyncSuccessPage() {
  const markWatchSynced = useAuthStore((s) => s.markWatchSynced);
  return <WatchSyncSuccess onContinue={markWatchSynced} />;
}
