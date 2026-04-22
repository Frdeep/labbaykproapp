'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { User, Mail, Phone, Globe, LogOut, ChevronRight, HelpCircle, FileText, Shield } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/screen-header';
import { Button } from '@/components/ui/button';
import { signOut } from '@/app/actions/auth';
import { createClient } from '@/lib/supabase-browser';
import Link from 'next/link';

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col">
        <ScreenHeader title="Mon Profil" />
        <div className="px-5 py-6 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <div className="w-24 h-24 rounded-full bg-ink-100" />
            <div className="h-6 w-32 bg-ink-100 rounded-md" />
            <div className="h-4 w-48 bg-ink-100 rounded-md" />
          </div>
          <div className="h-32 bg-white rounded-2xl animate-pulse shadow-card" />
          <div className="h-16 bg-white rounded-2xl animate-pulse shadow-card" />
          <div className="h-32 bg-white rounded-2xl animate-pulse shadow-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Mon Profil" />

      <div className="px-5 py-6 flex flex-col gap-6">
        {/* Avatar + Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-24 h-24 rounded-full bg-beige-900 flex items-center justify-center shadow-float">
            <span className="text-display-l text-gold-300">
              {profile?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="text-center">
            <h2 className="text-h1 text-ink-900">
              {profile ? `${profile.first_name} ${profile.last_name}` : 'Utilisateur'}
            </h2>
            <p className="text-body text-ink-400">{user?.email || 'Non connecté'}</p>
          </div>
        </motion.div>

        {/* Info section */}
        <section>
          <h3 className="text-caption text-ink-400 mb-3">INFORMATIONS</h3>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden divide-y divide-ink-100/50">
            <InfoRow icon={<Mail className="w-5 h-5" />} label="Email" value={user?.email || '—'} />
            <InfoRow icon={<Phone className="w-5 h-5" />} label="Téléphone" value={profile?.phone || '—'} />
            <InfoRow icon={<Globe className="w-5 h-5" />} label="Langue" value="Français" />
          </div>
        </section>

        {/* Mon voyage shortcut */}
        <section>
          <h3 className="text-caption text-ink-400 mb-3">MON VOYAGE</h3>
          <Link href="/mon-voyage">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-card hover:shadow-float transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-beige-900 flex items-center justify-center text-gold-300">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-body font-semibold text-ink-900">Tableau de bord voyage</span>
              </div>
              <ChevronRight className="w-5 h-5 text-ink-300" />
            </div>
          </Link>
        </section>

        {/* Links */}
        <section>
          <h3 className="text-caption text-ink-400 mb-3">AIDE & LÉGAL</h3>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden divide-y divide-ink-100/50">
            <LinkRow icon={<HelpCircle className="w-5 h-5" />} label="Aide & FAQ" href="#" />
            <LinkRow icon={<FileText className="w-5 h-5" />} label="Conditions générales" href="#" />
            <LinkRow icon={<Shield className="w-5 h-5" />} label="Politique de confidentialité" href="#" />
          </div>
        </section>

        {/* Logout */}
        <form action={signOut}>
          <Button variant="ghost" size="lg" className="w-full text-state-error hover:bg-state-error/5 gap-2">
            <LogOut className="w-5 h-5" />
            Se déconnecter
          </Button>
        </form>

        {/* Agency info */}
        <div className="text-center py-4">
          <p className="text-micro text-ink-300">Labbayk Voyages</p>
          <p className="text-[10px] text-ink-200 mt-1">17 rue Le Bua, 75020 Paris</p>
          <p className="text-[10px] text-ink-200">v0.1.0</p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="text-ink-400">{icon}</span>
      <span className="text-body text-ink-400 w-24">{label}</span>
      <span className="text-body text-ink-900 flex-1 text-right">{value}</span>
    </div>
  );
}

function LinkRow({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-ink-100/30 transition-colors">
        <span className="text-ink-400">{icon}</span>
        <span className="text-body text-ink-700 flex-1">{label}</span>
        <ChevronRight className="w-4 h-4 text-ink-300" />
      </div>
    </Link>
  );
}
