'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_IMAGES = [
  '/images/hajj-premium.jpg',
  '/images/omra-ramadan.jpg',
  '/images/omra-fin-annee.jpg',
];

const AUTOPLAY_INTERVAL = 5000;

export function AuthCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black isolation-auto">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: 'easeInOut' },
            scale: { duration: AUTOPLAY_INTERVAL / 1000 + 1.5, ease: 'linear' },
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={INTRO_IMAGES[current]}
            alt={`Labbayk Intro ${current + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Indicator Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10 hidden lg:flex">
        {INTRO_IMAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-6 bg-gold-500' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
      
      {/* Desktop overlay slogan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 w-full px-12 hidden lg:flex flex-col gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {current === 0 && (
              <>
                <h1 className="text-display-l text-white mb-2">Voyage Sacré</h1>
                <p className="text-body-l text-white/80 max-w-sm mx-auto">Rejoignez des milliers de pèlerins pour une expérience inoubliable.</p>
              </>
            )}
            {current === 1 && (
              <>
                <h1 className="text-display-l text-white mb-2">Suivi & Sécurité</h1>
                <p className="text-body-l text-white/80 max-w-sm mx-auto">Votre agence Labbayk vous accompagne à chaque instant de votre Omra.</p>
              </>
            )}
            {current === 2 && (
              <>
                <h1 className="text-display-l text-white mb-2">Guidage Rituel</h1>
                <p className="text-body-l text-white/80 max-w-sm mx-auto">Des outils premium pour accomplir vos rites avec la plus grande sérénité.</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
