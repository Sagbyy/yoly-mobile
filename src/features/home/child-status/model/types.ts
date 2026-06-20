import type { AvatarTone } from "@/shared/ui/yoly";

export interface ChildStatus {
  name: string;
  age: number;
  avatarInitials: string;
  avatarTone: AvatarTone;
  /** Current place, e.g. "École Jules Ferry". */
  location: string;
  /** Distance from home, e.g. "720m". */
  distance: string;
  /** Reassuring one-liner shown as the page headline, e.g. "Maya is calm". */
  statusHeadline: string;
  /** Watch battery percentage (0–100). */
  watchBattery: number;
  /** Estimated battery autonomy left, in hours. */
  watchHoursLeft: number;
  /** Whether the live tracking pill is shown. */
  isLive: boolean;
}
