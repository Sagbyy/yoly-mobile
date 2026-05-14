import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.string().min(2, "Minimum 2 caractères"),
  lastName: z.string().min(2, "Minimum 2 caractères"),
});

export const emailSchema = z.object({
  email: z.string().email("Email invalide"),
});

export const phoneSchema = z.object({
  phone: z.string().regex(/^\+\d{10,15}$/, "Format requis : +33612345678"),
});

export const otpSchema = z.object({
  code: z.string().length(6, "6 chiffres requis"),
});

export const passwordSchema = z
  .object({
    password: z.string().min(8, "8 caractères minimum"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

export type NameForm = z.infer<typeof nameSchema>;
export type EmailForm = z.infer<typeof emailSchema>;
export type PhoneForm = z.infer<typeof phoneSchema>;
export type OTPForm = z.infer<typeof otpSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
