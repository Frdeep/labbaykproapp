'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';

const INTRO_IMAGES = [
  '/images/hajj-premium.jpg',
  '/images/omra-ramadan.jpg',
  '/images/omra-fin-annee.jpg',
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide

export default function IntroPage() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col h-dvh w-full overflow-hidden bg-black -mt-6">
      {/* Background Image Carousel with Zoom Effect */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: 'easeInOut' },
            scale: { duration: AUTOPLAY_INTERVAL / 1000 + 1.5, ease: 'linear' }, // Progressive zoom out
          }}
        >
          <img
            src={INTRO_IMAGES[current]}
            alt={`Intro ${current + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/80" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full items-center justify-between px-5 pt-16 pb-8">
        
        {/* Top: Logo */}
        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-float">
          <Logo size="md" />
        </div>

        {/* Bottom: Text and CTA */}
        <div className="w-full max-w-sm flex flex-col items-center gap-8">
          {/* Animated Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {current === 0 && (
                <>
                  <h1 className="text-display-m text-white mb-2">Voyage Sacré</h1>
                  <p className="text-body text-white/80">Rejoignez des milliers de pèlerins pour une expérience inoubliable.</p>
                </>
              )}
              {current === 1 && (
                <>
                  <h1 className="text-display-m text-white mb-2">Suivi & Sécurité</h1>
                  <p className="text-body text-white/80">Votre agence Labbayk vous accompagne à chaque instant.</p>
                </>
              )}
              {current === 2 && (
                <>
                  <h1 className="text-display-m text-white mb-2">Guidage Rituel</h1>
                  <p className="text-body text-white/80">Des outils connectés pour accomplir vos rites avec sérénité.</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {INTRO_IMAGES.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? 'w-6 bg-gold-500' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-center gap-4 mt-2">
            <Button
              variant="white"
              size="lg"
              shape="pill"
              className="flex-1"
              onClick={() => router.push('/signup')}
            >
              Créer un compte
            </Button>
            <Button
              variant="beige"
              size="lg"
              shape="pill"
              className="flex-1"
              onClick={() => router.push('/login')}
            >
              Se connecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
