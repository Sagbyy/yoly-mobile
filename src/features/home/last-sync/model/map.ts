import type { PairingStatus } from "@/shared/api/pairing";
import { formatRelativeTime } from "@/shared/lib/relative-time";

export function lastSyncText(
  status: PairingStatus | undefined,
  now: number = Date.now(),
): string {
  if (!status?.linked || !status.device) return "Montre non synchronisée";

  const { lastSeenAt } = status.device;
  if (!lastSeenAt) return "En attente de synchronisation";

  const relative = formatRelativeTime(lastSeenAt, now);
  return relative ? `Dernière synchro ${relative}` : "Montre synchronisée";
}
