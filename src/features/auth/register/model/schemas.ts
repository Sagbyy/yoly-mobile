import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.string().min(2, "Minimum 2 caractères"),
  lastName: z.string().min(2, "Minimum 2 caractères"),
});

export const emailSchema = z.object({
  email: z.string().email("Email invalide"),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "8 caractères minimum")
      .regex(/[A-Z]/, "Au moins une majuscule")
      .regex(/[0-9]/, "Au moins un chiffre")
      .regex(/[^A-Za-z0-9]/, "Au moins un caractère spécial"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

export const phoneSchema = z.object({
  phone: z.string().regex(/^\+\d{10,15}$/, "Format requis : +33612345678"),
});

export type NameForm = z.infer<typeof nameSchema>;
export type EmailForm = z.infer<typeof emailSchema>;
export type PhoneForm = z.infer<typeof phoneSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
