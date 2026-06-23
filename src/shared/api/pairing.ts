import { api } from "./client";

export interface LinkedDevice {
  deviceUuid: string;
  createdAt: string;
  lastSeenAt: string | null;
}

export interface PairingStatus {
  linked: boolean;
  device?: LinkedDevice | null;
}

export interface ConfirmPairingResponse {
  status: "CONFIRMED";
}

/** GET /pairing/status — is the current account linked to a watch? (Firebase auth) */
export function getPairingStatus() {
  return api.get<PairingStatus>("/pairing/status");
}

/** POST /pairing/confirm — confirm pairing with the 6-digit code shown on the watch. */
export function confirmPairing(code: string) {
  return api.post<ConfirmPairingResponse>("/pairing/confirm", { code });
}
