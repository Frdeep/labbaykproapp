'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 -mt-20 gap-8">
      {/* Animated Logo Mark */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative"
      >
        {/* Glow behind */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,169,97,0.3) 0%, transparent 70%)' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* Kaaba icon placeholder */}
        <div className="relative w-24 h-24 rounded-3xl bg-beige-900 flex items-center justify-center shadow-float">
          <span className="text-display-l text-gold-300">L</span>
        </div>
      </motion.div>

      {/* Brand Name */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center"
      >
        <h1 className="text-display-xl text-ink-900">Labbayk</h1>
        <p className="text-body text-ink-400 mt-1">Hajj & Omra</p>
      </motion.div>

      {/* Arabic tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="text-arabic-m text-gold-600 text-center"
      >
        لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
      </motion.p>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex gap-1.5 mt-8"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
