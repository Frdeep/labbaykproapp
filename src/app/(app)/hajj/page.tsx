'use client';

import { ScreenHeader } from '@/components/layout/screen-header';
import { motion } from 'framer-motion';

const hajjDays = [
  { day: 8, name: 'Jour de Tarwiya', nameAr: 'يوم التروية', location: 'Mina', steps: ['Ihram depuis La Mecque', 'Départ vers Mina', '5 prières à Mina (raccourcies)'] },
  { day: 9, name: 'Jour d\'Arafat', nameAr: 'يوم عرفة', location: 'Arafat', steps: ['Départ vers Arafat après Fajr', 'Wuquf (station) jusqu\'au coucher du soleil', 'Invocations et douâas', 'Départ vers Muzdalifah'] },
  { day: 10, name: 'Jour du Sacrifice', nameAr: 'يوم النحر', location: 'Mina / La Mecque', steps: ['Ramassage des cailloux à Muzdalifah', 'Lapidation de Jamrat al-Aqaba', 'Sacrifice (Hady)', 'Rasage / coupe de cheveux', 'Tawaf al-Ifadha'] },
  { day: 11, name: 'Jour du Tachreeq 1', nameAr: 'أيام التشريق', location: 'Mina', steps: ['Lapidation des 3 Jamarat', 'Repos et invocations'] },
  { day: 12, name: 'Jour du Tachreeq 2', nameAr: 'أيام التشريق', location: 'Mina / La Mecque', steps: ['Lapidation des 3 Jamarat', 'Retour à La Mecque', 'Tawaf al-Wadâa (adieu)'] },
];

export default function HajjPage() {
  return (
    <div className="flex flex-col">
      <ScreenHeader title="Hajj — Les 5 Jours" />

      <div className="px-5 py-6">
        <p className="text-body text-ink-400 mb-6">Du 8 au 12 Dhul Hijjah — Les jours sacrés du pèlerinage</p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-ink-100" />

          <div className="space-y-8">
            {hajjDays.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-14"
              >
                {/* Day circle */}
                <div className="absolute left-0 w-10 h-10 rounded-full bg-beige-900 flex items-center justify-center text-gold-300 font-semibold text-[14px] z-10">
                  {day.day}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-4 shadow-card">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-body font-semibold text-ink-900">{day.name}</h3>
                    <span className="text-[13px] text-gold-600">{day.nameAr}</span>
                  </div>
                  <p className="text-micro text-ink-400 mb-3">📍 {day.location}</p>
                  <ul className="space-y-1.5">
                    {day.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-2 text-[13px] text-ink-500">
                        <span className="text-beige-900 mt-0.5">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
