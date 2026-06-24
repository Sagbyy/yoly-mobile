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

export function getPairingStatus() {
  return api.get<PairingStatus>("/pairing/status");
}

export function confirmPairing(code: string) {
  return api.post<ConfirmPairingResponse>("/pairing/confirm", { code });
}

export function unlinkWatch() {
  return api.delete<void>("/pairing/link");
}
