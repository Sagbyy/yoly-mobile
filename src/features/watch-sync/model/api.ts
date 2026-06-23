import { api } from "@/shared/api/client";

export interface ConfirmPairingResponse {
  status: "CONFIRMED";
}

/**
 * Confirms pairing with the 6-digit code shown on the watch.
 * POST /pairing/confirm — requires the Firebase ID token (attached by the API client).
 */
export function confirmPairing(code: string) {
  return api.post<ConfirmPairingResponse>("/pairing/confirm", { code });
}
