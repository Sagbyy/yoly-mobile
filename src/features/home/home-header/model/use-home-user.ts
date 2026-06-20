import { useAuthStore } from "@/features/auth/login";

import type { HomeUser } from "./types";

/** Initials from a full name, e.g. "Sarah Rossi" → "SR". */
function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * Derives the home header view-model from the authenticated account.
 * Greeting uses the real first name parsed from the Firebase displayName
 * (set at registration as "firstName lastName"), falling back to the email
 * local-part, then a neutral default.
 */
export function useHomeUser(): HomeUser {
  const user = useAuthStore((state) => state.user);

  const displayName = user?.displayName?.trim() ?? "";
  const emailLocalPart = user?.email?.split("@")[0] ?? "";
  const fullName = displayName || emailLocalPart;

  const greetingName = fullName.split(/\s+/)[0] || "vous";

  return {
    initials: fullName ? initialsFrom(fullName) : "?",
    greetingName,
    hasNotifications: true,
  };
}
