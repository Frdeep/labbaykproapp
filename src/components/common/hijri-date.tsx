'use client';

import { cn } from '@/lib/utils';

type HijriDateProps = {
  className?: string;
};

/**
 * Displays the current Hijri date.
 * Uses a simplified calculation for now.
 * HYPOTHESIS: Using approximate Hijri conversion — will switch to moment-hijri
 * when we wire up real prayer times in Sprint 5.
 */
export function HijriDate({ className }: HijriDateProps) {
  // Simplified Hijri date display — placeholder until moment-hijri integration
  const hijriMonths = [
    'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' ath-Thani",
    'Jumada al-Ula', 'Jumada ath-Thaniyah', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhul-Qi'dah", 'Dhul-Hijjah',
  ];

  // Approximate Hijri date calculation
  const now = new Date();
  const gregorianEpoch = new Date(622, 6, 16).getTime();
  const daysSinceEpoch = Math.floor((now.getTime() - gregorianEpoch) / (1000 * 60 * 60 * 24));
  const hijriYear = Math.floor(daysSinceEpoch / 354.36667) + 1;
  const daysInYear = daysSinceEpoch % 354;
  const hijriMonth = Math.min(Math.floor(daysInYear / 29.5), 11);
  const hijriDay = Math.floor(daysInYear % 29.5) + 1;

  return (
    <time className={cn('text-caption text-ink-500', className)}>
      {hijriDay} {hijriMonths[hijriMonth]} {hijriYear}
    </time>
  );
}
