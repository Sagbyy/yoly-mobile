import { getPairingStatus, type PairingStatus } from "@/shared/api/pairing";
import { useQuery } from "@tanstack/react-query";

export function useLastSync() {
  return useQuery<PairingStatus>({
    queryKey: ["pairing", "status"],
    queryFn: getPairingStatus,
  });
}
