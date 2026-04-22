'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDES = [
  {
    image: '/images/intro-1.jpg',
    title: 'Votre Voyage Sacré',
    subtitle: 'Vivez une expérience spirituelle inoubliable avec Labbayk Voyages.',
  },
  {
    image: '/images/intro-2.jpg',
    title: 'Accompagnement Premium',
    subtitle: 'Votre agence vous guide à chaque étape, de la réservation au retour.',
  },
  {
    image: '/images/intro-3.png',
    title: 'Sérénité & Dévotion',
    subtitle: 'Des outils modernes au service de votre pèlerinage, en toute tranquillité.',
  },
];

const AUTOPLAY_MS = 6000;

export function AuthCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-ink-900">
      {/* ── Background Images with Ken Burns ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.8, ease: 'easeInOut' },
            scale: { duration: AUTOPLAY_MS / 1000 + 2, ease: 'linear' },
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Cinematic gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* ── Desktop: Centered slogan with animated text ── */}
      <div className="absolute inset-x-0 bottom-[18%] hidden lg:flex flex-col items-center z-10 px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-center"
          >
            <h1 className="text-display-l text-white mb-3 drop-shadow-lg">{slide.title}</h1>
            <p className="text-body-l text-white/75 max-w-md mx-auto leading-relaxed">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Mobile: Bottom slogan (above the CTA buttons) ── */}
      <div className="absolute inset-x-0 bottom-[30%] flex flex-col items-center lg:hidden z-10 px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-title text-white mb-2 drop-shadow-md">{slide.title}</h2>
            <p className="text-body text-white/65 max-w-xs mx-auto">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Indicator dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 lg:bottom-12">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
            style={{ width: i === current ? 28 : 8 }}
          >
            <div className={`absolute inset-0 rounded-full ${i === current ? 'bg-gold-500' : 'bg-white/35'}`} />
            {i === current && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gold-300"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                style={{ transformOrigin: 'left' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
