import { useAuthStore } from "@/features/auth/login";
import { getUserDisplay } from "@/shared/lib/user";

import type { HomeUser } from "./types";

export function useHomeUser(): HomeUser {
  const user = useAuthStore((state) => state.user);
  const { firstName, initials } = getUserDisplay(user);

  return {
    initials,
    greetingName: firstName,
    hasNotifications: true,
  };
}
