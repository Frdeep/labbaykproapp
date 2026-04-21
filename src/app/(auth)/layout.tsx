import { Logo } from '@/components/common/logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-grad-home flex flex-col">
      {/* Header with logo */}
      <header className="flex items-center justify-center pt-12 pb-6">
        <Logo size="lg" />
      </header>

      {/* Content area */}
      <main className="flex-1 flex flex-col items-center px-6">
        <div className="w-full max-w-[440px]">
          {children}
        </div>
      </main>

      {/* Bottom safe area */}
      <div className="safe-bottom" />
    </div>
  );
}
