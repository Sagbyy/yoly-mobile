import { User } from "firebase/auth";

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  init: () => () => void;
};

