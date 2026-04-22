'use client';

import Link from 'next/link';
import { ScreenHeader } from '@/components/layout/screen-header';
import { RitualCounter } from '@/components/ritual/ritual-counter';
import { motion } from 'motion/react';

const rituals = [
  { name: 'Ihram', nameAr: 'الإحرام', description: 'Entrez en état de sacralisation', href: '#ihram' },
  { name: 'Tawaf', nameAr: 'الطواف', description: '7 tours autour de la Kaaba', href: '#tawaf' },
  { name: 'Sa\'i', nameAr: 'السعي', description: '7 traversées Safâ-Marwa', href: '#sai' },
  { name: 'Halq / Taqsir', nameAr: 'الحلق', description: 'Couper ou raser les cheveux', href: '#halq' },
];

export default function OmraPage() {
  return (
    <div className="flex flex-col">
      <ScreenHeader title="Omra — Rituels" />

      <div className="px-5 py-6 flex flex-col gap-6">
        {/* Ritual steps */}
        <section>
          <h2 className="text-caption text-ink-400 mb-4">LES ÉTAPES</h2>
          <div className="space-y-3">
            {rituals.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-beige-900 flex items-center justify-center text-gold-300 font-semibold text-[15px]">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-body font-semibold text-ink-900">{r.name}</h3>
                    <span className="text-arabic-m text-gold-600 text-[14px]">{r.nameAr}</span>
                  </div>
                  <p className="text-[13px] text-ink-400">{r.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tawaf counter */}
        <section>
          <h2 className="text-caption text-ink-400 mb-4">COMPTEUR TAWAF</h2>
          <RitualCounter
            ritualName="Tawaf"
            ritualNameAr="الطواف"
            totalRounds={7}
            instruction="Faites 7 tours autour de la Kaaba dans le sens inverse des aiguilles d'une montre"
          />
        </section>

        {/* Sa'i counter */}
        <section>
          <h2 className="text-caption text-ink-400 mb-4">COMPTEUR SA'I</h2>
          <RitualCounter
            ritualName="Sa'i"
            ritualNameAr="السعي"
            totalRounds={7}
            instruction="Traversez 7 fois entre les monts Safâ et Marwa"
          />
        </section>
      </div>
    </div>
  );
}
