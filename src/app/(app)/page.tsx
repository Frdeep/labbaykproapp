'use client';

import { motion } from 'framer-motion';
import { Bell, BookOpen, MessageCircle, Plane, BookOpenCheck } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/screen-header';
import { ActionSquare } from '@/components/ui/action-square';
import { DestinationCard } from '@/components/ui/destination-card';
import { OrbitWidget } from '@/components/prayer/orbit-widget';
import { PrayerTimeRow } from '@/components/prayer/prayer-time-row';
import { AvatarPlaceholder } from '@/components/common/avatar-placeholder';
import { HijriDate } from '@/components/common/hijri-date';
import { Logo } from '@/components/common/logo';
import Link from 'next/link';

// Stagger animation config
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

// Mock featured destinations
const featuredOffers = [
  { id: '1', title: 'Omra Vacances Toussaint', price: '1 690€', image: '' },
  { id: '2', title: 'Omra Début Ramadan', price: '2 190€', image: '' },
  { id: '3', title: 'Hajj 2025 Premium', price: 'Sur devis', image: '' },
  { id: '4', title: 'Omra Fin d\'année', price: '1 890€', image: '' },
];

export default function HomePage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex flex-col"
    >
      {/* Header */}
      <ScreenHeader
        transparent
        leftAction={
          <Link href="/profil">
            <AvatarPlaceholder size="sm" />
          </Link>
        }
        title={<Logo size="sm" />}
        rightAction={
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-100/50 transition-colors">
            <Bell className="w-5 h-5 text-ink-500" strokeWidth={1.5} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-600" />
          </button>
        }
      />

      {/* Content */}
      <div className="px-5 flex flex-col gap-8 pb-8">
        {/* Greeting */}
        <motion.div variants={fadeUp} className="space-y-1 mt-2">
          <h1 className="text-display-m text-ink-900">Assalamu Alaykum 👋</h1>
          <HijriDate className="text-body text-ink-400" />
        </motion.div>

        {/* Orbit Prayer Widget */}
        <motion.div variants={fadeUp}>
          <OrbitWidget />
        </motion.div>

        {/* Prayer time row */}
        <motion.div variants={fadeUp}>
          <PrayerTimeRow />
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeUp}>
          <h2 className="text-caption text-ink-400 mb-3">ACCÈS RAPIDE</h2>
          <div className="grid grid-cols-4 gap-3">
            <Link href="/offres">
              <ActionSquare
                icon={<Plane className="w-6 h-6" />}
                label="Réserver"
              />
            </Link>
            <Link href="/guide">
              <ActionSquare
                icon={<BookOpenCheck className="w-6 h-6" />}
                label="Guide"
              />
            </Link>
            <Link href="/coran">
              <ActionSquare
                icon={<BookOpen className="w-6 h-6" />}
                label="Coran"
              />
            </Link>
            <Link href="/chat">
              <ActionSquare
                icon={<MessageCircle className="w-6 h-6" />}
                label="Chat IA"
              />
            </Link>
          </div>
        </motion.div>

        {/* Featured offers carousel */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-caption text-ink-400">OFFRES DU MOMENT</h2>
            <Link href="/offres" className="text-micro text-gold-600 hover:text-gold-700 transition-colors">
              Tout voir →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-none">
            {featuredOffers.map((offer) => (
              <Link key={offer.id} href={`/offres/${offer.id}`}>
                <DestinationCard
                  imageSrc={offer.image || `https://placehold.co/320x400/0A3B2B/C9A961?text=${encodeURIComponent(offer.title.split(' ')[0])}`}
                  title={offer.title}
                  pricePrefix="À partir de"
                  price={offer.price}
                  className="snap-start"
                />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Trust stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
          {[
            { label: 'Ans d\'expérience', value: '10+' },
            { label: 'Pèlerins accompagnés', value: '1 000+' },
            { label: 'Avis Google', value: '4.9★' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 rounded-2xl bg-white/80 p-4 shadow-card">
              <span className="text-h1 text-beige-900">{stat.value}</span>
              <span className="text-[10px] text-ink-400 text-center font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
