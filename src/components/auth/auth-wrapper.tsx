'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      {/* ─── Mobile CTA Buttons (visible when drawer is closed) ─── */}
      <div className="absolute bottom-0 left-0 w-full px-6 pb-10 z-20 lg:hidden">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col gap-3"
            >
              <Button
                variant="beige"
                size="lg"
                shape="pill"
                className="w-full shadow-float text-[15px] h-14"
                onClick={() => setIsOpen(true)}
              >
                Se connecter
                <ChevronUp className="w-4 h-4 ml-2 opacity-60" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                shape="pill"
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 text-[15px] h-14"
                onClick={() => setIsOpen(true)}
              >
                Créer un compte
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Desktop: Static right column ─── */}
      <div className="hidden lg:flex relative z-30 w-[520px] xl:w-[600px] flex-shrink-0 flex-col justify-center bg-ivory-50 overflow-y-auto">
        {/* Decorative subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-ivory-50 via-ivory-50 to-sand-100/50 pointer-events-none" />
        
        <div className="relative w-full px-16 xl:px-24 flex flex-col">
          <div className="flex justify-center mb-10">
            <Link href="/">
              <Logo size="lg" />
            </Link>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>

      {/* ─── Mobile: Animated Bottom Sheet ─── */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <>
            {/* Backdrop */}
            <motion.div
              key="auth-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Sheet */}
            <motion.div
              key="auth-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
            >
              <div
                className="w-full bg-ivory-50 rounded-t-[36px] px-6 pt-3 pb-8 sm:px-10 flex flex-col max-h-[88dvh] overflow-y-auto"
                style={{
                  boxShadow: '0 -8px 40px rgba(0,0,0,0.18), 0 -2px 12px rgba(0,0,0,0.08)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag Handle */}
                <div className="w-full flex justify-center pb-4 pt-1">
                  <div className="w-12 h-1.5 rounded-full bg-ink-200/80" />
                </div>

                <div className="w-full max-w-[400px] mx-auto">
                  {children}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
