'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Plane, Hotel, Utensils, Shield, Calendar, Clock, Luggage } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PriceTable } from '@/components/formule/price-table';
import { StatusPill } from '@/components/common/status-pill';
import type { Formule, FormuleStatus } from '@/types/formule';

const statusConfig: Record<FormuleStatus, { label: string; tone: 'gold' | 'success' | 'error' | 'muted' }> = {
  available: { label: 'Disponible', tone: 'success' },
  last_spots: { label: 'Dernières places', tone: 'gold' },
  sold_out: { label: 'Complet', tone: 'error' },
  new: { label: 'Nouveau', tone: 'gold' },
  info_only: { label: 'Info', tone: 'muted' },
  draft: { label: 'Brouillon', tone: 'muted' },
};

interface FormuleDetailClientProps {
  formule: Formule;
}

export function FormuleDetailClient({ formule }: FormuleDetailClientProps) {
  const router = useRouter();
  const f = formule;

  const hasVoco = f.hotel_makkah?.toLowerCase().includes('voco') || f.hotel_medina?.toLowerCase().includes('voco');
  const hasAssafaa = f.hotel_makkah?.toLowerCase().includes('assafaa') || f.hotel_medina?.toLowerCase().includes('assafaa');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-dvh"
    >
      {/* Hero image */}
      <div className="relative h-[280px] bg-beige-900 overflow-hidden">
        <img
          src={`https://placehold.co/800x560/0A3B2B/C9A961?text=${encodeURIComponent(f.title.split(' ')[1] || 'Omra')}`}
          alt={f.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Status */}
        <div className="absolute top-4 right-4">
          <StatusPill tone={statusConfig[f.status].tone}>{statusConfig[f.status].label}</StatusPill>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="text-display-m text-white">{f.title}</h1>
          {f.subtitle && <p className="text-body text-white/80 mt-1">{f.subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-6 flex flex-col gap-6 -mt-4 bg-ivory-50 rounded-t-[32px] relative">
        {/* Key info pills — horizontal scroll snap */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 snap-x snap-mandatory scrollbar-none">
          <InfoChip icon={<Calendar className="w-4 h-4" />} label={`${new Date(f.start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} — ${new Date(f.end_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`} />
          <InfoChip icon={<Clock className="w-4 h-4" />} label={`${f.duration_days}j / ${f.duration_nights}n`} />
          <InfoChip icon={<Plane className="w-4 h-4" />} label={`${f.airline} · ${f.route_from} → ${f.route_to}`} />
          <InfoChip icon={<Luggage className="w-4 h-4" />} label={`${f.baggage_checked_kg}kg soute + ${f.baggage_cabin_kg}kg cabine`} />
        </div>

        {/* Hotels — Bento Grid */}
        <section>
          <h2 className="text-caption text-ink-400 mb-3">HÉBERGEMENT</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-[24px] p-5 shadow-card border border-ink-100/30">
              <Hotel className="w-5 h-5 text-beige-900 mb-2" />
              <p className="text-micro text-ink-400">LA MECQUE</p>
              <p className="text-body font-semibold text-ink-900 mt-1">{f.hotel_makkah}</p>
            </div>
            <div className="bg-white rounded-[24px] p-5 shadow-card border border-ink-100/30">
              <Hotel className="w-5 h-5 text-beige-900 mb-2" />
              <p className="text-micro text-ink-400">MÉDINE</p>
              <p className="text-body font-semibold text-ink-900 mt-1">{f.hotel_medina}</p>
            </div>
          </div>
          {hasVoco && (
            <div className="mt-4">
              <h3 className="text-[11px] font-bold tracking-wide text-ink-300 uppercase mb-2">Galerie — Hôtel Partenaire Voco</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-24 rounded-[16px] overflow-hidden bg-ink-50">
                  <img src="/images/hotels/voco/voco-1.jpg" alt="Voco Reception" className="w-full h-full object-cover" />
                </div>
                <div className="h-24 rounded-[16px] overflow-hidden bg-ink-50">
                  <img src="/images/hotels/voco/voco-2.jpg" alt="Voco Breakfast" className="w-full h-full object-cover" />
                </div>
                <div className="h-24 rounded-[16px] overflow-hidden bg-ink-50">
                  <img src="/images/hotels/voco/voco-3.jpg" alt="Voco Room" className="w-full h-full object-cover" />
                </div>
                <div className="h-24 rounded-[16px] overflow-hidden bg-ink-50">
                  <img src="/images/hotels/voco/voco-4.jpg" alt="Voco Bathroom" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          )}
          {hasAssafaa && (
            <div className="mt-4">
              <h3 className="text-[11px] font-bold tracking-wide text-ink-300 uppercase mb-2">Galerie — Hôtel Assafaa</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-24 rounded-[16px] overflow-hidden bg-ink-50">
                  <img src="/images/hotels/assafaa/assafaa-1.jpg" alt="Assafaa Room" className="w-full h-full object-cover" />
                </div>
                <div className="h-24 rounded-[16px] overflow-hidden bg-ink-50">
                  <img src="/images/hotels/assafaa/assafaa-2.jpg" alt="Assafaa Restaurant" className="w-full h-full object-cover" />
                </div>
                <div className="h-24 col-span-2 rounded-[16px] overflow-hidden bg-ink-50">
                  <img src="/images/hotels/assafaa/assafaa-3.jpg" alt="Assafaa Exterior" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Inclusions */}
        <section>
          <h2 className="text-caption text-ink-400 mb-3">INCLUSIONS</h2>
          <div className="bg-white rounded-[24px] p-5 shadow-card border border-ink-100/30 space-y-3">
            <InclusionRow
              icon={<Utensils className="w-4 h-4" />}
              label="Petit-déjeuner"
              included={f.includes_breakfast}
            />
            <InclusionRow
              icon={<Shield className="w-4 h-4" />}
              label="Visa (passeport UE)"
              included={f.visa_included_europe}
            />
            {!f.visa_included_europe && (
              <p className="text-micro text-ink-400 pl-8">
                +{f.visa_extra_non_europe}€ pour passeport non-européen
              </p>
            )}
            {f.has_stopover && (
              <p className="text-micro text-state-warn pl-8">⚠ Vol avec escale</p>
            )}
          </div>
        </section>

        {/* Price table */}
        <section>
          <h2 className="text-caption text-ink-400 mb-3">TARIFS PAR PERSONNE</h2>
          <PriceTable
            priceSix={f.price_six}
            priceQuad={f.price_quad}
            priceTriple={f.price_triple}
            priceDouble={f.price_double}
          />
        </section>

        {/* Spacer for sticky CTA */}
        <div className="h-20" />
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-ivory-50/90 backdrop-blur-xl border-t border-ink-100/30 px-5 py-4 safe-bottom">
        <Button
          variant="beige"
          size="lg"
          shape="pill"
          className="w-full"
          onClick={() => router.push(`/reserver?formule=${f.id}`)}
        >
          Réserver cette formule
        </Button>
      </div>
    </motion.div>
  );
}

function InfoChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-ink-100 text-[12px] text-ink-500 whitespace-nowrap snap-start shrink-0">
      <span className="text-beige-900">{icon}</span>
      {label}
    </div>
  );
}

function InclusionRow({ icon, label, included }: { icon: React.ReactNode; label: string; included: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={included ? 'text-state-success' : 'text-ink-300'}>{icon}</span>
      <span className={`text-body ${included ? 'text-ink-700' : 'text-ink-300 line-through'}`}>{label}</span>
      <span className={`ml-auto text-micro ${included ? 'text-state-success' : 'text-ink-300'}`}>
        {included ? '✓ Inclus' : '✗'}
      </span>
    </div>
  );
}
