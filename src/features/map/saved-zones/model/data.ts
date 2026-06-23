import { colors } from "@/shared/config/tokens";

export interface SavedZone {
  id: string;
  name: string;
  address: string;
  color: string;
  emoji: string;
  schedule: string;
  enabled: boolean;
}

export const savedZones: SavedZone[] = [
  {
    id: "home",
    name: "Maison",
    address: "12 rue Berthelot · Paris",
    color: colors.health,
    emoji: "🏠",
    schedule: "Toujours",
    enabled: true,
  },
  {
    id: "school",
    name: "École",
    address: "École Jules Ferry · 720m",
    color: colors.accent,
    emoji: "🏫",
    schedule: "Lun-Ven",
    enabled: true,
  },
  {
    id: "aunt",
    name: "Tante Léa",
    address: "8 av. de Choisy",
    color: colors.warn,
    emoji: "💛",
    schedule: "Mer",
    enabled: true,
  },
  {
    id: "sport",
    name: "Sport",
    address: "Stade Charléty · 1,2 km",
    color: colors.stress,
    emoji: "⚽",
    schedule: "Mar, Jeu",
    enabled: false,
  },
  {
    id: "grandma",
    name: "Mamie",
    address: "Versailles",
    color: colors.sleep,
    emoji: "🌷",
    schedule: "Week-ends",
    enabled: false,
  },
];
