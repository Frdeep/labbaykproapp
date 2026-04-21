'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { usePushNotifications } from '@/hooks/use-push-notifications';

export function NotificationBanner() {
  const { permission, isSupported, requestPermission } = usePushNotifications();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show the banner only after 5 seconds, only if supported & not yet answered
    if (!isSupported || permission !== 'default') return;

    // Check if user has previously dismissed
    const wasDismissed = localStorage.getItem('labbayk_notif_dismissed');
    if (wasDismissed) return;

    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [isSupported, permission]);

  async function handleEnable() {
    await requestPermission();
    setVisible(false);
  }

  function handleDismiss() {
    setDismissed(true);
    setVisible(false);
    localStorage.setItem('labbayk_notif_dismissed', 'true');
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-24 left-4 right-4 lg:left-auto lg:right-8 lg:bottom-8 lg:max-w-sm z-[60]"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-float border border-ink-100/50 p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-beige-900/10 flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-5 h-5 text-beige-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body font-semibold text-ink-900 leading-tight">Rester informé ?</p>
              <p className="text-micro text-ink-400 mt-0.5 leading-relaxed">
                Recevez un rappel avant votre rendez-vous en agence et les horaires de prières.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleEnable}
                  className="px-4 py-2 rounded-xl bg-beige-900 text-gold-300 text-[13px] font-semibold hover:bg-beige-800 active:scale-95 transition-all"
                >
                  Activer
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-2 rounded-xl text-[13px] text-ink-400 hover:bg-ink-100/50 transition-colors"
                >
                  Plus tard
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="w-6 h-6 rounded-full hover:bg-ink-100/50 flex items-center justify-center shrink-0 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-ink-300" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
