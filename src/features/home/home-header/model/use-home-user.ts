import { useAuthStore } from "@/features/auth/login";
import { getUserDisplay } from "@/shared/lib/user";

import type { HomeUser } from "./types";

/**
 * Derives the home header view-model from the authenticated account.
 * Greeting uses the real first name parsed from the Firebase displayName
 * (set at registration as "firstName lastName"), falling back to the email
 * local-part, then a neutral default.
 */
export function useHomeUser(): HomeUser {
  const user = useAuthStore((state) => state.user);
  const { firstName, initials } = getUserDisplay(user);

  return {
    initials,
    greetingName: firstName,
    hasNotifications: true,
  };
}
