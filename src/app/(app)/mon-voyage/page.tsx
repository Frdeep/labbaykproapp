'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { ScreenHeader } from '@/components/layout/screen-header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Plane, FileCheck, Phone, CheckSquare, MapPin } from 'lucide-react';
import { DocumentUploadCard } from '@/components/common/document-upload-card';
import Link from 'next/link';

// Mock booking data (will be fetched from Supabase when live)
const mockBooking = {
  reference: 'LBK-A7K3M2',
  formuleTitle: 'Omra Vacances de la Toussaint',
  status: 'confirmed' as const,
  dates: '18 Oct — 31 Oct 2024',
  departureIn: 12,
};

const statusSteps = [
  { label: 'Réservation', done: true },
  { label: 'Documents', done: true },
  { label: 'Confirmation', done: true },
  { label: 'Départ', done: false },
  { label: 'Retour', done: false },
];

export default function MonVoyagePage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    }
    loadUser();
  }, []);

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Mon Voyage" />

      <div className="px-5 py-6 flex flex-col gap-6">
        {/* Booking card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-beige-900 rounded-3xl p-6 shadow-float"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-caption text-gold-300/60">{mockBooking.reference}</span>
            <span className="px-3 py-1 rounded-pill bg-state-success/20 text-state-success text-micro">
              Confirmé ✓
            </span>
          </div>
          <h2 className="text-title text-gold-100 mb-2">{mockBooking.formuleTitle}</h2>
          <p className="text-body text-gold-300/80">{mockBooking.dates}</p>

          <div className="mt-6 flex items-center gap-3 bg-black/20 rounded-xl px-4 py-3">
            <Plane className="w-5 h-5 text-gold-300" />
            <div>
              <p className="text-micro text-gold-300/60">DÉPART DANS</p>
              <p className="text-h2 text-gold-100 tabular">{mockBooking.departureIn} jours</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <section>
          <h3 className="text-caption text-ink-400 mb-4">PROGRESSION</h3>
          <div className="flex items-center gap-1">
            {statusSteps.map((step, i) => (
              <div key={step.label} className="flex-1 flex flex-col items-center gap-2">
                <div className={`w-full h-1.5 rounded-full ${step.done ? 'bg-state-success' : 'bg-ink-100'}`} />
                <span className={`text-[10px] font-medium text-center ${step.done ? 'text-state-success' : 'text-ink-300'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick links & Documents */}
        <section>
          <h3 className="text-caption text-ink-400 mb-4">MES DOCUMENTS</h3>
          {userId ? (
            <div className="space-y-4 mb-6">
              <DocumentUploadCard 
                userId={userId} 
                docType="passport" 
                title="Passeport" 
                description="Copie couleur de la double page." 
              />
              <DocumentUploadCard 
                userId={userId} 
                docType="selfie" 
                title="Photo d'identité" 
                description="Format passeport, fond blanc." 
              />
            </div>
          ) : (
            <p className="text-body text-ink-400 mb-6">Connexion requise pour uploader des documents.</p>
          )}

          <h3 className="text-caption text-ink-400 mb-4">RACCOURCIS</h3>
          <div className="space-y-3">
            <QuickLink icon={<FileCheck className="w-5 h-5" />} label="Tous mes documents" description="Passeport, visa, vaccinations" href="#docs" />
            <QuickLink icon={<Phone className="w-5 h-5" />} label="Contacter l'agence" description="01 42 53 01 46" href="tel:+33142530146" />
            <QuickLink icon={<CheckSquare className="w-5 h-5" />} label="Check-list voyage" description="Préparez votre valise" href="#checklist" />
            <QuickLink icon={<MapPin className="w-5 h-5" />} label="Hôtels & itinéraire" description="Voco Makkah, Anwar Al Madinah" href="#hotels" />
          </div>
        </section>

        {/* CTA */}
        <Link href="/offres">
          <Button variant="secondary" shape="pill" size="lg" className="w-full">
            Voir d&apos;autres formules
          </Button>
        </Link>
      </div>
    </div>
  );
}

function QuickLink({ icon, label, description, href }: { icon: React.ReactNode; label: string; description: string; href: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-card hover:shadow-float transition-shadow">
        <div className="w-10 h-10 rounded-xl bg-beige-900/10 flex items-center justify-center text-beige-900">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-body font-semibold text-ink-900">{label}</p>
          <p className="text-[12px] text-ink-400">{description}</p>
        </div>
      </div>
    </Link>
  );
}
