'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface RitualCounterProps {
  ritualName: string;
  ritualNameAr: string;
  totalRounds: number;
  instruction?: string;
  className?: string;
}

export function RitualCounter({ ritualName, ritualNameAr, totalRounds, instruction, className }: RitualCounterProps) {
  const [count, setCount] = useState(0);
  const isComplete = count >= totalRounds;

  function handleTap() {
    if (count < totalRounds) {
      setCount(c => c + 1);
      // Haptic feedback via Capacitor (if available)
      try {
        import('@capacitor/haptics').then(({ Haptics, ImpactStyle }) => {
          Haptics.impact({ style: ImpactStyle.Medium });
        });
      } catch {}
    }
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[400px] rounded-3xl p-8 bg-grad-ritual relative overflow-hidden', className)}>
      {/* Arabic watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
        <span className="text-[120px] text-gold-500 font-arabic select-none">طواف</span>
      </div>

      {/* Ritual title */}
      <p className="text-caption text-gold-500/80 mb-1">{ritualName}</p>
      <p className="text-arabic-l text-gold-300 mb-8">{ritualNameAr}</p>

      {/* Counter circle */}
      <motion.button
        onTap={handleTap}
        whileTap={{ scale: 0.92 }}
        className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,97,0.08) 0%, transparent 70%)',
          border: '2px solid rgba(201,169,97,0.22)',
        }}
      >
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(201,169,97,0.1)" strokeWidth="3" />
          <motion.circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="var(--lb-gold-500)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={2 * Math.PI * 90 * (1 - count / totalRounds)}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          />
        </svg>

        {/* Count display */}
        <motion.span
          key={count}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[56px] font-serif font-medium text-gold-300 tabular"
        >
          {count}
        </motion.span>
        <span className="text-[15px] text-gold-500/60">/ {totalRounds}</span>
      </motion.button>

      {/* Instruction */}
      {instruction && (
        <p className="text-body text-gold-500/70 text-center mt-6 max-w-[280px]">{instruction}</p>
      )}

      {/* Status / Reset */}
      <div className="mt-8">
        {isComplete ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <p className="text-h2 text-gold-300">✓ Terminé</p>
            <button onClick={handleReset} className="text-micro text-gold-500/60 mt-2 hover:text-gold-400 transition-colors">
              Recommencer
            </button>
          </motion.div>
        ) : (
          <p className="text-micro text-gold-500/40">Tapez pour compter</p>
        )}
      </div>
    </div>
  );
}
