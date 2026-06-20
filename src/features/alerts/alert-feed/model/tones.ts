import { colors } from "@/shared/config/tokens";

import type { AlertTone } from "./types";

/** Foreground (glyph) + soft chip background for each alert tone. */
export const TONE_STYLES: Record<AlertTone, { color: string; soft: string }> = {
  alert: { color: colors.alert, soft: colors.alertSoft },
  stress: { color: colors.stress, soft: colors.stressSoft },
  warn: { color: colors.warn, soft: colors.warnSoft },
  accent: { color: colors.accent, soft: colors.accentSoft },
  health: { color: colors.health, soft: colors.healthSoft },
  neutral: { color: colors.ink3, soft: colors.surface3 },
};
