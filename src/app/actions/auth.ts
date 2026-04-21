'use server';

// ─── Auth Server Actions ────────────────────────────────────
// All auth mutations as Next.js Server Actions.

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { LoginSchema, SignupSchema, ForgotPasswordSchema } from '@/lib/validations/auth';

export type AuthState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  success?: boolean;
} | undefined;

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const raw = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    password: formData.get('password') as string,
  };

  const validated = SignupSchema.safeParse(raw);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      data: {
        first_name: validated.data.first_name,
        last_name: validated.data.last_name,
        phone: validated.data.phone ?? '',
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/login?registered=true');
}

export async function signIn(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validated = LoginSchema.safeParse(raw);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  if (error) {
    return { error: 'Email ou mot de passe incorrect.' };
  }

  redirect('/');
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function resetPassword(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const raw = { email: formData.get('email') as string };

  const validated = ForgotPasswordSchema.safeParse(raw);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(validated.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/profile-setup`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signInWithOAuth(provider: 'google') {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}
