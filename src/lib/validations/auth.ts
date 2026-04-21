// ─── Auth Validation Schemas ────────────────────────────────
// Zod schemas for auth form validation.

import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Veuillez entrer un email valide.'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
});

export const SignupSchema = z.object({
  first_name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères.').trim(),
  last_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères.').trim(),
  email: z.string().email('Veuillez entrer un email valide.').trim(),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, 'Au moins 8 caractères.')
    .regex(/[a-zA-Z]/, 'Doit contenir au moins une lettre.')
    .regex(/[0-9]/, 'Doit contenir au moins un chiffre.')
    .trim(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Veuillez entrer un email valide.'),
});

export const ProfileSetupSchema = z.object({
  first_name: z.string().min(2).trim(),
  last_name: z.string().min(2).trim(),
  phone: z.string().optional(),
  preferred_language: z.enum(['fr', 'ar', 'en']).default('fr'),
  notifications_enabled: z.boolean().default(true),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type SignupFormData = z.infer<typeof SignupSchema>;
export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
export type ProfileSetupFormData = z.infer<typeof ProfileSetupSchema>;
