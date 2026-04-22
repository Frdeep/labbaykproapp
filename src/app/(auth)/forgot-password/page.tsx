'use client';

import { useActionState } from 'react';
import { resetPassword, type AuthState } from '@/app/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(resetPassword, undefined);

  if (state?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 mt-12 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-state-success/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-state-success" />
        </div>
        <h2 className="text-display-m text-ink-900">Email envoyé !</h2>
        <p className="text-body text-ink-400 max-w-[300px]">
          Vérifiez votre boîte de réception et suivez le lien pour réinitialiser votre mot de passe.
        </p>
        <Link href="/login">
          <Button variant="beige" shape="pill" size="lg" className="mt-4">
            Retour à la connexion
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 mt-4"
    >
      {/* Back link */}
      <Link href="/login" className="flex items-center gap-2 text-body text-ink-400 hover:text-ink-700 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Link>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-display-m text-ink-900">Mot de passe oublié</h1>
        <p className="text-body text-ink-400">
          Entrez votre email et nous vous enverrons un lien de réinitialisation.
        </p>
      </div>

      {/* Form */}
      <form action={action} className="flex flex-col gap-4">
        {state?.error && (
          <div className="bg-state-error/10 border border-state-error/20 rounded-xl px-4 py-3 text-state-error text-body">
            {state.error}
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="forgot-email" className="text-caption text-ink-500">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
            <Input
              id="forgot-email"
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

        <Button
          type="submit"
          variant="beige"
          size="lg"
          shape="pill"
          className="w-full mt-2"
          disabled={pending}
        >
          {pending ? 'Envoi...' : 'Envoyer le lien'}
        </Button>
      </form>
    </motion.div>
  );
}
