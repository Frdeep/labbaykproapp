'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Sun, Moon, Sunrise, Sunset, CloudSun } from 'lucide-react';

interface PrayerTimeRowProps {
  className?: string;
}

const prayers = [
  { name: 'Fajr', time: '05:12', icon: <Sunrise className="w-4 h-4" /> },
  { name: 'Dhuhr', time: '13:50', icon: <Sun className="w-4 h-4" /> },
  { name: 'Asr', time: '17:42', icon: <CloudSun className="w-4 h-4" /> },
  { name: 'Maghrib', time: '20:45', icon: <Sunset className="w-4 h-4" /> },
  { name: 'Isha', time: '22:15', icon: <Moon className="w-4 h-4" /> },
];

export function PrayerTimeRow({ className }: PrayerTimeRowProps) {
  const activeIndex = useMemo(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    for (let i = prayers.length - 1; i >= 0; i--) {
      const [h, m] = prayers[i].time.split(':').map(Number);
      if (currentMinutes >= h * 60 + m) return i;
    }
    return 0;
  }, []);

  return (
    <div className={cn('flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-sm p-3 shadow-card', className)}>
      {prayers.map((prayer, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={prayer.name}
            className={cn(
              'flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-colors duration-300',
              isActive && 'bg-beige-900'
            )}
          >
            <div className={cn(
              'transition-colors duration-300',
              isActive ? 'text-gold-300' : 'text-ink-300'
            )}>
              {prayer.icon}
            </div>
            <span className={cn(
              'text-[10px] font-medium',
              isActive ? 'text-gold-300' : 'text-ink-400'
            )}>
              {prayer.name}
            </span>
            <span className={cn(
              'text-[11px] tabular font-semibold',
              isActive ? 'text-gold-100' : 'text-ink-700'
            )}>
              {prayer.time}
            </span>
          </div>
        );
      })}
    </div>
  );
}
