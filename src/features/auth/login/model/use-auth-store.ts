import { getPairingStatus } from "@/shared/api/pairing";
import { auth } from "@/shared/lib/firebase";
import { createLogger } from "@/shared/lib/logger";
import { storage } from "@/shared/lib/storage";
import {
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { create } from "zustand";
import { AuthState } from "../types/auth-state";

const syncKey = (uid: string) => `watch-synced:${uid}`;
const log = createLogger("auth");

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  watchSync: "unknown",
  signIn: (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(() => {}),
  signOut: () => firebaseSignOut(auth),
  markWatchSynced: async () => {
    const uid = get().user?.uid;
    if (uid) await storage.set(syncKey(uid), "1");
    set({ watchSync: "synced" });
  },
  markWatchUnsynced: async () => {
    const uid = get().user?.uid;
    if (uid) await storage.set(syncKey(uid), "0");
    set({ watchSync: "unsynced" });
  },
  init: () =>
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        set({ user: null, watchSync: "unknown", isLoading: false });
        return;
      }
      set({ user, watchSync: "unknown" });
      try {
        const { linked } = await getPairingStatus();
        await storage.set(syncKey(user.uid), linked ? "1" : "0");
        set({ watchSync: linked ? "synced" : "unsynced", isLoading: false });
      } catch (error) {
        log.warn("pairing status unreachable, using cached value", error);
        const cached = await storage.get(syncKey(user.uid));
        set({ watchSync: cached === "1" ? "synced" : "unsynced", isLoading: false });
      }
    }),
}));
