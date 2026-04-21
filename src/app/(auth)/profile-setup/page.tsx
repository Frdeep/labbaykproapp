'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, Phone, Globe } from 'lucide-react';

export default function ProfileSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;
    const phone = formData.get('phone') as string;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError('Session expirée. Veuillez vous reconnecter.');
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
      })
      .eq('id', user.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.push('/');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 mt-4"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-display-m text-ink-900">Complétez votre profil</h1>
        <p className="text-body text-ink-400">
          Quelques informations pour personnaliser votre expérience
        </p>
      </div>

      {/* Avatar placeholder */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-beige-900 flex items-center justify-center shadow-float">
          <User className="w-10 h-10 text-gold-300" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-state-error/10 border border-state-error/20 rounded-xl px-4 py-3 text-state-error text-body">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="setup-fn" className="text-caption text-ink-500">Prénom</label>
            <Input id="setup-fn" name="first_name" placeholder="Prénom" required />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="setup-ln" className="text-caption text-ink-500">Nom</label>
            <Input id="setup-ln" name="last_name" placeholder="Nom" required />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="setup-phone" className="text-caption text-ink-500">Téléphone</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
            <Input
              id="setup-phone"
              name="phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              className="pl-12"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="setup-lang" className="text-caption text-ink-500">Langue préférée</label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
            <select
              id="setup-lang"
              name="preferred_language"
              className="flex h-12 w-full rounded-xl border border-ink-200 bg-white pl-12 pr-4 py-2 text-body ring-offset-ivory-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:border-focus transition-colors duration-200 appearance-none cursor-pointer"
              defaultValue="fr"
            >
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          variant="beige"
          size="lg"
          shape="pill"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? 'Enregistrement...' : 'Terminer'}
        </Button>
      </form>
    </motion.div>
  );
}
