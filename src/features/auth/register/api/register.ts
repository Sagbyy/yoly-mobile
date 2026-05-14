import { firebaseApp } from "@/shared/lib/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPhoneNumber,
  updateProfile,
  type ConfirmationResult,
} from "firebase/auth";

function getFirebaseAuth() {
  return getAuth(firebaseApp);
}

export async function sendOTP(phone: string): Promise<ConfirmationResult> {
  const auth = getFirebaseAuth();
  return signInWithPhoneNumber(auth, phone, undefined);
}

export async function verifyOTP(
  confirmation: ConfirmationResult,
  code: string,
) {
  return confirmation.confirm(code);
}

export async function createAccount(email: string, password: string) {
  const auth = getFirebaseAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function updateDisplayName(name: string) {
  const auth = getFirebaseAuth();
  if (auth.currentUser) {
    return updateProfile(auth.currentUser, { displayName: name });
  }
}
