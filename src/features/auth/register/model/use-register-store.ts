import { create } from "zustand";

type RegisterStore = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  set: (data: Partial<Omit<RegisterStore, "set" | "reset">>) => void;
  reset: () => void;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  set: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set({ firstName: "", lastName: "", email: "", phone: "" }),
}));
