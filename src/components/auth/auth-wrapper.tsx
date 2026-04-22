'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const showDrawer = isOpen || isDesktop;

  return (
    <>
      {/* ─── Mobile CTA Buttons (visible when drawer is closed) ─── */}
      <div className="absolute bottom-0 left-0 w-full px-6 pb-10 z-20 lg:hidden">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col gap-3"
            >
              <Button
                variant="beige"
                size="lg"
                shape="pill"
                className="w-full shadow-float text-[15px]"
                onClick={() => setIsOpen(true)}
              >
                Se connecter
              </Button>
              <Button
                variant="ghost"
                size="lg"
                shape="pill"
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 text-[15px]"
                onClick={() => setIsOpen(true)}
              >
                Créer un compte
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Desktop Column & Mobile Bottom Sheet Drawer ─── */}
      {/* Desktop: always rendered statically */}
      <div className="hidden lg:flex relative z-30 w-[500px] xl:w-[600px] flex-shrink-0 flex-col justify-center bg-white overflow-y-auto">
        <div className="w-full px-16 xl:px-24 flex flex-col">
          <div className="flex justify-center mb-12">
            <Link href="/">
              <Logo size="lg" />
            </Link>
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile: animated bottom sheet */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
            >
              <div
                className="w-full bg-white rounded-t-[32px] px-6 pt-3 pb-8 sm:px-10 flex flex-col shadow-[-2px_-10px_40px_rgba(0,0,0,0.15)] max-h-[90dvh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag Handle */}
                <div className="w-full flex justify-center pb-5">
                  <div className="w-10 h-1.5 rounded-full bg-ink-200" />
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
