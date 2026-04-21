import { cn } from '@/lib/utils';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

const sizeMap: Record<NonNullable<LogoProps['size']>, { text: string; sub: string }> = {
  sm:  { text: 'text-[18px]', sub: 'text-[9px]' },
  md:  { text: 'text-[24px]', sub: 'text-[10px]' },
  lg:  { text: 'text-[32px]', sub: 'text-[12px]' },
  xl:  { text: 'text-[42px]', sub: 'text-[14px]' },
};

export function Logo({ size = 'md', className }: LogoProps) {
  const { text, sub } = sizeMap[size];

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* Placeholder geometric mark */}
      <div className="relative">
        <span className={cn(
          'font-serif font-medium tracking-tight text-ink-900',
          text,
        )}>
          Labbayk
        </span>
      </div>
      <span className={cn(
        'uppercase tracking-[0.2em] text-gold-600 font-semibold mt-0.5',
        sub,
      )}>
        Hajj &amp; Omra
      </span>
    </div>
  );
}
