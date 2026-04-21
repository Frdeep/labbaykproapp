'use client';

import { useActionState } from 'react';
import { signIn, signInWithOAuth, type AuthState } from '@/app/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signIn, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 w-full"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-display-m text-ink-900">Bon retour</h1>
        <p className="text-body text-ink-400">
          Connectez-vous à votre compte Labbayk
        </p>
      </div>

      {/* Login form */}
      <form action={action} className="flex flex-col gap-4">
        {/* Global error */}
        {state?.error && (
          <div className="bg-state-error/10 border border-state-error/20 rounded-xl px-4 py-3 text-state-error text-body">
            {state.error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="text-caption text-ink-500">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
            <Input
              id="login-email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              autoComplete="email"
              className="pl-12"
              required
            />
          </div>
          {state?.fieldErrors?.email && (
            <p className="text-micro text-state-error">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-caption text-ink-500">Mot de passe</label>
            <Link href="/forgot-password" className="text-micro text-gold-600 hover:text-gold-700 transition-colors">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
            <Input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              className="pl-12 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {state?.fieldErrors?.password && (
            <p className="text-micro text-state-error">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="beige"
          size="lg"
          shape="pill"
          className="w-full mt-2"
          disabled={pending}
        >
          {pending ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>



      {/* Signup link */}
      <p className="text-body text-ink-400 text-center pb-6">
        Pas encore de compte ?{' '}
        <Link href="/signup" className="text-gold-600 font-semibold hover:text-gold-700 transition-colors">
          Créer un compte
        </Link>
      </p>
    </motion.div>
  );
}
