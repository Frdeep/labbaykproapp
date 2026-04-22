'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Sunrise, Sunset, CloudSun } from 'lucide-react';

// Prayer data type
interface PrayerTime {
  name: string;
  nameAr: string;
  time: string;
  icon: React.ReactNode;
}

// Static fallback times (Paris, April)
const defaultPrayers: PrayerTime[] = [
  { name: 'Fajr', nameAr: 'الفجر', time: '05:12', icon: <Sunrise className="w-5 h-5" /> },
  { name: 'Dhuhr', nameAr: 'الظهر', time: '13:50', icon: <Sun className="w-5 h-5" /> },
  { name: 'Asr', nameAr: 'العصر', time: '17:42', icon: <CloudSun className="w-5 h-5" /> },
  { name: 'Maghrib', nameAr: 'المغرب', time: '20:45', icon: <Sunset className="w-5 h-5" /> },
  { name: 'Isha', nameAr: 'العشاء', time: '22:15', icon: <Moon className="w-5 h-5" /> },
];

// Calculate angle position on orbit for each prayer
function getPrayerAngle(index: number, total: number): number {
  return (index / total) * 360 - 90; // Start from top
}

interface OrbitWidgetProps {
  prayers?: PrayerTime[];
  activeIndex?: number;
  className?: string;
}

export function OrbitWidget({ prayers = defaultPrayers, activeIndex, className }: OrbitWidgetProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // Auto-detect active prayer based on current time
  const currentActive = useMemo(() => {
    if (activeIndex !== undefined) return activeIndex;
    if (!isMounted) return 0; // Prevent React hydration error
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (let i = prayers.length - 1; i >= 0; i--) {
      const [h, m] = prayers[i].time.split(':').map(Number);
      if (currentMinutes >= h * 60 + m) return i;
    }
    return 0;
  }, [prayers, activeIndex]);

  const activePrayer = prayers[currentActive];
  const orbitRadius = 110;
  const dotRadius = 6;
  const activeDotRadius = 10;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-grad-hero" />
      <div className="absolute inset-0 bg-grad-watermark" />

      <div className="relative flex flex-col items-center py-8 px-6">
        {/* SVG Orbit */}
        <div className="relative w-[300px] h-[300px]">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {/* Dashed orbit circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={orbitRadius}
              fill="none"
              stroke="var(--lb-sand-300)"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.6"
            />

            {/* Prayer dots on orbit */}
            {prayers.map((prayer, i) => {
              const angle = getPrayerAngle(i, prayers.length);
              const rad = (angle * Math.PI) / 180;
              const x = centerX + orbitRadius * Math.cos(rad);
              const y = centerY + orbitRadius * Math.sin(rad);
              const isActive = i === currentActive;

              return (
                <g key={prayer.name}>
                  {/* Glow for active */}
                  {isActive && (
                    <circle
                      cx={x}
                      cy={y}
                      r={activeDotRadius + 8}
                      fill="var(--lb-gold-500)"
                      opacity="0.15"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? activeDotRadius : dotRadius}
                    fill={isActive ? 'var(--lb-gold-500)' : 'var(--lb-sand-400)'}
                    stroke={isActive ? 'var(--lb-gold-300)' : 'none'}
                    strokeWidth={isActive ? 2 : 0}
                  />
                  {/* Label */}
                  <text
                    x={x}
                    y={y + (isActive ? 22 : 18)}
                    textAnchor="middle"
                    fill={isActive ? 'var(--lb-gold-700)' : 'var(--lb-ink-400)'}
                    fontSize={isActive ? '11' : '10'}
                    fontWeight={isActive ? '600' : '400'}
                    fontFamily="var(--font-sans)"
                  >
                    {prayer.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={currentActive}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-caption text-gold-600 mb-1">PROCHAINE PRIÈRE</p>
              <p className="text-arabic-m text-ink-900">{activePrayer.nameAr}</p>
              <p className="text-display-l text-ink-900 tabular mt-1">{activePrayer.time}</p>
            </motion.div>
          </div>

          {/* Animated sun/moon marker */}
          <motion.div
            className="absolute"
            style={{
              left: centerX - 16,
              top: centerY - 16 - orbitRadius - 20,
            }}
            animate={{
              rotate: (getPrayerAngle(currentActive, prayers.length) + 90),
            }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
            // TODO: Fix position via transform-origin
          >
            {currentActive <= 2 ? (
              <Sun className="w-8 h-8 text-gold-500" />
            ) : (
              <Moon className="w-8 h-8 text-gold-600" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
