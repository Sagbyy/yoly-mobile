import type { User } from "firebase/auth";

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export interface UserDisplay {
  fullName: string;
  firstName: string;
  initials: string;
}

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
