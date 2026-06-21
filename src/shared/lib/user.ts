import type { User } from "firebase/auth";

/** Initials from a full name, e.g. "Sarah Rossi" → "SR". */
function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export interface UserDisplay {
  /** Full name (displayName, or email local-part as fallback). */
  fullName: string;
  /** First name for greetings, falling back to "vous". */
  firstName: string;
  /** Avatar initials, or "?" when unknown. */
  initials: string;
}

/**
 * Derives display info from a Firebase user. The displayName is set at
 * registration as "firstName lastName"; falls back to the email local-part.
 */
export function getUserDisplay(user: User | null): UserDisplay {
  const displayName = user?.displayName?.trim() ?? "";
  const emailLocalPart = user?.email?.split("@")[0] ?? "";
  const fullName = displayName || emailLocalPart;

  return {
    fullName,
    firstName: fullName.split(/\s+/)[0] || "vous",
    initials: fullName ? initialsFrom(fullName) : "?",
  };
}
