import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/shared/lib/firebase";

export async function registerWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, {
    displayName: `${firstName} ${lastName}`,
  });
  await sendEmailVerification(credential.user);
  return credential.user;
}
