'use client';

import { ScreenHeader } from '@/components/layout/screen-header';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search, BookOpen, Compass, Moon, MapPin, Heart, Star, Tent, Mountain, Coffee } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const guideCategories = [
  { slug: 'prieres', label: 'Prières', icon: <Moon className="w-6 h-6" />, color: 'bg-beige-900', textColor: 'text-gold-300' },
  { slug: 'douas', label: 'Douas', icon: <Heart className="w-6 h-6" />, color: 'bg-gold-600', textColor: 'text-white' },
  { slug: 'tawaf', label: 'Tawaf', icon: <Compass className="w-6 h-6" />, color: 'bg-beige-800', textColor: 'text-gold-300' },
  { slug: 'sai', label: 'Sa\'i', icon: <Mountain className="w-6 h-6" />, color: 'bg-sand-400', textColor: 'text-white' },
  { slug: 'mina', label: 'Mina', icon: <Tent className="w-6 h-6" />, color: 'bg-beige-700', textColor: 'text-gold-100' },
  { slug: 'arafat', label: 'Arafat', icon: <Star className="w-6 h-6" />, color: 'bg-gold-500', textColor: 'text-white' },
  { slug: 'muzdalifah', label: 'Muzdalifah', icon: <MapPin className="w-6 h-6" />, color: 'bg-ink-700', textColor: 'text-gold-300' },
  { slug: 'medine', label: 'Médine', icon: <BookOpen className="w-6 h-6" />, color: 'bg-beige-900', textColor: 'text-gold-300' },
  { slug: 'conseils', label: 'Conseils', icon: <Coffee className="w-6 h-6" />, color: 'bg-sand-300', textColor: 'text-ink-900' },
];

export default function GuidePage() {
  const [search, setSearch] = useState('');

  const filtered = guideCategories.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Guide du pèlerin" />

      <div className="px-5 py-4 flex flex-col gap-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
          <Input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-3">
          {filtered.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/guide/${cat.slug}`}>
                <div className={`${cat.color} rounded-2xl p-4 aspect-square flex flex-col items-center justify-center gap-2 shadow-card hover:shadow-float transition-shadow duration-300`}>
                  <span className={cat.textColor}>{cat.icon}</span>
                  <span className={`text-[12px] font-medium ${cat.textColor} text-center leading-tight`}>
                    {cat.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
