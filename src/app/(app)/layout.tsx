'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BottomTabBar, type TabItem } from '@/components/ui/bottom-tab-bar';
import { Home, Tag, BookOpen, MessageCircle, UserCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const tabs: TabItem[] = [
  { id: '/', icon: <Home className="w-6 h-6" strokeWidth={1.5} />, activeIcon: <Home className="w-6 h-6" strokeWidth={2} />, label: 'Accueil' },
  { id: '/offres', icon: <Tag className="w-6 h-6" strokeWidth={1.5} />, activeIcon: <Tag className="w-6 h-6" strokeWidth={2} />, label: 'Offres' },
  { id: '/guide', icon: <BookOpen className="w-6 h-6" strokeWidth={1.5} />, activeIcon: <BookOpen className="w-6 h-6" strokeWidth={2} />, label: 'Guide' },
  { id: '/chat', icon: <MessageCircle className="w-6 h-6" strokeWidth={1.5} />, activeIcon: <MessageCircle className="w-6 h-6" strokeWidth={2} />, label: 'Chat' },
  { id: '/profil', icon: <UserCircle className="w-6 h-6" strokeWidth={1.5} />, activeIcon: <UserCircle className="w-6 h-6" strokeWidth={2} />, label: 'Profil' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine active tab from pathname
  const activeTab = tabs.find(t => {
    if (t.id === '/') return pathname === '/';
    return pathname.startsWith(t.id);
  })?.id ?? '/';

  return (
    <div className="min-h-dvh bg-ivory-50 flex flex-col">
      {/* Main content */}
      <main className="flex-1 pb-[88px] lg:pb-0 lg:pl-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-dvh h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <BottomTabBar
        tabs={tabs}
        activeId={activeTab}
        onChange={(id) => router.push(id)}
      />
    </div>
  );
}
