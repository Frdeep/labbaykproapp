import { Logo } from '@/components/common/logo';
import { AuthCarousel } from '@/components/auth/auth-carousel';
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

      {/* Right Column (Desktop) & Foreground Overlay (Mobile) */}
      <div className="relative z-10 w-full lg:w-[500px] xl:w-[600px] lg:flex-shrink-0 flex flex-col justify-end lg:justify-center bg-transparent lg:bg-white overflow-y-auto">
        
        {/* Mobile Logo overlay - hidden on desktop since the form will have a logo */}
        <div className="absolute top-12 left-0 w-full flex justify-center lg:hidden">
          <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-float">
            <Link href="/">
              <Logo size="md" />
            </Link>
          </div>
        </div>

        {/* Authentification Glassmorphic Card (Mobile) / Clean Plain Form (Desktop) */}
        <div className="w-full bg-white/95 backdrop-blur-xl lg:bg-transparent rounded-t-[32px] lg:rounded-none px-6 pt-10 pb-8 sm:px-12 lg:px-16 xl:px-24 flex flex-col mt-auto lg:mt-0 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] lg:shadow-none">
          
          {/* Desktop specific Logo, inside the right column */}
          <div className="hidden lg:flex justify-center mb-12">
            <Link href="/">
              <Logo size="lg" />
            </Link>
          </div>

          <div className="w-full max-w-[400px] mx-auto lg:max-w-none">
            {children}
          </div>
          
        </div>
      </div>
    </div>
  );
}
