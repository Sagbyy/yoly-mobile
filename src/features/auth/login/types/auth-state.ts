import { User } from "firebase/auth";

/** Whether the signed-in account has at least one paired watch. */
export type WatchSyncStatus = "unknown" | "synced" | "unsynced";

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  /** Resolved after auth so the router can gate access on a paired watch. */
  watchSync: WatchSyncStatus;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  /** Marks the current account as paired (after a successful pairing confirm). */
  markWatchSynced: () => Promise<void>;
  init: () => () => void;
};
