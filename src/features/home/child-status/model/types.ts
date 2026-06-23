import type { AvatarTone } from "@/shared/ui/yoly";

export interface ChildStatus {
  name: string;
  age: number;
  avatarInitials: string;
  avatarTone: AvatarTone;
  location: string;
  distance: string;
  statusHeadline: string;
  watchBattery: number;
  watchHoursLeft: number;
  isLive: boolean;
}
