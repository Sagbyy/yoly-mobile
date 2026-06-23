import { z } from "zod";

export const pairingSchema = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, "Entrez les 6 chiffres affichés sur la montre."),
});

export type PairingForm = z.infer<typeof pairingSchema>;
