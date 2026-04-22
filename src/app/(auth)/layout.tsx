import { Logo } from '@/components/common/logo';
import { AuthCarousel } from '@/components/auth/auth-carousel';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh w-full flex bg-ink-900 overflow-hidden">
      
      {/* 
        SPLIT SCREEN ARCHITECTURE 
        Left / Background: The dynamic image carousel
        Right / Foreground: The auth form wrapper
      */}

      {/* Left Column (Desktop) & Full Background (Mobile) */}
      <div className="absolute inset-0 lg:relative lg:flex-1 lg:flex lg:h-dvh">
        <AuthCarousel />
      </div>

      {/* Mobile Logo overlay - visible when drawer is closed */}
      <div className="absolute top-12 left-0 w-full flex justify-center lg:hidden z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-float pointer-events-auto">
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>
      </div>

      {/* Right Column (Desktop) & Swipe Up Drawer (Mobile) */}
      <AuthWrapper>
        {children}
      </AuthWrapper>

    </div>
  );
}
