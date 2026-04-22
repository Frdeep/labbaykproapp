'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createClient } from '@/lib/supabase-browser';
import { FormuleCard } from '@/components/formule/formule-card';
import { ScreenHeader } from '@/components/layout/screen-header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import type { Formule, FormuleCategory } from '@/types/formule';

const categories: { key: FormuleCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'standard', label: 'Omra' },
  { key: 'hajj', label: 'Hajj' },
  { key: 'ramadan', label: 'Ramadan' },
  { key: 'vacances', label: 'Vacances' },
];

export default function OffresPage() {
  const [formules, setFormules] = useState<Formule[]>([]);
  const [filter, setFilter] = useState<FormuleCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('formules')
        .select('*')
        .eq('published', true)
        .order('start_date', { ascending: true });

      setFormules((data as Formule[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = formules.filter((f) => {
    if (filter !== 'all' && f.category !== filter) return false;
    if (search && !f.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Nos formules" />

      <div className="px-5 flex flex-col gap-6 py-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
          <Input
            placeholder="Rechercher une formule..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 snap-x snap-mandatory scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`
                px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 snap-start shrink-0
                ${filter === cat.key
                  ? 'bg-beige-900 text-gold-300 shadow-card'
                  : 'bg-white text-ink-500 hover:bg-ink-100/50 border border-ink-100'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {loading ? (
            // Skeleton
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
                <div className="w-[120px] h-[130px] bg-ink-100" />
                <div className="flex-1 p-4 space-y-3">
                  <div className="h-4 bg-ink-100 rounded w-3/4" />
                  <div className="h-3 bg-ink-100 rounded w-1/2" />
                  <div className="h-5 bg-ink-100 rounded w-1/3 mt-auto" />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-body text-ink-400">Aucune formule trouvée</p>
            </div>
          ) : (
            <AnimatePresence>
              {filtered.map((formule, i) => (
                <motion.div
                  key={formule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/offres/${formule.id}`}>
                    <FormuleCard
                      imageSrc={`/images/omra-ramadan.jpg`}
                      title={formule.title}
                      subtitle={formule.subtitle ?? undefined}
                      price={formule.price_quad ? `${formule.price_quad.toLocaleString('fr-FR')} €` : undefined}
                      duration={`${formule.duration_days}j / ${formule.duration_nights}n`}
                      status={formule.status}
                    />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
