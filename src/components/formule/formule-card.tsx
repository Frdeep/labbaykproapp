'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { StatusPill } from '@/components/common/status-pill';
import type { FormuleStatus } from '@/types/formule';

const statusConfig: Record<FormuleStatus, { label: string; tone: 'gold' | 'success' | 'error' | 'muted' }> = {
  available: { label: 'Disponible', tone: 'success' },
  last_spots: { label: 'Dernières places', tone: 'gold' },
  sold_out: { label: 'Complet', tone: 'error' },
  new: { label: 'Nouveau', tone: 'gold' },
  info_only: { label: 'Info', tone: 'muted' },
  draft: { label: 'Brouillon', tone: 'muted' },
};

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
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'flex bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer group',
        className
      )}
    >
      {/* Left: Image */}
      <div className="w-[120px] min-h-[130px] bg-ink-100 overflow-hidden relative flex-shrink-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status pill overlay */}
        <div className="absolute top-2 left-2">
          <StatusPill tone={statusConfig[status].tone}>{statusConfig[status].label}</StatusPill>
        </div>
      </div>

      {/* Right: Info */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-2">
        <div>
          <h3 className="font-serif text-[15px] font-medium text-ink-900 leading-snug line-clamp-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[12px] text-ink-400 mt-0.5 line-clamp-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-end justify-between">
          <span className="text-[11px] text-ink-400">{duration}</span>
          {price && (
            <div className="text-right">
              <span className="text-[10px] text-gold-600/70 block">{pricePrefix}</span>
              <span className="text-[15px] font-semibold text-gold-600">{price}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
