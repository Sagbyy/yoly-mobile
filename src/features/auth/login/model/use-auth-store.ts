import { auth } from "@/shared/lib/firebase";
import {
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { create } from "zustand";
import { AuthState } from "../types/auth-state";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  signIn: (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(() => {}),
  signOut: () => firebaseSignOut(auth),
  init: () =>
    onAuthStateChanged(auth, (user) => set({ user, isLoading: false })),
}));
