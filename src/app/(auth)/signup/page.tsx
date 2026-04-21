'use client';

import { useActionState } from 'react';
import { signUp, type AuthState } from '@/app/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signUp, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 w-full"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-display-m text-ink-900">Créer un compte</h1>
        <p className="text-body text-ink-400">
          Rejoignez Labbayk pour préparer votre pèlerinage
        </p>
      </div>

      {/* Signup form */}
      <form action={action} className="flex flex-col gap-4">
        {/* Global error */}
        {state?.error && (
          <div className="bg-state-error/10 border border-state-error/20 rounded-xl px-4 py-3 text-state-error text-body">
            {state.error}
          </div>
        )}

        {/* First name + Last name row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="signup-firstname" className="text-caption text-ink-500">Prénom</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
              <Input
                id="signup-firstname"
                name="first_name"
                placeholder="Prénom"
                autoComplete="given-name"
                className="pl-10"
                required
              />
            </div>
            {state?.fieldErrors?.first_name && (
              <p className="text-micro text-state-error">{state.fieldErrors.first_name[0]}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="signup-lastname" className="text-caption text-ink-500">Nom</label>
            <Input
              id="signup-lastname"
              name="last_name"
              placeholder="Nom"
              autoComplete="family-name"
              required
            />
            {state?.fieldErrors?.last_name && (
              <p className="text-micro text-state-error">{state.fieldErrors.last_name[0]}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="text-caption text-ink-500">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
            <Input
              id="signup-email"
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

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="signup-phone" className="text-caption text-ink-500">Téléphone <span className="text-ink-300">(optionnel)</span></label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
            <Input
              id="signup-phone"
              name="phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
              className="pl-12"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="signup-password" className="text-caption text-ink-500">Mot de passe</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
            <Input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 caractères, 1 lettre, 1 chiffre"
              autoComplete="new-password"
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
            <div className="space-y-0.5">
              {state.fieldErrors.password.map((err) => (
                <p key={err} className="text-micro text-state-error">• {err}</p>
              ))}
            </div>
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
          {pending ? 'Création...' : 'Créer mon compte'}
        </Button>
      </form>



      {/* Login link */}
      <p className="text-body text-ink-400 text-center pb-6">
        Déjà un compte ?{' '}
        <Link href="/login" className="text-gold-600 font-semibold hover:text-gold-700 transition-colors">
          Se connecter
        </Link>
      </p>
    </motion.div>
  );
}
