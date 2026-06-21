import { routes } from "@/shared/config/routes";
import type { Href } from "expo-router";

export type ProfileMenuIcon = "moon";

export interface ProfileMenuItem {
  id: string;
  label: string;
  hint: string;
  icon: ProfileMenuIcon;
  route: Href;
}

export const profileMenu: ProfileMenuItem[] = [
  {
    id: "quiet-modes",
    label: "Modes calmes",
    hint: "École, sommeil, sport…",
    icon: "moon",
    route: routes.profile.quietModes,
  },
];
