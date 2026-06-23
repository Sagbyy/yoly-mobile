import { auth } from "@/shared/lib/firebase";
import { storage } from "@/shared/lib/storage";
import {
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { create } from "zustand";
import { AuthState } from "../types/auth-state";

// Local record of "this account has paired a watch", keyed by uid.
// NOTE: this is the source of truth until the API exposes a
// "GET /pairing/status" (or "/devices") endpoint — swap the read in `init`
// for that call to make the gate robust across reinstalls.
const syncKey = (uid: string) => `watch-synced:${uid}`;

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
  init: () =>
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        set({ user: null, watchSync: "unknown", isLoading: false });
        return;
      }
      set({ user, watchSync: "unknown" });
      const synced = await storage.get(syncKey(user.uid));
      set({ watchSync: synced ? "synced" : "unsynced", isLoading: false });
    }),
}));
