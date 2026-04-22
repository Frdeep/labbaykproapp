'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { StatusPill } from '@/components/common/status-pill';
import { Clock, MapPin } from 'lucide-react';
import type { FormuleStatus } from '@/types/formule';

const statusConfig: Record<FormuleStatus, { label: string; tone: 'gold' | 'success' | 'error' | 'muted' }> = {
  available: { label: 'Disponible', tone: 'success' },
  last_spots: { label: 'Dernières places', tone: 'gold' },
  sold_out: { label: 'Complet', tone: 'error' },
  new: { label: 'Nouveau', tone: 'gold' },
  info_only: { label: 'Info', tone: 'muted' },
  draft: { label: 'Brouillon', tone: 'muted' },
};

// Map categories to real images
const categoryImages: Record<string, string> = {
  'Omra': '/images/omra-ramadan.jpg',
  'Hajj': '/images/hajj-premium.jpg',
  'Ramadan': '/images/omra-ramadan.jpg',
  'Toussaint': '/images/omra-toussaint.jpg',
  'année': '/images/omra-fin-annee.jpg',
};

function getImageForTitle(title: string, fallbackSrc: string): string {
  // If it's already a real image path, use it
  if (fallbackSrc.startsWith('/images/')) return fallbackSrc;
  
  // Try to match from title keywords
  for (const [keyword, img] of Object.entries(categoryImages)) {
    if (title.toLowerCase().includes(keyword.toLowerCase())) return img;
  }
  
  // Default to a real image instead of placehold.co
  return '/images/omra-ramadan.jpg';
}

interface FormuleCardProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  price?: string;
  pricePrefix?: string;
  duration: string;
  status: FormuleStatus;
  className?: string;
}

export function FormuleCard({
  imageSrc,
  title,
  subtitle,
  price,
  pricePrefix = 'À partir de',
  duration,
  status,
  className,
}: FormuleCardProps) {
  const realImage = getImageForTitle(title, imageSrc);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(10,14,12,0.08)' }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'flex bg-white rounded-[24px] overflow-hidden shadow-card cursor-pointer group border border-ink-100/20',
        className
      )}
    >
      {/* Left: Image */}
      <div className="w-[130px] min-h-[140px] bg-ink-100 overflow-hidden relative flex-shrink-0">
        <img
          src={realImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Status pill overlay */}
        <div className="absolute top-2.5 left-2.5">
          <StatusPill tone={statusConfig[status].tone}>{statusConfig[status].label}</StatusPill>
        </div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 pointer-events-none" />
      </div>

      {/* Right: Info */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-2.5">
        <div>
          <h3 className="font-serif text-[15px] font-medium text-ink-900 leading-snug line-clamp-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[12px] text-ink-400 mt-1 line-clamp-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1.5 text-ink-400">
            <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-[11px] font-medium">{duration}</span>
          </div>
          {price && (
            <div className="text-right">
              <span className="text-[10px] text-gold-600/60 block">{pricePrefix}</span>
              <span className="text-[16px] font-semibold text-gold-600 tabular">{price}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
