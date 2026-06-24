import { User } from "firebase/auth";

export type WatchSyncStatus = "unknown" | "synced" | "unsynced";

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  watchSync: WatchSyncStatus;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  markWatchSynced: () => Promise<void>;
  markWatchUnsynced: () => Promise<void>;
  init: () => () => void;
};
